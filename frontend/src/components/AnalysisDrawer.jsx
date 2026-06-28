import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Star, 
  ExternalLink, 
  AlertTriangle, 
  Check, 
  Copy, 
  Plus, 
  Trash2,
  Calendar,
  MessageSquare,
  Sparkles,
  Cpu,
  Bookmark,
  ChevronRight,
  TrendingDown
} from 'lucide-react';

export default function AnalysisDrawer({ 
  company, 
  isOpen, 
  onClose, 
  onUpdateCompany 
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [newNote, setNewNote] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen || !company) return null;

  // Toggle bookmark inline
  const handleBookmarkToggle = () => {
    onUpdateCompany(company.id, { isBookmarked: !company.isBookmarked });
  };

  // Add notes list
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const updatedNotes = [...(company.notes || []), newNote.trim()];
    onUpdateCompany(company.id, { notes: updatedNotes });
    setNewNote("");
  };

  // Delete note item
  const handleDeleteNote = (idx) => {
    const updatedNotes = (company.notes || []).filter((_, i) => i !== idx);
    onUpdateCompany(company.id, { notes: updatedNotes });
  };

  // Copy cold email outreach copy
  const handleCopyEmail = () => {
    const email = company.outreachEmail;
    if (!email) return;

    const fullText = `Subject: ${email.subject}\n\n${email.greeting}\n\n${email.opening}\n\n${email.valueProp}\n\n${email.cta}`;
    navigator.clipboard.writeText(fullText);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Format rating indicators
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'Medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 z-40 bg-dark-950/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer Container Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-dark-900 border-l border-slate-800 flex flex-col shadow-2xl h-full select-none"
      >
        {/* Drawer Header section */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between shrink-0 bg-dark-950/40">
          <div className="flex items-center gap-4">
            <img
              src={company.logo}
              onError={(e) => { e.target.src = "https://placehold.co/50x50/0b0f19/ffffff?text=" + company.brandName.charAt(0); }}
              alt={company.brandName}
              className="w-12 h-12 rounded-xl bg-dark-950 border border-slate-800 p-1 object-contain"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white leading-tight">
                  {company.brandName}
                </h2>
                <button
                  onClick={handleBookmarkToggle}
                  className="p-1 rounded-lg hover:bg-slate-800/80 text-slate-500 hover:text-amber-400 transition"
                >
                  <Star 
                    className={`w-5 h-5 ${company.isBookmarked ? 'text-amber-400 fill-amber-400/20' : ''}`} 
                  />
                </button>
              </div>
              <a 
                href={`https://${company.website}`} 
                target="_blank" 
                rel="noreferrer" 
                className="text-xs text-cyan-400 font-mono tracking-tight hover:underline flex items-center gap-1 mt-0.5"
              >
                <span>{company.website}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-3">
            <select
              value={company.status}
              onChange={(e) => onUpdateCompany(company.id, { status: e.target.value })}
              className="h-8 px-2.5 rounded-lg border border-slate-800 bg-dark-950 text-xs font-bold text-slate-300 focus:outline-none"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Meeting Scheduled">Meeting Scheduled</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
            
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* AI SUMMARY BOX AT TOP */}
          <div className="p-4 rounded-xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 flex gap-3 relative overflow-hidden">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 h-9 shrink-0 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                AI Executive Summary
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {company.businessSummary} Its highest CRO leverage point is addressing <strong className="text-white">{company.conversionLeaks?.[0]?.leakType || 'Checkout hurdles'}</strong>. Helium prioritization score is <strong className="text-white">{company.priorityScore}%</strong> based on {company.monthlyTraffic} traffic volume and estimated catalog layout complexity.
              </p>
            </div>
            <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-transparent blur-xl pointer-events-none" />
          </div>

          {/* Drawer tabbed selectors */}
          <div className="flex border-b border-slate-800">
            {["overview", "leaks", "sales", "notes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 -mb-[2px] transition ${
                  activeTab === tab
                    ? 'border-cyan-400 text-white'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content displays */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Meta stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3 bg-dark-950 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Industry</span>
                  <span className="text-sm font-semibold text-slate-200 mt-1 block">{company.industry}</span>
                </div>
                <div className="p-3 bg-dark-950 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Category</span>
                  <span className="text-sm font-semibold text-slate-200 mt-1 block truncate">{company.category}</span>
                </div>
                <div className="p-3 bg-dark-950 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Country</span>
                  <span className="text-sm font-semibold text-slate-200 mt-1 block">{company.country}</span>
                </div>
                <div className="p-3 bg-dark-950 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Monthly Traffic</span>
                  <span className="text-sm font-semibold text-slate-200 mt-1 block">{company.monthlyTraffic} sessions</span>
                </div>
                <div className="p-3 bg-dark-950 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Annual Revenue</span>
                  <span className="text-sm font-semibold text-slate-200 mt-1 block">{company.revenueRange}</span>
                </div>
                <div className="p-3 bg-dark-950 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Catalog SKU Size</span>
                  <span className="text-sm font-semibold text-slate-200 mt-1 block">{company.catalogSize} Products</span>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Detected Tech Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {company.techStack?.map((tech, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded bg-slate-800 border border-slate-700/60 text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Brand Strengths</span>
                  <ul className="space-y-1.5">
                    {company.strengths?.map((str, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5 leading-relaxed">
                        <span className="text-emerald-400 font-bold mt-0.5">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">CRO Bottlenecks</span>
                  <ul className="space-y-1.5">
                    {company.weaknesses?.map((weak, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5 leading-relaxed">
                        <span className="text-amber-400 font-bold mt-0.5">•</span>
                        <span>{weak}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Confidence Meter */}
              <div className="p-4 bg-dark-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-400">AI Prediction Confidence</span>
                  <span className="text-cyan-400 font-bold">{company.confidenceScore}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${company.confidenceScore}%` }} />
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  Reasoning: {company.confidenceReason}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'leaks' && (
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Detected Conversion Obstacles
              </span>
              <div className="space-y-3">
                {company.conversionLeaks?.map((leak, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-800/80 bg-dark-950 flex flex-col md:flex-row gap-4">
                    <div className="shrink-0 flex items-start">
                      <span className={`px-2 py-1 border text-[10px] uppercase font-bold rounded-lg ${getSeverityColor(leak.severity)}`}>
                        {leak.severity} Severity
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        {leak.leakType}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong>Diagnosis:</strong> {leak.explanation}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono italic">
                        <strong>Evidence:</strong> {leak.evidence}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sales' && (
            <div className="space-y-6">
              
              {/* Opportunities overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-dark-950">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Why Helium?</span>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {company.whyHelium}
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-dark-950">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Why Now?</span>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {company.whyNow}
                  </p>
                </div>
              </div>

              {/* Pitch Angle & Proof point */}
              <div className="p-4 rounded-xl border border-slate-800 bg-dark-950 space-y-3">
                <div>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">Core Pitch Angle</span>
                  <span className="text-sm font-semibold text-white mt-1 block">{company.salesAngle}</span>
                </div>
                <hr className="border-slate-800/80" />
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Supporting Proof Point</span>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{company.proofPoint}</p>
                </div>
              </div>

              {/* Dynamic email builder */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Personalized Outreach Email
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold px-2 py-1 rounded hover:bg-cyan-500/10 transition"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? "Copied" : "Copy Email"}</span>
                  </button>
                </div>
                
                {company.outreachEmail ? (
                  <div className="p-5 rounded-xl border border-slate-800 bg-dark-950 font-mono text-[11px] leading-relaxed text-slate-300 select-text overflow-x-auto whitespace-pre-wrap">
                    <span className="text-indigo-400 font-bold">Subject:</span> {company.outreachEmail.subject}
                    {"\n\n"}
                    {company.outreachEmail.greeting}
                    {"\n\n"}
                    {company.outreachEmail.opening}
                    {"\n\n"}
                    {company.outreachEmail.valueProp}
                    {"\n\n"}
                    {company.outreachEmail.cta}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500 border border-slate-800 rounded-xl bg-dark-950/40">
                    Email copy compilation unavailable.
                  </div>
                )}
              </div>
              
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-5">
              
              {/* New note input form */}
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Type an internal sales note (e.g. Call logs, meeting results)..."
                  className="flex-1 h-9 px-3 rounded-lg bg-dark-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  className="px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center justify-center transition"
                >
                  <Plus className="w-4 h-4 mr-0.5" /> Note
                </button>
              </form>

              {/* Note History log */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Log Comments History ({company.notes?.length || 0})
                </span>
                
                {(company.notes || []).length > 0 ? (
                  <div className="space-y-2">
                    {(company.notes || []).map((note, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-slate-800/80 bg-dark-950 flex items-start justify-between gap-3 group">
                        <div className="flex gap-2 text-xs">
                          <MessageSquare className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <p className="text-slate-300 leading-normal select-text">{note}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteNote(idx)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-rose-500/10 text-slate-600 hover:text-rose-400 transition"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-600 border border-slate-800/60 rounded-xl bg-dark-950/20 border-dashed">
                    No notes recorded yet. Log your first outreach progress details above.
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </motion.div>
    </>
  );
}
