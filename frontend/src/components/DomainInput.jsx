import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Play, 
  AlertCircle, 
  Sparkles,
  Clipboard,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DomainInput({ 
  isOpen, 
  onClose, 
  onAnalyze,
  isAnalyzing,
  analysisProgress,
  analysisStepText
}) {
  const [inputText, setInputText] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Pre-fill shortcut handler
  const handleShortcutClick = (domain) => {
    setInputText((prev) => {
      const current = prev.trim();
      if (!current) return domain;
      if (current.includes(domain)) return prev;
      return `${current}\n${domain}`;
    });
  };

  // CSV/Text File parsing helper
  const processCSVContent = (content) => {
    // Regex to extract domains
    const domainRegex = /([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/g;
    const matches = content.match(domainRegex) || [];
    const uniqueDomains = [...new Set(matches.map(d => d.toLowerCase().trim()))];
    
    if (uniqueDomains.length > 0) {
      setInputText(uniqueDomains.join('\n'));
      setSuccessMsg(`Successfully imported ${uniqueDomains.length} domains from file!`);
      setError("");
      setTimeout(() => setSuccessMsg(""), 4000);
    } else {
      setError("No valid domains could be extracted from this file.");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      processCSVContent(event.target.result);
    };
    reader.readAsText(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        processCSVContent(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Trigger analyzer
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Split text by comma, spaces, or newlines
    const domains = inputText
      .split(/[\s,\n]+/)
      .map(d => d.trim().toLowerCase())
      .filter(d => d.length > 0 && d.includes('.'));

    if (domains.length === 0) {
      setError("Please enter at least one valid D2C brand domain (e.g., brand.com).");
      return;
    }

    onAnalyze(domains);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-dark-900 overflow-hidden shadow-2xl"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Import & Analyze D2C Brands</h2>
          </div>
          {!isAnalyzing && (
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <AnimatePresence mode="wait">
            {!isAnalyzing ? (
              <motion.form 
                key="input-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Domain Text area */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Paste Company Domains
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter domains separated by lines, commas, or spaces (e.g.&#10;boat-lifestyle.com&#10;mamaearth.in&#10;snitch.co.in)"
                    rows={5}
                    className="w-full p-4 rounded-xl bg-dark-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 resize-none font-mono transition-all"
                  />
                </div>

                {/* Drag and Drop Zone */}
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                    dragActive 
                      ? 'border-cyan-400 bg-cyan-500/5' 
                      : 'border-slate-800 bg-dark-950/40 hover:bg-dark-950/80 hover:border-slate-700'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2.5" />
                  <span className="text-sm font-medium text-slate-300 block">
                    Drag and drop your CSV or TXT domain list here
                  </span>
                  <span className="text-xs text-slate-500 mt-1 block">
                    Supports raw domains, URLs, or full lists
                  </span>
                </div>

                {/* Sample Shortcuts */}
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Quick Sandbox Examples
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["boat-lifestyle.com", "mamaearth.in", "snitch.co.in", "bewakoof.com"].map((domain) => (
                      <button
                        type="button"
                        key={domain}
                        onClick={() => handleShortcutClick(domain)}
                        className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-dark-950 text-slate-400 hover:text-white transition"
                      >
                        + {domain}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notifications Panel */}
                {error && (
                  <div className="flex items-center gap-2 p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
                {successMsg && (
                  <div className="flex items-center gap-2 p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                    <CheckCircle className="w-4 h-4" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-semibold transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/10 transition-all"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start AI Audit</span>
                  </button>
                </div>
              </motion.form>
            ) : (
              // AI Active Progress Logging View
              <motion.div 
                key="loading-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 space-y-6"
              >
                {/* Large animated pulse logo */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-xl shadow-cyan-500/5">
                      <Sparkles className="w-8 h-8 animate-spin-slow" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-indigo-500 border-2 border-dark-900 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider">AI AUDIT STATUS</span>
                    <span className="text-cyan-400 font-bold">{analysisProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-dark-950 overflow-hidden border border-slate-800">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                      animate={{ width: `${analysisProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Terminal screen mock logic logs */}
                <div className="max-w-lg mx-auto bg-dark-950 border border-slate-800 rounded-xl p-4 font-mono text-[11px] text-slate-400 space-y-2 select-text h-40 overflow-y-auto">
                  <p className="text-cyan-400"># Initializing intelligence engines...</p>
                  {analysisProgress >= 15 && <p className="text-slate-500">&gt; Looking up DNS tags & hosting config</p>}
                  {analysisProgress >= 30 && <p className="text-indigo-400">&gt; Found CMS / Shopify checkout anchors</p>}
                  {analysisProgress >= 45 && <p className="text-slate-400">&gt; Auditing mobile touch targets & CSS script latencies</p>}
                  {analysisProgress >= 65 && <p className="text-amber-400">&gt; Warning: Detected checkout page multi-step barriers</p>}
                  {analysisProgress >= 80 && <p className="text-emerald-400">&gt; Generating Helium sales hook & personalized email copy</p>}
                  {analysisProgress >= 95 && <p className="text-cyan-400 animate-pulse">&gt; Finalizing priority scoring models...</p>}
                  
                  {/* Current Active Step Text */}
                  <div className="pt-2 border-t border-slate-800/60 text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>{analysisStepText}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
