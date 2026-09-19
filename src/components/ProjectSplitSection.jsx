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
            className={`p-2.5 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none ${
              isActive
                ? 'bg-gradient-to-r from-[#E8F4F5] via-[#D8ECED] to-[#E8F4F5] text-slate-900 border-[#145C66] border-l-4 border-l-[#145C66] shadow-md ring-2 ring-[#145C66]/30 -translate-y-1 scale-[1.015] relative z-10'
                : 'bg-white border-[#A6CFD5]/70 hover:border-[#145C66]/50 hover:bg-[#F4F9F9] shadow-2xs'
            }`}
          >
            {/* Header Badges */}
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className={`text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded border ${
                isActive
                  ? 'bg-[#145C66] text-white border-[#145C66] shadow-2xs'
                  : 'bg-[#A6CFD5]/35 text-[#0A434B] border-[#A6CFD5]'
              }`}>
                {prj.id}
              </span>

              <div className="flex items-center gap-1">
                <span className={`flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.5 rounded border ${
                  isActive
                    ? 'bg-white text-[#0A434B] border-[#145C66]/40 font-bold'
                    : 'bg-[#E8F4F5] text-[#0A434B] border-[#A6CFD5]'
                }`}>
                  <MapPin className="w-2.5 h-2.5 text-[#145C66]" />
                  {prj.state}
                </span>

                <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold uppercase ${
                  prj.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold' :
                  prj.status === 'Delayed' ? 'bg-amber-100 text-amber-800 border border-amber-300 font-extrabold' :
                  'bg-cyan-100 text-cyan-800 border border-cyan-300 font-extrabold'
                }`}>
                  {prj.status}
                </span>
              </div>
            </div>

            {/* Title */}
            <h4 className={`text-xs line-clamp-1 transition-colors ${
              isActive ? 'text-[#0A434B] font-extrabold' : 'text-slate-800 font-bold'
            }`}>
              {prj.name}
            </h4>

            {/* Sector & Progress */}
            <div className={`flex items-center justify-between gap-2 pt-1 mt-1 border-t text-[10px] ${
              isActive ? 'border-[#145C66]/30' : 'border-[#A6CFD5]/40'
            }`}>
              <span className={`text-[9.5px] truncate ${isActive ? 'text-[#0A434B] font-semibold' : 'text-slate-600'}`}>{prj.sector}</span>
              <span className={`font-mono shrink-0 ${isActive ? 'text-[#145C66] font-extrabold' : 'text-emerald-700 font-bold'}`}>{prj.progressPercent}%</span>
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
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="rounded-xl glass-panel p-4 border-2 border-[#145C66] bg-white shadow-sm h-full flex flex-col justify-between space-y-3"
        >
          {/* Top Info Sections */}
          <div className="space-y-3">
            {/* Header Banner */}
            <div className="flex items-center justify-between border-b border-[#A6CFD5]/60 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono font-bold text-[#145C66] uppercase tracking-wider">
                  ACTIVE PROJECT INSPECTOR
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold bg-[#145C66] text-white px-2.5 py-0.5 rounded shadow-2xs">
                {project.id}
              </span>
            </div>

            {/* Title & Badges */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  <MapPin className="w-3 h-3 text-amber-600" />
                  {project.state} ({project.district})
                </span>
                <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider ${
                  project.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                  project.status === 'Delayed' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  'bg-cyan-100 text-cyan-800 border border-cyan-300'
                }`}>
                  {project.status}
                </span>
                <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${
                  project.riskLevel === 'Critical' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                  project.riskLevel === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                  'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  Risk: {project.riskLevel} ({project.riskScore})
                </span>
              </div>

              <h2 className="text-base font-bold font-heading text-slate-900 leading-snug line-clamp-2">
                {project.name}
              </h2>
            </div>

            {/* 2x2 Metadata Grid (Spacious 2 Columns, No Text Truncation Scrunches) */}
            <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-lg bg-[#F4F9F9] border border-[#A6CFD5]/60">
              <div>
                <span className="text-[9px] font-mono text-slate-500 uppercase block font-medium">Sector</span>
                <span className="font-bold text-slate-800 mt-0.5 block text-xs line-clamp-1">{project.sector}</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-slate-500 uppercase block font-medium">Ministry</span>
                <span className="font-bold text-slate-800 mt-0.5 block text-xs line-clamp-1">{project.ministry}</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-slate-500 uppercase block font-medium">Agency</span>
                <span className="font-bold text-[#145C66] mt-0.5 block text-xs line-clamp-1">{project.department || project.agency}</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-slate-500 uppercase block font-medium">Location</span>
                <span className="font-bold text-slate-800 mt-0.5 block text-xs line-clamp-1">{project.state}</span>
              </div>
            </div>

            {/* Financial Grid */}
            <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-white border border-[#A6CFD5]/70 text-xs text-center shadow-2xs">
              <div>
                <p className="text-[9px] font-mono text-slate-500 uppercase font-semibold">ORIGINAL COST</p>
                <p className="text-sm font-extrabold font-mono text-slate-900 mt-0.5">₹{origCost.toLocaleString()} Cr</p>
              </div>
              <div>
                <p className="text-[9px] font-mono text-slate-500 uppercase font-semibold">REVISED COST</p>
                <p className="text-sm font-extrabold font-mono text-amber-900 mt-0.5">₹{revCost.toLocaleString()} Cr</p>
                {costIncrease > 0 && (
                  <p className="text-[9px] text-rose-700 font-bold">+₹{costIncrease.toLocaleString()} Cr</p>
                )}
              </div>
              <div>
                <p className="text-[9px] font-mono text-slate-500 uppercase font-semibold">EXPENDITURE</p>
                <p className="text-sm font-extrabold font-mono text-[#0A434B] mt-0.5">₹{expCost.toLocaleString()} Cr</p>
              </div>
            </div>

            {/* Physical Progress Visual Bar */}
            <div className="p-2.5 rounded-lg bg-[#F4F9F9] border border-[#A6CFD5]/60 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-700 uppercase text-[11px]">Physical Progress</span>
                <span className="font-extrabold text-emerald-700 text-xs">{project.progressPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E8F4F5] border border-[#A6CFD5] overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#145C66] via-indigo-600 to-emerald-600 transition-all duration-500"
                  style={{ width: `${project.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-3 gap-2 p-2 rounded-lg bg-white border border-[#A6CFD5]/50 text-[10px] font-mono text-slate-600">
              <div>
                <span className="text-slate-400 block text-[8px] uppercase">Start Date</span>
                <span className="font-bold text-slate-800">{project.startDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[8px] uppercase">Orig Comp</span>
                <span className="font-bold text-slate-800">{project.targetCompletion}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[8px] uppercase">Rev Comp</span>
                <span className="font-bold text-amber-900">{project.expectedCompletion}</span>
              </div>
            </div>
          </div>

          {/* View Full Project Details Action Button */}
          <button
            onClick={() => onSelectProject(project.id)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#145C66] hover:bg-[#0A434B] text-white text-xs font-bold shadow-xs transition-all hover:scale-[1.01] mt-3"
          >
            <span>View Full Project Details</span>
            <ChevronRight className="w-4 h-4" />
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
    <div className="w-full bg-[#F4F9F9] py-2">
      {/* Outer Card Wrapper with Framed Padding */}
      <div className="max-w-5xl mx-auto w-full p-4 sm:p-6 rounded-2xl glass-panel border border-[#A6CFD5] bg-white shadow-xs">
        
        {/* Equal 50/50 Column Width Grid (grid-cols-2) */}
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
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#F4F9F9] border border-[#A6CFD5]/70 text-xs font-mono shadow-2xs mt-2">
                <button
                  disabled={currentPage === 0}
                  onClick={() => {
                    setCurrentPage(p => Math.max(0, p - 1));
                    setActiveIndex(0);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-[#145C66] hover:text-white text-[#0A434B] text-[11px] font-bold border border-[#A6CFD5] disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#0A434B] transition-all shadow-2xs"
                >
                  <ChevronLeft className="w-3 h-3" />
                  <span>Prev</span>
                </button>

                <span className="text-[10px] font-bold text-slate-700">
                  Page {currentPage + 1} of {totalPages} ({projects.length} Total)
                </span>

                <button
                  disabled={currentPage >= totalPages - 1}
                  onClick={() => {
                    setCurrentPage(p => Math.min(totalPages - 1, p + 1));
                    setActiveIndex(0);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-[#145C66] hover:text-white text-[#0A434B] text-[11px] font-bold border border-[#A6CFD5] disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#0A434B] transition-all shadow-2xs"
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
