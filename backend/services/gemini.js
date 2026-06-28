import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateMockBrandAnalysis } from '../utils/mockParser.js';

// Setup Google Gen AI Client
const apiKey = process.env.GEMINI_API_KEY;
let genAI = null;

if (apiKey && apiKey.trim() !== '') {
  console.log("Initializing Google Gen AI Client with API key.");
  genAI = new GoogleGenerativeAI(apiKey);
} else {
  console.log("No GEMINI_API_KEY found in environment variables. Falling back to high-fidelity Mock Analyzer.");
}

export async function analyzeDomain(domain) {
  const normalized = domain.toLowerCase().trim().replace(/^(https?:\/\/)?(www\.)?/, "");

  // If no API key, bypass API and use high-fidelity mock directly
  if (!genAI) {
    console.log(`Mocking audit for domain: ${normalized}`);
    // Artificial delay to simulate AI thinking state
    await new Promise(resolve => setTimeout(resolve, 2000));
    return generateMockBrandAnalysis(normalized);
  }

  try {
    console.log(`Running real Gemini AI audit for domain: ${normalized}`);
    // We will use gemini-1.5-flash or gemini-2.5-flash as default fast models
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash', // Fallback to 1.5 if 2.5 is not accessible, 1.5-flash is widely supported
      generationConfig: {
        responseMimeType: 'application/json'
      }
    });

    const systemInstruction = `You are a Senior Direct-to-Consumer (D2C) E-commerce Specialist and Checkout Conversion Rate Optimization (CRO) Auditor.
Your job is to analyze the brand website: "${normalized}" and generate a detailed sales intelligence report.
Helium is a premium checkout optimization and CRO platform for D2C brands. Helium helps D2C brands streamline checkout, remove mobile checkout friction, speed up page loading, inject instant checkout links, bypass carts, display trust badges, and recover cart abandonments.

Generate an analysis report in standard JSON format containing:
- brandName: Full commercial name.
- website: "${normalized}".
- logo: Logo URL (preferably https://logo.clearbit.com/${normalized} or fallback placeholder).
- industry: One of: "Apparel & Fashion", "Beauty & Personal Care", "Consumer Electronics", "Food & Beverage", "Home & Living", "Health & Wellness", "Others".
- category: Specific product catalog category (e.g. Mens Activewear, Premium Tea).
- country: Country of brand origin.
- companySize: Estimated employees ("1-10", "11-50", "51-200", "201-500", "501-1000", "1000+").
- revenueRange: Estimated annual revenue (e.g. "$1M-$3M", "$3M-$10M", "$10M-$30M", "$30M-$100M", "$100M+").
- monthlyTraffic: Estimated monthly visitors (e.g. "50K-100K", "100K-500K", "500K-2M", "2M-5M", "5M+").
- socialPresence: Object containing "instagram", "facebook", "tiktok" (either active profile links or "inactive").
- products: Array of 3-5 key products they sell.
- catalogSize: Estimated number of products (number).
- techStack: Array of technologies detected/likely used (e.g. ["Shopify", "Klaviyo", "Razorpay", "Google Analytics 4"]).
- businessSummary: 2-3 sentence company overview.
- strengths: Array of 2-3 marketing or product strengths.
- weaknesses: Array of 2-3 website/CRO weaknesses.
- growthStage: "Early Stage", "Growth", "Scaling", or "Mature".
- conversionLeaks: Array of objects with properties:
  * leakType: One of: "Poor Mobile UX", "Slow Website", "Weak CTA", "No Trust Badges", "Checkout Friction", "No Product Reviews", "Weak Landing Pages", "No Social Proof", "Navigation Issues", "Poor Product Pages".
  * severity: "High", "Medium", or "Low".
  * explanation: Detailed explanation of why this leak is present and how it impacts customer drop-off.
  * evidence: Visual or performance evidence (e.g., checkout took 5 clicks, page speed looks slow, no reviews on main catalog).
- whyHelium: Why Helium should contact this company (e.g., checkout latency, large catalog drop-offs).
- whyNow: High-urgency signal (e.g. active advertising, massive seasonal catalog, speed issues, recent expansion signals) and why they need to fix it now.
- priorityScore: Number between 0-100 calculating sales priority (considering traffic, size, conversion leaks severity).
- confidenceScore: Number between 0-100 representing your prediction confidence.
- confidenceReason: Explanation of the confidence score.
- salesAngle: High-converting sales pitch topic (e.g. Streamline cart page, 1-click checkout, local payment gateways).
- proofPoint: Case study point (e.g. "Helium boosted AOV by 12% for another beauty brand by introducing smart bundle checkouts").
- outreachEmail: Object with:
  * subject: Eye-catching email subject.
  * greeting: Personalized greeting (e.g. Hi Team [brandName],).
  * opening: Personalized hook noting their brand strength.
  * valueProp: Direct value pitch showing how Helium fixes their specific checkout leaks.
  * cta: Professional call-to-action requesting a 10-minute audit call.

Return ONLY standard JSON. No markdown wrappings other than the JSON object itself. Ensure all properties are present.`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: `Perform D2C audit for: ${normalized}` }] }],
      systemInstruction: systemInstruction
    });

    const text = result.response.text();
    // Strip markdown blocks if returned
    const cleanText = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const data = JSON.parse(cleanText);
    
    // Ensure ID is set
    data.id = normalized;
    if (!data.logo) {
      data.logo = `https://logo.clearbit.com/${normalized}`;
    }
    
    return data;
  } catch (error) {
    console.error("Gemini API call failed, reverting to mock parser:", error);
    // Graceful fallback to mock data on rate-limiting, auth errors, or API hiccups
    return generateMockBrandAnalysis(normalized);
  }
}
