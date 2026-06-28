import React from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Star, 
  Activity, 
  Settings, 
  HelpCircle,
  BarChart2,
  FolderDot,
  CheckCircle,
  Clock,
  Play,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  companies, 
  filterBookmarkedOnly, 
  setFilterBookmarkedOnly,
  statusFilter,
  setStatusFilter,
  onResetDemo,
  onNavigateToLanding
}) {
  const totalBrands = companies.length;
  const bookmarkedBrands = companies.filter(c => c.isBookmarked).length;
  const highPriorityBrands = companies.filter(c => c.priorityScore >= 85).length;
  const avgPriorityScore = totalBrands > 0 
    ? Math.round(companies.reduce((sum, c) => sum + c.priorityScore, 0) / totalBrands) 
    : 0;

  const statusCounts = {
    New: companies.filter(c => c.status === 'New').length,
    Contacted: companies.filter(c => c.status === 'Contacted').length,
    'Meeting Scheduled': companies.filter(c => c.status === 'Meeting Scheduled').length,
    Won: companies.filter(c => c.status === 'Won').length,
    Lost: companies.filter(c => c.status === 'Lost').length
  };

  return (
    <aside className="w-64 border-r border-slate-800 bg-dark-900 flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/10">
            <span className="font-extrabold text-white text-base">H</span>
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-wide text-white leading-none">HELIUM</h1>
            <span className="text-[10px] text-cyan-400 font-semibold tracking-wider uppercase">OPPS INTEL</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
        <div>
          <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase px-2 block mb-3">Discovery</span>
          <div className="space-y-1">
            <button
              onClick={() => {
                setFilterBookmarkedOnly(false);
                setStatusFilter('ALL');
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                !filterBookmarkedOnly && statusFilter === 'ALL'
                  ? 'bg-gradient-to-r from-slate-800 to-slate-900 border-l-2 border-cyan-400 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>All Opportunities</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                {totalBrands}
              </span>
            </button>

            <button
              onClick={() => {
                setFilterBookmarkedOnly(true);
                setStatusFilter('ALL');
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                filterBookmarkedOnly
                  ? 'bg-gradient-to-r from-slate-800 to-slate-900 border-l-2 border-indigo-400 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
                <span>Bookmarked</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                {bookmarkedBrands}
              </span>
            </button>
          </div>
        </div>

        {/* Sales Pipeline Statuses */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase px-2 block mb-3">Pipeline Status</span>
          <div className="space-y-1">
            {Object.keys(statusCounts).map((status) => {
              const isActive = statusFilter === status && !filterBookmarkedOnly;
              let dotColor = 'bg-slate-400';
              if (status === 'Contacted') dotColor = 'bg-amber-400';
              if (status === 'Meeting Scheduled') dotColor = 'bg-indigo-400';
              if (status === 'Won') dotColor = 'bg-emerald-400';
              if (status === 'Lost') dotColor = 'bg-rose-400';
              if (status === 'New') dotColor = 'bg-cyan-400';

              return (
                <button
                  key={status}
                  onClick={() => {
                    setFilterBookmarkedOnly(false);
                    setStatusFilter(status);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-800/80 text-white font-medium border-l-2 border-slate-200'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                    <span>{status}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {statusCounts[status]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Workspace Quick Stats */}
        <div className="pt-4 border-t border-slate-800/60">
          <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase px-2 block mb-3">Workspace Stats</span>
          <div className="space-y-2.5 px-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">High priority:</span>
              <span className="text-rose-400 font-semibold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> {highPriorityBrands}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Avg Priority:</span>
              <span className="text-cyan-400 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> {avgPriorityScore}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Footer Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <button 
          onClick={onResetDemo}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800 transition"
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Reset Workspace</span>
        </button>
        <button 
          onClick={onNavigateToLanding}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 text-cyan-400 hover:from-cyan-500/20 hover:to-indigo-500/20 border border-cyan-500/20 transition"
        >
          <span>← Back to Landing</span>
        </button>
      </div>
    </aside>
  );
}
