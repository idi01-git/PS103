import React, { useState, useEffect, useMemo, memo } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronRight, ChevronLeft, Building2 } from 'lucide-react';

// Memoized Left Column Project List (5 Cards Max for Perfect Symmetry)
const LeftProjectList = memo(({ projects, activeIndex, onSelectIndex }) => {
  return (
    <div className="space-y-2">
      {projects.map((prj, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div
            key={prj.id}
            onClick={() => onSelectIndex(idx)}
            className={`p-3 rounded-[8px] border transition-all duration-150 cursor-pointer select-none ${
              isActive
                ? 'bg-[#fafafa] border-[#171717] border-l-4 border-l-[#171717] shadow-xs'
                : 'bg-white border-[#ebebeb] hover:border-[#d4d4d4] hover:bg-[#fafafa]'
            }`}
          >
            {/* Header Badges */}
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-[4px] border ${
                isActive
                  ? 'bg-[#171717] text-white border-[#171717]'
                  : 'bg-[#f2f2f2] text-[#171717] border-[#ebebeb]'
              }`}>
                {prj.id}
              </span>

              <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-1 text-[10px] font-medium text-[#4d4d4d] px-2 py-0.5 rounded-[4px] bg-white border border-[#ebebeb]">
                  <MapPin className="w-2.5 h-2.5 text-[#0070f3]" />
                  {prj.state}
                </span>

                <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-mono font-semibold uppercase ${
                  prj.status === 'Completed' ? 'bg-[#f0fdf4] text-emerald-700 border border-[#bbf7d0]' :
                  prj.status === 'Delayed' ? 'bg-[#fffbeb] text-amber-700 border border-[#fde68a]' :
                  'bg-[#eff6ff] text-[#0070f3] border border-[#bfdbfe]'
                }`}>
                  {prj.status}
                </span>
              </div>
            </div>

            {/* Title */}
            <h4 className={`text-xs line-clamp-1 transition-colors ${
              isActive ? 'text-[#171717] font-semibold' : 'text-[#171717] font-medium'
            }`}>
              {prj.name}
            </h4>

            {/* Sector & Ministry Tag */}
            <div className="flex items-center gap-1.5 text-[10px] text-[#737373] mt-1">
              <span className="font-mono bg-[#f5f5f5] px-1.5 py-0.2 rounded border border-[#ebebeb] text-[#171717] line-clamp-1">
                {prj.sector}
              </span>
              <span>•</span>
              <span className="line-clamp-1 text-[#4d4d4d]">
                {prj.ministry}
              </span>
            </div>

            {/* Metrics Row: Total Cost & Current Delay */}
            <div className="flex items-center justify-between gap-2 pt-2 mt-2 border-t border-[#ebebeb] text-[11px] font-mono">
              <span className="font-semibold text-[#171717]">
                ₹{(prj.currentCost || prj.approvedCost || 0).toLocaleString()} Cr
              </span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                prj.timeDelayMonths > 0 
                  ? 'bg-[#fffbeb] text-amber-800 border border-[#fde68a]' 
                  : 'bg-[#f0fdf4] text-emerald-800 border border-[#bbf7d0]'
              }`}>
                {prj.timeDelayMonths > 0 ? `+${prj.timeDelayMonths}m Delay` : 'On-Time (0m)'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
});

// Memoized Right Project Inspector (Spacious & Un-scrunched Layout)
const RightProjectInspector = memo(({ project, onSelectProject }) => {
  const shouldReduceMotion = useReducedMotion();
  if (!project) return null;

  const origCost = project.approvedCost || project.estimatedCost || 0;
  const revCost = project.currentCost || origCost;
  const expCost = project.expenditure !== undefined ? project.expenditure : Math.round(revCost * ((project.progressPercent || 0) / 100));
  const costIncrease = revCost - origCost;

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={project.id}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="rounded-[12px] bg-white p-5 border border-[#ebebeb] shadow-whisper h-full flex flex-col justify-between space-y-4"
        >
          {/* Top Info Sections */}
          <div className="space-y-4">
            {/* Header Banner */}
            <div className="flex items-center justify-between border-b border-[#ebebeb] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="mono-eyebrow text-[10px] text-[#8f8f8f]">
                  ACTIVE TELEMETRY INSPECTOR
                </span>
              </div>
              <span className="font-mono text-xs font-semibold bg-[#171717] text-white px-2.5 py-0.5 rounded-[4px]">
                {project.id}
              </span>
            </div>

            {/* Title & Badges */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="flex items-center gap-1 text-[10px] font-medium text-[#4d4d4d] bg-[#fafafa] px-2 py-0.5 rounded-[4px] border border-[#ebebeb]">
                  <MapPin className="w-3 h-3 text-[#0070f3]" />
                  {project.state} ({project.district})
                </span>
                <span className={`px-2 py-0.5 rounded-[4px] text-[9.5px] font-mono font-semibold uppercase ${
                  project.status === 'Completed' ? 'bg-[#f0fdf4] text-emerald-700 border border-[#bbf7d0]' :
                  project.status === 'Delayed' ? 'bg-[#fffbeb] text-amber-700 border border-[#fde68a]' :
                  'bg-[#eff6ff] text-[#0070f3] border border-[#bfdbfe]'
                }`}>
                  {project.status}
                </span>
                <span className={`px-2 py-0.5 rounded-[4px] text-[9.5px] font-mono font-semibold ${
                  project.riskLevel === 'Critical' ? 'bg-[#fff0f0] text-[#ee0000] border border-[#ffd5d5]' :
                  project.riskLevel === 'High' ? 'bg-[#fff8f0] text-amber-700 border border-[#ffe4cc]' :
                  'bg-[#f0fdf4] text-emerald-700 border border-[#bbf7d0]'
                }`}>
                  Risk: {project.riskLevel} ({project.riskScore})
                </span>
              </div>

              <h2 className="text-base font-semibold text-[#171717] leading-snug line-clamp-2 tracking-tight">
                {project.name}
              </h2>
            </div>

            {/* 2x2 Metadata Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-[6px] bg-[#fafafa] border border-[#ebebeb]">
              <div>
                <span className="mono-eyebrow text-[9px] text-[#8f8f8f] block">Sector</span>
                <span className="font-medium text-[#171717] mt-0.5 block text-xs line-clamp-1">{project.sector}</span>
              </div>
              <div>
                <span className="mono-eyebrow text-[9px] text-[#8f8f8f] block">Ministry</span>
                <span className="font-medium text-[#171717] mt-0.5 block text-xs line-clamp-1">{project.ministry}</span>
              </div>
              <div>
                <span className="mono-eyebrow text-[9px] text-[#8f8f8f] block">Agency</span>
                <span className="font-medium text-[#171717] mt-0.5 block text-xs line-clamp-1">{project.department || project.agency}</span>
              </div>
              <div>
                <span className="mono-eyebrow text-[9px] text-[#8f8f8f] block">Location</span>
                <span className="font-medium text-[#171717] mt-0.5 block text-xs line-clamp-1">{project.state}</span>
              </div>
            </div>

            {/* Financial Grid */}
            <div className="grid grid-cols-3 gap-2 p-2.5 rounded-[6px] bg-white border border-[#ebebeb] text-xs text-center shadow-whisper">
              <div>
                <p className="mono-eyebrow text-[8px] text-[#8f8f8f]">ORIGINAL COST</p>
                <p className="text-xs sm:text-sm font-semibold font-mono text-[#171717] mt-0.5">₹{origCost.toLocaleString()} Cr</p>
              </div>
              <div>
                <p className="mono-eyebrow text-[8px] text-[#8f8f8f]">REVISED COST</p>
                <p className="text-xs sm:text-sm font-semibold font-mono text-amber-700 mt-0.5">₹{revCost.toLocaleString()} Cr</p>
                {costIncrease > 0 && (
                  <p className="text-[9px] font-mono text-rose-600 font-semibold">
                    +₹{costIncrease.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr (+{((costIncrease / (origCost || 1)) * 100).toFixed(2)}%)
                  </p>
                )}
              </div>
              <div>
                <p className="mono-eyebrow text-[8px] text-[#8f8f8f]">EXPENDITURE</p>
                <p className="text-xs sm:text-sm font-semibold font-mono text-[#0070f3] mt-0.5">₹{expCost.toLocaleString()} Cr</p>
              </div>
            </div>

            {/* Physical Progress Visual Bar */}
            <div className="p-3 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="mono-eyebrow text-[10px] text-[#8f8f8f]">PHYSICAL PROGRESS</span>
                <span className="font-semibold text-[#171717]">{project.progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#ebebeb] overflow-hidden">
                <div 
                  className="h-full rounded-full bg-[#171717] transition-all duration-500"
                  style={{ width: `${project.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-3 gap-2 p-2.5 rounded-[6px] bg-white border border-[#ebebeb] text-[10px] font-mono text-[#4d4d4d]">
              <div>
                <span className="text-[#8f8f8f] block text-[8px] uppercase">Start Date</span>
                <span className="font-medium text-[#171717]">{project.startDate}</span>
              </div>
              <div>
                <span className="text-[#8f8f8f] block text-[8px] uppercase">Target</span>
                <span className="font-medium text-[#171717]">{project.targetCompletion}</span>
              </div>
              <div>
                <span className="text-[#8f8f8f] block text-[8px] uppercase">Expected</span>
                <span className="font-medium text-amber-700">{project.expectedCompletion}</span>
              </div>
            </div>
          </div>

          {/* View Full Project Details Action Button (Geist 6px rounded) */}
          <button
            onClick={() => onSelectProject(project.id)}
            className="w-full btn-app-sm bg-[#171717] hover:bg-[#333333] text-white text-xs font-medium justify-center gap-1.5"
          >
            <span>Open Complete Project Dossier</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

export default function ProjectSplitSection({ projects = [], onSelectProject }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const PROJECTS_PER_PAGE = 5;

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

  // Slice to exactly 5 projects for 50/50 equal side-by-side symmetry
  const displayProjects = useMemo(() => {
    const start = currentPage * PROJECTS_PER_PAGE;
    return projects.slice(start, start + PROJECTS_PER_PAGE);
  }, [projects, currentPage]);

  // Reset page & active index when filtered projects change
  useEffect(() => {
    setCurrentPage(0);
    setActiveIndex(0);
  }, [projects]);

  if (projects.length === 0) return null;

  const activeProject = displayProjects[activeIndex] || displayProjects[0] || projects[0];

  return (
    <div className="w-full py-2">
      {/* Outer Card Wrapper with Framed Padding */}
      <div className="max-w-6xl mx-auto w-full p-4 sm:p-6 rounded-[12px] bg-white border border-[#ebebeb] shadow-whisper">
        
        {/* Equal 50/50 Column Width Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Left Column (50% Width) */}
          <div className="lg:col-span-1 flex flex-col justify-between space-y-2">
            <LeftProjectList
              projects={displayProjects}
              activeIndex={activeIndex}
              onSelectIndex={setActiveIndex}
            />

            {/* Page Controls for Symmetry */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] text-xs font-mono mt-2">
                <button
                  disabled={currentPage === 0}
                  onClick={() => {
                    setCurrentPage(p => Math.max(0, p - 1));
                    setActiveIndex(0);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-[4px] bg-white hover:bg-[#171717] hover:text-white text-[#171717] text-[11px] font-medium border border-[#ebebeb] disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#171717] transition-all"
                >
                  <ChevronLeft className="w-3 h-3" />
                  <span>Prev</span>
                </button>

                <span className="text-[11px] font-medium text-[#4d4d4d]">
                  Page {currentPage + 1} of {totalPages} ({projects.length} Total)
                </span>

                <button
                  disabled={currentPage >= totalPages - 1}
                  onClick={() => {
                    setCurrentPage(p => Math.min(totalPages - 1, p + 1));
                    setActiveIndex(0);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-[4px] bg-white hover:bg-[#171717] hover:text-white text-[#171717] text-[11px] font-medium border border-[#ebebeb] disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#171717] transition-all"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column (50% Width) */}
          <div className="lg:col-span-1 h-full">
            <RightProjectInspector
              project={activeProject}
              onSelectProject={onSelectProject}
            />
          </div>

        </div>

      </div>
    </div>
  );
}

