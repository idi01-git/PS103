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
    <section className="py-12 bg-white/60 border-b border-[#A6CFD5]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#0A434B] bg-[#A6CFD5]/40 px-2.5 py-1 rounded border border-[#A6CFD5] mb-2 font-bold">
              <Grid className="w-3.5 h-3.5 text-[#145C66]" />
              CENTRAL SECTOR MONITORED MINISTRIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
              Ministry-wise Project Portfolio
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Breakdown of infrastructure investments, project progress, and cost allocations across key Union Ministries
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-4 py-2 rounded-lg bg-white border border-[#A6CFD5] text-slate-700 hover:text-slate-900 hover:bg-[#E8F4F5] text-sm font-semibold transition-all shadow-sm"
            >
              {showAll ? "Show Top Ministries" : "View All Ministries"}
            </button>
            <button
              onClick={onViewAllProjects}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#145C66] hover:bg-[#0A434B] text-white text-sm font-semibold shadow-md shadow-[#A6CFD5]/50 transition-all"
            >
              <span>Explore All Projects</span>
              <ChevronRight className="w-4 h-4" />
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
                className="rounded-2xl glass-panel p-6 border border-[#A6CFD5]/70 glass-panel-hover flex flex-col justify-between group shadow-sm bg-white"
              >
                <div>
                  {/* Top Bar with Icon & Code */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-[#A6CFD5]/35 border border-[#A6CFD5] text-[#145C66] group-hover:scale-105 transition-transform">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-[#0A434B] px-2 py-0.5 rounded bg-[#E8F4F5] border border-[#A6CFD5]">
                          {min.code}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] uppercase font-mono text-slate-500 font-medium">Total Investment</p>
                      <p className="text-sm font-bold font-mono text-amber-800">
                        ₹{(min.totalCostCr / 1000).toFixed(1)}k Cr
                      </p>
                    </div>
                  </div>

                  {/* Ministry Title & Description */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#145C66] transition-colors line-clamp-1 mb-1">
                    {min.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-5 leading-relaxed">
                    {min.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 gap-2 p-3 rounded-xl bg-[#F4F9F9] border border-[#A6CFD5]/50 mb-5 text-center">
                    <div>
                      <p className="text-[10px] text-slate-500 font-mono">Total</p>
                      <p className="text-sm font-bold text-slate-900">{min.totalProjects}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-cyan-700 font-mono">Ongoing</p>
                      <p className="text-sm font-bold text-cyan-800">{min.ongoing}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-emerald-700 font-mono">Done</p>
                      <p className="text-sm font-bold text-emerald-800">{min.completed}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-amber-700 font-mono">Delayed</p>
                      <p className="text-sm font-bold text-amber-800">{min.delayed}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom View Button */}
                <button
                  onClick={() => onSelectMinistry(min.name)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#E8F4F5] hover:bg-[#A6CFD5]/40 text-[#0A434B] border border-[#A6CFD5] text-xs font-semibold transition-all shadow-xs"
                >
                  <Layers className="w-3.5 h-3.5 text-[#145C66]" />
                  <span>View Ministry Projects</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
