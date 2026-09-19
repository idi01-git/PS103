import React, { useState } from 'react';
import { 
  PROJECTS_MASTER 
} from '../data/projectsData';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  Clock, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Share2, 
  ArrowLeft, 
  Sparkles, 
  GitBranch, 
  History, 
  BarChart3, 
  Info,
  Download,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function ProjectDetails({ projectId, onBack, onOpenReportModal }) {
  const project = PROJECTS_MASTER.find(p => p.id === projectId) || PROJECTS_MASTER[0];

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'progress' | 'risk' | 'shap' | 'network' | 'audit'
  const [hoveredNode, setHoveredNode] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'progress', label: 'Progress & Cost Analysis', icon: BarChart3 },
    { id: 'risk', label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'shap', label: 'Explainable AI (SHAP)', icon: Sparkles },
    { id: 'network', label: 'Dependency Network', icon: GitBranch },
    { id: 'audit', label: 'Change History / Audit', icon: History }
  ];

  return (
    <div className="py-8 bg-[#F4F9F9] min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Back & Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#A6CFD5] text-slate-700 hover:text-slate-900 text-xs font-semibold transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#145C66]" />
            <span>Back to Project Listing</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenReportModal && onOpenReportModal(project)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#145C66] hover:bg-[#0A434B] text-white text-xs font-semibold shadow-md shadow-[#A6CFD5]/50 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Intelligence Report</span>
            </button>
          </div>
        </div>

        {/* Hero Header Card */}
        <div className="rounded-2xl glass-panel p-6 border border-[#A6CFD5] bg-gradient-to-r from-white via-[#EBF4F5] to-[#A6CFD5]/35 relative overflow-hidden shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold bg-[#A6CFD5]/40 text-[#0A434B] px-2.5 py-0.5 rounded border border-[#A6CFD5]">
                  {project.id}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
                  <MapPin className="w-3 h-3 text-amber-600" />
                  {project.state} ({project.district})
                </span>
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                  project.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                  project.status === 'Delayed' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  'bg-cyan-100 text-cyan-800 border border-cyan-300'
                }`}>
                  {project.status}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
                {project.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700 font-medium">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <Building2 className="w-3.5 h-3.5 text-[#145C66]" />
                  {project.department}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600">{project.sector}</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600">{project.category}</span>
              </div>
            </div>

            {/* Quick Stat Pill Widget */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white border border-[#A6CFD5]/70 shrink-0 text-center shadow-xs">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-mono">Current Cost</p>
                <p className="text-lg font-extrabold font-mono text-amber-900">
                  ₹{project.currentCost.toLocaleString()} Cr
                </p>
                {project.costOverrunCr > 0 && (
                  <p className="text-[9px] text-rose-700 font-bold">+₹{project.costOverrunCr} Cr Overrun</p>
                )}
              </div>

              <div>
                <p className="text-[10px] text-slate-500 uppercase font-mono">Physical Progress</p>
                <p className="text-lg font-extrabold font-mono text-emerald-700">
                  {project.progressPercent}%
                </p>
                <p className="text-[9px] text-slate-500">Target: 100%</p>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Risk Level</p>
                <p className={`text-lg font-extrabold font-mono ${
                  project.riskLevel === 'Critical' ? 'text-rose-700' :
                  project.riskLevel === 'High' ? 'text-rose-600' : 'text-emerald-700'
                }`}>
                  {project.riskLevel} ({project.riskScore})
                </p>
                <p className="text-[9px] text-slate-500">SHAP Monitored</p>
              </div>
            </div>

          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex border-b border-[#A6CFD5]/60 overflow-x-auto no-scrollbar space-x-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive 
                    ? 'border-[#145C66] text-[#0A434B] bg-[#A6CFD5]/30' 
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-[#E8F4F5]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#145C66]' : 'text-slate-400'}`} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* 1. PROJECT DETAILS / BASIC INFORMATION */}
            <div className="rounded-2xl glass-panel p-6 border border-[#A6CFD5] bg-white space-y-4 shadow-sm">
              <h3 className="text-sm font-mono font-bold uppercase text-[#145C66] tracking-wider border-b border-[#A6CFD5]/40 pb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#145C66]" />
                PROJECT DETAILS
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#F4F9F9] border border-[#A6CFD5]/50 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block font-medium">Project ID</span>
                  <span className="font-extrabold font-mono text-[#0A434B] text-sm block">{project.id}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F4F9F9] border border-[#A6CFD5]/50 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block font-medium">Sector</span>
                  <span className="font-bold text-slate-800 block text-xs">{project.sector}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F4F9F9] border border-[#A6CFD5]/50 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block font-medium">Ministry</span>
                  <span className="font-bold text-slate-800 block text-xs line-clamp-2" title={project.ministry}>{project.ministry}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F4F9F9] border border-[#A6CFD5]/50 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block font-medium">Agency</span>
                  <span className="font-bold text-[#145C66] block text-xs line-clamp-2" title={project.department || project.agency}>{project.department || project.agency}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F4F9F9] border border-[#A6CFD5]/50 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block font-medium">State / Location</span>
                  <span className="font-bold text-slate-800 block text-xs flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    {project.state} ({project.district})
                  </span>
                </div>
              </div>
            </div>

            {/* 2. FINANCIAL INFORMATION */}
            <div className="rounded-2xl glass-panel p-6 border border-[#A6CFD5] bg-white space-y-4 shadow-sm">
              <h3 className="text-sm font-mono font-bold uppercase text-[#145C66] tracking-wider border-b border-[#A6CFD5]/40 pb-3 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-amber-800" />
                FINANCIAL INFORMATION
              </h3>

              {(() => {
                const origCost = project.approvedCost || project.estimatedCost || 0;
                const revCost = project.currentCost || origCost;
                const expCost = project.expenditure !== undefined ? project.expenditure : Math.round(revCost * ((project.progressPercent || 0) / 100));
                const costIncrease = revCost - origCost;

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-[#F4F9F9] border border-[#A6CFD5]/60">
                      <p className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Original Cost</p>
                      <p className="text-xl font-extrabold font-mono text-slate-900 mt-1">₹{origCost.toLocaleString()} Cr</p>
                      <p className="text-[10px] text-slate-500 mt-1">Initial Sanction Budget</p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F4F9F9] border border-[#A6CFD5]/60">
                      <p className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Revised Cost</p>
                      <p className="text-xl font-extrabold font-mono text-amber-900 mt-1">₹{revCost.toLocaleString()} Cr</p>
                      <p className="text-[10px] text-slate-500 mt-1">Approved Revision</p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F4F9F9] border border-[#A6CFD5]/60">
                      <p className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Cost Increase</p>
                      <p className={`text-xl font-extrabold font-mono mt-1 ${costIncrease > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
                        {costIncrease > 0 ? `+₹${costIncrease.toLocaleString()} Cr` : '₹0 Cr'}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1">Derived Metric (Revised - Original)</p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F4F9F9] border border-[#A6CFD5]/60">
                      <p className="text-[10px] font-mono text-[#145C66] uppercase font-semibold">Expenditure</p>
                      <p className="text-xl font-extrabold font-mono text-[#0A434B] mt-1">₹{expCost.toLocaleString()} Cr</p>
                      <p className="text-[10px] text-slate-500 mt-1">Disbursed Funds to Date</p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* 3. TIMELINE */}
            <div className="rounded-2xl glass-panel p-6 border border-[#A6CFD5] bg-white space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#A6CFD5]/40 pb-3">
                <h3 className="text-sm font-mono font-bold uppercase text-[#145C66] tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#145C66]" />
                  PROJECT TIMELINE
                </h3>

                {(project.timeDelayMonths > 0 || project.expectedCompletion !== project.targetCompletion) && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-[11px] font-bold font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600" />
                    Timeline Revised (+{project.timeDelayMonths || 6} Months)
                  </span>
                )}
              </div>

              {/* Graphical Timeline Node Line */}
              <div className="p-5 rounded-xl bg-[#F4F9F9] border border-[#A6CFD5]/60 space-y-6">
                <div className="relative flex items-center justify-between max-w-2xl mx-auto px-4">
                  {/* Background connecting line */}
                  <div className="absolute left-6 right-6 top-3 h-1 bg-[#A6CFD5] -z-0" />

                  {/* Node 1: Start */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-7 h-7 rounded-full bg-[#145C66] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      ●
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-500 mt-2">Start Date</span>
                    <span className="text-xs font-bold text-slate-900 font-mono mt-0.5">{project.startDate}</span>
                  </div>

                  {/* Node 2: Original Completion */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${
                      project.expectedCompletion !== project.targetCompletion
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}>
                      ●
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-500 mt-2">Original Completion</span>
                    <span className="text-xs font-bold text-slate-900 font-mono mt-0.5">{project.targetCompletion}</span>
                  </div>

                  {/* Node 3: Revised Completion */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${
                      project.timeDelayMonths > 0 ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                    }`}>
                      ●
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-500 mt-2">Revised Completion</span>
                    <span className="text-xs font-bold text-amber-900 font-mono mt-0.5">{project.expectedCompletion}</span>
                  </div>
                </div>

                {project.timeDelayMonths > 0 && (
                  <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-center font-medium">
                    ⚠️ Notice: Project completion target has been revised from <strong>{project.targetCompletion}</strong> to <strong>{project.expectedCompletion}</strong>.
                  </p>
                )}
              </div>
            </div>

            {/* 4. PHYSICAL PROGRESS */}
            <div className="rounded-2xl glass-panel p-6 border border-[#A6CFD5] bg-white space-y-4 shadow-sm">
              <h3 className="text-sm font-mono font-bold uppercase text-[#145C66] tracking-wider border-b border-[#A6CFD5]/40 pb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-700" />
                PHYSICAL PROGRESS
              </h3>

              <div className="p-5 rounded-xl bg-[#F4F9F9] border border-[#A6CFD5]/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-700 uppercase">Physical Progress Executed</span>
                  <span className="text-2xl font-extrabold font-mono text-emerald-700">{project.progressPercent}%</span>
                </div>

                <div className="w-full h-4 rounded-full bg-[#E8F4F5] border border-[#A6CFD5] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#145C66] via-indigo-600 to-emerald-600 transition-all duration-1000"
                    style={{ width: `${project.progressPercent}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>0% (Commencement)</span>
                  <span>50% (Mid-Term Milestone)</span>
                  <span>100% (Commissioned)</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PROGRESS & COST ANALYSIS */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Planned vs Actual Physical Progress Chart */}
              <div className="rounded-2xl glass-panel p-6 border border-[#A6CFD5] bg-white space-y-4 shadow-sm">
                <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#145C66]" />
                  Planned vs Actual Progress Trend (%)
                </h3>

                <div className="h-64 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={project.progressHistory}>
                      <defs>
                        <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#145C66" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#145C66" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#059669" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#A6CFD5" />
                      <XAxis dataKey="month" stroke="#475569" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#475569" tick={{ fontSize: 11 }} domain={[0, 100]} />
                      <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#A6CFD5', borderRadius: '8px', color: '#0F172A', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <Legend />
                      <Area type="monotone" dataKey="planned" stroke="#145C66" fillOpacity={1} fill="url(#colorPlanned)" name="Planned Progress %" />
                      <Area type="monotone" dataKey="actual" stroke="#059669" fillOpacity={1} fill="url(#colorActual)" name="Actual Progress %" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Planned vs Actual Cost Disbursement Chart */}
              <div className="rounded-2xl glass-panel p-6 border border-[#A6CFD5] bg-white space-y-4 shadow-sm">
                <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-amber-800" />
                  Planned vs Actual Expenditure (₹ Cr)
                </h3>

                <div className="h-64 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={project.progressHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#A6CFD5" />
                      <XAxis dataKey="month" stroke="#475569" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#475569" tick={{ fontSize: 11 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#A6CFD5', borderRadius: '8px', color: '#0F172A', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <Legend />
                      <Bar dataKey="plannedCost" fill="#0284C7" name="Planned Budget (₹ Cr)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="actualCost" fill="#D97706" name="Actual Expenditure (₹ Cr)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: RISK ANALYSIS */}
        {activeTab === 'risk' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Risk Gauge Score */}
              <div className="rounded-2xl glass-panel p-6 border border-[#A6CFD5] bg-white flex flex-col items-center justify-center text-center space-y-4 shadow-sm">
                <h3 className="text-base font-bold font-heading text-slate-900">Overall Project Risk Index</h3>
                
                <div className="relative flex items-center justify-center w-40 h-40 rounded-full border-8 border-[#A6CFD5]/60 bg-[#F4F9F9] shadow-inner">
                  <div className="text-center">
                    <span className={`text-4xl font-extrabold font-heading ${
                      project.riskScore > 75 ? 'text-rose-700' :
                      project.riskScore > 40 ? 'text-amber-700' : 'text-emerald-700'
                    }`}>
                      {project.riskScore}
                    </span>
                    <span className="text-xs text-slate-500 block font-mono">/ 100</span>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  project.riskLevel === 'Critical' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                  project.riskLevel === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                  'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  {project.riskLevel} Risk Classification
                </span>
              </div>

              {/* Sub-Category Risk Breakdown */}
              <div className="lg:col-span-2 rounded-2xl glass-panel p-6 border border-[#A6CFD5] bg-white space-y-4 shadow-sm">
                <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  Risk Vectors & Multi-Factor Assessment
                </h3>

                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-700 font-semibold">Cost-Overrun Risk</span>
                      <span className="font-bold text-amber-800">{project.riskBreakdown.costOverrunRisk}/100</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#E8F4F5] overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${project.riskBreakdown.costOverrunRisk}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-700 font-semibold">Time-Delay Risk</span>
                      <span className="font-bold text-rose-800">{project.riskBreakdown.timeDelayRisk}/100</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#E8F4F5] overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: `${project.riskBreakdown.timeDelayRisk}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-700 font-semibold">Progress Execution Risk</span>
                      <span className="font-bold text-[#145C66]">{project.riskBreakdown.progressRisk}/100</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#E8F4F5] overflow-hidden">
                      <div className="h-full bg-[#145C66] rounded-full" style={{ width: `${project.riskBreakdown.progressRisk}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-700 font-semibold">Administrative & Dependency Clearance Risk</span>
                      <span className="font-bold text-indigo-800">{project.riskBreakdown.adminDependencyRisk}/100</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#E8F4F5] overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${project.riskBreakdown.adminDependencyRisk}%` }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: EXPLAINABLE AI / SHAP ANALYSIS */}
        {activeTab === 'shap' && (
          <div className="space-y-6">
            <div className="rounded-2xl glass-panel p-6 border border-[#A6CFD5] bg-white space-y-6 shadow-sm">
              
              {/* Section Title & Required Disclaimer */}
              <div className="border-b border-[#A6CFD5]/50 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-[#145C66] animate-pulse" />
                  <h3 className="text-lg font-bold font-heading text-slate-900">
                    Why is this project considered high-risk?
                  </h3>
                </div>
                <p className="text-xs text-amber-900 font-mono bg-amber-50 p-3 rounded-lg border border-amber-300 mt-2 leading-relaxed">
                  <strong>Analytical Decision-Support Disclaimer:</strong> Presenting an Explainable AI (SHAP Feature Attribution) decision-support feature to assist project officers in identifying core bottleneck drivers. This model output is for decision-support and does not constitute an official government determination.
                </p>
              </div>

              {/* SHAP Feature Importance Horizontal Bars */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-500">
                  SHAP Feature Contributions (+ Impact to Risk Index)
                </h4>

                {project.shapFactors.map((sf, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#F4F9F9] border border-[#A6CFD5]/60 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#E8F4F5] text-[#0A434B] font-mono text-[10px] font-bold border border-[#A6CFD5]">
                          {sf.category}
                        </span>
                        <span className="font-bold text-slate-900">{sf.factor}</span>
                      </div>
                      <span className="font-mono font-bold text-rose-700">
                        + {sf.impact}% Risk Influence
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-[#E8F4F5] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-rose-600 rounded-full"
                        style={{ width: `${sf.impact * 2}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {sf.description}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: DEPENDENCY NETWORK */}
        {activeTab === 'network' && (
          <div className="space-y-6">
            <div className="rounded-2xl glass-panel p-6 border border-[#A6CFD5] bg-white space-y-4 shadow-sm">
              <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2 border-b border-[#A6CFD5]/50 pb-3">
                <GitBranch className="w-4 h-4 text-[#145C66]" />
                Inter-Departmental & Project Dependency Graph
              </h3>
              <p className="text-xs text-slate-600">
                Visualizing prerequisite statutory clearances, utility relocations, right-of-way land handovers, and linked infrastructure corridors.
              </p>

              {/* Interactive Node Graph Box */}
              <div className="rounded-xl bg-[#F4F9F9] border border-[#A6CFD5]/70 p-6 min-h-[350px] flex flex-col justify-between">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.dependencyNetwork.nodes.map((node) => (
                    <div
                      key={node.id}
                      onMouseEnter={() => setHoveredNode(node)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer shadow-xs ${
                        node.status === 'completed' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' :
                        node.status === 'blocked' ? 'bg-rose-50 border-rose-300 text-rose-900 animate-pulse-subtle' :
                        'bg-amber-50 border-amber-300 text-amber-900'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-white border border-slate-300">
                          {node.type}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          {node.status}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 line-clamp-2">{node.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#A6CFD5]/50 text-xs text-slate-600 flex flex-wrap justify-between items-center gap-2">
                  <div className="flex items-center gap-4 font-semibold">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Completed</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Pending</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span> Critical Blocked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CHANGE HISTORY / AUDIT TRAIL */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="rounded-2xl glass-panel p-6 border border-[#A6CFD5] bg-white space-y-4 shadow-sm">
              <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2 border-b border-[#A6CFD5]/50 pb-3">
                <History className="w-4 h-4 text-[#145C66]" />
                Verifiable Project Change Audit Trail Log
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-[#E8F4F5] text-[#0A434B] font-mono uppercase text-[10px] border-b border-[#A6CFD5] font-bold">
                    <tr>
                      <th className="py-3 px-3">Date / Time</th>
                      <th className="py-3 px-3">Updated By</th>
                      <th className="py-3 px-3">Field Changed</th>
                      <th className="py-3 px-3">Previous Value</th>
                      <th className="py-3 px-3">New Value</th>
                      <th className="py-3 px-3">Reason / Justification</th>
                      <th className="py-3 px-3 text-right">Reference Doc</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#A6CFD5]/40">
                    {project.changeHistory.map((chg) => (
                      <tr key={chg.id} className="hover:bg-[#F4F9F9] font-mono">
                        <td className="py-3 px-3 text-slate-600 font-semibold">{chg.timestamp}</td>
                        <td className="py-3 px-3 text-slate-900 font-sans">
                          <p className="font-bold">{chg.updatedBy}</p>
                          <p className="text-[10px] text-slate-500">{chg.role}</p>
                        </td>
                        <td className="py-3 px-3 text-[#145C66] font-bold">{chg.field}</td>
                        <td className="py-3 px-3 text-rose-700">{chg.previousValue}</td>
                        <td className="py-3 px-3 text-emerald-700 font-bold">{chg.newValue}</td>
                        <td className="py-3 px-3 font-sans text-slate-700 max-w-xs">{chg.reason}</td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-[10px] text-[#145C66] hover:underline cursor-pointer flex items-center gap-1 justify-end font-semibold">
                            <FileText className="w-3 h-3" />
                            {chg.refDoc.split('/').pop()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
