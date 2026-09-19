import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS_MASTER, getStateAggregates, MINISTRIES_DATA, calculateDashboardSummary } from '../data/projectsData';
import ProjectSplitSection from './ProjectSplitSection';
import { 
  Filter, 
  Search, 
  MapPin, 
  Building2, 
  Layers, 
  Clock, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  IndianRupee, 
  X, 
  ChevronRight, 
  SlidersHorizontal,
  Grid,
  List,
  RotateCcw,
  BarChart3,
  Calendar,
  Sparkles,
  Columns
} from 'lucide-react';

const SECTORS_LIST = [
  "Highways & Expressways",
  "Urban Transit & Metro",
  "Railways & Commuter Transit",
  "Railways & Alpine Transport",
  "Smart Cities & Industrial Parks",
  "Irrigation & River Interlinking",
  "Petroleum & Chemicals",
  "Ports & Maritime",
  "Renewable Energy & Solar"
];

const LOCATIONS_LIST = [
  "Maharashtra",
  "Uttar Pradesh",
  "Tamil Nadu",
  "Gujarat",
  "Karnataka",
  "West Bengal",
  "Bihar",
  "Rajasthan",
  "Odisha",
  "Assam",
  "Telangana",
  "Andhra Pradesh",
  "Jammu and Kashmir",
  "Delhi",
  "Madhya Pradesh",
  "Kerala"
];

