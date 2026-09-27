import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { useProjectData } from '../context/DataContext';

export function AnimatedCounter({ value, duration = 1500, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    if (isNaN(end)) return;
    const totalSteps = 40;
    const stepTime = Math.abs(Math.floor(duration / totalSteps));
    const increment = (end - start) / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if ((increment > 0 && start >= end) || (increment < 0 && start <= end)) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  const formatted = typeof value === 'number' && Number.isInteger(value)
    ? Math.round(count).toLocaleString()
    : count.toFixed(2);

  return (
    <span>{prefix}{formatted}{suffix}</span>
  );
}

// MoSPI Custom Sector Icons
function WaterwaysSvg() {
  return (
    <svg className="w-10 h-10 mx-auto text-slate-900 fill-current" viewBox="0 0 64 64">
      <path d="M12 40c7-5 15 5 20 0s13-5 20 0v4c-7 5-15-5-20 0s-13 5-20 0v-4z" />
      <path d="M8 48c7-5 15 5 20 0s13-5 20 0v4c-7 5-15-5-20 0s-13 5-20 0v-4z" opacity="0.6" />
      <path d="M40 14c-3 8 2 16 8 20h-4c-4-5-8-12-4-20z" />
      <path d="M30 20c-2 6 2 12 6 15h-3c-3-4-6-9-3-15z" />
    </svg>
  );
}

function HealthcareSvg() {
  return (
    <svg className="w-10 h-10 mx-auto text-slate-900 fill-current" viewBox="0 0 64 64">
      <path d="M32 10c-5-5-12-4-16 1s-3 11 1 15l15 15 15-15c4-4 5-10 1-15s-11-6-16-1z" opacity="0.85" />
      <path d="M29 17h6v4h4v6h-4v4h-6v-4h-4v-6h4v-4z" fill="#fff" />
      <path d="M14 46c4-6 10-6 14-2l4 4 4-4c4-4 10-4 14 2s-2 12-8 12H22c-6 0-12-6-8-12z" />
    </svg>
  );
}

function ShippingSvg() {
  return (
    <svg className="w-10 h-10 mx-auto text-slate-900 fill-current" viewBox="0 0 64 64">
      <path d="M12 36l6-18h28l6 18H12z" />
      <path d="M6 42c8 4 18-2 26 2s18 2 26-2l-4 10H10L6 42z" opacity="0.9" />
      <path d="M26 12h12v6H26z" />
    </svg>
  );
}

function MetalsMiningSvg() {
  return (
    <svg className="w-10 h-10 mx-auto text-slate-900 fill-current" viewBox="0 0 64 64">
      <path d="M18 10l14 14-8 8-14-14z" />
      <path d="M36 28l18 18-6 6-18-18z" />
      <path d="M12 40l12-4 8 8-4 12z" opacity="0.8" />
    </svg>
  );
}

function HighwaysSvg() {
  return (
    <svg className="w-10 h-10 mx-auto text-slate-900 fill-current" viewBox="0 0 64 64">
      <path d="M14 54L25 10h2M37 10h2l11 44" stroke="currentColor" strokeWidth="4" fill="none" />
      <path d="M32 14v6M32 26v8M32 40v8" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function RailwaysSvg() {
  return (
    <svg className="w-10 h-10 mx-auto text-slate-900 fill-current" viewBox="0 0 64 64">
      <rect x="18" y="10" width="28" height="34" rx="6" />
      <circle cx="25" cy="36" r="3" fill="#fff" />
      <circle cx="39" cy="36" r="3" fill="#fff" />
      <path d="M22 18h20v10H22z" fill="#fff" />
      <path d="M16 48l-6 8M48 48l6 8M20 52h24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export default function StatsOverview({ stats, onFilterClick, onSelectProject }) {
  const carouselRef = useRef(null);
  const sectionRef = useRef(null);
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const animFrameRef = useRef(null);

  const { projects: dbProjects } = useProjectData();

  // Helper to map dynamic sector to custom SVGs
  const getSectorIcon = (sector, ministry) => {
    const s = `${sector || ''} ${ministry || ''}`.toLowerCase();
    if (s.includes('road') || s.includes('highway') || s.includes('expressway') || s.includes('morth')) return HighwaysSvg;
    if (s.includes('rail') || s.includes('train') || s.includes('metro') || s.includes('transit')) return RailwaysSvg;
    if (s.includes('water') || s.includes('river') || s.includes('iwai') || s.includes('jal')) return WaterwaysSvg;
    if (s.includes('health') || s.includes('hospital') || s.includes('pmssy')) return HealthcareSvg;
    if (s.includes('port') || s.includes('ship') || s.includes('maritime') || s.includes('dock')) return ShippingSvg;
    if (s.includes('mine') || s.includes('metal') || s.includes('steel') || s.includes('coal') || s.includes('nalco')) return MetalsMiningSvg;
    return HighwaysSvg;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'TBD';
    if (dateStr.includes('/')) return dateStr;
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
      }
    } catch (e) {
      // fallback
    }
    return dateStr;
  };

  // Top 5 most valuable projects by cost dynamically fetched from database
  const highValueProjects = useMemo(() => {
    const list = (dbProjects && dbProjects.length > 0) ? dbProjects : [];
    if (list.length === 0) return [];

    return [...list]
      .sort((a, b) => {
        const costA = Math.max(Number(a.currentCost) || 0, Number(a.approvedCost) || 0, Number(a.estimatedCost) || 0);
        const costB = Math.max(Number(b.currentCost) || 0, Number(b.approvedCost) || 0, Number(b.estimatedCost) || 0);
        return costB - costA;
      })
      .slice(0, 5)
      .map(p => {
        const origCost = Number(p.approvedCost || p.estimatedCost || 0);
        const currCost = Number(p.currentCost || p.approvedCost || origCost || 0);
        return {
          id: p.id || `OCMS-${p.rawId}`,
          rawId: p.rawId || p.id,
          sector: p.sector || 'Infrastructure & Logistics',
          authority: p.agency || p.department || p.ministry || 'Centrally Monitored CPSU',
          projectName: p.name || p.shortName || 'National Mega Project',
          originalCost: origCost ? origCost.toLocaleString() : 'N/A',
          physicalProgress: p.progressPercent !== undefined ? Math.round(Number(p.progressPercent)) : 0,
          latestRevisedCost: currCost ? currCost.toLocaleString() : 'N/A',
          latestRevisedDate: formatDate(p.targetCompletion || p.expectedCompletion),
          filterStatus: p.status || (p.timeDelayMonths > 0 ? 'Delayed' : 'Ongoing'),
          IconComponent: getSectorIcon(p.sector, p.ministry)
        };
      });
  }, [dbProjects]);

  // Smooth Gliding Animation Loop (60fps lerp)
  useEffect(() => {
    const updateScroll = () => {
      if (carouselRef.current) {
        const diff = targetScrollRef.current - currentScrollRef.current;
        if (Math.abs(diff) > 0.4) {
          currentScrollRef.current += diff * 0.08; // Fluid easing factor
          carouselRef.current.scrollLeft = currentScrollRef.current;
        }
      }
      animFrameRef.current = requestAnimationFrame(updateScroll);
    };

    animFrameRef.current = requestAnimationFrame(updateScroll);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Default Center Scroll Alignment on Mount
  useEffect(() => {
    if (carouselRef.current) {
      const el = carouselRef.current;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const initialCenter = maxScroll / 2;
      targetScrollRef.current = initialCenter;
      currentScrollRef.current = initialCenter;
      el.scrollLeft = initialCenter;
    }
  }, []);

  // Mouse Pointer Motion Tracking (Cards slide smoothly as mouse glides left/right)
  const handleSectionMouseMove = (e) => {
    if (isDraggingRef.current || !carouselRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, mouseX / rect.width));

    const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    targetScrollRef.current = ratio * maxScroll;
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    if (carouselRef.current) {
      dragStartScrollRef.current = carouselRef.current.scrollLeft;
      currentScrollRef.current = carouselRef.current.scrollLeft;
      targetScrollRef.current = carouselRef.current.scrollLeft;
    }
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleDragMouseMove = (e) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    e.preventDefault();
    const deltaX = (e.clientX - dragStartXRef.current) * 1.6;
    const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    const newScroll = dragStartScrollRef.current - deltaX;
    targetScrollRef.current = Math.max(0, Math.min(maxScroll, newScroll));
  };

  return (
    <div className="space-y-0 select-none">
      
      {/* SECTION A: Minimal Premium Editorial Overview */}
      <section className="pt-20 sm:pt-28 pb-16 sm:pb-20 bg-white border-b border-[#ebebeb]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* 1. Header Group: Geist Mono Eyebrow */}
          <div className="mb-4">
            <span className="mono-eyebrow text-[#8f8f8f] block mb-2">
              PAIMANA // INFRASTRUCTURE INTELLIGENCE
            </span>
            <span className="inline-block text-[11px] font-mono font-medium text-[#4d4d4d] px-3 py-1 bg-[#f2f2f2] border border-[#ebebeb] rounded-[6px]">
              DATA-DRIVEN RISK INTELLIGENCE &amp; SYSTEMIC HEALTH TRACKING
            </span>
          </div>

          {/* 2. Main Heading (Tight Negative Tracking) */}
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-1.8px] leading-tight text-[#171717] mb-5">
            Built for Smarter Infrastructure Governance
          </h2>

          {/* 3. Description */}
          <p className="text-base sm:text-xl font-normal leading-relaxed text-[#4d4d4d] max-w-3xl mx-auto">
            Track project progress, uncover emerging risks, and understand
            what needs attention before administrative delays become major capital overruns.
          </p>

          {/* 4. Interactive Live Metric Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 text-left">
            <div 
              role="button"
              onClick={() => onFilterClick && onFilterClick('All')}
              className="p-4 rounded-[12px] bg-[#fafafa] border border-[#ebebeb] hover:border-[#171717] transition-all cursor-pointer group shadow-whisper"
            >
              <span className="mono-eyebrow text-[10px] text-[#8f8f8f] block uppercase">Total Monitored</span>
              <div className="text-2xl sm:text-3xl font-semibold font-mono text-[#171717] mt-1">
                <AnimatedCounter value={stats?.totalProjects || 4547} />
              </div>
              <p className="text-[11px] text-[#8f8f8f] font-mono mt-0.5">₹{stats?.totalCostLakhCr || '31.15'} Lakh Cr Outlay</p>
            </div>

            <div 
              role="button"
              onClick={() => onFilterClick && onFilterClick('Ongoing')}
              className="p-4 rounded-[12px] bg-[#fafafa] border border-[#ebebeb] hover:border-[#0070f3] transition-all cursor-pointer group shadow-whisper"
            >
              <span className="mono-eyebrow text-[10px] text-[#8f8f8f] block uppercase">On Schedule</span>
              <div className="text-2xl sm:text-3xl font-semibold font-mono text-[#0070f3] mt-1">
                <AnimatedCounter value={stats?.onTime || 4059} />
              </div>
              <p className="text-[11px] text-[#8f8f8f] font-mono mt-0.5">89.3% On Milestone Pace</p>
            </div>

            <div 
              role="button"
              onClick={() => onFilterClick && onFilterClick('Delayed')}
              className="p-4 rounded-[12px] bg-[#fafafa] border border-[#ebebeb] hover:border-[#f5a623] transition-all cursor-pointer group shadow-whisper"
            >
              <span className="mono-eyebrow text-[10px] text-[#8f8f8f] block uppercase">Active Delay</span>
              <div className="text-2xl sm:text-3xl font-semibold font-mono text-[#f5a623] mt-1">
                <AnimatedCounter value={stats?.delayed || 488} />
              </div>
              <p className="text-[11px] text-[#8f8f8f] font-mono mt-0.5">{stats?.avgDelay || 6.2} Mo Avg Variance</p>
            </div>

            <div 
              role="button"
              onClick={() => onFilterClick && onFilterClick('HighRisk')}
              className="p-4 rounded-[12px] bg-[#fafafa] border border-[#ebebeb] hover:border-[#ee0000] transition-all cursor-pointer group shadow-whisper"
            >
              <span className="mono-eyebrow text-[10px] text-[#8f8f8f] block uppercase">Predictive Risk</span>
              <div className="text-2xl sm:text-3xl font-semibold font-mono text-[#ee0000] mt-1">
                <AnimatedCounter value={stats?.highRisk || 1842} />
              </div>
              <p className="text-[11px] text-[#8f8f8f] font-mono mt-0.5">High / Critical Flagged</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: High Value Projects Interactive Mouse-Tracking Slider */}
      <section 
        ref={sectionRef}
        onMouseMove={(e) => {
          handleSectionMouseMove(e);
          handleDragMouseMove(e);
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="py-12 sm:py-16 bg-[#fafafa] border-b border-[#ebebeb] relative overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 px-4 sm:px-6 gap-3">
            <div>
              <div className="mono-eyebrow text-[#8f8f8f] mb-1">
                CENTRAL SECTOR // TOP 5 MEGA INVESTMENTS BY CAPITAL OUTLAY
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#171717] tracking-[-1.28px]">
                High Value Projects
              </h2>
            </div>
            <p className="text-xs text-[#8f8f8f] font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0070f3]" />
              Glide cursor horizontally to scroll portfolio
            </p>
          </div>

          {/* High Value Projects Slider */}
          <div 
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto scrollbar-none pb-6 pt-2 px-4 sm:px-6 lg:px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {highValueProjects.map((card) => {
              const IconComp = card.IconComponent;
              return (
                <div
                  key={card.id}
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    if (onSelectProject) {
                      onSelectProject(card.id || card.rawId);
                    } else if (onFilterClick) {
                      onFilterClick(card.filterStatus);
                    }
                  }}
                  title={`View Intelligence Dossier for ${card.projectName}`}
                  className="w-[280px] sm:w-[310px] flex-shrink-0 bg-white rounded-[12px] border border-[#ebebeb] shadow-whisper p-5 flex flex-col justify-between text-center transition-all duration-200 hover:border-[#0070f3] hover:shadow-[0_8px_24px_rgba(0,112,243,0.12)] hover:-translate-y-1 cursor-pointer group"
                >
                  {/* Top Sector Icon & Tag */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="mono-eyebrow text-[10px] text-[#8f8f8f] px-2 py-0.5 rounded-[4px] bg-[#f2f2f2] border border-[#ebebeb]">
                        {card.filterStatus}
                      </span>
                      <span className="text-[10px] font-mono text-[#0070f3] font-medium">
                        {card.latestRevisedDate}
                      </span>
                    </div>

                    <div className="mb-3 text-[#171717] transition-transform group-hover:scale-105 duration-200">
                      <IconComp />
                    </div>

                    {/* Sector Title */}
                    <h3 className="text-base font-semibold text-[#171717] tracking-tight mb-1 min-h-[24px]">
                      {card.sector}
                    </h3>

                    {/* Authority / Org */}
                    <p className="text-xs text-[#4d4d4d] leading-snug min-h-[34px] px-1 flex items-center justify-center font-normal">
                      {card.authority}
                    </p>

                    {/* Project Title */}
                    <p className="text-[11px] text-[#8f8f8f] font-mono truncate mt-1 px-1 min-h-[18px]">
                      {card.projectName}
                    </p>
                  </div>

                  {/* 2x2 Metric Table Grid with Clean Hairline Cross */}
                  <div className="relative grid grid-cols-2 text-left pt-3 mt-3 border-t border-[#ebebeb]">
                    
                    {/* Vertical Dividing Line */}
                    <div className="absolute left-1/2 top-3 bottom-0 w-[1px] bg-[#ebebeb] -translate-x-1/2"></div>
                    
                    {/* Horizontal Dividing Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#ebebeb] -translate-y-1/2"></div>

                    {/* Top Left: Original Cost */}
                    <div className="pr-2.5 pb-2.5">
                      <span className="text-[10px] font-mono text-[#8f8f8f] block uppercase">Original</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#171717] font-mono">
                        ₹{card.originalCost} Cr
                      </span>
                    </div>

                    {/* Top Right: Physical Progress */}
                    <div className="pl-2.5 pb-2.5">
                      <span className="text-[10px] font-mono text-[#8f8f8f] block uppercase">Progress</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#0070f3] font-mono">
                        {card.physicalProgress}%
                      </span>
                    </div>

                    {/* Bottom Left: Latest Revised Cost */}
                    <div className="pr-2.5 pt-2.5">
                      <span className="text-[10px] font-mono text-[#8f8f8f] block uppercase">Revised</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#171717] font-mono">
                        ₹{card.latestRevisedCost} Cr
                      </span>
                    </div>

                    {/* Bottom Right: Latest Revised Comp. Date */}
                    <div className="pl-2.5 pt-2.5">
                      <span className="text-[10px] font-mono text-[#8f8f8f] block uppercase">Target</span>
                      <span className="text-[11px] sm:text-xs font-semibold text-[#171717] font-mono">
                        {card.latestRevisedDate}
                      </span>
                    </div>

                  </div>

                  {/* Dossier Redirection Prompt */}
                  <div className="mt-3 pt-2.5 border-t border-[#ebebeb] flex items-center justify-center gap-1.5 text-xs font-mono font-medium text-[#0070f3] group-hover:text-[#0052FF]">
                    <span>Open Project Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
