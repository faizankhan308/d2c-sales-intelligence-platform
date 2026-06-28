import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  ShieldAlert, 
  Activity,
  Zap,
  Globe,
  DollarSign,
  Users,
  Compass,
  Star
} from 'lucide-react';

import * as api from './services/api';
import { INITIAL_COMPANIES, generateMockBrandAnalysis } from './utils/mockData';

// Subcomponents imports
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardOverview from './components/DashboardOverview';
import BrandTable from './components/BrandTable';
import AnalysisDrawer from './components/AnalysisDrawer';
import DomainInput from './components/DomainInput';
import VisualCharts from './components/VisualCharts';

export default function App() {
  const [currentView, setCurrentView] = useState("landing"); // 'landing' | 'dashboard'
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    industry: '',
    companySize: '',
    priority: '',
    category: '',
    opportunity: ''
  });
  
  // Sorting state
  const [sortBy, setSortBy] = useState("priorityScore");
  const [sortOrder, setSortOrder] = useState("desc");

  // Selection states
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [filterBookmarkedOnly, setFilterBookmarkedOnly] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Analysis modal & Loading state
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStepText, setAnalysisStepText] = useState("");

  // 1. Initial Data Fetching with self-healing fallback
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await api.fetchCompanies();
        setCompanies(data);
        setErrorMsg("");
      } catch (err) {
        console.warn("Express backend server offline or unreachable. Falling back to local storage and presets.");
        // Fallback to local storage or preset mock constants
        const stored = localStorage.getItem("helium_companies");
        if (stored) {
          setCompanies(JSON.parse(stored));
        } else {
          setCompanies(INITIAL_COMPANIES);
          localStorage.setItem("helium_companies", JSON.stringify(INITIAL_COMPANIES));
        }
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Update localStorage helper if offline fallback is running
  const saveCompaniesState = (newCompanies) => {
    setCompanies(newCompanies);
    localStorage.setItem("helium_companies", JSON.stringify(newCompanies));
  };

  // 2. Refresh/Reset Database
  const handleResetDemo = async () => {
    if (window.confirm("Are you sure you want to restore the default preset brands database? This will clear custom analyses.")) {
      try {
        // Attempt to clean memory state or just reload presets
        saveCompaniesState(INITIAL_COMPANIES);
        setSelectedCompany(null);
        alert("Workspace reset to original startup brands catalog.");
      } catch (err) {
        console.error(err);
      }
    }
  };

  // 3. Update Company Details (Bookmark status, Pipeline tag, Sales notes)
  const handleUpdateCompany = async (id, updates) => {
    // Optimistic UI updates
    const originalCompanies = [...companies];
    const updated = companies.map(c => c.id === id ? { ...c, ...updates } : c);
    setCompanies(updated);
    
    // If selected company is updated, sync details drawer state
    if (selectedCompany && selectedCompany.id === id) {
      setSelectedCompany({ ...selectedCompany, ...updates });
    }

    try {
      await api.updateCompany(id, updates);
    } catch (err) {
      console.warn("Backend update failed. Saving updates locally inside indexDB/localStorage fallback.");
      localStorage.setItem("helium_companies", JSON.stringify(updated));
    }
  };

  // 4. Delete Company Row
  const handleDeleteCompany = async (id) => {
    if (window.confirm("Remove this brand analysis from your intelligence table?")) {
      const updated = companies.filter(c => c.id !== id);
      setCompanies(updated);
      if (selectedCompany && selectedCompany.id === id) {
        setSelectedCompany(null);
      }

      try {
        await api.deleteCompany(id);
      } catch (err) {
        console.warn("Backend delete failed. Committing deletions to local database state.");
        localStorage.setItem("helium_companies", JSON.stringify(updated));
      }
    }
  };

  // 5. Run Domain Audit (Sequentially analyze and show step log transitions)
  const handleAnalyzeDomains = async (domains) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisStepText("Contacting host DNS and starting crawler diagnostics...");

    // Simulated progress logging tick timer
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        
        // Progress steps texts
        const nextVal = prev + Math.floor(Math.random() * 8) + 3;
        if (nextVal < 15) setAnalysisStepText("Connecting to endpoint web servers...");
        else if (nextVal < 35) setAnalysisStepText("Reviewing scripts tags, CSS trackers & tag configurations...");
        else if (nextVal < 55) setAnalysisStepText("Evaluating mobile layouts and payment friction steps...");
        else if (nextVal < 75) setAnalysisStepText("Auditing cart drawer buttons, CTAs & reviews panels...");
        else if (nextVal < 90) setAnalysisStepText("Drafting targeted CRO value propositions & outreach mail templates...");
        else setAnalysisStepText("Calculating Priority Score & final confidence metrics...");
        
        return nextVal;
      });
    }, 400);

    try {
      let response;
      try {
        response = await api.analyzeDomains(domains);
      } catch (apiErr) {
        console.warn("API server down. Simulating client-side analysis audit locally.");
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const added = domains.map(d => {
          const result = generateMockBrandAnalysis(d);
          return {
            ...result,
            isBookmarked: false,
            status: 'New',
            notes: []
          };
        });
        response = { success: true, added, errors: [] };
      }

      clearInterval(interval);
      setAnalysisProgress(100);
      setAnalysisStepText("Audit Completed successfully!");

      // Integrate new analyses
      setTimeout(() => {
        let mergedList = [...companies];
        if (response.added && response.added.length > 0) {
          response.added.forEach(newComp => {
            const idx = mergedList.findIndex(c => c.id === newComp.id);
            if (idx !== -1) {
              // Merge but preserve user-set states
              mergedList[idx] = {
                ...mergedList[idx],
                ...newComp
              };
            } else {
              mergedList.unshift(newComp); // Add to top
            }
          });
        }
        
        saveCompaniesState(mergedList);
        setIsAnalyzing(false);
        setIsInputModalOpen(false);
      }, 800);

    } catch (err) {
      clearInterval(interval);
      setIsAnalyzing(false);
      alert(`Fatal Error analyzing domains: ${err.message}`);
    }
  };

  // Filter lists based on Sidebar selection
  const sidebarFilteredCompanies = companies.filter(company => {
    if (filterBookmarkedOnly) return company.isBookmarked;
    if (statusFilter !== 'ALL') return company.status === statusFilter;
    return true;
  });

  return (
    <div className="h-full bg-dark-950 text-slate-100 flex flex-col font-sans select-none overflow-hidden relative bg-grid-pattern">
      <AnimatePresence mode="wait">
        
        {/* LANDING PAGE VIEW */}
        {currentView === 'landing' && (
          <motion.div
            key="landing-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto flex flex-col items-center justify-center py-20 px-6 relative"
          >
            {/* Header navbar */}
            <header className="absolute top-0 w-full max-w-7xl px-8 py-6 flex justify-between items-center z-10 select-none">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center">
                  <span className="font-extrabold text-white text-base">H</span>
                </div>
                <span className="font-bold text-sm tracking-widest text-white leading-none">HELIUM</span>
              </div>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="text-xs font-semibold px-4 py-2 border border-slate-800 hover:border-slate-700 bg-dark-900 rounded-lg text-slate-300 hover:text-white transition"
              >
                Go to App →
              </button>
            </header>

            {/* Background Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Main content body */}
            <div className="max-w-4xl text-center space-y-8 mt-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Next-Gen Sales Intelligence</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-gradient-indigo-cyan"
              >
                AI Growth Opportunity <br />
                Intelligence System
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
              >
                Identify which D2C brands your sales team should contact first using AI. Automate your website CRO auditing, rank high-value domains, and generate custom outreach pitches instantly.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-4"
              >
                <button
                  onClick={() => {
                    setCurrentView('dashboard');
                    setIsInputModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/15 hover:shadow-cyan-400/25 active:scale-[0.98] transition-all"
                >
                  <span>Analyze Brands Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="px-6 py-3.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-dark-900 text-slate-300 hover:text-white font-semibold text-sm transition-all"
                >
                  Explore Dashboard
                </button>
              </motion.div>
            </div>

            {/* Dashboard Mockup Display */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 60 }}
              className="mt-16 w-full max-w-5xl rounded-2xl border border-slate-800/80 bg-dark-900/60 p-3 shadow-2xl relative overflow-hidden backdrop-blur-sm"
            >
              <div className="absolute top-0 left-0 right-0 h-11 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-1.5 shrink-0 select-none">
                <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                <span className="text-[10px] text-slate-500 font-mono ml-4">helium-intel-workspace.io</span>
              </div>
              
              <div className="pt-12 p-3 opacity-90 select-none pointer-events-none">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-16 rounded-xl bg-slate-950 border border-slate-800/60 p-3 flex flex-col justify-center">
                      <div className="w-16 h-2 bg-slate-800 rounded mb-2" />
                      <div className="w-8 h-4 bg-slate-700 rounded" />
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 h-44 rounded-xl bg-slate-950 border border-slate-800/60 p-3">
                    <div className="w-24 h-3 bg-slate-800 rounded mb-4" />
                    <div className="h-28 flex items-end gap-3 px-2">
                      {[30, 45, 80, 55, 90, 60, 75].map((h, i) => (
                        <div key={i} className="flex-1 bg-slate-800 rounded-t" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="h-44 rounded-xl bg-slate-950 border border-slate-800/60 p-3 flex flex-col justify-between">
                    <div className="w-20 h-3 bg-slate-800 rounded" />
                    <div className="w-20 h-20 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 mx-auto flex items-center justify-center">
                      <span className="text-[10px] text-slate-500 font-bold">85%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* DASHBOARD SAAS VIEW */}
        {currentView === 'dashboard' && (
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex overflow-hidden h-full"
          >
            {/* Sidebar navigation */}
            <Sidebar 
              companies={companies}
              filterBookmarkedOnly={filterBookmarkedOnly}
              setFilterBookmarkedOnly={setFilterBookmarkedOnly}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onResetDemo={handleResetDemo}
              onNavigateToLanding={() => setCurrentView('landing')}
            />

            {/* Dashboard Contents wrapper */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              <Navbar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                companies={companies}
                onOpenAnalysisModal={() => setIsInputModalOpen(true)}
              />

              {/* Scrollable Work area */}
              <main className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Stats widgets */}
                <DashboardOverview companies={sidebarFilteredCompanies} />

                {/* Dashboard charts row */}
                <VisualCharts companies={sidebarFilteredCompanies} />

                {/* Brands main table */}
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h2 className="text-base font-bold text-white leading-tight">
                        Opportunities Database
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Filter, rank, and book meetings with highly prioritized targets.
                      </p>
                    </div>
                  </div>
                  
                  <BrandTable 
                    companies={sidebarFilteredCompanies}
                    onSelectCompany={setSelectedCompany}
                    onUpdateCompany={handleUpdateCompany}
                    onDeleteCompany={handleDeleteCompany}
                    searchQuery={searchQuery}
                    filters={filters}
                    setFilters={setFilters}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                </div>

              </main>
            </div>

            {/* Details drawers */}
            <AnimatePresence>
              {selectedCompany && (
                <AnalysisDrawer 
                  isOpen={!!selectedCompany}
                  company={selectedCompany}
                  onClose={() => setSelectedCompany(null)}
                  onUpdateCompany={handleUpdateCompany}
                />
              )}
            </AnimatePresence>

            {/* Import Dialog Box */}
            <AnimatePresence>
              {isInputModalOpen && (
                <DomainInput 
                  isOpen={isInputModalOpen}
                  onClose={() => setIsInputModalOpen(false)}
                  onAnalyze={handleAnalyzeDomains}
                  isAnalyzing={isAnalyzing}
                  analysisProgress={analysisProgress}
                  analysisStepText={analysisStepText}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