export default function ProjectListing({ 
  selectedState, 
  onStateChange, 
  onSelectProject,
  initialFilterStatus,
  initialMinistry
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [groupMode, setGroupMode] = useState('ministry'); // 'ministry' | 'sector'
  const [stateFilter, setStateFilter] = useState(selectedState || 'All');
  const [ministryFilter, setMinistryFilter] = useState(initialMinistry || 'All');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState(initialFilterStatus || 'All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'grid' | 'table'
  const [activeProjectId, setActiveProjectId] = useState(PROJECTS_MASTER[0]?.id);

  const stateAggregates = useMemo(() => getStateAggregates(), []);

  // Filtered Projects Logic based on multi-tiered hierarchy
  const filteredProjects = useMemo(() => {
    return PROJECTS_MASTER.filter(p => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesId = p.id.toLowerCase().includes(q);
        const matchesState = p.state.toLowerCase().includes(q);
        const matchesMinistry = p.ministry.toLowerCase().includes(q);
        const matchesDept = (p.department || p.agency || '').toLowerCase().includes(q);
        const matchesSector = p.sector.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesState && !matchesMinistry && !matchesDept && !matchesSector) return false;
      }

      // Group Mode specifics
      if (groupMode === 'ministry') {
        if (ministryFilter !== 'All' && p.ministry !== ministryFilter && !p.ministry.includes(ministryFilter)) return false;
      } else if (groupMode === 'sector') {
        if (sectorFilter !== 'All' && p.sector !== sectorFilter && !p.sector.includes(sectorFilter)) return false;
      }

      // State / Location
      if (stateFilter !== 'All' && p.state !== stateFilter) return false;

      // Status
      if (statusFilter !== 'All') {
        if (statusFilter === 'HighRisk') {
          if (p.riskLevel !== 'High' && p.riskLevel !== 'Critical') return false;
        } else if (p.status !== statusFilter) {
          return false;
        }
      }

      // Risk
      if (riskFilter !== 'All' && p.riskLevel !== riskFilter) return false;

      return true;
    });
  }, [searchQuery, groupMode, ministryFilter, sectorFilter, stateFilter, statusFilter, riskFilter]);

  // Sync activeProjectId with filteredProjects
  useEffect(() => {
    if (filteredProjects.length > 0) {
      const exists = filteredProjects.some(p => p.id === activeProjectId);
      if (!exists) {
        setActiveProjectId(filteredProjects[0].id);
      }
    }
  }, [filteredProjects, activeProjectId]);

  // Scroll Synchronization for Split View via IntersectionObserver
  useEffect(() => {
    if (viewMode !== 'split' || filteredProjects.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const prjId = entry.target.getAttribute('data-project-id');
            if (prjId) {
              setActiveProjectId(prjId);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-5% 0px -50% 0px',
        threshold: 0.1
      }
    );

    const elements = document.querySelectorAll('.split-project-card');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, [viewMode, filteredProjects]);

  // Dashboard summary calculated dynamically from active filteredProjects
  const summary = useMemo(() => {
    return calculateDashboardSummary(filteredProjects);
  }, [filteredProjects]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setGroupMode('ministry');
    setStateFilter('All');
    setMinistryFilter('All');
    setSectorFilter('All');
    setStatusFilter('All');
    setRiskFilter('All');
    if (onStateChange) onStateChange(null);
  };

  return (
    <div className="py-4 bg-[#F4F9F9] min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* ==================================================== */}
        {/* HEADER & FILTER HIERARCHY BAR                        */}
        {/* ==================================================== */}
        <div className="rounded-xl glass-panel p-4 border border-[#A6CFD5] bg-white shadow-xs space-y-3.5">
          
          {/* Top Title & Mode Selector Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-[#A6CFD5]/40 pb-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2 py-0.5 rounded-full bg-[#A6CFD5]/35 text-[#0A434B] text-[10px] font-mono font-bold border border-[#A6CFD5] uppercase tracking-wider">
                  National Infrastructure Monitor
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 tracking-tight">
                PROJECT MONITORING
              </h1>
            </div>

            {/* [ MINISTRY-WISE ] [ SECTOR-WISE ] TOGGLE */}
            <div className="flex p-0.5 rounded-lg bg-[#E8F4F5] border border-[#A6CFD5] shadow-xs">
              <button
                onClick={() => {
                  setGroupMode('ministry');
                  setSectorFilter('All');
                }}
                className={`px-3 py-1.5 rounded-md text-[11px] font-bold font-mono transition-all ${
                  groupMode === 'ministry' 
                    ? 'bg-[#145C66] text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                [ MINISTRY-WISE ]
              </button>
              <button
                onClick={() => {
                  setGroupMode('sector');
                  setMinistryFilter('All');
                }}
                className={`px-3 py-1.5 rounded-md text-[11px] font-bold font-mono transition-all ${
                  groupMode === 'sector' 
                    ? 'bg-[#145C66] text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                [ SECTOR-WISE ]
              </button>
            </div>
          </div>

          {/* HIERARCHY TIER 1: MINISTRY OR SECTOR SELECTION */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase text-[#145C66] tracking-wider block">
              {groupMode === 'ministry' ? 'MINISTRY SELECTION' : 'SECTOR SELECTION'}
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => {
                  if (groupMode === 'ministry') setMinistryFilter('All');
                  else setSectorFilter('All');
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  (groupMode === 'ministry' ? ministryFilter === 'All' : sectorFilter === 'All')
                    ? 'bg-[#145C66] text-white shadow-xs font-bold'
                    : 'bg-[#F4F9F9] text-slate-700 hover:bg-[#E8F4F5] border border-[#A6CFD5]/60'
                }`}
              >
                All {groupMode === 'ministry' ? 'Ministries' : 'Sectors'}
              </button>

              {groupMode === 'ministry' ? (
                MINISTRIES_DATA.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setMinistryFilter(m.name)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      ministryFilter === m.name
                        ? 'bg-[#145C66] text-white shadow-xs font-bold'
                        : 'bg-[#F4F9F9] text-slate-700 hover:bg-[#E8F4F5] border border-[#A6CFD5]/60'
                    }`}
                  >
                    {m.code}
                  </button>
                ))
              ) : (
                SECTORS_LIST.map(sec => (
                  <button
                    key={sec}
                    onClick={() => setSectorFilter(sec)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      sectorFilter === sec
                        ? 'bg-[#145C66] text-white shadow-xs font-bold'
                        : 'bg-[#F4F9F9] text-slate-700 hover:bg-[#E8F4F5] border border-[#A6CFD5]/60'
                    }`}
                  >
                    {sec}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* HIERARCHY TIER 2: LOCATION / STATE FILTER */}
          <div className="space-y-1.5 pt-1.5 border-t border-[#A6CFD5]/30">
            <span className="text-[10px] font-mono font-bold uppercase text-[#145C66] tracking-wider block">
              LOCATION / STATE
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => {
                  setStateFilter('All');
                  if (onStateChange) onStateChange(null);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  stateFilter === 'All'
                    ? 'bg-[#0A434B] text-white shadow-xs font-bold'
                    : 'bg-[#F4F9F9] text-slate-700 hover:bg-[#E8F4F5] border border-[#A6CFD5]/60'
                }`}
              >
                All Locations
              </button>
              {LOCATIONS_LIST.map(loc => (
                <button
                  key={loc}
                  onClick={() => {
                    setStateFilter(loc);
                    if (onStateChange) onStateChange(loc);
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    stateFilter === loc
                      ? 'bg-[#0A434B] text-white shadow-xs font-bold'
                      : 'bg-[#F4F9F9] text-slate-700 hover:bg-[#E8F4F5] border border-[#A6CFD5]/60'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* HIERARCHY TIER 3: PROJECT STATUS & SEARCH */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1.5 border-t border-[#A6CFD5]/30">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-[#145C66] tracking-wider block">
                PROJECT STATUS
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'All', label: 'All Projects' },
                  { id: 'Ongoing', label: 'Ongoing' },
                  { id: 'Completed', label: 'Completed' },
                  { id: 'Delayed', label: 'Delayed' },
                  { id: 'HighRisk', label: 'High Risk' }
                ].map(st => (
                  <button
                    key={st.id}
                    onClick={() => setStatusFilter(st.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      statusFilter === st.id
                        ? 'bg-amber-600 text-white shadow-xs font-bold'
                        : 'bg-[#F4F9F9] text-slate-700 hover:bg-[#E8F4F5] border border-[#A6CFD5]/60'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyword Search Input */}
            <div className="relative min-w-[220px]">
              <input
                type="text"
                placeholder="Search Project ID, Name, Agency..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F4F9F9] text-xs text-slate-800 placeholder-slate-400 rounded-lg pl-8 pr-3 py-1.5 border border-[#A6CFD5] focus:outline-none focus:border-[#145C66]"
              />
              <Search className="w-3.5 h-3.5 text-[#145C66] absolute left-2.5 top-2" />
              {searchQuery && (
                <X 
                  className="w-3 h-3 text-slate-400 absolute right-2.5 top-2.5 cursor-pointer hover:text-slate-700" 
                  onClick={() => setSearchQuery('')}
                />
              )}
            </div>
          </div>

        </div>

        {/* ==================================================== */}
        {/* DASHBOARD SUMMARY PANEL (COMPACT CALCULATED METRICS) */}
        {/* ==================================================== */}
        <div className="rounded-xl glass-panel p-4 border border-[#A6CFD5] bg-gradient-to-r from-white via-[#F4F9F9] to-[#EBF4F5] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-mono font-bold uppercase text-[#145C66] tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-[#145C66]" />
              PROJECT SUMMARY (CALCULATED FROM ACTIVE FILTERS)
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-slate-500 hover:text-[#145C66] flex items-center gap-1 font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Filters
            </button>
          </div>

          {/* Counts & Costs Grid - Compact */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded-lg bg-white border border-[#A6CFD5]/70 shadow-2xs">
              <p className="text-[9px] uppercase font-mono font-bold text-slate-500">TOTAL PROJECTS</p>
              <p className="text-xl font-extrabold font-heading text-slate-900 mt-0.5">{summary.totalProjects}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#A6CFD5]/70 shadow-2xs">
              <p className="text-[9px] uppercase font-mono font-bold text-cyan-700">ONGOING</p>
              <p className="text-xl font-extrabold font-heading text-cyan-800 mt-0.5">{summary.ongoing}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#A6CFD5]/70 shadow-2xs">
              <p className="text-[9px] uppercase font-mono font-bold text-emerald-700">COMPLETED</p>
              <p className="text-xl font-extrabold font-heading text-emerald-800 mt-0.5">{summary.completed}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#A6CFD5]/70 shadow-2xs">
              <p className="text-[9px] uppercase font-mono font-bold text-amber-700">DELAYED</p>
              <p className="text-xl font-extrabold font-heading text-amber-800 mt-0.5">{summary.delayed}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-lg bg-white border border-[#A6CFD5]/70 shadow-2xs">
              <p className="text-[9px] uppercase font-mono font-bold text-slate-500">ORIGINAL COST</p>
              <p className="text-base font-extrabold font-mono text-slate-900 mt-0.5">₹{summary.totalOriginalCost.toLocaleString()} Cr</p>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#A6CFD5]/70 shadow-2xs">
              <p className="text-[9px] uppercase font-mono font-bold text-amber-800">REVISED COST</p>
              <p className="text-base font-extrabold font-mono text-amber-900 mt-0.5">₹{summary.totalRevisedCost.toLocaleString()} Cr</p>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#A6CFD5]/70 shadow-2xs">
              <p className="text-[9px] uppercase font-mono font-bold text-[#145C66]">EXPENDITURE</p>
              <p className="text-base font-extrabold font-mono text-[#0A434B] mt-0.5">₹{summary.totalExpenditure.toLocaleString()} Cr</p>
            </div>
          </div>

          {/* Average Physical Progress Bar - Compact */}
          <div className="p-2.5 rounded-lg bg-white border border-[#A6CFD5]/70 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="font-bold text-slate-700 uppercase">Average Physical Progress</span>
              <span className="font-extrabold text-emerald-700 text-xs">{summary.averageProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#E8F4F5] border border-[#A6CFD5] overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#145C66] to-emerald-600 transition-all duration-500"
                style={{ width: `${summary.averageProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* PROJECTS DISPLAY & VIEW CONTROLS                      */}
        {/* ==================================================== */}
        <div className="space-y-3">
          
          {/* Large Prominent Description Header (BIOGRAPH Style) */}
          <div className="text-center py-12 sm:py-16 my-4 space-y-4 max-w-4xl mx-auto px-4">
            <span className="inline-block text-[11px] sm:text-xs font-mono font-extrabold uppercase text-[#145C66] tracking-[0.3em] bg-[#E8F4F5] px-3.5 py-1 rounded-full border border-[#A6CFD5] shadow-2xs">
              PROJECT INSPECTION & AUDIT
            </span>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900 leading-snug tracking-tight">
              "Real-time infrastructure intelligence & explainable AI risk monitoring across major national projects."
            </h2>

            <p className="text-xs sm:text-sm font-medium text-slate-600 max-w-2xl mx-auto pt-1">
              Showing <span className="font-bold text-[#145C66] font-mono">{filteredProjects.length} Active Projects</span>. Select any project card on the left to inspect live expenditure, physical progress, and risk breakdown.
            </p>
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="p-10 text-center rounded-xl glass-panel border border-[#A6CFD5] bg-white space-y-2.5 shadow-2xs">
              <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">No Projects Match Selected Filters</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Try selecting a different Ministry, Sector, or Location to display projects.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-3.5 py-1.5 rounded-lg bg-[#145C66] text-white text-xs font-semibold shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* SIDE-BY-SIDE SCROLL-SYNCHRONIZED INSPECTOR VIEW (HIGH-PERFORMANCE FRAMER MOTION) */}
          {viewMode === 'split' && filteredProjects.length > 0 && (
            <ProjectSplitSection
              projects={filteredProjects}
              onSelectProject={onSelectProject}
            />
          )}

          {/* GRID CARDS VIEW */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map((prj) => {
                const origCost = prj.approvedCost || prj.estimatedCost || 0;
                const revCost = prj.currentCost || origCost;
                const expCost = prj.expenditure !== undefined ? prj.expenditure : Math.round(revCost * ((prj.progressPercent || 0) / 100));

                return (
                  <div
                    key={prj.id}
                    className="rounded-xl glass-panel p-4 border border-[#A6CFD5]/70 glass-panel-hover flex flex-col justify-between group bg-white shadow-2xs space-y-3"
                  >
                    <div className="space-y-2.5">
                      
                      {/* Row 1: Project ID & Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold bg-[#A6CFD5]/35 text-[#0A434B] px-2 py-0.5 rounded border border-[#A6CFD5]">
                          {prj.id}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-[#0A434B] bg-[#E8F4F5] px-2 py-0.5 rounded border border-[#A6CFD5]">
                            <MapPin className="w-3 h-3 text-[#145C66]" />
                            {prj.state}
                          </span>

                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            prj.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                            prj.status === 'Delayed' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                            'bg-cyan-100 text-cyan-800 border border-cyan-300'
                          }`}>
                            {prj.status}
                          </span>
                        </div>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#145C66] transition-colors line-clamp-2">
                        {prj.name}
                      </h3>

                      {/* Metadata Grid: Sector, Ministry, Agency, Location */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 p-2.5 rounded-lg bg-[#F4F9F9] border border-[#A6CFD5]/50">
                        <div>
                          <span className="text-[9px] font-mono text-slate-500 block">Sector</span>
                          <span className="font-semibold text-slate-800 line-clamp-1">{prj.sector}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-slate-500 block">Ministry</span>
                          <span className="font-semibold text-slate-800 line-clamp-1">{prj.ministry}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-slate-500 block">Agency</span>
                          <span className="font-semibold text-slate-800 line-clamp-1">{prj.department || prj.agency}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-slate-500 block">Location</span>
                          <span className="font-semibold text-slate-800 line-clamp-1">{prj.state}</span>
                        </div>
                      </div>

                      {/* Financial Grid: Original Cost, Revised Cost, Expenditure */}
                      <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-white border border-[#A6CFD5]/60 text-[11px] text-center">
                        <div>
                          <p className="text-[8px] font-mono text-slate-500 uppercase">Original Cost</p>
                          <p className="font-extrabold font-mono text-slate-900">₹{origCost.toLocaleString()} Cr</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-mono text-slate-500 uppercase">Revised Cost</p>
                          <p className="font-extrabold font-mono text-amber-900">₹{revCost.toLocaleString()} Cr</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-mono text-slate-500 uppercase">Expenditure</p>
                          <p className="font-extrabold font-mono text-[#0A434B]">₹{expCost.toLocaleString()} Cr</p>
                        </div>
                      </div>

                      {/* Physical Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-slate-600 font-medium">Physical Progress</span>
                          <span className="font-bold text-emerald-700">{prj.progressPercent}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#E8F4F5] border border-[#A6CFD5]/60 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              prj.progressPercent === 100 ? 'bg-emerald-600' :
                              prj.status === 'Delayed' ? 'bg-amber-500' : 'bg-[#145C66]'
                            }`}
                            style={{ width: `${prj.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Timeline Dates Row */}
                      <div className="grid grid-cols-3 gap-1 pt-1 text-[9px] text-slate-600 font-mono border-t border-[#A6CFD5]/30">
                        <div>
                          <span className="text-slate-400 block">Start</span>
                          <span className="font-semibold">{prj.startDate}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Orig Comp</span>
                          <span className="font-semibold">{prj.targetCompletion}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Rev Comp</span>
                          <span className="font-semibold text-amber-800">{prj.expectedCompletion}</span>
                        </div>
                      </div>

                    </div>

                    {/* View Details Action Button */}
                    <button
                      onClick={() => onSelectProject(prj.id)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#145C66] hover:bg-[#0A434B] text-white text-xs font-semibold shadow-2xs transition-all"
                    >
                      <span>View Project Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                  </div>
                );
              })}
            </div>
          )}

          {/* TABLE VIEW (HORIZONTALLY SCROLLABLE) */}
          {viewMode === 'table' && (
            <div className="rounded-xl glass-panel border border-[#A6CFD5] bg-white overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 min-w-[1100px]">
                  <thead className="bg-[#E8F4F5] text-[#0A434B] font-mono uppercase text-[10px] border-b border-[#A6CFD5] font-bold">
                    <tr>
                      <th className="py-3 px-3">Project ID</th>
                      <th className="py-3 px-3">Sector</th>
                      <th className="py-3 px-3">Ministry</th>
                      <th className="py-3 px-3">Agency</th>
                      <th className="py-3 px-3">Location</th>
                      <th className="py-3 px-3">Original Cost</th>
                      <th className="py-3 px-3">Revised Cost</th>
                      <th className="py-3 px-3">Expenditure</th>
                      <th className="py-3 px-3">Start Date</th>
                      <th className="py-3 px-3">Orig Comp</th>
                      <th className="py-3 px-3">Rev Comp</th>
                      <th className="py-3 px-3">Progress</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#A6CFD5]/40 font-medium text-[11px]">
                    {filteredProjects.map((prj) => {
                      const origCost = prj.approvedCost || prj.estimatedCost || 0;
                      const revCost = prj.currentCost || origCost;
                      const expCost = prj.expenditure !== undefined ? prj.expenditure : Math.round(revCost * ((prj.progressPercent || 0) / 100));

                      return (
                        <tr key={prj.id} className="hover:bg-[#F4F9F9] transition-colors">
                          <td className="py-2.5 px-3 font-mono font-bold text-[#0A434B]">
                            {prj.id}
                          </td>
                          <td className="py-2.5 px-3 text-slate-800">
                            {prj.sector}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 max-w-[160px] truncate" title={prj.ministry}>
                            {prj.ministry}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 max-w-[150px] truncate" title={prj.department}>
                            {prj.department || prj.agency}
                          </td>
                          <td className="py-2.5 px-3 text-slate-800">
                            {prj.state}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-semibold text-slate-900">
                            ₹{origCost.toLocaleString()} Cr
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-amber-900">
                            ₹{revCost.toLocaleString()} Cr
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-[#0A434B]">
                            ₹{expCost.toLocaleString()} Cr
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-600">
                            {prj.startDate}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-600">
                            {prj.targetCompletion}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-semibold text-amber-800">
                            {prj.expectedCompletion}
                          </td>
                          <td className="py-2.5 px-3 font-mono">
                            <span className="font-bold text-emerald-700">{prj.progressPercent}%</span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => onSelectProject(prj.id)}
                              className="px-2.5 py-1 rounded bg-[#145C66] hover:bg-[#0A434B] text-white text-[11px] font-semibold shadow-2xs transition-all whitespace-nowrap"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
