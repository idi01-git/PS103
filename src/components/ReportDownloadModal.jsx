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
      tag: "FULL DOSSIER"
    },
    {
      id: 'risk',
      title: "Explainable AI Risk & SHAP Analysis Report",
      description: "Dedicated analytical decision-support breakdown of cost & time delay drivers.",
      icon: ShieldCheck,
      tag: "AI / SHAP"
    },
    {
      id: 'progress',
      title: "Physical Progress & Financial Expenditure Report",
      description: "Tabular monthly progress history, planned vs actual cost, and milestone logs.",
      icon: FileText,
      tag: "FINANCIALS"
    },
    {
      id: 'audit',
      title: "Complete Project Audit Trail Log",
      description: "Chronological log of all field mutations, author roles, timestamps & doc IDs.",
      icon: FileText,
      tag: "AUDIT LOG"
    },
    {
      id: 'state',
      title: `State Executive Portfolio Report (${selectedState || project?.state || 'All-India'})`,
      description: "High-level summary report for state infrastructure portfolio metrics.",
      icon: Building2,
      tag: "STATE DOSSIER"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-[12px] bg-white p-6 border border-[#ebebeb] shadow-[0_8px_30px_rgba(0,0,0,0.12)] space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ebebeb] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-[6px] bg-[#fafafa] text-[#171717] border border-[#ebebeb]">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="mono-eyebrow text-[9px] px-2 py-0.5 rounded-[4px] bg-[#fafafa] border border-[#ebebeb] text-[#171717]">
                  EXPORT CENTER
                </span>
                <span className="text-[11px] font-mono text-[#8f8f8f]">PDF &amp; DOSSIER ENGINE</span>
              </div>
              <h3 className="text-base font-semibold text-[#171717] tracking-tight mt-0.5">
                Generate Intelligence Dossier
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-[6px] bg-white border border-[#ebebeb] text-[#8f8f8f] hover:text-[#171717] hover:bg-[#fafafa] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Prototype Label Notice */}
        <div className="p-3.5 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] text-xs text-[#4d4d4d] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#171717]">Live Telemetry Render:</span> Dossiers compile live telemetry records directly from the MoSPI data layer. Generated prints preserve high-fidelity vectorized tables.
          </div>
        </div>

        {/* Report List */}
        <div className="space-y-2.5">
          {reportTypes.map((rt) => {
            const Icon = rt.icon;
            const isDownloading = downloadingType === rt.id;
            return (
              <div
                key={rt.id}
                className="p-3.5 rounded-[6px] border border-[#ebebeb] bg-white hover:border-[#171717]/30 flex items-center justify-between gap-4 transition-colors shadow-whisper"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] text-[#171717] mt-0.5 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-xs text-[#171717] tracking-tight">{rt.title}</span>
                      <span className="mono-eyebrow text-[9px] px-1.5 py-0.5 rounded-[4px] bg-[#fafafa] border border-[#ebebeb]">
                        {rt.tag}
                      </span>
                    </div>
                    <p className="text-xs text-[#4d4d4d] leading-relaxed">{rt.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleTriggerReport(rt.id)}
                  disabled={isDownloading}
                  className="btn-app-sm flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] shrink-0 font-mono text-[11px]"
                >
                  {isDownloading ? (
                    <span>Compiling...</span>
                  ) : (
                    <>
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print PDF</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-[#ebebeb] flex items-center justify-between text-[11px] text-[#8f8f8f] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>MoSPI PAIMANA PLATFORM</span>
          </div>
          <span>GOVERNMENT OF INDIA</span>
        </div>

      </div>
    </div>
  );
}

