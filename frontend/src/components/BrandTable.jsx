import React from 'react';
import { 
  Star, 
  Trash2, 
  ArrowUpDown, 
  TrendingUp, 
  TrendingDown,
  ExternalLink, 
  Download,
  AlertTriangle,
  HeartCrack,
  FileSpreadsheet
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function BrandTable({ 
  companies, 
  onSelectCompany, 
  onUpdateCompany, 
  onDeleteCompany,
  searchQuery,
  filters,
  setFilters,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder
}) {

  // Sort parameters toggle helper
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc'); // Default to high-to-low
    }
  };

  // Status badge styling generator
  const getStatusStyle = (status) => {
    switch (status) {
      case 'New': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Contacted': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Meeting Scheduled': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Won': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Lost': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  // Priority score color formatting
  const getScoreColor = (score) => {
    if (score >= 85) return 'text-rose-400 border-rose-500/20 bg-rose-500/5';
    if (score >= 70) return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
    return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
  };

  // Convert traffic range sizes to comparable numbers for sorting
  const getTrafficWeight = (trafficStr) => {
    if (!trafficStr) return 0;
    const clean = trafficStr.toUpperCase().replace(/\+/g, "");
    if (clean.includes('M')) {
      const num = parseFloat(clean.replace('M', ''));
      return num * 1000000;
    }
    if (clean.includes('K')) {
      const num = parseFloat(clean.replace('K', ''));
      return num * 1000;
    }
    return parseFloat(clean) || 0;
  };

  // 1. Text Search Filter matching Name, Industry, Categories, Tech or Leak types
  let filtered = companies.filter(company => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const brandName = (company.brandName || "").toLowerCase();
    const website = (company.website || "").toLowerCase();
    const industry = (company.industry || "").toLowerCase();
    const category = (company.category || "").toLowerCase();
    const tech = (company.techStack || []).join(" ").toLowerCase();
    const leaks = (company.conversionLeaks || []).map(l => l.leakType + " " + l.explanation).join(" ").toLowerCase();

    return brandName.includes(query) || 
           website.includes(query) || 
           industry.includes(query) || 
           category.includes(query) || 
           tech.includes(query) ||
           leaks.includes(query);
  });

  // 2. Dropdown Filters matching Industry, Size, Score, and Leak types
  if (filters.industry) {
    filtered = filtered.filter(c => c.industry === filters.industry);
  }
  if (filters.companySize) {
    filtered = filtered.filter(c => c.companySize === filters.companySize);
  }
  if (filters.priority) {
    filtered = filtered.filter(c => {
      if (filters.priority === 'HIGH') return c.priorityScore >= 85;
      if (filters.priority === 'MEDIUM') return c.priorityScore >= 70 && c.priorityScore < 85;
      if (filters.priority === 'LOW') return c.priorityScore < 70;
      return true;
    });
  }
  if (filters.opportunity) {
    filtered = filtered.filter(c => 
      c.conversionLeaks && c.conversionLeaks.some(l => l.leakType === filters.opportunity)
    );
  }

  // 3. Sorting Execution
  const sorted = [...filtered].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (sortBy === 'monthlyTraffic') {
      valA = getTrafficWeight(a.monthlyTraffic);
      valB = getTrafficWeight(b.monthlyTraffic);
    }

    if (typeof valA === 'string') {
      return sortOrder === 'desc' 
        ? valB.localeCompare(valA) 
        : valA.localeCompare(valB);
    }

    // Number sorting
    return sortOrder === 'desc' ? valB - valA : valA - valB;
  });

  // Unique list generators for filter items
  const industriesList = [...new Set(companies.map(c => c.industry).filter(Boolean))];
  const sizesList = [...new Set(companies.map(c => c.companySize).filter(Boolean))];
  const opportunitiesList = [
    "Poor Mobile UX", "Slow Website", "Weak CTA", "No Trust Badges", 
    "Checkout Friction", "No Product Reviews", "Weak Landing Pages", 
    "No Social Proof", "Navigation Issues", "Poor Product Pages"
  ];

  // CSV Export utility
  const exportToCSV = () => {
    if (sorted.length === 0) return;
    
    const headers = ["Brand", "Website", "Industry", "Category", "Priority Score", "Confidence", "Monthly Traffic", "Catalog Size", "Company Size", "Status"];
    const rows = sorted.map(c => [
      c.brandName,
      c.website,
      c.industry,
      c.category,
      c.priorityScore,
      c.confidenceScore,
      c.monthlyTraffic,
      c.catalogSize,
      c.companySize,
      c.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `helium_brand_opportunities_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-4 select-none">
      {/* Table Toolbar & Advanced Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-dark-900 border border-slate-800">
        <div className="grid grid-cols-2 md:flex flex-wrap gap-2.5 flex-1">
          {/* Industry Filter */}
          <select
            value={filters.industry}
            onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
            className="h-8 px-2.5 rounded bg-dark-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="">All Industries</option>
            {industriesList.map(ind => <option key={ind} value={ind}>{ind}</option>)}
          </select>

          {/* Sizing Filter */}
          <select
            value={filters.companySize}
            onChange={(e) => setFilters(prev => ({ ...prev, companySize: e.target.value }))}
            className="h-8 px-2.5 rounded bg-dark-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="">All Sizes</option>
            {sizesList.map(size => <option key={size} value={size}>{size} employees</option>)}
          </select>

          {/* Priority Filter */}
          <select
            value={filters.priority}
            onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
            className="h-8 px-2.5 rounded bg-dark-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="">All Priorities</option>
            <option value="HIGH">High (≥85)</option>
            <option value="MEDIUM">Medium (70-84)</option>
            <option value="LOW">Low (&lt;70)</option>
          </select>

          {/* Opportunity Type Filter */}
          <select
            value={filters.opportunity}
            onChange={(e) => setFilters(prev => ({ ...prev, opportunity: e.target.value }))}
            className="h-8 px-2.5 rounded bg-dark-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="">All Leak Types</option>
            {opportunitiesList.map(opp => <option key={opp} value={opp}>{opp}</option>)}
          </select>
        </div>

        {/* Action controls */}
        <div className="flex justify-end items-center gap-2">
          {filters.industry || filters.companySize || filters.priority || filters.opportunity ? (
            <button
              onClick={() => setFilters({ industry: '', companySize: '', priority: '', category: '', opportunity: '' })}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold px-2 py-1 rounded hover:bg-rose-500/10 transition"
            >
              Reset Filters
            </button>
          ) : null}
          
          <button
            onClick={exportToCSV}
            disabled={sorted.length === 0}
            className="flex items-center gap-1.5 h-8 px-3 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-xs font-semibold text-white transition border border-slate-700/60"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Primary Grid Layout */}
      <div className="rounded-2xl border border-slate-800 bg-dark-900 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-dark-950/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none">
                <th className="py-4 px-5 w-8"></th>
                <th className="py-4 px-4 min-w-[200px]">Brand</th>
                <th className="py-4 px-4 min-w-[130px]">Industry</th>
                <th 
                  onClick={() => handleSort('priorityScore')}
                  className="py-4 px-4 cursor-pointer hover:text-white transition min-w-[120px]"
                >
                  <div className="flex items-center gap-1">
                    <span>Priority</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('confidenceScore')}
                  className="py-4 px-4 cursor-pointer hover:text-white transition min-w-[110px]"
                >
                  <div className="flex items-center gap-1">
                    <span>Confidence</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('monthlyTraffic')}
                  className="py-4 px-4 cursor-pointer hover:text-white transition min-w-[110px]"
                >
                  <div className="flex items-center gap-1">
                    <span>Traffic</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('catalogSize')}
                  className="py-4 px-4 cursor-pointer hover:text-white transition min-w-[100px]"
                >
                  <div className="flex items-center gap-1">
                    <span>Catalog</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-4 px-4 min-w-[100px]">Size</th>
                <th className="py-4 px-4 min-w-[180px]">Primary Leak</th>
                <th className="py-4 px-4 min-w-[155px]">Status</th>
                <th className="py-4 px-5 text-right w-12"></th>
              </tr>
            </thead>
            
            {/* Table Rows Body */}
            <motion.tbody 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="divide-y divide-slate-800/60"
            >
              {sorted.length > 0 ? (
                sorted.map((company) => {
                  const primaryLeak = company.conversionLeaks?.[0];
                  
                  return (
                    <motion.tr
                      key={company.id}
                      variants={rowVariants}
                      className="hover:bg-slate-800/30 transition-colors duration-150 cursor-pointer group text-sm text-slate-300 font-medium align-middle"
                    >
                      {/* Bookmark Toggle Icon */}
                      <td className="py-3 px-5 text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onUpdateCompany(company.id, { isBookmarked: !company.isBookmarked })}
                          className="text-slate-600 hover:text-amber-400 transition"
                        >
                          <Star 
                            className={`w-4 h-4 ${company.isBookmarked ? 'text-amber-400 fill-amber-400/20' : ''}`} 
                          />
                        </button>
                      </td>

                      {/* Brand Info */}
                      <td className="py-3 px-4" onClick={() => onSelectCompany(company)}>
                        <div className="flex items-center gap-3">
                          <img
                            src={company.logo}
                            onError={(e) => { e.target.src = "https://placehold.co/40x40/0b0f19/ffffff?text=" + company.brandName.charAt(0); }}
                            alt={company.brandName}
                            className="w-8 h-8 rounded-lg bg-dark-950 border border-slate-800 p-0.5 object-contain"
                          />
                          <div>
                            <span className="text-white font-semibold group-hover:text-cyan-400 transition-colors block leading-tight">
                              {company.brandName}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono tracking-tight flex items-center gap-0.5 mt-0.5">
                              {company.website} <ExternalLink className="w-2.5 h-2.5 text-slate-600" />
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Industry & Category */}
                      <td className="py-3 px-4" onClick={() => onSelectCompany(company)}>
                        <div>
                          <span className="text-slate-200 block leading-tight">{company.industry}</span>
                          <span className="text-[10px] text-slate-500 mt-0.5 block truncate max-w-[120px]">{company.category}</span>
                        </div>
                      </td>

                      {/* Priority Score badge */}
                      <td className="py-3 px-4" onClick={() => onSelectCompany(company)}>
                        <span className={`px-2.5 py-1 rounded-lg border text-xs font-bold font-mono ${getScoreColor(company.priorityScore)}`}>
                          {company.priorityScore}%
                        </span>
                      </td>

                      {/* Confidence Score percentage */}
                      <td className="py-3 px-4" onClick={() => onSelectCompany(company)}>
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-200 font-semibold font-mono">{company.confidenceScore}%</span>
                          <span className="text-[10px] text-slate-500">Confidence</span>
                        </div>
                      </td>

                      {/* Estimated Traffic */}
                      <td className="py-3 px-4 text-slate-200 font-mono" onClick={() => onSelectCompany(company)}>
                        {company.monthlyTraffic}
                      </td>

                      {/* Catalog SKU Size */}
                      <td className="py-3 px-4 text-slate-200 font-mono" onClick={() => onSelectCompany(company)}>
                        {company.catalogSize} SKUs
                      </td>

                      {/* Company size staff */}
                      <td className="py-3 px-4 text-slate-400" onClick={() => onSelectCompany(company)}>
                        {company.companySize}
                      </td>

                      {/* Primary Conversion Leak */}
                      <td className="py-3 px-4" onClick={() => onSelectCompany(company)}>
                        {primaryLeak ? (
                          <div className="flex items-center gap-1.5">
                            {primaryLeak.severity === 'High' ? (
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                            ) : (
                              <TrendingDown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            )}
                            <div className="truncate max-w-[140px]">
                              <span className="text-slate-200 text-xs font-semibold block leading-tight truncate">{primaryLeak.leakType}</span>
                              <span className="text-[10px] text-slate-500 leading-none truncate block">{primaryLeak.explanation}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-500 text-xs">No Leaks Detected</span>
                        )}
                      </td>

                      {/* Pipeline Status drop-down selector */}
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={company.status}
                          onChange={(e) => onUpdateCompany(company.id, { status: e.target.value })}
                          className={`h-7 px-2 border rounded-lg text-xs font-bold focus:outline-none transition ${getStatusStyle(company.status)}`}
                        >
                          <option value="New" className="bg-dark-950 text-cyan-400">New</option>
                          <option value="Contacted" className="bg-dark-950 text-amber-400">Contacted</option>
                          <option value="Meeting Scheduled" className="bg-dark-950 text-indigo-400">Meeting Scheduled</option>
                          <option value="Won" className="bg-dark-950 text-emerald-400">Won</option>
                          <option value="Lost" className="bg-dark-950 text-rose-400">Lost</option>
                        </select>
                      </td>

                      {/* Delete actions */}
                      <td className="py-3 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onDeleteCompany(company.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 transition-all duration-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                /* Empty query placeholder */
                <tr>
                  <td colSpan="11" className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <HeartCrack className="w-8 h-8 text-slate-600" />
                      <span className="text-sm font-semibold">No companies match your filters or search terms.</span>
                      <span className="text-xs text-slate-600">Try adjusting your query or import a new list.</span>
                    </div>
                  </td>
                </tr>
              )}
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
