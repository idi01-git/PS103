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
    <div className="py-6 sm:py-8 bg-[#fafafa] min-h-screen text-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* ==================================================== */}
        {/* HEADER & FILTER HIERARCHY BAR                        */}
        {/* ==================================================== */}
        <div className="rounded-[12px] bg-white p-5 sm:p-6 border border-[#ebebeb] shadow-whisper space-y-4">
          
          {/* Top Title & Mode Selector Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ebebeb] pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="mono-eyebrow text-[10px] text-[#8f8f8f]">
                  NATIONAL PORTFOLIO SURVEILLANCE
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold text-[#171717] tracking-[-0.8px]">
                Project Intelligence Directory
              </h1>
            </div>

            {/* [ MINISTRY-WISE ] [ SECTOR-WISE ] TOGGLE (6px square Geist app buttons) */}
            <div className="flex p-0.5 rounded-[6px] bg-[#f2f2f2] border border-[#ebebeb]">
              <button
                onClick={() => {
                  setGroupMode('ministry');
                  setSectorFilter('All');
                }}
                className={`px-3 py-1.5 rounded-[4px] text-xs font-mono font-medium transition-all ${
                  groupMode === 'ministry' 
                    ? 'bg-[#171717] text-white shadow-xs' 
                    : 'text-[#4d4d4d] hover:text-[#171717]'
                }`}
              >
                MINISTRY VIEW
              </button>
              <button
                onClick={() => {
                  setGroupMode('sector');
                  setMinistryFilter('All');
                }}
                className={`px-3 py-1.5 rounded-[4px] text-xs font-mono font-medium transition-all ${
                  groupMode === 'sector' 
                    ? 'bg-[#171717] text-white shadow-xs' 
                    : 'text-[#4d4d4d] hover:text-[#171717]'
                }`}
              >
                SECTOR VIEW
              </button>
            </div>
          </div>

          {/* HIERARCHY TIER 1: CATEGORY TABS (64px rounded per Geist button-category-pill spec) */}
          <div className="space-y-2">
            <span className="mono-eyebrow text-[10px] text-[#8f8f8f] block">
              {groupMode === 'ministry' ? 'FILTER BY MINISTRY' : 'FILTER BY SECTOR'}
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => {
                  if (groupMode === 'ministry') setMinistryFilter('All');
                  else setSectorFilter('All');
                }}
                className={`px-3.5 py-1.5 rounded-[64px] text-xs font-medium transition-all ${
                  (groupMode === 'ministry' ? ministryFilter === 'All' : sectorFilter === 'All')
                    ? 'bg-[#171717] text-white shadow-xs'
                    : 'bg-[#ffffff] text-[#4d4d4d] hover:text-[#171717] hover:bg-[#fafafa] border border-[#ebebeb]'
                }`}
              >
                All {groupMode === 'ministry' ? 'Ministries' : 'Sectors'}
              </button>

              {groupMode === 'ministry' ? (
                MINISTRIES_DATA.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setMinistryFilter(m.name)}
                    className={`px-3.5 py-1.5 rounded-[64px] text-xs font-medium transition-all ${
                      ministryFilter === m.name
                        ? 'bg-[#171717] text-white shadow-xs'
                        : 'bg-[#ffffff] text-[#4d4d4d] hover:text-[#171717] hover:bg-[#fafafa] border border-[#ebebeb]'
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
                    className={`px-3.5 py-1.5 rounded-[64px] text-xs font-medium transition-all ${
                      sectorFilter === sec
                        ? 'bg-[#171717] text-white shadow-xs'
                        : 'bg-[#ffffff] text-[#4d4d4d] hover:text-[#171717] hover:bg-[#fafafa] border border-[#ebebeb]'
                    }`}
                  >
                    {sec}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* HIERARCHY TIER 2: LOCATION / STATE FILTER */}
          <div className="space-y-2 pt-2 border-t border-[#ebebeb]">
            <span className="mono-eyebrow text-[10px] text-[#8f8f8f] block">
              LOCATION // STATE / UT
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => {
                  setStateFilter('All');
                  if (onStateChange) onStateChange(null);
                }}
                className={`px-3 py-1 rounded-[6px] text-xs font-medium transition-all ${
                  stateFilter === 'All'
                    ? 'bg-[#171717] text-white shadow-xs'
                    : 'bg-[#ffffff] text-[#4d4d4d] hover:text-[#171717] hover:bg-[#fafafa] border border-[#ebebeb]'
                }`}
              >
                All States
              </button>
              {LOCATIONS_LIST.map(loc => (
                <button
                  key={loc}
                  onClick={() => {
                    setStateFilter(loc);
                    if (onStateChange) onStateChange(loc);
                  }}
                  className={`px-3 py-1 rounded-[6px] text-xs font-medium transition-all ${
                    stateFilter === loc
                      ? 'bg-[#171717] text-white shadow-xs'
                      : 'bg-[#ffffff] text-[#4d4d4d] hover:text-[#171717] hover:bg-[#fafafa] border border-[#ebebeb]'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* HIERARCHY TIER 3: PROJECT STATUS & SEARCH */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-[#ebebeb]">
            <div className="space-y-1.5">
              <span className="mono-eyebrow text-[10px] text-[#8f8f8f] block">
                EXECUTION STATUS
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
                    className={`px-3 py-1 rounded-[6px] text-xs font-medium transition-all ${
                      statusFilter === st.id
                        ? 'bg-[#171717] text-white shadow-xs'
                        : 'bg-[#ffffff] text-[#4d4d4d] hover:text-[#171717] hover:bg-[#fafafa] border border-[#ebebeb]'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyword Search Input (Geist 6px rounded field) */}
            <div className="relative min-w-[240px]">
              <input
                type="text"
                placeholder="Search ID, Name, Agency..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-xs text-[#171717] placeholder-[#8f8f8f] rounded-[6px] pl-8 pr-3 py-2 border border-[#ebebeb] focus:outline-none focus:border-[#171717] shadow-whisper"
              />
              <Search className="w-3.5 h-3.5 text-[#8f8f8f] absolute left-2.5 top-2.5" />
              {searchQuery && (
                <X 
                  className="w-3.5 h-3.5 text-[#8f8f8f] absolute right-2.5 top-2.5 cursor-pointer hover:text-[#171717]" 
                  onClick={() => setSearchQuery('')}
                />
              )}
            </div>
          </div>

        </div>

        {/* ==================================================== */}
        {/* DASHBOARD SUMMARY PANEL (COMPACT CALCULATED METRICS) */}
        {/* ==================================================== */}
        <div className="rounded-[12px] bg-white p-5 border border-[#ebebeb] shadow-whisper space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="mono-eyebrow text-[#8f8f8f] flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-[#171717]" />
              ACTIVE FILTER METRIC AGGREGATION
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#4d4d4d] hover:text-[#171717] flex items-center gap-1 font-mono transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Filters
            </button>
          </div>

          {/* Counts & Costs Grid - Geist Minimal Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-[6px] bg-[#fafafa] border border-[#ebebeb]">
              <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">TOTAL PROJECTS</p>
              <p className="text-xl font-semibold text-[#171717] font-mono mt-0.5">{summary.totalProjects}</p>
            </div>
            <div className="p-3 rounded-[6px] bg-[#fafafa] border border-[#ebebeb]">
              <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">ONGOING</p>
              <p className="text-xl font-semibold text-[#0070f3] font-mono mt-0.5">{summary.ongoing}</p>
            </div>
            <div className="p-3 rounded-[6px] bg-[#fafafa] border border-[#ebebeb]">
              <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">COMPLETED</p>
              <p className="text-xl font-semibold text-emerald-600 font-mono mt-0.5">{summary.completed}</p>
            </div>
            <div className="p-3 rounded-[6px] bg-[#fafafa] border border-[#ebebeb]">
              <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">DELAYED</p>
              <p className="text-xl font-semibold text-amber-600 font-mono mt-0.5">{summary.delayed}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-[6px] bg-[#fafafa] border border-[#ebebeb]">
              <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">ORIGINAL ESTIMATE</p>
              <p className="text-base font-semibold font-mono text-[#171717] mt-0.5">₹{summary.totalOriginalCost.toLocaleString()} Cr</p>
            </div>
            <div className="p-3 rounded-[6px] bg-[#fafafa] border border-[#ebebeb]">
              <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">REVISED EXPOSURE</p>
              <p className="text-base font-semibold font-mono text-[#171717] mt-0.5">₹{summary.totalRevisedCost.toLocaleString()} Cr</p>
            </div>
            <div className="p-3 rounded-[6px] bg-[#fafafa] border border-[#ebebeb]">
              <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">TOTAL EXPENDITURE</p>
              <p className="text-base font-semibold font-mono text-[#0070f3] mt-0.5">₹{summary.totalExpenditure.toLocaleString()} Cr</p>
            </div>
          </div>

          {/* Average Physical Progress Bar */}
          <div className="p-3 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="mono-eyebrow text-[10px] text-[#8f8f8f]">AVERAGE PHYSICAL COMPLETION</span>
              <span className="font-semibold text-[#171717]">{summary.averageProgress}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#ebebeb] overflow-hidden">
              <div 
                className="h-full rounded-full bg-[#171717] transition-all duration-500"
                style={{ width: `${summary.averageProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* PROJECTS DISPLAY & VIEW CONTROLS                      */}
        {/* ==================================================== */}
        <div className="space-y-4">
          
          {/* Header Bar with View Mode Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
            <div>
              <span className="text-xs font-mono text-[#8f8f8f]">
                DISPLAYING <strong className="text-[#171717]">{filteredProjects.length}</strong> PROJECTS
              </span>
            </div>

            {/* View Mode Switcher (6px square Geist app buttons) */}
            <div className="flex items-center gap-1 p-0.5 rounded-[6px] bg-[#f2f2f2] border border-[#ebebeb] self-start sm:self-auto">
              <button
                onClick={() => setViewMode('split')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-medium transition-all ${
                  viewMode === 'split'
                    ? 'bg-[#171717] text-white shadow-xs'
                    : 'text-[#4d4d4d] hover:text-[#171717]'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Split View</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#171717] text-white shadow-xs'
                    : 'text-[#4d4d4d] hover:text-[#171717]'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>

              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-medium transition-all ${
                  viewMode === 'table'
                    ? 'bg-[#171717] text-white shadow-xs'
                    : 'text-[#4d4d4d] hover:text-[#171717]'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Table View</span>
              </button>
            </div>
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="p-12 text-center rounded-[12px] bg-white border border-[#ebebeb] space-y-3 shadow-whisper">
              <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
              <h3 className="text-base font-semibold text-[#171717]">No Projects Match Selected Filters</h3>
              <p className="text-xs text-[#4d4d4d] max-w-md mx-auto font-normal">
                Try resetting or choosing a different Ministry, Sector, or Location.
              </p>
              <button
                onClick={handleResetFilters}
                className="btn-app-sm bg-[#171717] text-white text-xs mt-2"
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
                    className="rounded-[12px] bg-white p-5 border border-[#ebebeb] shadow-whisper hover:border-[#d4d4d4] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between group space-y-4"
                  >
                    <div className="space-y-3">
                      
                      {/* Row 1: Project ID & Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-semibold bg-[#f2f2f2] text-[#171717] px-2.5 py-0.5 rounded-[4px] border border-[#ebebeb]">
                          {prj.id}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span className="flex items-center gap-1 text-xs text-[#4d4d4d] bg-[#fafafa] px-2 py-0.5 rounded-[4px] border border-[#ebebeb]">
                            <MapPin className="w-3 h-3 text-[#0070f3]" />
                            {prj.state}
                          </span>

                          <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-semibold uppercase ${
                            prj.status === 'Completed' ? 'bg-[#f0fdf4] text-emerald-700 border border-[#bbf7d0]' :
                            prj.status === 'Delayed' ? 'bg-[#fffbeb] text-amber-700 border border-[#fde68a]' :
                            'bg-[#eff6ff] text-[#0070f3] border border-[#bfdbfe]'
                          }`}>
                            {prj.status}
                          </span>
                        </div>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-sm font-semibold text-[#171717] group-hover:text-[#0070f3] transition-colors line-clamp-2">
                        {prj.name}
                      </h3>

                      {/* Metadata Grid: Sector, Ministry, Agency, Location */}
                      <div className="grid grid-cols-2 gap-2 text-xs text-[#4d4d4d] p-3 rounded-[6px] bg-[#fafafa] border border-[#ebebeb]">
                        <div>
                          <span className="mono-eyebrow text-[9px] text-[#8f8f8f] block">Sector</span>
                          <span className="font-medium text-[#171717] line-clamp-1">{prj.sector}</span>
                        </div>
                        <div>
                          <span className="mono-eyebrow text-[9px] text-[#8f8f8f] block">Ministry</span>
                          <span className="font-medium text-[#171717] line-clamp-1">{prj.ministry}</span>
                        </div>
                        <div>
                          <span className="mono-eyebrow text-[9px] text-[#8f8f8f] block">Agency</span>
                          <span className="font-medium text-[#171717] line-clamp-1">{prj.department || prj.agency}</span>
                        </div>
                        <div>
                          <span className="mono-eyebrow text-[9px] text-[#8f8f8f] block">Location</span>
                          <span className="font-medium text-[#171717] line-clamp-1">{prj.state}</span>
                        </div>
                      </div>

                      {/* Financial Grid: Original Cost, Revised Cost, Expenditure */}
                      <div className="grid grid-cols-3 gap-2 p-2.5 rounded-[6px] bg-white border border-[#ebebeb] text-center">
                        <div>
                          <p className="mono-eyebrow text-[8px] text-[#8f8f8f]">ORIGINAL</p>
                          <p className="font-semibold font-mono text-xs text-[#171717]">₹{origCost.toLocaleString()} Cr</p>
                        </div>
                        <div>
                          <p className="mono-eyebrow text-[8px] text-[#8f8f8f]">REVISED</p>
                          <p className="font-semibold font-mono text-xs text-amber-700">₹{revCost.toLocaleString()} Cr</p>
                        </div>
                        <div>
                          <p className="mono-eyebrow text-[8px] text-[#8f8f8f]">EXPENDITURE</p>
                          <p className="font-semibold font-mono text-xs text-[#0070f3]">₹{expCost.toLocaleString()} Cr</p>
                        </div>
                      </div>

                      {/* Physical Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-[#8f8f8f]">Physical Progress</span>
                          <span className="font-semibold text-[#171717]">{prj.progressPercent}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#ebebeb] overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              prj.progressPercent === 100 ? 'bg-emerald-600' :
                              prj.status === 'Delayed' ? 'bg-amber-600' : 'bg-[#171717]'
                            }`}
                            style={{ width: `${prj.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Timeline Dates Row */}
                      <div className="grid grid-cols-3 gap-1 pt-1 text-[10px] text-[#8f8f8f] font-mono border-t border-[#ebebeb]">
                        <div>
                          <span className="text-[#8f8f8f] block">Start</span>
                          <span className="font-medium text-[#171717]">{prj.startDate}</span>
                        </div>
                        <div>
                          <span className="text-[#8f8f8f] block">Target</span>
                          <span className="font-medium text-[#171717]">{prj.targetCompletion}</span>
                        </div>
                        <div>
                          <span className="text-[#8f8f8f] block">Expected</span>
                          <span className="font-medium text-amber-700">{prj.expectedCompletion}</span>
                        </div>
                      </div>

                    </div>

                    {/* View Details Action Button (Geist 6px rounded) */}
                    <button
                      onClick={() => onSelectProject(prj.id)}
                      className="w-full btn-app-sm bg-[#171717] hover:bg-[#333333] text-white text-xs font-medium justify-center gap-1.5"
                    >
                      <span>Inspect Project Dossier</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                  </div>
                );
              })}
            </div>
          )}

          {/* TABLE VIEW (HORIZONTALLY SCROLLABLE) */}
          {viewMode === 'table' && (
            <div className="rounded-[12px] bg-white border border-[#ebebeb] overflow-hidden shadow-whisper">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#171717] min-w-[1100px]">
                  <thead className="bg-[#fafafa] text-[#8f8f8f] font-mono uppercase text-[10px] border-b border-[#ebebeb]">
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
                  <tbody className="divide-y divide-[#ebebeb] text-xs">
                    {filteredProjects.map((prj) => {
                      const origCost = prj.approvedCost || prj.estimatedCost || 0;
                      const revCost = prj.currentCost || origCost;
                      const expCost = prj.expenditure !== undefined ? prj.expenditure : Math.round(revCost * ((prj.progressPercent || 0) / 100));

                      return (
                        <tr key={prj.id} className="hover:bg-[#fafafa] transition-colors">
                          <td className="py-2.5 px-3 font-mono font-semibold text-[#171717]">
                            {prj.id}
                          </td>
                          <td className="py-2.5 px-3 text-[#171717]">
                            {prj.sector}
                          </td>
                          <td className="py-2.5 px-3 text-[#4d4d4d] max-w-[160px] truncate" title={prj.ministry}>
                            {prj.ministry}
                          </td>
                          <td className="py-2.5 px-3 text-[#4d4d4d] max-w-[150px] truncate" title={prj.department}>
                            {prj.department || prj.agency}
                          </td>
                          <td className="py-2.5 px-3 text-[#171717]">
                            {prj.state}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-medium text-[#171717]">
                            ₹{origCost.toLocaleString()} Cr
                          </td>
                          <td className="py-2.5 px-3 font-mono font-medium text-amber-700">
                            ₹{revCost.toLocaleString()} Cr
                          </td>
                          <td className="py-2.5 px-3 font-mono font-medium text-[#0070f3]">
                            ₹{expCost.toLocaleString()} Cr
                          </td>
                          <td className="py-2.5 px-3 font-mono text-[#8f8f8f]">
                            {prj.startDate}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-[#8f8f8f]">
                            {prj.targetCompletion}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-amber-700">
                            {prj.expectedCompletion}
                          </td>
                          <td className="py-2.5 px-3 font-mono">
                            <span className="font-semibold text-[#171717]">{prj.progressPercent}%</span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => onSelectProject(prj.id)}
                              className="btn-app-sm bg-[#171717] hover:bg-[#333333] text-white text-xs whitespace-nowrap"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}
