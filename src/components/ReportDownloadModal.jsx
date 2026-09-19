import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Printer, 
  AlertCircle 
} from 'lucide-react';

export default function ReportDownloadModal({ project, isOpen, onClose, selectedState }) {
  const [downloadingType, setDownloadingType] = useState(null);
  const [generatedSuccess, setGeneratedSuccess] = useState(false);

  if (!isOpen) return null;

  const reportTypes = [
    {
      id: 'full',
      title: "Comprehensive Project Intelligence Report",
      description: "Complete dossier with financial metrics, SHAP risk drivers, progress trends & audit log.",
      icon: FileText,
      color: "text-[#0A434B] border-[#A6CFD5] bg-[#F4F9F9]"
    },
    {
      id: 'risk',
      title: "Explainable AI Risk & SHAP Analysis Report",
      description: "Dedicated analytical decision-support breakdown of cost & time delay drivers.",
      icon: ShieldCheck,
      color: "text-amber-900 border-amber-300 bg-amber-50"
    },
    {
      id: 'progress',
      title: "Physical Progress & Financial Expenditure Report",
      description: "Tabular monthly progress history, planned vs actual cost, and milestone logs.",
      icon: FileText,
      color: "text-emerald-900 border-emerald-300 bg-emerald-50"
    },
    {
      id: 'audit',
      title: "Complete Project Audit Trail Log",
      description: "Chronological log of all field mutations, author roles, timestamps & doc IDs.",
      icon: FileText,
      color: "text-indigo-900 border-indigo-300 bg-indigo-50"
    },
    {
      id: 'state',
      title: `State Executive Portfolio Report (${selectedState || project?.state || 'All-India'})`,
      description: "High-level summary report for state infrastructure portfolio metrics.",
      icon: Building2,
      color: "text-cyan-900 border-cyan-300 bg-cyan-50"
    }
  ];

  const handleTriggerReport = (typeId) => {
    setDownloadingType(typeId);
    setTimeout(() => {
      setDownloadingType(null);
      setGeneratedSuccess(true);
      setTimeout(() => {
        window.print();
      }, 500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl glass-panel p-6 border border-[#A6CFD5] bg-white shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#A6CFD5]/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#A6CFD5]/40 text-[#145C66] border border-[#A6CFD5]">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-slate-900">
                Generate Downloadable Intelligence Report
              </h3>
              <p className="text-xs text-slate-500 font-mono font-medium">
                MoSPI DRISHTI PAIMANA Platform Export Center
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#F4F9F9] border border-[#A6CFD5] text-slate-600 hover:text-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prototype Label Notice */}
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Prototype Generated Report:</strong> Reports are rendered from the active intelligence data layer. Print or save directly as PDF format.
          </div>
        </div>

        {/* Report List */}
        <div className="space-y-3">
          {reportTypes.map((rt) => {
            const Icon = rt.icon;
            const isDownloading = downloadingType === rt.id;
            return (
              <div
                key={rt.id}
                className={`p-4 rounded-xl border ${rt.color} flex items-center justify-between gap-4 transition-all hover:scale-[1.01] shadow-xs`}
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{rt.title}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{rt.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleTriggerReport(rt.id)}
                  disabled={isDownloading}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#145C66] hover:bg-[#0A434B] text-white text-xs font-semibold shrink-0 shadow-sm transition-all disabled:opacity-50"
                >
                  {isDownloading ? (
                    <span>Generating...</span>
                  ) : (
                    <>
                      <Printer className="w-3.5 h-3.5" />
                      <span>Generate PDF</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-[#A6CFD5]/50 text-center text-xs text-slate-500 font-medium">
          MoSPI DRISHTI Platform • Ministry of Statistics and Programme Implementation • Govt of India
        </div>

      </div>
    </div>
  );
}
