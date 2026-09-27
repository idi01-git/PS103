import React, { useState, useMemo } from 'react';
import { MINISTRIES_DATA, PROJECTS_MASTER } from '../data/projectsData';
import { useProjectData } from '../context/DataContext';
import { 
  Building2, 
  Truck, 
  Train, 
  Zap, 
  Sun, 
  Anchor, 
  Plane, 
  Droplets,
  ChevronRight,
  Layers,
  Clock,
  CheckCircle,
  AlertTriangle,
  IndianRupee,
  Grid,
  Factory
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

export default function MinistrySection({ onSelectMinistry, onSelectSector, onViewAllProjects }) {
  const [viewType, setViewType] = useState('ministry'); // 'ministry' | 'sector'
  const [showAll, setShowAll] = useState(false);
  const { ministriesData, projects: masterProjects } = useProjectData();
  const sourceProjects = masterProjects && masterProjects.length > 0 ? masterProjects : PROJECTS_MASTER;
  const sourceMinistries = ministriesData && ministriesData.length > 0 ? ministriesData : MINISTRIES_DATA;

  // Dynamically calculate sector stats from active project pool
  const sectorList = useMemo(() => {
    const map = {};
    sourceProjects.forEach(p => {
      const sec = p.sector?.trim() || 'Other Infrastructure';
      if (!map[sec]) {
        map[sec] = {
          id: sec.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name: sec,
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

    return Object.values(map).sort((a, b) => b.totalCostCr - a.totalCostCr);
  }, [sourceProjects]);

  const displayedMinistries = showAll ? sourceMinistries : sourceMinistries.slice(0, 6);
  const displayedSectors = showAll ? sectorList : sectorList.slice(0, 6);

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#ebebeb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with View Type Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mono-eyebrow text-[#8f8f8f] mb-2">
              <Grid className="w-3.5 h-3.5 text-[#171717]" />
              <span>CENTRAL SECTOR // PORTFOLIO SURVEILLANCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-[#171717] tracking-[-1.28px]">
              {viewType === 'ministry' ? 'Ministry-wise Project Portfolio' : 'Sector-wise Project Portfolio'}
            </h2>
            <p className="text-sm text-[#4d4d4d] mt-1.5 max-w-2xl font-normal">
              {viewType === 'ministry' 
                ? 'Capital allocations, milestone execution, and delay risks across primary Union Ministries.' 
                : 'Capital outlay, milestone velocity, and delay exposure across India\'s core infrastructure sectors.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* [ MINISTRY-WISE ] [ SECTOR-WISE ] TOGGLE BUTTON */}
            <div className="flex p-0.5 rounded-[6px] bg-[#f2f2f2] border border-[#ebebeb]">
              <button
                onClick={() => setViewType('ministry')}
                className={`px-3 py-1.5 rounded-[4px] text-xs font-mono font-medium transition-all ${
                  viewType === 'ministry' 
                    ? 'bg-[#171717] text-white shadow-xs' 
                    : 'text-[#4d4d4d] hover:text-[#171717]'
                }`}
              >
                MINISTRY VIEW
              </button>
              <button
                onClick={() => setViewType('sector')}
                className={`px-3 py-1.5 rounded-[4px] text-xs font-mono font-medium transition-all ${
                  viewType === 'sector' 
                    ? 'bg-[#171717] text-white shadow-xs' 
                    : 'text-[#4d4d4d] hover:text-[#171717]'
                }`}
              >
                SECTOR VIEW
              </button>
            </div>

            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-app-ghost text-xs"
            >
              {showAll ? "Show Top 6" : `View All ${viewType === 'ministry' ? 'Ministries' : 'Sectors'}`}
            </button>
            <button
              onClick={onViewAllProjects}
              className="btn-app-sm bg-[#171717] hover:bg-[#333333] text-white text-xs gap-1.5"
            >
              <span>Explore All Projects</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 1. MINISTRIES GRID VIEW */}
        {viewType === 'ministry' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedMinistries.map((min) => {
              const IconComponent = ICON_MAP[min.icon] || Building2;
              
              return (
                <div
                  key={min.id}
                  className="bg-white rounded-[12px] border border-[#ebebeb] p-6 shadow-whisper hover:border-[#d4d4d4] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Bar with Icon & Code */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] flex items-center justify-center text-[#171717] group-hover:scale-105 transition-transform">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-mono text-[11px] font-semibold text-[#171717] px-2 py-0.5 rounded-[4px] bg-[#f2f2f2] border border-[#ebebeb]">
                            {min.code}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="mono-eyebrow text-[10px] text-[#8f8f8f]">INVESTMENT</p>
                        <p className="text-sm font-semibold font-mono text-[#171717]">
                          ₹{(min.totalCostCr / 1000).toFixed(1)}k Cr
                        </p>
                      </div>
                    </div>

                    {/* Ministry Title & Description */}
                    <h3 className="text-base font-semibold text-[#171717] group-hover:text-[#0070f3] transition-colors line-clamp-1 mb-1.5 tracking-tight">
                      {min.name}
                    </h3>
                    <p className="text-xs text-[#4d4d4d] line-clamp-2 mb-5 leading-relaxed font-normal">
                      {min.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-2 p-3 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] mb-5 text-center">
                      <div>
                        <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">TOTAL</p>
                        <p className="text-sm font-semibold text-[#171717] font-mono mt-0.5">{min.totalProjects}</p>
                      </div>
                      <div>
                        <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">ONGOING</p>
                        <p className="text-sm font-semibold text-[#0070f3] font-mono mt-0.5">{min.ongoing}</p>
                      </div>
                      <div>
                        <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">DONE</p>
                        <p className="text-sm font-semibold text-emerald-600 font-mono mt-0.5">{min.completed}</p>
                      </div>
                      <div>
                        <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">DELAYED</p>
                        <p className="text-sm font-semibold text-amber-600 font-mono mt-0.5">{min.delayed}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom View Button */}
                  <button
                    onClick={() => onSelectMinistry(min.name)}
                    className="w-full btn-app-ghost text-xs font-medium justify-between group-hover:bg-[#fafafa]"
                  >
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#8f8f8f]" />
                      <span>View Projects</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8f8f8f] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. SECTORS GRID VIEW */}
        {viewType === 'sector' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedSectors.map((sec) => {
              const meta = SECTOR_META[sec.name] || {
                code: 'SECTOR',
                icon: Layers,
                description: 'Capital infrastructure projects monitored under MoSPI OCMS national benchmarks.'
              };
              const IconComponent = meta.icon;

              return (
                <div
                  key={sec.id}
                  className="bg-white rounded-[12px] border border-[#ebebeb] p-6 shadow-whisper hover:border-[#d4d4d4] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Bar with Icon & Code */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] flex items-center justify-center text-[#171717] group-hover:scale-105 transition-transform">
                          <IconComponent className="w-5 h-5 text-[#0070f3]" />
                        </div>
                        <div>
                          <span className="font-mono text-[11px] font-semibold text-[#171717] px-2 py-0.5 rounded-[4px] bg-[#f2f2f2] border border-[#ebebeb]">
                            {meta.code}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="mono-eyebrow text-[10px] text-[#8f8f8f]">OUTLAY</p>
                        <p className="text-sm font-semibold font-mono text-[#171717]">
                          ₹{(sec.totalCostCr / 1000).toFixed(1)}k Cr
                        </p>
                      </div>
                    </div>

                    {/* Sector Title & Description */}
                    <h3 className="text-base font-semibold text-[#171717] group-hover:text-[#0070f3] transition-colors line-clamp-1 mb-1.5 tracking-tight">
                      {sec.name}
                    </h3>
                    <p className="text-xs text-[#4d4d4d] line-clamp-2 mb-5 leading-relaxed font-normal">
                      {meta.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-2 p-3 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] mb-5 text-center">
                      <div>
                        <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">TOTAL</p>
                        <p className="text-sm font-semibold text-[#171717] font-mono mt-0.5">{sec.totalProjects}</p>
                      </div>
                      <div>
                        <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">ONGOING</p>
                        <p className="text-sm font-semibold text-[#0070f3] font-mono mt-0.5">{sec.ongoing}</p>
                      </div>
                      <div>
                        <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">DONE</p>
                        <p className="text-sm font-semibold text-emerald-600 font-mono mt-0.5">{sec.completed}</p>
                      </div>
                      <div>
                        <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">DELAYED</p>
                        <p className="text-sm font-semibold text-amber-600 font-mono mt-0.5">{sec.delayed}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom View Button */}
                  <button
                    onClick={() => {
                      if (onSelectSector) onSelectSector(sec.name);
                      else onSelectMinistry(sec.name);
                    }}
                    className="w-full btn-app-ghost text-xs font-medium justify-between group-hover:bg-[#fafafa]"
                  >
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#8f8f8f]" />
                      <span>View Sector Projects</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8f8f8f] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
