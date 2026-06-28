import React from 'react';
import { Search, Plus, Radio, Calendar } from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  onOpenAnalysisModal, 
  companies 
}) {
  const activeAdsCount = companies.length; // Dynamic mock or based on status
  
  // Format current date
  const formatDate = () => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-dark-900/60 backdrop-blur-md px-6 flex items-center justify-between select-none">
      {/* Breadcrumbs / Page Indicator */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
          <span>Workspace</span>
          <span className="text-slate-600">/</span>
          <span className="text-white">Growth Intel</span>
        </div>
        
        {/* Active Core Status */}
        <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Engine Online</span>
        </div>
      </div>

      {/* Center Search bar */}
      <div className="flex-1 max-w-md mx-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search brands, industries, tech stacks, conversion leaks..."
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-dark-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
          />
        </div>
      </div>

      {/* Right Side Tools */}
      <div className="flex items-center gap-4">
        {/* Calendar widget */}
        <div className="hidden lg:flex items-center gap-2 text-slate-400 text-xs border border-slate-800/80 rounded-lg px-3 py-1.5 bg-dark-900">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <span>{formatDate()}</span>
        </div>

        {/* Primary CTA */}
        <button
          onClick={onOpenAnalysisModal}
          className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs md:text-sm shadow-lg shadow-cyan-500/10 hover:shadow-cyan-400/20 active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Analyze Brands</span>
        </button>
      </div>
    </header>
  );
}
