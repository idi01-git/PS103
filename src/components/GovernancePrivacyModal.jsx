import React from 'react';
import { ShieldCheck, X, FileText, Lock, CheckCircle2, Cpu, ExternalLink } from 'lucide-react';

export default function GovernancePrivacyModal({ isOpen, onClose, mode = 'privacy' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-[12px] bg-white p-6 sm:p-7 border border-[#ebebeb] shadow-[0_8px_30px_rgba(0,0,0,0.12)] space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#ebebeb] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-[6px] bg-[#171717] text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="mono-eyebrow text-[9px] px-2 py-0.5 rounded-[4px] bg-[#fafafa] border border-[#ebebeb] text-[#171717]">
                  MOSPI GOVERNANCE PROTOCOL
                </span>
                <span className="text-[11px] font-mono text-[#8f8f8f]">GOVERNMENT OF INDIA</span>
              </div>
              <h3 className="text-base font-semibold text-[#171717] tracking-tight mt-0.5">
                {mode === 'privacy' ? 'Data Privacy & Cryptographic Integrity' : 'Terms of Intelligence & Analytical Governance'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-[6px] bg-white border border-[#ebebeb] text-[#8f8f8f] hover:text-[#171717] hover:bg-[#fafafa] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4 text-xs text-[#4d4d4d] leading-relaxed">
          
          {mode === 'privacy' ? (
            <>
              <div className="p-3.5 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] space-y-1.5">
                <div className="flex items-center gap-2 text-[#171717] font-semibold text-xs">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Public Infrastructure Open Data Governance</span>
                </div>
                <p>
                  PAIMANA operates under the statutory mandate of the Ministry of Statistics and Programme Implementation (MoSPI). All project records, milestone disbursements, and expenditure telemetry represent verified public sector capital expenditure data compiled from the Online Computerised Monitoring System (OCMS).
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-[#171717] text-xs">1. Data Ingestion &amp; Live PostgreSQL Sync</h4>
                <p>
                  Telemetry data is synced directly with secure Neon PostgreSQL instances in compliance with National Informatics Centre (NIC) security directives. No personally identifiable citizen data (PII) is stored or processed on the platform.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-[#171717] text-xs">2. Machine Learning Telemetry Classification</h4>
                <p>
                  ML predictions and TreeSHAP attribution feature weights represent statistical predictive benchmarks trained on historical quarter-by-quarter project performance. Predictive outputs are classified as decision-support intelligence for administrative early warning under PM-GatiShakti protocols.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-[#171717] text-xs">3. Cryptographic Audit Log Verification</h4>
                <p>
                  Every change to contractual milestones, revised costs, and inter-agency dependencies creates an immutable audit entry with timestamp, designated officer credentials, and source document reference.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-3.5 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] space-y-1.5">
                <div className="flex items-center gap-2 text-[#171717] font-semibold text-xs">
                  <FileText className="w-3.5 h-3.5 text-[#0070f3]" />
                  <span>Analytical Usage &amp; Diagnostic Disclaimers</span>
                </div>
                <p>
                  PAIMANA delivers automated predictive surveillance and multi-horizon early-warning forecasts for mega infrastructure projects costing ₹150 Crore and above across India's Union Ministries.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-[#171717] text-xs">1. Non-Causal Diagnostic Standard</h4>
                <p>
                  In adherence to MoSPI diagnostic standards, all SHAP risk factors identify features that <em>"statistically contribute toward higher predicted delay variance"</em> rather than asserting administrative culpability.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-[#171717] text-xs">2. Authoritative Baseline vs. Forecast Model</h4>
                <p>
                  The contractual target completion date and sanctioned cost approved by the Cabinet Committee on Economic Affairs (CCEA) / Public Investment Board (PIB) constitute the statutory baseline. ML projections across 3M to 18M horizons serve as advisory early warnings.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-[#171717] text-xs">3. Institutional Reproduction &amp; Export Rights</h4>
                <p>
                  Quarterly project intelligence dossiers, SHAP factor rankings, and dependency network graphs generated through PAIMANA may be utilized by Union Ministries, State Nodal Agencies, and Project Implementation Units (PIUs) for official review.
                </p>
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#ebebeb] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#8f8f8f]">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span>PAIMANA V2.4 // COMPLIANT</span>
          </div>

          <button
            onClick={onClose}
            className="btn-app-sm bg-[#171717] text-white text-xs px-4 py-1.5 rounded-[6px]"
          >
            Acknowledge
          </button>
        </div>

      </div>
    </div>
  );
}
