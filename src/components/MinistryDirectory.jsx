import React, { useState, useMemo, useEffect } from 'react';
import { MINISTRIES_DATA, PROJECTS_MASTER } from '../data/projectsData';
import { useProjectData } from '../context/DataContext';
import { 
  Building2, 
  Search, 
  Layers, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  IndianRupee, 
  Filter,
  Truck, 
  Train, 
  Zap, 
  Sun, 
  Anchor, 
  Plane, 
  Droplets,
  RotateCcw,
  Grid
} from 'lucide-react';

const ICON_MAP = {
  Truck: Truck,
  Train: Train,
  Zap: Zap,
  Sun: Sun,
  Anchor: Anchor,
  Building2: Building2,
  Plane: Plane,
  Droplets: Droplets
};

const SECTOR_META = {
  'Power & Transmission': {
    code: 'POWER',
    icon: Zap,
    description: 'Grid connectivity, thermal/hydro complexes, sub-stations, and high-voltage transmission lines.'
  },
  'Industrial Infrastructure': {
    code: 'INDUS',
    icon: Building2,
    description: 'Special Economic Zones, industrial corridors, manufacturing parks, and logistics nodes.'
  },
  'Railways & DFC': {
    code: 'RAIL',
    icon: Train,
    description: 'Dedicated freight corridors, high-speed rail lines, gauge conversion, and terminal stations.'
  },
  'Coal & Mining': {
    code: 'COAL',
    icon: Layers,
    description: 'Open-cast & underground mining expansions, coal washeries, and mineral evacuation lines.'
  },
  'Civil Aviation': {
    code: 'AIR',
    icon: Plane,
    description: 'Greenfield international airports, terminal expansions, ATC radar modernization, and runways.'
  },
  'Ports & Shipping': {
    code: 'PORTS',
    icon: Anchor,
    description: 'Deep-water container berths, port-rail-road multi-modal linkages, and Sagarmala waterways.'
  },
  'Petroleum & Natural Gas': {
    code: 'ENERGY',
    icon: Droplets,
    description: 'Cross-country hydrocarbon pipelines, LNG terminals, strategic storage, and refinery upgrades.'
  },
  'Road Transport & Highways': {
    code: 'HWY',
    icon: Truck,
    description: 'Access-controlled expressways, national highway corridors, bypasses, and ring roads.'
  }
};

