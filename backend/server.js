import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { analyzeDomain } from './services/gemini.js';
import { INITIAL_COMPANIES } from './utils/mockParser.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// In-memory Database state
let companies = [...INITIAL_COMPANIES];

// GET: Fetch all analyzed companies
app.get('/api/companies', (req, res) => {
  res.json(companies);
});

// POST: Analyze single or multiple domains
app.post('/api/analyze', async (req, res) => {
  const { domains } = req.body;

  if (!domains || !Array.isArray(domains) || domains.length === 0) {
    return res.status(400).json({ error: "Please provide an array of domains." });
  }

  const results = [];
  const errors = [];

  for (const domain of domains) {
    const cleanDomain = domain.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, "");
    if (!cleanDomain) continue;

    try {
      // Run the Gemini-powered or mock-fallback domain audit
      const analysis = await analyzeDomain(cleanDomain);
      
      // Check if company already exists in memory
      const existingIdx = companies.findIndex(c => c.id === analysis.id);

      if (existingIdx !== -1) {
        // Merge analysis but preserve user modifications (status, bookmarks, notes)
        companies[existingIdx] = {
          ...companies[existingIdx],
          ...analysis,
          // Retain user states
          isBookmarked: companies[existingIdx].isBookmarked,
          status: companies[existingIdx].status,
          notes: companies[existingIdx].notes || []
        };
        results.push(companies[existingIdx]);
      } else {
        // Add new company with default states
        const newCompany = {
          ...analysis,
          isBookmarked: false,
          status: 'New',
          notes: []
        };
        companies.push(newCompany);
        results.push(newCompany);
      }
    } catch (err) {
      console.error(`Error analyzing domain ${domain}:`, err);
      errors.push({ domain, error: err.message });
    }
  }

  res.json({
    success: true,
    added: results,
    errors: errors
  });
});

// PUT: Update company configurations (bookmark, status, notes)
app.put('/api/companies/:id', (req, res) => {
  const { id } = req.params;
  const { isBookmarked, status, notes } = req.body;

  const idx = companies.findIndex(c => c.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Company not found" });
  }

  // Update provided fields
  if (isBookmarked !== undefined) {
    companies[idx].isBookmarked = isBookmarked;
  }
  if (status !== undefined) {
    companies[idx].status = status;
  }
  if (notes !== undefined && Array.isArray(notes)) {
    companies[idx].notes = notes;
  }

  res.json(companies[idx]);
});

// DELETE: Remove a company from the dashboard listing
app.delete('/api/companies/:id', (req, res) => {
  const { id } = req.params;
  const originalLength = companies.length;
  companies = companies.filter(c => c.id !== id);

  if (companies.length === originalLength) {
    return res.status(404).json({ error: "Company not found" });
  }

  res.json({ success: true, message: `Brand ${id} removed successfully.` });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: "healthy", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Helium backend running on port http://localhost:${PORT}`);
});
