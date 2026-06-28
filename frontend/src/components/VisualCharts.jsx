import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

export default function VisualCharts({ companies }) {
  if (!companies || companies.length === 0) {
    return (
      <div className="h-64 rounded-2xl glass-panel border border-slate-800 flex items-center justify-center text-slate-500">
        Analyze brands to generate interactive intelligence charts.
      </div>
    );
  }

  // 1. Priority vs Confidence comparison data
  const comparisonData = companies.map(c => ({
    name: c.brandName,
    Priority: c.priorityScore,
    Confidence: c.confidenceScore
  }));

  // 2. Industry distribution data
  const industryCounts = {};
  companies.forEach(c => {
    const ind = c.industry || "Others";
    industryCounts[ind] = (industryCounts[ind] || 0) + 1;
  });
  const industryData = Object.keys(industryCounts).map(name => ({
    name,
    value: industryCounts[name]
  }));

  const COLORS = ['#06b6d4', '#6366f1', '#a855f7', '#10b981', '#f43f5e', '#eab308'];

  // 3. Conversion Leaks frequency mapping
  const leakCounts = {};
  companies.forEach(c => {
    if (c.conversionLeaks && Array.isArray(c.conversionLeaks)) {
      c.conversionLeaks.forEach(l => {
        const type = l.leakType;
        leakCounts[type] = (leakCounts[type] || 0) + 1;
      });
    }
  });
  const leakData = Object.keys(leakCounts).map(type => ({
    type,
    Count: leakCounts[type]
  })).sort((a, b) => b.Count - a.Count);

  // Custom styling helper for Recharts tooltips
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-900 border border-slate-700/80 p-3 rounded-lg shadow-xl backdrop-blur-md">
          <p className="text-xs font-bold text-slate-200 mb-1.5">{label}</p>
          {payload.map((p, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color || p.fill }} />
              <span className="text-slate-400">{p.name}:</span>
              <span className="font-semibold text-white">{p.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-900 border border-slate-700/80 p-3 rounded-lg shadow-xl backdrop-blur-md text-xs">
          <span className="font-bold text-slate-200">{payload[0].name}:</span>
          <span className="ml-1 text-cyan-400 font-semibold">{payload[0].value} brands</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 select-none">
      
      {/* Chart 1: Priority vs Confidence Area Chart */}
      <div className="xl:col-span-2 p-5 rounded-2xl glass-panel border border-slate-800/80">
        <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
          Priority vs. Confidence Analysis
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPriority" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="Priority" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorPriority)" />
              <Area type="monotone" dataKey="Confidence" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorConfidence)" />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Industry Breakdown Pie Chart */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800/80">
        <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
          Industry Distribution
        </h3>
        <div className="h-64 flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={industryData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {industryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                iconSize={8}
                iconType="circle"
                wrapperStyle={{ fontSize: '10px', color: '#94a3b8', bottom: 0 }} 
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Inner stats overlay */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-white">{companies.length}</span>
            <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Companies</span>
          </div>
        </div>
      </div>

      {/* Chart 3: CRO Leaks Detected Bar Chart */}
      <div className="xl:col-span-3 p-5 rounded-2xl glass-panel border border-slate-800/80">
        <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
          Detected Conversion Leaks Frequency
        </h3>
        <div className="h-60">
          {leakData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leakData} layout="horizontal" margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="type" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-dark-900 border border-slate-700/80 p-2.5 rounded-lg shadow-md text-xs">
                          <p className="font-bold text-slate-200">{payload[0].payload.type}</p>
                          <p className="text-purple-400 mt-1">{payload[0].value} occurrences</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="Count" fill="#a855f7" radius={[4, 4, 0, 0]}>
                  {leakData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-slate-500">
              No conversion leaks detected yet. Try analyzing a custom domain.
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