export default function MinistryDirectory({ onSelectMinistry, onSelectSector }) {
  const [directoryMode, setDirectoryMode] = useState('ministry'); // 'ministry' | 'sector'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'HighRisk' | 'Delayed'

  // Always start MinistryDirectory from the very top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [directoryMode]);

  const { ministriesData: dbMinistries, projects: dbProjects } = useProjectData();
  const projectsPool = dbProjects && dbProjects.length > 0 ? dbProjects : PROJECTS_MASTER;

  // 1. Dynamic Ministries List
  const ministryList = useMemo(() => {
    if (dbMinistries && dbMinistries.length > 0) {
      return dbMinistries.map(min => ({
        ...min,
        onTime: Math.max(0, (min.totalProjects || 0) - (min.delayed || 0))
      }));
    }

    return MINISTRIES_DATA.map(min => {
      const matchingProjects = projectsPool.filter(p => 
        p.ministry === min.name || (p.ministry && p.ministry.toLowerCase().includes(min.code.toLowerCase()))
      );

      const realCount = matchingProjects.length;
      let realCost = 0;
      let delayedCount = 0;
      let onTimeCount = 0;
      let highRiskCount = 0;

      matchingProjects.forEach(p => {
        realCost += (p.currentCost || p.approvedCost || 0);
        if (p.status === 'Delayed' || (p.timeDelayMonths || 0) > 0) {
          delayedCount++;
        } else {
          onTimeCount++;
        }
        if (p.riskLevel === 'High' || p.riskLevel === 'Critical' || (p.riskScore || 0) >= 60) {
          highRiskCount++;
        }
      });

      const totalProjects = Math.max(min.totalProjects, realCount);
      const totalCostCr = Math.max(min.totalCostCr, realCost);
      const delayed = Math.max(min.delayed, delayedCount);
      const onTime = totalProjects - delayed;
      const highRisk = Math.max(min.highRisk, highRiskCount);

      return {
        ...min,
        totalProjects,
        totalCostCr,
        onTime,
        delayed,
        highRisk,
        matchingProjectsCount: matchingProjects.length
      };
    });
  }, [dbMinistries, projectsPool]);

  // 2. Dynamic Sectors List
  const sectorList = useMemo(() => {
    const map = {};
    projectsPool.forEach(p => {
      const sec = p.sector?.trim() || 'Other Infrastructure';
      if (!map[sec]) {
        const meta = SECTOR_META[sec] || {
          code: sec.slice(0, 4).toUpperCase(),
          icon: Layers,
          description: 'Centrally monitored capital infrastructure investments.'
        };
        map[sec] = {
          id: sec.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name: sec,
          code: meta.code,
          description: meta.description,
          icon: meta.icon,
          totalProjects: 0,
          totalCostCr: 0,
          ongoing: 0,
          completed: 0,
          delayed: 0,
          highRisk: 0
        };
      }
      map[sec].totalProjects++;
      map[sec].totalCostCr += (p.currentCost || p.approvedCost || 0);
      if (p.status === 'Completed') map[sec].completed++;
      else map[sec].ongoing++;
      if (p.status === 'Delayed' || (p.timeDelayMonths || 0) > 0) map[sec].delayed++;
      if (p.riskLevel === 'High' || p.riskLevel === 'Critical' || (p.riskScore || 0) >= 60) map[sec].highRisk++;
    });

    return Object.values(map).map(s => ({
      ...s,
      onTime: Math.max(0, s.totalProjects - s.delayed)
    })).sort((a, b) => b.totalCostCr - a.totalCostCr);
  }, [projectsPool]);

  // Filtered ministries based on search query and status
  const filteredMinistries = useMemo(() => {
    return ministryList.filter(min => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = min.name.toLowerCase().includes(q);
        const matchesCode = min.code.toLowerCase().includes(q);
        const matchesDesc = (min.description || '').toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesDesc) return false;
      }

      if (statusFilter === 'HighRisk' && min.highRisk === 0) return false;
      if (statusFilter === 'Delayed' && min.delayed === 0) return false;

      return true;
    });
  }, [ministryList, searchQuery, statusFilter]);

  // Filtered sectors based on search query and status
  const filteredSectors = useMemo(() => {
    return sectorList.filter(sec => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = sec.name.toLowerCase().includes(q);
        const matchesCode = sec.code.toLowerCase().includes(q);
        const matchesDesc = (sec.description || '').toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesDesc) return false;
      }

      if (statusFilter === 'HighRisk' && sec.highRisk === 0) return false;
      if (statusFilter === 'Delayed' && sec.delayed === 0) return false;

      return true;
    });
  }, [sectorList, searchQuery, statusFilter]);

  // Overall totals across ministries / sectors
  const portfolioSummary = useMemo(() => {
    const activeList = directoryMode === 'ministry' ? ministryList : sectorList;
    let totalProjects = 0;
    let totalCost = 0;
    let totalOnTime = 0;
    let totalDelayed = 0;

    activeList.forEach(item => {
      totalProjects += item.totalProjects;
      totalCost += item.totalCostCr;
      totalOnTime += item.onTime;
      totalDelayed += item.delayed;
    });

    return { totalProjects, totalCost, totalOnTime, totalDelayed };
  }, [directoryMode, ministryList, sectorList]);

  return (
    <div className="py-8 bg-[#fafafa] min-h-screen text-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Bar */}
        <div className="rounded-[12px] bg-white p-6 border border-[#ebebeb] shadow-whisper space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#ebebeb] pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {directoryMode === 'ministry' ? (
                  <Building2 className="w-4 h-4 text-[#0070f3]" />
                ) : (
                  <Layers className="w-4 h-4 text-[#0070f3]" />
                )}
                <span className="mono-eyebrow text-[10px] text-[#8f8f8f]">
                  NATIONAL PORTFOLIO SURVEILLANCE
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] tracking-[-1px]">
                {directoryMode === 'ministry' ? 'Union Ministries Directory' : 'National Infrastructure Sectors Directory'}
              </h1>
              <p className="text-xs text-[#4d4d4d] mt-1 font-normal">
                {directoryMode === 'ministry' 
                  ? 'Explore project execution, milestone health, on-time status, and delay risks across Central Ministries. Click any ministry to inspect all linked projects.'
                  : 'Explore capital outlay, milestone velocity, and delay exposure across India\'s core infrastructure sectors. Click any sector to view linked projects.'}
              </p>
            </div>

            {/* Overall Portfolio Stat Chips & Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {/* [ MINISTRY-WISE ] [ SECTOR-WISE ] TOGGLE BUTTON */}
              <div className="flex p-0.5 rounded-[6px] bg-[#f2f2f2] border border-[#ebebeb]">
                <button
                  onClick={() => {
                    setDirectoryMode('ministry');
                    setSearchQuery('');
                  }}
                  className={`px-3 py-1.5 rounded-[4px] text-xs font-mono font-medium transition-all ${
                    directoryMode === 'ministry' 
                      ? 'bg-[#171717] text-white shadow-xs' 
                      : 'text-[#4d4d4d] hover:text-[#171717]'
                  }`}
                >
                  MINISTRIES
                </button>
                <button
                  onClick={() => {
                    setDirectoryMode('sector');
                    setSearchQuery('');
                  }}
                  className={`px-3 py-1.5 rounded-[4px] text-xs font-mono font-medium transition-all ${
                    directoryMode === 'sector' 
                      ? 'bg-[#171717] text-white shadow-xs' 
                      : 'text-[#4d4d4d] hover:text-[#171717]'
                  }`}
                >
                  SECTORS
                </button>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <div className="px-3 py-1.5 rounded-[6px] bg-[#fafafa] border border-[#ebebeb]">
                  <span className="text-[#8f8f8f] text-[10px] block">TOTAL {directoryMode === 'ministry' ? 'MINISTRIES' : 'SECTORS'}</span>
                  <strong className="text-[#171717] text-sm">
                    {directoryMode === 'ministry' ? ministryList.length : sectorList.length}
                  </strong>
                </div>
                <div className="px-3 py-1.5 rounded-[6px] bg-[#fafafa] border border-[#ebebeb]">
                  <span className="text-[#8f8f8f] text-[10px] block">TOTAL INVESTMENT</span>
                  <strong className="text-[#0070f3] text-sm">₹{(portfolioSummary.totalCost / 1000).toFixed(1)}k Cr</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder={directoryMode === 'ministry' 
                  ? "Search by Ministry Name or Code (e.g. Railways, MoRTH, Power)..." 
                  : "Search by Sector Name or Code (e.g. Power, Railways, Mining)..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-xs text-[#171717] placeholder-[#8f8f8f] rounded-[6px] pl-8 pr-3 py-2.5 border border-[#ebebeb] focus:outline-none focus:border-[#171717] shadow-whisper"
              />
              <Search className="w-3.5 h-3.5 text-[#8f8f8f] absolute left-2.5 top-3" />
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              {[
                { id: 'All', label: directoryMode === 'ministry' ? 'All Ministries' : 'All Sectors' },
                { id: 'Delayed', label: 'With Delays' },
                { id: 'HighRisk', label: 'High Risk' }
              ].map(st => (
                <button
                  key={st.id}
                  onClick={() => setStatusFilter(st.id)}
                  className={`px-3 py-1.5 rounded-[6px] text-xs font-medium transition-all ${
                    statusFilter === st.id
                      ? 'bg-[#171717] text-white shadow-xs'
                      : 'bg-white text-[#4d4d4d] hover:text-[#171717] hover:bg-[#fafafa] border border-[#ebebeb]'
                  }`}
                >
                  {st.label}
                </button>
              ))}

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 rounded-[6px] text-[#8f8f8f] hover:text-[#171717] border border-[#ebebeb]"
                  title="Clear Search"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 1. Ministries Grid */}
        {directoryMode === 'ministry' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMinistries.map((min) => {
              const IconComponent = ICON_MAP[min.icon] || Building2;

              return (
                <div
                  key={min.id}
                  onClick={() => onSelectMinistry && onSelectMinistry(min.name)}
                  className="bg-white rounded-[12px] border border-[#ebebeb] p-6 shadow-whisper hover:border-[#171717] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-3">
                    {/* Top Bar with Icon, Code, and Total Amount */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] flex items-center justify-center text-[#171717] group-hover:scale-105 transition-transform">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-mono text-xs font-bold text-[#171717] px-2.5 py-0.5 rounded-[4px] bg-[#f2f2f2] border border-[#ebebeb]">
                            {min.code}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">INVESTMENT</p>
                        <p className="text-sm font-semibold font-mono text-[#0070f3]">
                          ₹{(min.totalCostCr / 1000).toFixed(1)}k Cr
                        </p>
                      </div>
                    </div>

                    {/* Ministry Title & Mandate */}
                    <div>
                      <h3 className="text-base font-semibold text-[#171717] group-hover:text-[#0070f3] transition-colors line-clamp-1 tracking-tight">
                        {min.name}
                      </h3>
                      <p className="text-xs text-[#4d4d4d] line-clamp-2 mt-1 leading-relaxed font-normal">
                        {min.description}
                      </p>
                    </div>

                    {/* Core Metrics: Total, On-Time, Delayed */}
                    <div className="grid grid-cols-3 gap-2 p-2.5 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] text-center font-mono">
                      <div>
                        <span className="mono-eyebrow text-[8px] text-[#8f8f8f] block">PROJECTS</span>
                        <strong className="text-[#171717] text-sm">{min.totalProjects}</strong>
                      </div>
                      <div>
                        <span className="mono-eyebrow text-[8px] text-emerald-700 block">ON-TIME</span>
                        <strong className="text-emerald-700 text-sm">{min.onTime}</strong>
                      </div>
                      <div>
                        <span className="mono-eyebrow text-[8px] text-amber-700 block">DELAYED</span>
                        <strong className="text-amber-700 text-sm">{min.delayed}</strong>
                      </div>
                    </div>

                    {/* High Risk Notice if present */}
                    {min.highRisk > 0 && (
                      <div className="flex items-center justify-between px-2.5 py-1 rounded-[4px] bg-[#fff0f0] border border-[#ffd5d5] text-[10px] text-rose-700 font-mono">
                        <span className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          High-Risk Projects:
                        </span>
                        <strong>{min.highRisk} Critical</strong>
                      </div>
                    )}
                  </div>

                  {/* View Projects Link Button */}
                  <div className="pt-2 border-t border-[#ebebeb] flex items-center justify-between text-xs text-[#4d4d4d] group-hover:text-[#171717]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Layers className="w-3.5 h-3.5 text-[#0070f3]" />
                      <span>View All {min.totalProjects} Projects</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8f8f8f] group-hover:translate-x-1 group-hover:text-[#0070f3] transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. Sectors Grid */}
        {directoryMode === 'sector' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSectors.map((sec) => {
              const IconComponent = sec.icon || Layers;

              return (
                <div
                  key={sec.id}
                  onClick={() => onSelectSector ? onSelectSector(sec.name) : (onSelectMinistry && onSelectMinistry(sec.name))}
                  className="bg-white rounded-[12px] border border-[#ebebeb] p-6 shadow-whisper hover:border-[#171717] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-3">
                    {/* Top Bar with Icon, Code, and Total Amount */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] flex items-center justify-center text-[#171717] group-hover:scale-105 transition-transform">
                          <IconComponent className="w-5 h-5 text-[#0070f3]" />
                        </div>
                        <div>
                          <span className="font-mono text-xs font-bold text-[#171717] px-2.5 py-0.5 rounded-[4px] bg-[#f2f2f2] border border-[#ebebeb]">
                            {sec.code}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">OUTLAY</p>
                        <p className="text-sm font-semibold font-mono text-[#0070f3]">
                          ₹{(sec.totalCostCr / 1000).toFixed(1)}k Cr
                        </p>
                      </div>
                    </div>

                    {/* Sector Title & Mandate */}
                    <div>
                      <h3 className="text-base font-semibold text-[#171717] group-hover:text-[#0070f3] transition-colors line-clamp-1 tracking-tight">
                        {sec.name}
                      </h3>
                      <p className="text-xs text-[#4d4d4d] line-clamp-2 mt-1 leading-relaxed font-normal">
                        {sec.description}
                      </p>
                    </div>

                    {/* Core Metrics: Total, On-Time, Delayed */}
                    <div className="grid grid-cols-3 gap-2 p-2.5 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] text-center font-mono">
                      <div>
                        <span className="mono-eyebrow text-[8px] text-[#8f8f8f] block">PROJECTS</span>
                        <strong className="text-[#171717] text-sm">{sec.totalProjects}</strong>
                      </div>
                      <div>
                        <span className="mono-eyebrow text-[8px] text-emerald-700 block">ON-TIME</span>
                        <strong className="text-emerald-700 text-sm">{sec.onTime}</strong>
                      </div>
                      <div>
                        <span className="mono-eyebrow text-[8px] text-amber-700 block">DELAYED</span>
                        <strong className="text-amber-700 text-sm">{sec.delayed}</strong>
                      </div>
                    </div>

                    {/* High Risk Notice if present */}
                    {sec.highRisk > 0 && (
                      <div className="flex items-center justify-between px-2.5 py-1 rounded-[4px] bg-[#fff0f0] border border-[#ffd5d5] text-[10px] text-rose-700 font-mono">
                        <span className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          High-Risk Projects:
                        </span>
                        <strong>{sec.highRisk} Critical</strong>
                      </div>
                    )}
                  </div>

                  {/* View Projects Link Button */}
                  <div className="pt-2 border-t border-[#ebebeb] flex items-center justify-between text-xs text-[#4d4d4d] group-hover:text-[#171717]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Layers className="w-3.5 h-3.5 text-[#0070f3]" />
                      <span>View All {sec.totalProjects} Projects</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8f8f8f] group-hover:translate-x-1 group-hover:text-[#0070f3] transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {((directoryMode === 'ministry' && filteredMinistries.length === 0) ||
          (directoryMode === 'sector' && filteredSectors.length === 0)) && (
          <div className="p-12 text-center rounded-[12px] bg-white border border-[#ebebeb] space-y-3 shadow-whisper">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
            <h3 className="text-base font-semibold text-[#171717]">No {directoryMode === 'ministry' ? 'Ministries' : 'Sectors'} Match "{searchQuery}"</h3>
            <p className="text-xs text-[#4d4d4d] max-w-md mx-auto">
              Please try searching with another keyword or reset the filter.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setStatusFilter('All'); }}
              className="btn-app-sm bg-[#171717] text-white text-xs mt-2"
            >
              Reset Filter
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
