import React, { useState, useEffect, useRef } from 'react';

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

export default function StatsOverview({ stats, onFilterClick }) {
  const carouselRef = useRef(null);
  const sectionRef = useRef(null);
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const animFrameRef = useRef(null);

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

  // High Value Projects Data (Exact MoSPI Portal Structure)
  const highValueProjects = [
    {
      id: 'hvp-1',
      sector: "Inland Waterways",
      authority: "Inland Waterways Authority of India [IWAI]",
      projectName: "Jal Marg Vikas Project",
      originalCost: "5,369",
      physicalProgress: "85",
      latestRevisedCost: "5,061",
      latestRevisedDate: "24/10/2026",
      IconComponent: WaterwaysSvg,
      filterStatus: 'Ongoing'
    },
    {
      id: 'hvp-2',
      sector: "Healthcare",
      authority: "PMSSY AND Institute of NATIONAL Importance",
      projectName: "Redevelopment of Residential...",
      originalCost: "4,441",
      physicalProgress: "57",
      latestRevisedCost: "4,441",
      latestRevisedDate: "02/06/2027",
      IconComponent: HealthcareSvg,
      filterStatus: 'Ongoing'
    },
    {
      id: 'hvp-3',
      sector: "Shipping",
      authority: "Deendayal Port Trust",
      projectName: "Development of Container Ter...",
      originalCost: "4,244",
      physicalProgress: "60",
      latestRevisedCost: "4,244",
      latestRevisedDate: "30/09/2027",
      IconComponent: ShippingSvg,
      filterStatus: 'Ongoing'
    },
    {
      id: 'hvp-4',
      sector: "Metals & Mining",
      authority: "National Aluminium Company Limited [NALCO]",
      projectName: "Expansion of Alumina Refiner...",
      originalCost: "4,103",
      physicalProgress: "96",
      latestRevisedCost: "5,677",
      latestRevisedDate: "30/06/2026",
      IconComponent: MetalsMiningSvg,
      filterStatus: 'Completed'
    },
    {
      id: 'hvp-5',
      sector: "Road Transport & Highways",
      authority: "National Highways Authority of India [NHAI]",
      projectName: "Delhi-Mumbai Expressway Corridor...",
      originalCost: "8,720",
      physicalProgress: "78",
      latestRevisedCost: "9,150",
      latestRevisedDate: "15/12/2026",
      IconComponent: HighwaysSvg,
      filterStatus: 'Ongoing'
    },
    {
      id: 'hvp-6',
      sector: "Railways",
      authority: "Rail Vikas Nigam Limited [RVNL]",
      projectName: "Dedicated Freight Corridor (East)...",
      originalCost: "6,850",
      physicalProgress: "82",
      latestRevisedCost: "7,200",
      latestRevisedDate: "31/03/2027",
      IconComponent: RailwaysSvg,
      filterStatus: 'Ongoing'
    }
  ];

  return (
    <div className="space-y-0 select-none">
      
      {/* SECTION A: Minimal Premium Editorial Overview */}
      <section className="pt-20 sm:pt-28 pb-16 sm:pb-20 bg-white border-b border-[#ebebeb]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* 1. Header Group: Geist Mono Eyebrow */}
          <div className="mb-4">
            <span className="mono-eyebrow text-[#8f8f8f] block mb-2">
              DRISHTI // PAIMANA INFRASTRUCTURE INTELLIGENCE
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
                CENTRAL SECTOR // MEGA INVESTMENTS &gt; ₹4,000 CR
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
                  onClick={(e) => {
                    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    if (onFilterClick) onFilterClick(card.filterStatus);
                  }}
                  className="w-[280px] sm:w-[310px] flex-shrink-0 bg-white rounded-[12px] border border-[#ebebeb] shadow-whisper p-5 flex flex-col justify-between text-center transition-all duration-200 hover:border-[#d4d4d4] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 cursor-pointer group"
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

                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
