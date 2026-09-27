import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS_MASTER, getStateAggregates, MINISTRIES_DATA, calculateDashboardSummary } from '../data/projectsData';
import { useProjectData } from '../context/DataContext';
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
  initialMinistry,
  initialSector,
  initialSearchQuery
}) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const [groupMode, setGroupMode] = useState(
    initialSector && initialSector !== 'All' 
      ? 'sector' 
      : (initialMinistry && initialMinistry !== 'All' ? 'ministry' : 'ministry')
  );
  const [stateFilter, setStateFilter] = useState(selectedState || 'All');
  const [ministryFilter, setMinistryFilter] = useState(initialMinistry || 'All');
  const [sectorFilter, setSectorFilter] = useState(initialSector || 'All');
  const [statusFilter, setStatusFilter] = useState(initialFilterStatus || 'All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'grid' | 'table'
  const { projects: masterProjects, stateAggregates: dbStateAggregates, ministriesData, isLoading } = useProjectData();
  const sourceProjects = masterProjects && masterProjects.length > 0 ? masterProjects : PROJECTS_MASTER;
  const [activeProjectId, setActiveProjectId] = useState(sourceProjects[0]?.id);

  const availableMinistries = useMemo(() => {
    return ministriesData && ministriesData.length > 0 ? ministriesData : MINISTRIES_DATA;
  }, [ministriesData]);

  // Dynamically extract real active sectors from source projects
  const availableSectors = useMemo(() => {
    const counts = {};
    const costs = {};
    sourceProjects.forEach(p => {
      const sec = p.sector?.trim() || 'Other Infrastructure';
      counts[sec] = (counts[sec] || 0) + 1;
      costs[sec] = (costs[sec] || 0) + (p.currentCost || p.approvedCost || 0);
    });

    return Object.keys(counts).sort().map(sec => ({
      name: sec,
      count: counts[sec],
      totalCostCr: costs[sec]
    }));
  }, [sourceProjects]);

  const localStateAggregates = useMemo(() => getStateAggregates(), []);
  const stateAggregates = dbStateAggregates || localStateAggregates;

  const availableStates = useMemo(() => {
    if (stateAggregates && Object.keys(stateAggregates).length > 0) {
      return Object.keys(stateAggregates).sort();
    }
    return LOCATIONS_LIST;
  }, [stateAggregates]);

  // Always start ProjectListing from the very top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    if (sourceProjects.length > 0 && !sourceProjects.find(p => p.id === activeProjectId)) {
      setActiveProjectId(sourceProjects[0].id);
    }
  }, [sourceProjects, activeProjectId]);

  // Sync stateFilter when selectedState prop changes
  useEffect(() => {
    if (selectedState) {
      setStateFilter(selectedState);
    } else {
      setStateFilter('All');
    }
  }, [selectedState]);

  // Sync ministryFilter when initialMinistry prop changes
  useEffect(() => {
    if (initialMinistry) {
      setMinistryFilter(initialMinistry);
      if (initialMinistry !== 'All') {
        setGroupMode('ministry');
        setSectorFilter('All');
      }
    }
  }, [initialMinistry]);

  // Sync sectorFilter when initialSector prop changes
  useEffect(() => {
    if (initialSector) {
      setSectorFilter(initialSector);
      if (initialSector !== 'All') {
        setGroupMode('sector');
        setMinistryFilter('All');
      }
    }
  }, [initialSector]);

  // Sync statusFilter when initialFilterStatus prop changes
  useEffect(() => {
    if (initialFilterStatus) {
      setStatusFilter(initialFilterStatus);
    }
  }, [initialFilterStatus]);

  // Sync searchQuery when initialSearchQuery prop changes
  useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Filtered Projects Logic based on multi-tiered hierarchy
  const filteredProjects = useMemo(() => {
    return sourceProjects.filter(p => {
      // Search matching Name and PAIMANA ID
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = (p.name || '').toLowerCase().includes(q) || (p.shortName || '').toLowerCase().includes(q);
        const matchesId = (p.id || '').toLowerCase().includes(q) || (p.rawId || '').toLowerCase().includes(q);
        const matchesState = (p.state || '').toLowerCase().includes(q);
        const matchesMinistry = (p.ministry || '').toLowerCase().includes(q);
        const matchesDept = (p.department || p.agency || '').toLowerCase().includes(q);
        const matchesSector = (p.sector || '').toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesState && !matchesMinistry && !matchesDept && !matchesSector) return false;
      }

      // Group Mode specifics
      if (groupMode === 'ministry') {
        if (ministryFilter !== 'All') {
          const mFilter = ministryFilter.toLowerCase().trim();
          const pMin = (p.ministry || '').toLowerCase().trim();
          if (!pMin.includes(mFilter) && !mFilter.includes(pMin)) return false;
        }
      } else if (groupMode === 'sector') {
        if (sectorFilter !== 'All') {
          const sFilter = sectorFilter.toLowerCase().trim();
          const pSec = (p.sector || '').toLowerCase().trim();
          if (!pSec.includes(sFilter) && !sFilter.includes(pSec)) return false;
        }
      }

      // State / Location (case-insensitive & whitespace trimmed)
      if (stateFilter !== 'All' && p.state?.toLowerCase().trim() !== stateFilter.toLowerCase().trim()) return false;

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
  }, [sourceProjects, searchQuery, groupMode, ministryFilter, sectorFilter, stateFilter, statusFilter, riskFilter]);

  // Sync activeProjectId with filteredProjects
  useEffect(() => {
    if (filteredProjects.length > 0) {
      const exists = filteredProjects.some(p => p.id === activeProjectId);
      if (!exists) {
        setActiveProjectId(filteredProjects[0].id);
      }
    }
  }, [filteredProjects, activeProjectId]);

  // Visible count & pagination for Grid and Table modes
  const [visibleCount, setVisibleCount] = useState(60);

  useEffect(() => {
    setVisibleCount(60);
  }, [stateFilter, ministryFilter, sectorFilter, statusFilter, riskFilter, searchQuery]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

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
        {/* 1. UNIFIED SEARCH & FILTER CONTROL BAR               */}
        {/* ==================================================== */}
        <div className="rounded-[16px] bg-white p-5 sm:p-6 border border-[#ebebeb] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          
          {/* Header Row: Title & Mode Toggle & Search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#f1f5f9] pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#0070f3]"></span>
                <span className="mono-eyebrow text-[10px] text-[#0070f3] font-bold">
                  NATIONAL INFRASTRUCTURE SURVEILLANCE
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight">
                Project Intelligence Directory
              </h1>
              <p className="text-xs text-[#64748b] mt-0.5">
                Authoritative MoSPI surveillance &amp; predictive early-warning across national portfolios.
              </p>
            </div>

            {/* Global Search & Reset */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative min-w-[260px] flex-1 sm:flex-initial">
                <input
                  type="text"
                  placeholder="Search project name, ID, sector..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f8fafc] text-xs text-[#0f172a] placeholder-[#94a3b8] rounded-lg pl-8 pr-7 py-2 border border-[#e2e8f0] focus:outline-none focus:border-[#0070f3] focus:bg-white transition-all"
                />
                <Search className="w-3.5 h-3.5 text-[#94a3b8] absolute left-2.5 top-2.5" />
                {searchQuery && (
                  <X 
                    className="w-3.5 h-3.5 text-[#94a3b8] absolute right-2.5 top-2.5 cursor-pointer hover:text-[#0f172a]" 
                    onClick={() => setSearchQuery('')}
                  />
                )}
              </div>

              {(searchQuery || stateFilter !== 'All' || ministryFilter !== 'All' || sectorFilter !== 'All' || statusFilter !== 'All') && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-mono text-[#64748b] hover:text-[#0f172a] bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors cursor-pointer"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Filter Row: Segmented Controls & Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center pt-1">
            
            {/* Ministry / Sector Selector (6 Cols) */}
            <div className="md:col-span-5 flex items-center gap-2">
              <div className="flex p-0.5 rounded-lg bg-[#f1f5f9] border border-[#e2e8f0] shrink-0">
                <button
                  onClick={() => {
                    setGroupMode('ministry');
                    setSectorFilter('All');
                  }}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] font-mono font-medium transition-all ${
                    groupMode === 'ministry' 
                      ? 'bg-white text-[#0f172a] shadow-xs font-semibold' 
                      : 'text-[#64748b] hover:text-[#0f172a]'
                  }`}
                >
                  Ministry
                </button>
                <button
                  onClick={() => {
                    setGroupMode('sector');
                    setMinistryFilter('All');
                  }}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] font-mono font-medium transition-all ${
                    groupMode === 'sector' 
                      ? 'bg-white text-[#0f172a] shadow-xs font-semibold' 
                      : 'text-[#64748b] hover:text-[#0f172a]'
                  }`}
                >
                  Sector
                </button>
              </div>

              {groupMode === 'ministry' ? (
                <select
                  value={ministryFilter}
                  onChange={(e) => setMinistryFilter(e.target.value)}
                  className="w-full text-xs bg-[#f8fafc] text-[#0f172a] p-2 rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#0070f3] font-sans truncate"
                >
                  <option value="All">All Ministries ({sourceProjects.length} Projects)</option>
                  {availableMinistries.map(m => {
                    const count = sourceProjects.filter(p => (p.ministry || '').toLowerCase().includes((m.name || m.code).toLowerCase())).length;
                    return (
                      <option key={m.id || m.code} value={m.name}>
                        {m.name} ({count})
                      </option>
                    );
                  })}
                </select>
              ) : (
                <select
                  value={sectorFilter}
                  onChange={(e) => setSectorFilter(e.target.value)}
                  className="w-full text-xs bg-[#f8fafc] text-[#0f172a] p-2 rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#0070f3] font-sans truncate"
                >
                  <option value="All">All Sectors ({sourceProjects.length} Projects)</option>
                  {availableSectors.map(sec => (
                    <option key={sec.name} value={sec.name}>
                      {sec.name} ({sec.count})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* State Filter (3 Cols) */}
            <div className="md:col-span-3">
              <select
                value={stateFilter || 'All'}
                onChange={(e) => {
                  const val = e.target.value;
                  setStateFilter(val);
                  if (onStateChange) onStateChange(val === 'All' ? null : val);
                }}
                className="w-full text-xs bg-[#f8fafc] text-[#0f172a] p-2 rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#0070f3] font-sans"
              >
                <option value="All">All States / UTs (National)</option>
                {availableStates.map(loc => {
                  const count = sourceProjects.filter(p => (p.state || '').toLowerCase() === loc.toLowerCase()).length;
                  return (
                    <option key={loc} value={loc}>
                      {loc} ({count})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Execution Status Pills (4 Cols) */}
            <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-1 overflow-x-auto no-scrollbar py-0.5">
              {[
                { id: 'All', label: 'All' },
                { id: 'Ongoing', label: 'Ongoing' },
                { id: 'Delayed', label: 'Delayed' },
                { id: 'HighRisk', label: 'High Risk' },
                { id: 'Completed', label: 'Completed' }
              ].map(st => (
                <button
                  key={st.id}
                  onClick={() => setStatusFilter(st.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all cursor-pointer ${
                    statusFilter === st.id
                      ? 'bg-[#0f172a] text-white shadow-xs font-semibold'
                      : 'bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a] hover:bg-[#e2e8f0]'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* ==================================================== */}
        {/* 2. COMPACT PORTFOLIO TELEMETRY HUD STRIP             */}
        {/* ==================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="p-4 rounded-xl bg-white border border-[#ebebeb] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-1">
            <span className="mono-eyebrow text-[9px] text-[#64748b] block font-semibold">FILTERED PORTFOLIO</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-mono text-[#0f172a]">{summary.totalProjects}</span>
              <span className="text-[11px] text-[#64748b] font-mono">Projects</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#64748b] pt-0.5">
              <span className="text-[#0070f3] font-semibold">{summary.ongoing} Ongoing</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">{summary.completed} Completed</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#ebebeb] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-1">
            <span className="mono-eyebrow text-[9px] text-[#64748b] block font-semibold">BOTTLENECK EXPOSURE</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-mono text-amber-700">{summary.delayed}</span>
              <span className="text-[11px] text-[#64748b] font-mono">Delayed</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-rose-600 font-semibold pt-0.5">
              <span>{filteredProjects.filter(p => p.riskLevel === 'Critical' || p.riskLevel === 'High').length} High-Risk Monitored</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#ebebeb] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-1">
            <span className="mono-eyebrow text-[9px] text-[#64748b] block font-semibold">CAPITAL EXPOSURE</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold font-mono text-[#0f172a]">₹{Math.round(summary.totalRevisedCost).toLocaleString()}</span>
              <span className="text-[11px] text-[#64748b] font-mono">Cr</span>
            </div>
            <div className="text-[10px] font-mono text-[#64748b] pt-0.5 truncate">
              {summary.totalRevisedCost > summary.totalOriginalCost ? (
                <span className="text-rose-600 font-semibold">
                  +₹{Math.round(summary.totalRevisedCost - summary.totalOriginalCost).toLocaleString()} Cr Overrun
                </span>
              ) : (
                <span className="text-emerald-700">Within Sanctions</span>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#ebebeb] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="mono-eyebrow text-[9px] text-[#64748b] block font-semibold">AVERAGE PROGRESS</span>
              <span className="text-xs font-mono font-bold text-[#0070f3]">{summary.averageProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#f1f5f9] overflow-hidden">
              <div 
                className="h-full rounded-full bg-[#0070f3] transition-all duration-500"
                style={{ width: `${summary.averageProgress}%` }}
              />
            </div>
            <span className="text-[10px] text-[#64748b] font-mono block">Across active filter selection</span>
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
                SHOWING <strong className="text-[#171717]">{viewMode === 'split' ? filteredProjects.length : displayedProjects.length}</strong> OF <strong className="text-[#171717]">{filteredProjects.length}</strong> PROJECTS {stateFilter !== 'All' ? `IN ${stateFilter.toUpperCase()}` : ''} {groupMode === 'ministry' && ministryFilter !== 'All' ? `• ${ministryFilter}` : ''} {groupMode === 'sector' && sectorFilter !== 'All' ? `• Sector: ${sectorFilter}` : ''}
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
                Try searching by PAIMANA ID, project name, or resetting the ministry/state filter.
              </p>
              <button
                onClick={handleResetFilters}
                className="btn-app-sm bg-[#171717] text-white text-xs mt-2"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* SIDE-BY-SIDE SCROLL-SYNCHRONIZED INSPECTOR VIEW */}
          {viewMode === 'split' && filteredProjects.length > 0 && (
            <ProjectSplitSection
              projects={filteredProjects}
              onSelectProject={onSelectProject}
            />
          )}

          {/* GRID CARDS VIEW */}
          {viewMode === 'grid' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedProjects.map((prj) => {
                const origCost = prj.approvedCost || prj.estimatedCost || 0;
                const revCost = prj.currentCost || origCost;
                const expCost = prj.expenditure !== undefined ? prj.expenditure : Math.round(revCost * ((prj.progressPercent || 0) / 100));

                return (
                  <div
                    key={prj.id}
                    className="rounded-[12px] bg-white p-5 border border-[#ebebeb] shadow-whisper hover:border-[#d4d4d4] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between group space-y-4"
                  >
                    <div className="space-y-3">
                      
                      {/* Row 1: Project ID & Current Delay Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold bg-[#171717] text-white px-2.5 py-0.5 rounded-[4px]">
                            {prj.id}
                          </span>
                          {prj.rawId && prj.rawId !== prj.id && (
                            <span className="font-mono text-[10px] text-[#8f8f8f] bg-[#f2f2f2] px-1.5 py-0.5 rounded border border-[#ebebeb]">
                              ID: {prj.rawId}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-semibold ${
                            prj.timeDelayMonths > 0 
                              ? 'bg-[#fffbeb] text-amber-800 border border-[#fde68a]' 
                              : 'bg-[#f0fdf4] text-emerald-800 border border-[#bbf7d0]'
                          }`}>
                            {prj.timeDelayMonths > 0 ? `+${prj.timeDelayMonths}m Delay` : 'On-Time'}
                          </span>

                          <span className="flex items-center gap-1 text-xs text-[#4d4d4d] bg-[#fafafa] px-2 py-0.5 rounded-[4px] border border-[#ebebeb]">
                            <MapPin className="w-3 h-3 text-[#0070f3]" />
                            {prj.state}
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
                          <span className="mono-eyebrow text-[9px] text-[#8f8f8f] block">Total Cost (Latest)</span>
                          <span className="font-bold text-[#171717] font-mono line-clamp-1">₹{revCost.toLocaleString()} Cr</span>
                        </div>
                        <div>
                          <span className="mono-eyebrow text-[9px] text-[#8f8f8f] block">Current Delay</span>
                          <span className="font-semibold text-amber-700 font-mono line-clamp-1">
                            {prj.timeDelayMonths > 0 ? `+${prj.timeDelayMonths} Months` : '0 Months (On-Time)'}
                          </span>
                        </div>
                      </div>

                      {/* Financial Grid: Original Cost, Revised Cost, Expenditure */}
                      <div className="grid grid-cols-3 gap-2 p-2.5 rounded-[6px] bg-white border border-[#ebebeb] text-center">
                        <div>
                          <p className="mono-eyebrow text-[8px] text-[#8f8f8f]">ORIGINAL</p>
                          <p className="font-semibold font-mono text-xs text-[#171717]">₹{origCost.toLocaleString()} Cr</p>
                        </div>
                        <div>
                          <p className="mono-eyebrow text-[8px] text-[#8f8f8f]">TOTAL COST</p>
                          <p className="font-bold font-mono text-xs text-amber-700">₹{revCost.toLocaleString()} Cr</p>
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

                    </div>

                    {/* View Details Action Button (Geist 6px rounded) */}
                    <button
                      onClick={() => onSelectProject(prj.id)}
                      className="w-full btn-app-sm bg-[#171717] hover:bg-[#333333] text-white text-xs font-medium justify-center gap-1.5"
                    >
                      <span>Inspect Project Dossier &amp; 18M Forecast</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                  </div>
                );
              })}
            </div>

            {filteredProjects.length > visibleCount && (
              <div className="flex items-center justify-center gap-3 pt-4 pb-2">
                <button
                  onClick={() => setVisibleCount(c => c + 60)}
                  className="btn-app-sm bg-[#171717] hover:bg-[#333333] text-white text-xs font-mono font-medium px-6 py-2.5 rounded-[6px] shadow-xs cursor-pointer transition-all"
                >
                  Load Next 60 Projects ({filteredProjects.length - visibleCount} remaining)
                </button>
                <button
                  onClick={() => setVisibleCount(filteredProjects.length)}
                  className="btn-app-ghost text-xs font-mono font-medium px-4 py-2.5 rounded-[6px] cursor-pointer"
                >
                  Show All ({filteredProjects.length})
                </button>
              </div>
            )}
          </div>
        )}

        {/* TABLE VIEW (HORIZONTALLY SCROLLABLE) */}
        {viewMode === 'table' && (
          <div className="space-y-4">
            <div className="rounded-[12px] bg-white border border-[#ebebeb] overflow-hidden shadow-whisper">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#171717] min-w-[1100px]">
                  <thead className="bg-[#fafafa] text-[#8f8f8f] font-mono uppercase text-[10px] border-b border-[#ebebeb]">
                    <tr>
                      <th className="py-3 px-3">Project ID</th>
                      <th className="py-3 px-3">Project Name</th>
                      <th className="py-3 px-3">Ministry</th>
                      <th className="py-3 px-3">Location</th>
                      <th className="py-3 px-3">Total Cost (₹ Cr)</th>
                      <th className="py-3 px-3">Current Delay</th>
                      <th className="py-3 px-3">Progress</th>
                      <th className="py-3 px-3">Status / Risk</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ebebeb] text-xs">
                    {displayedProjects.map((prj) => {
                      const origCost = prj.approvedCost || prj.estimatedCost || 0;
                      const revCost = prj.currentCost || origCost;

                      return (
                        <tr key={prj.id} className="hover:bg-[#fafafa] transition-colors">
                          <td className="py-2.5 px-3 font-mono font-semibold text-[#171717]">
                            <div>{prj.id}</div>
                            {prj.rawId && prj.rawId !== prj.id && (
                              <div className="text-[10px] text-[#8f8f8f]">({prj.rawId})</div>
                            )}
                          </td>
                          <td className="py-2.5 px-3 font-medium text-[#171717] max-w-[280px]">
                            <p className="line-clamp-2 leading-snug">{prj.name}</p>
                          </td>
                          <td className="py-2.5 px-3 text-[#4d4d4d] max-w-[160px] truncate" title={prj.ministry}>
                            {prj.ministry}
                          </td>
                          <td className="py-2.5 px-3 text-[#171717]">
                            {prj.state}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-[#171717]">
                            ₹{revCost.toLocaleString()} Cr
                          </td>
                          <td className="py-2.5 px-3 font-mono">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              prj.timeDelayMonths > 0 
                                ? 'bg-[#fffbeb] text-amber-800 border border-[#fde68a]' 
                                : 'bg-[#f0fdf4] text-emerald-800 border border-[#bbf7d0]'
                            }`}>
                              {prj.timeDelayMonths > 0 ? `+${prj.timeDelayMonths}m` : '0m (On-Time)'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono">
                            <span className="font-semibold text-[#171717]">{prj.progressPercent}%</span>
                          </td>
                          <td className="py-2.5 px-3 font-mono">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              prj.riskLevel === 'Critical' ? 'bg-[#fff0f0] text-rose-700 border border-[#ffd5d5]' :
                              prj.riskLevel === 'High' ? 'bg-[#fff8f0] text-amber-700 border border-[#ffe4cc]' :
                              'bg-[#f0fdf4] text-emerald-700 border border-[#bbf7d0]'
                            }`}>
                              {prj.riskLevel} ({prj.riskScore || 0})
                            </span>
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

            {filteredProjects.length > visibleCount && (
              <div className="flex items-center justify-center gap-3 pt-2 pb-2">
                <button
                  onClick={() => setVisibleCount(c => c + 60)}
                  className="btn-app-sm bg-[#171717] hover:bg-[#333333] text-white text-xs font-mono font-medium px-6 py-2.5 rounded-[6px] shadow-xs cursor-pointer transition-all"
                >
                  Load Next 60 Projects ({filteredProjects.length - visibleCount} remaining)
                </button>
                <button
                  onClick={() => setVisibleCount(filteredProjects.length)}
                  className="btn-app-ghost text-xs font-mono font-medium px-4 py-2.5 rounded-[6px] cursor-pointer"
                >
                  Show All ({filteredProjects.length})
                </button>
              </div>
            )}
          </div>
        )}

        </div>

      </div>
    </div>
  );
}
