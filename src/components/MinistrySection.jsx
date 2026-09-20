import React, { useState } from 'react';
import { MINISTRIES_DATA } from '../data/projectsData';
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

export default function MinistrySection({ onSelectMinistry, onViewAllProjects }) {
  const [showAll, setShowAll] = useState(false);

  const displayedMinistries = showAll ? MINISTRIES_DATA : MINISTRIES_DATA.slice(0, 6);

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#ebebeb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mono-eyebrow text-[#8f8f8f] mb-2">
              <Grid className="w-3.5 h-3.5 text-[#171717]" />
              <span>CENTRAL SECTOR // MONITORED MINISTRIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-[#171717] tracking-[-1.28px]">
              Ministry-wise Project Portfolio
            </h2>
            <p className="text-sm text-[#4d4d4d] mt-1.5 max-w-2xl font-normal">
              Capital allocations, milestone execution, and delay risks across primary Union Ministries.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-app-ghost text-xs"
            >
              {showAll ? "Show Top 6" : "View All Ministries"}
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

        {/* Ministries Grid */}
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

      </div>
    </section>
  );
}
