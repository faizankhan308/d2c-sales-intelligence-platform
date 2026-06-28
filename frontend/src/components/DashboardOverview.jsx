import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Percent, 
  TrendingUp, 
  Flame, 
  ShieldAlert,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';

export default function DashboardOverview({ companies }) {
  const totalBrands = companies.length;
  
  // Calculate average priority score
  const avgPriorityScore = totalBrands > 0 
    ? Math.round(companies.reduce((sum, c) => sum + c.priorityScore, 0) / totalBrands) 
    : 0;

  // Calculate average confidence score
  const avgConfidenceScore = totalBrands > 0 
    ? Math.round(companies.reduce((sum, c) => sum + c.confidenceScore, 0) / totalBrands) 
    : 0;

  // Count high priority brands (priority score >= 85)
  const highPriorityCount = companies.filter(c => c.priorityScore >= 85).length;

  // Sum total conversion leaks across all brands
  const totalLeaks = companies.reduce((sum, c) => sum + (c.conversionLeaks ? c.conversionLeaks.length : 0), 0);

  const cardData = [
    {
      title: "Total Brands Audited",
      value: totalBrands,
      change: `+${totalBrands} analyzed`,
      isPositive: true,
      icon: Building2,
      glow: "rgba(6, 182, 212, 0.15)", // Cyan
      iconColor: "text-cyan-400"
    },
    {
      title: "Average Priority Score",
      value: `${avgPriorityScore}%`,
      change: "Targeting > 80% score",
      isPositive: avgPriorityScore > 80,
      icon: TrendingUp,
      glow: "rgba(99, 102, 241, 0.15)", // Indigo
      iconColor: "text-indigo-400"
    },
    {
      title: "High Opportunity Brands",
      value: highPriorityCount,
      change: `${Math.round((highPriorityCount / (totalBrands || 1)) * 100)}% of catalog`,
      isPositive: true,
      icon: Flame,
      glow: "rgba(244, 63, 94, 0.15)", // Rose
      iconColor: "text-rose-400"
    },
    {
      title: "Total CRO Leaks Detected",
      value: totalLeaks,
      change: totalBrands > 0 ? `${(totalLeaks / totalBrands).toFixed(1)} leaks avg/brand` : 'No data',
      isPositive: false,
      icon: ShieldAlert,
      glow: "rgba(168, 85, 247, 0.15)", // Purple
      iconColor: "text-purple-400"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
    >
      {cardData.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={idx}
            variants={itemVariants}
            style={{ boxShadow: `inset 0 0 20px 0 ${card.glow}` }}
            className="p-5 rounded-2xl glass-panel border border-slate-800/80 flex flex-col justify-between hover:border-slate-700/80 transition-all duration-300 group cursor-default"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                {card.title}
              </span>
              <div className={`p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 ${card.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-3xl font-extrabold text-white tracking-tight">
                {card.value}
              </h3>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className={`text-xs font-semibold ${card.isPositive ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {card.change}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
