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
    <div className="py-8 bg-[#fafafa] min-h-screen text-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Back & Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="btn-app-ghost text-xs gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#171717]" />
            <span>Back to Project Directory</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenReportModal && onOpenReportModal(project)}
              className="btn-app-sm bg-[#171717] hover:bg-[#333333] text-white text-xs gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Intelligence Report</span>
            </button>
          </div>
        </div>

        {/* Hero Header Card (Geist Hairline Card Spec) */}
        <div className="rounded-[12px] bg-white p-6 sm:p-8 border border-[#ebebeb] shadow-whisper relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-3.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold bg-[#f2f2f2] text-[#171717] px-2.5 py-0.5 rounded-[4px] border border-[#ebebeb]">
                  {project.id}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#4d4d4d] bg-[#fafafa] px-2.5 py-0.5 rounded-[4px] border border-[#ebebeb]">
                  <MapPin className="w-3 h-3 text-[#0070f3]" />
                  {project.state} ({project.district})
                </span>
                <span className={`px-2.5 py-0.5 rounded-[4px] text-[10px] font-mono font-semibold uppercase ${
                  project.status === 'Completed' ? 'bg-[#f0fdf4] text-emerald-700 border border-[#bbf7d0]' :
                  project.status === 'Delayed' ? 'bg-[#fffbeb] text-amber-700 border border-[#fde68a]' :
                  'bg-[#eff6ff] text-[#0070f3] border border-[#bfdbfe]'
                }`}>
                  {project.status}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#171717] tracking-[-1.28px] leading-tight">
                {project.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[#4d4d4d]">
                <span className="flex items-center gap-1.5 text-[#171717] font-medium">
                  <Building2 className="w-3.5 h-3.5 text-[#8f8f8f]" />
                  {project.department}
                </span>
                <span className="text-[#ebebeb]">|</span>
                <span>{project.ministry}</span>
                <span className="text-[#ebebeb]">|</span>
                <span className="text-[#8f8f8f] font-mono">{project.sector}</span>
              </div>
            </div>

            {/* Quick Stat Pill Widget */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-[8px] bg-[#fafafa] border border-[#ebebeb] shrink-0 text-center">
              <div className="p-2">
                <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">EXPOSURE COST</p>
                <p className="text-lg font-semibold font-mono text-[#171717] mt-0.5">
                  ₹{project.currentCost.toLocaleString()} Cr
                </p>
                {project.costOverrunCr > 0 && (
                  <p className="text-[10px] font-mono text-rose-600 font-semibold mt-0.5">+₹{project.costOverrunCr} Cr Overrun</p>
                )}
              </div>

              <div className="p-2">
                <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">PHYSICAL PROGRESS</p>
                <p className="text-lg font-semibold font-mono text-[#0070f3] mt-0.5">
                  {project.progressPercent}%
                </p>
                <p className="text-[10px] text-[#8f8f8f] font-mono mt-0.5">Target: 100%</p>
              </div>

              <div className="col-span-2 sm:col-span-1 p-2">
                <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">RISK RATING</p>
                <p className={`text-lg font-semibold font-mono mt-0.5 ${
                  project.riskScore > 75 ? 'text-rose-600' :
                  project.riskScore > 40 ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  {project.riskLevel} ({project.riskScore})
                </p>
                <p className="text-[10px] text-[#8f8f8f] font-mono mt-0.5">SHAP Monitored</p>
              </div>
            </div>

          </div>
        </div>

        {/* Tab Navigation Menu (Geist Spec) */}
        <div className="flex border-b border-[#ebebeb] overflow-x-auto no-scrollbar space-x-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-[6px] text-xs font-medium whitespace-nowrap transition-all border-b-2 ${
                  isActive 
                    ? 'border-[#171717] text-[#171717] bg-[#f2f2f2]' 
                    : 'border-transparent text-[#4d4d4d] hover:text-[#171717] hover:bg-[#fafafa]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#171717]' : 'text-[#8f8f8f]'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* 1. PROJECT DETAILS / BASIC INFORMATION */}
            <div className="rounded-[12px] bg-white p-6 border border-[#ebebeb] space-y-4 shadow-whisper">
              <h3 className="mono-eyebrow text-[#8f8f8f] border-b border-[#ebebeb] pb-3 flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-[#171717]" />
                <span>PROJECT PROFILE TELEMETRY</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
                <div className="p-3.5 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] space-y-1">
                  <span className="mono-eyebrow text-[9px] text-[#8f8f8f] block">PROJECT ID</span>
                  <span className="font-semibold font-mono text-[#171717] text-sm block">{project.id}</span>
                </div>

                <div className="p-3.5 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] space-y-1">
                  <span className="mono-eyebrow text-[9px] text-[#8f8f8f] block">SECTOR</span>
                  <span className="font-medium text-[#171717] block text-xs">{project.sector}</span>
                </div>

                <div className="p-3.5 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] space-y-1">
                  <span className="mono-eyebrow text-[9px] text-[#8f8f8f] block">MINISTRY</span>
                  <span className="font-medium text-[#171717] block text-xs line-clamp-2" title={project.ministry}>{project.ministry}</span>
                </div>

                <div className="p-3.5 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] space-y-1">
                  <span className="mono-eyebrow text-[9px] text-[#8f8f8f] block">AGENCY</span>
                  <span className="font-medium text-[#171717] block text-xs line-clamp-2" title={project.department || project.agency}>{project.department || project.agency}</span>
                </div>

                <div className="p-3.5 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] space-y-1">
                  <span className="mono-eyebrow text-[9px] text-[#8f8f8f] block">LOCATION</span>
                  <span className="font-medium text-[#171717] block text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#0070f3] shrink-0" />
                    {project.state} ({project.district})
                  </span>
                </div>
              </div>
            </div>

            {/* 2. FINANCIAL INFORMATION */}
            <div className="rounded-[12px] bg-white p-6 border border-[#ebebeb] space-y-4 shadow-whisper">
              <h3 className="mono-eyebrow text-[#8f8f8f] border-b border-[#ebebeb] pb-3 flex items-center gap-2">
                <IndianRupee className="w-3.5 h-3.5 text-[#171717]" />
                <span>CAPITAL & FINANCIAL EXPOSURE</span>
              </h3>

              {(() => {
                const origCost = project.approvedCost || project.estimatedCost || 0;
                const revCost = project.currentCost || origCost;
                const expCost = project.expenditure !== undefined ? project.expenditure : Math.round(revCost * ((project.progressPercent || 0) / 100));
                const costIncrease = revCost - origCost;

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5 text-xs">
                    <div className="p-4 rounded-[6px] bg-[#fafafa] border border-[#ebebeb]">
                      <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">ORIGINAL ESTIMATE</p>
                      <p className="text-xl font-semibold font-mono text-[#171717] mt-1">₹{origCost.toLocaleString()} Cr</p>
                      <p className="text-[10px] text-[#8f8f8f] mt-1 font-mono">Sanctioned Allocation</p>
                    </div>

                    <div className="p-4 rounded-[6px] bg-[#fafafa] border border-[#ebebeb]">
                      <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">REVISED EXPOSURE</p>
                      <p className="text-xl font-semibold font-mono text-amber-700 mt-1">₹{revCost.toLocaleString()} Cr</p>
                      <p className="text-[10px] text-[#8f8f8f] mt-1 font-mono">Current Budget Target</p>
                    </div>

                    <div className="p-4 rounded-[6px] bg-[#fafafa] border border-[#ebebeb]">
                      <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">OVERRUN VARIANCE</p>
                      <p className={`text-xl font-semibold font-mono mt-1 ${costIncrease > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {costIncrease > 0 ? `+₹${costIncrease.toLocaleString()} Cr` : '₹0 Cr'}
                      </p>
                      <p className="text-[10px] text-[#8f8f8f] mt-1 font-mono">Variance Delta</p>
                    </div>

                    <div className="p-4 rounded-[6px] bg-[#fafafa] border border-[#ebebeb]">
                      <p className="mono-eyebrow text-[9px] text-[#8f8f8f]">TOTAL DISBURSED</p>
                      <p className="text-xl font-semibold font-mono text-[#0070f3] mt-1">₹{expCost.toLocaleString()} Cr</p>
                      <p className="text-[10px] text-[#8f8f8f] mt-1 font-mono">Cumulative Expenditure</p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* 3. TIMELINE */}
            <div className="rounded-[12px] bg-white p-6 border border-[#ebebeb] space-y-4 shadow-whisper">
              <div className="flex items-center justify-between border-b border-[#ebebeb] pb-3">
                <h3 className="mono-eyebrow text-[#8f8f8f] flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#171717]" />
                  <span>LIFECYCLE TIMELINE AUDIT</span>
                </h3>

                {(project.timeDelayMonths > 0 || project.expectedCompletion !== project.targetCompletion) && (
                  <span className="px-2.5 py-0.5 rounded-[4px] bg-[#fffbeb] text-amber-800 border border-[#fde68a] text-[10px] font-mono font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600" />
                    Timeline Slippage (+{project.timeDelayMonths || 6} Months)
                  </span>
                )}
              </div>

              {/* Graphical Timeline Node Line */}
              <div className="p-6 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] space-y-6">
                <div className="relative flex items-center justify-between max-w-2xl mx-auto px-4">
                  {/* Background connecting line */}
                  <div className="absolute left-6 right-6 top-3 h-[1px] bg-[#ebebeb] -z-0" />

                  {/* Node 1: Start */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-6 h-6 rounded-full bg-[#171717] text-white flex items-center justify-center font-mono text-[10px]">
                      01
                    </div>
                    <span className="mono-eyebrow text-[9px] text-[#8f8f8f] mt-2">COMMENCEMENT</span>
                    <span className="text-xs font-semibold text-[#171717] font-mono mt-0.5">{project.startDate}</span>
                  </div>

                  {/* Node 2: Original Completion */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-6 h-6 rounded-full bg-white border border-[#171717] text-[#171717] flex items-center justify-center font-mono text-[10px]">
                      02
                    </div>
                    <span className="mono-eyebrow text-[9px] text-[#8f8f8f] mt-2">ORIGINAL TARGET</span>
                    <span className="text-xs font-semibold text-[#171717] font-mono mt-0.5">{project.targetCompletion}</span>
                  </div>

                  {/* Node 3: Revised Completion */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] text-white ${
                      project.timeDelayMonths > 0 ? 'bg-amber-600' : 'bg-[#171717]'
                    }`}>
                      03
                    </div>
                    <span className="mono-eyebrow text-[9px] text-[#8f8f8f] mt-2">REVISED TARGET</span>
                    <span className="text-xs font-semibold text-amber-700 font-mono mt-0.5">{project.expectedCompletion}</span>
                  </div>
                </div>

                {project.timeDelayMonths > 0 && (
                  <p className="text-xs text-[#4d4d4d] bg-white p-3 rounded-[6px] border border-[#ebebeb] text-center font-mono">
                    Note: Target commissioning shifted from <strong>{project.targetCompletion}</strong> to <strong>{project.expectedCompletion}</strong>.
                  </p>
                )}
              </div>
            </div>

            {/* 4. PHYSICAL PROGRESS */}
            <div className="rounded-[12px] bg-white p-6 border border-[#ebebeb] space-y-4 shadow-whisper">
              <h3 className="mono-eyebrow text-[#8f8f8f] border-b border-[#ebebeb] pb-3 flex items-center gap-2">
                <BarChart3 className="w-3.5 h-3.5 text-[#171717]" />
                <span>PHYSICAL COMPLETION MILESTONE</span>
              </h3>

              <div className="p-5 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="mono-eyebrow text-[10px] text-[#8f8f8f]">CUMULATIVE MILESTONE EXECUTION</span>
                  <span className="text-2xl font-semibold font-mono text-[#171717]">{project.progressPercent}%</span>
                </div>

                <div className="w-full h-2 rounded-full bg-[#ebebeb] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#171717] transition-all duration-700"
                    style={{ width: `${project.progressPercent}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] font-mono text-[#8f8f8f]">
                  <span>0% (Commencement)</span>
                  <span>50% (Mid-Term)</span>
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
              <div className="rounded-[12px] bg-white p-6 border border-[#ebebeb] space-y-4 shadow-whisper">
                <h3 className="text-sm font-semibold text-[#171717] flex items-center gap-2 tracking-tight">
                  <BarChart3 className="w-4 h-4 text-[#0070f3]" />
                  Planned vs Actual Progress Trend (%)
                </h3>

                <div className="h-64 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={project.progressHistory}>
                      <defs>
                        <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#171717" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#171717" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0070f3" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#0070f3" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ebebeb" />
                      <XAxis dataKey="month" stroke="#8f8f8f" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#8f8f8f" tick={{ fontSize: 11 }} domain={[0, 100]} />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#ebebeb', borderRadius: '6px', color: '#171717', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }} />
                      <Legend />
                      <Area type="monotone" dataKey="planned" stroke="#171717" fillOpacity={1} fill="url(#colorPlanned)" name="Planned Progress %" strokeWidth={1.5} />
                      <Area type="monotone" dataKey="actual" stroke="#0070f3" fillOpacity={1} fill="url(#colorActual)" name="Actual Progress %" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Planned vs Actual Cost Disbursement Chart */}
              <div className="rounded-[12px] bg-white p-6 border border-[#ebebeb] space-y-4 shadow-whisper">
                <h3 className="text-sm font-semibold text-[#171717] flex items-center gap-2 tracking-tight">
                  <IndianRupee className="w-4 h-4 text-[#171717]" />
                  Planned vs Actual Expenditure (₹ Cr)
                </h3>

                <div className="h-64 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={project.progressHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ebebeb" />
                      <XAxis dataKey="month" stroke="#8f8f8f" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#8f8f8f" tick={{ fontSize: 11 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#ebebeb', borderRadius: '6px', color: '#171717', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }} />
                      <Legend />
                      <Bar dataKey="plannedCost" fill="#171717" name="Planned Budget (₹ Cr)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="actualCost" fill="#0070f3" name="Actual Expenditure (₹ Cr)" radius={[4, 4, 0, 0]} />
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
              <div className="rounded-[12px] bg-white p-6 border border-[#ebebeb] flex flex-col items-center justify-center text-center space-y-4 shadow-whisper">
                <h3 className="text-sm font-semibold text-[#171717]">Overall Project Risk Index</h3>
                
                <div className="relative flex items-center justify-center w-36 h-36 rounded-full border-4 border-[#ebebeb] bg-[#fafafa]">
                  <div className="text-center">
                    <span className={`text-4xl font-semibold font-mono ${
                      project.riskScore > 75 ? 'text-rose-600' :
                      project.riskScore > 40 ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {project.riskScore}
                    </span>
                    <span className="text-xs text-[#8f8f8f] block font-mono">/ 100</span>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-[4px] text-[10px] font-mono font-semibold uppercase ${
                  project.riskLevel === 'Critical' ? 'bg-[#fff0f0] text-rose-600 border border-[#ffd5d5]' :
                  project.riskLevel === 'High' ? 'bg-[#fff8f0] text-amber-700 border border-[#ffe4cc]' :
                  'bg-[#f0fdf4] text-emerald-700 border border-[#bbf7d0]'
                }`}>
                  {project.riskLevel} Risk Tier
                </span>
              </div>

              {/* Sub-Category Risk Breakdown */}
              <div className="lg:col-span-2 rounded-[12px] bg-white p-6 border border-[#ebebeb] space-y-4 shadow-whisper">
                <h3 className="text-sm font-semibold text-[#171717] flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  Risk Vectors &amp; Multi-Factor Assessment
                </h3>

                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-mono">
                      <span className="text-[#4d4d4d]">Cost-Overrun Risk</span>
                      <span className="font-semibold text-amber-700">{project.riskBreakdown.costOverrunRisk}/100</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#ebebeb] overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${project.riskBreakdown.costOverrunRisk}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-mono">
                      <span className="text-[#4d4d4d]">Time-Delay Risk</span>
                      <span className="font-semibold text-rose-600">{project.riskBreakdown.timeDelayRisk}/100</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#ebebeb] overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: `${project.riskBreakdown.timeDelayRisk}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-mono">
                      <span className="text-[#4d4d4d]">Progress Execution Risk</span>
                      <span className="font-semibold text-[#171717]">{project.riskBreakdown.progressRisk}/100</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#ebebeb] overflow-hidden">
                      <div className="h-full bg-[#171717] rounded-full" style={{ width: `${project.riskBreakdown.progressRisk}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-mono">
                      <span className="text-[#4d4d4d]">Administrative &amp; Dependency Clearance</span>
                      <span className="font-semibold text-[#0070f3]">{project.riskBreakdown.adminDependencyRisk}/100</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#ebebeb] overflow-hidden">
                      <div className="h-full bg-[#0070f3] rounded-full" style={{ width: `${project.riskBreakdown.adminDependencyRisk}%` }} />
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
            <div className="rounded-[12px] bg-white p-6 border border-[#ebebeb] space-y-6 shadow-whisper">
              
              {/* Section Title & Required Disclaimer */}
              <div className="border-b border-[#ebebeb] pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#0070f3]" />
                  <h3 className="text-base font-semibold text-[#171717]">
                    Why is this project classified as high-risk?
                  </h3>
                </div>
                <p className="text-xs text-[#4d4d4d] font-mono bg-[#fafafa] p-3 rounded-[6px] border border-[#ebebeb] mt-2 leading-relaxed">
                  <strong>Analytical Decision-Support Notice:</strong> Presenting an Explainable AI (SHAP Feature Attribution) model to assist project officers in isolating specific cost and schedule bottleneck drivers.
                </p>
              </div>

              {/* SHAP Feature Importance Horizontal Bars */}
              <div className="space-y-3">
                <h4 className="mono-eyebrow text-[10px] text-[#8f8f8f]">
                  SHAP FEATURE CONTRIBUTIONS (+ IMPACT TO RISK INDEX)
                </h4>

                {project.shapFactors.map((sf, idx) => (
                  <div key={idx} className="p-4 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-[4px] bg-white text-[#171717] font-mono text-[10px] font-semibold border border-[#ebebeb]">
                          {sf.category}
                        </span>
                        <span className="font-semibold text-[#171717]">{sf.factor}</span>
                      </div>
                      <span className="font-mono font-semibold text-rose-600">
                        + {sf.impact}% Risk Weight
                      </span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-[#ebebeb] overflow-hidden">
                      <div
                        className="h-full bg-[#171717] rounded-full"
                        style={{ width: `${sf.impact * 2}%` }}
                      />
                    </div>

                    <p className="text-xs text-[#4d4d4d] leading-relaxed font-normal">
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
            <div className="rounded-[12px] bg-white p-6 border border-[#ebebeb] space-y-4 shadow-whisper">
              <h3 className="text-base font-semibold text-[#171717] flex items-center gap-2 border-b border-[#ebebeb] pb-3">
                <GitBranch className="w-4 h-4 text-[#171717]" />
                Inter-Departmental &amp; Project Dependency Graph
              </h3>
              <p className="text-xs text-[#4d4d4d]">
                Prerequisite statutory clearances, utility relocations, right-of-way land transfers, and linked infrastructure corridors.
              </p>

              {/* Interactive Node Graph Box */}
              <div className="rounded-[6px] bg-[#fafafa] border border-[#ebebeb] p-6 min-h-[320px] flex flex-col justify-between">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {project.dependencyNetwork.nodes.map((node) => (
                    <div
                      key={node.id}
                      onMouseEnter={() => setHoveredNode(node)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className={`p-4 rounded-[6px] border transition-all cursor-pointer shadow-whisper ${
                        node.status === 'completed' ? 'bg-white border-[#bbf7d0] text-emerald-800' :
                        node.status === 'blocked' ? 'bg-white border-[#fecaca] text-rose-800' :
                        'bg-white border-[#fde68a] text-amber-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="mono-eyebrow text-[9px] px-2 py-0.5 rounded-[4px] bg-[#fafafa] border border-[#ebebeb]">
                          {node.type}
                        </span>
                        <span className="text-[10px] font-mono font-semibold uppercase">
                          {node.status}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#171717] line-clamp-2">{node.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#ebebeb] text-xs text-[#4d4d4d] flex flex-wrap justify-between items-center gap-2">
                  <div className="flex items-center gap-4 font-mono text-[11px]">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Completed</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Pending</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Critical Blocked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CHANGE HISTORY / AUDIT TRAIL */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="rounded-[12px] bg-white p-6 border border-[#ebebeb] space-y-4 shadow-whisper">
              <h3 className="text-base font-semibold text-[#171717] flex items-center gap-2 border-b border-[#ebebeb] pb-3">
                <History className="w-4 h-4 text-[#171717]" />
                Verifiable Project Change Audit Trail Log
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#171717]">
                  <thead className="bg-[#fafafa] text-[#8f8f8f] font-mono uppercase text-[10px] border-b border-[#ebebeb]">
                    <tr>
                      <th className="py-3 px-3">Date / Time</th>
                      <th className="py-3 px-3">Officer</th>
                      <th className="py-3 px-3">Field Changed</th>
                      <th className="py-3 px-3">Previous</th>
                      <th className="py-3 px-3">New Value</th>
                      <th className="py-3 px-3">Reason / Justification</th>
                      <th className="py-3 px-3 text-right">Reference Doc</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ebebeb] font-mono text-xs">
                    {project.changeHistory.map((chg) => (
                      <tr key={chg.id} className="hover:bg-[#fafafa] transition-colors">
                        <td className="py-3 px-3 text-[#8f8f8f]">{chg.timestamp}</td>
                        <td className="py-3 px-3 text-[#171717] font-sans">
                          <p className="font-semibold text-xs">{chg.updatedBy}</p>
                          <p className="text-[10px] text-[#8f8f8f] font-mono">{chg.role}</p>
                        </td>
                        <td className="py-3 px-3 text-[#171717] font-semibold">{chg.field}</td>
                        <td className="py-3 px-3 text-rose-600">{chg.previousValue}</td>
                        <td className="py-3 px-3 text-emerald-600 font-semibold">{chg.newValue}</td>
                        <td className="py-3 px-3 font-sans text-[#4d4d4d] max-w-xs">{chg.reason}</td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-[11px] text-[#0070f3] hover:underline cursor-pointer flex items-center gap-1 justify-end font-mono">
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
