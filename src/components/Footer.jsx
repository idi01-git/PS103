import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#fafafa] border-t border-[#ebebeb] text-[#4d4d4d] text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Govt Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#171717]">
              <div className="w-5 h-5 rounded-[4px] bg-[#171717] text-white flex items-center justify-center font-mono font-bold text-[10px]">
                ▲
              </div>
              <span className="font-semibold text-xs tracking-tight text-[#171717]">
                DRISHTI · PAIMANA
              </span>
            </div>
            <p className="text-[#4d4d4d] text-xs leading-relaxed">
              Central Infrastructure Project Monitoring System under the Ministry of Statistics &amp; Programme Implementation (MoSPI), Government of India.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[11px] font-mono text-[#8f8f8f]">SYSTEM OPERATIONAL</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="mono-eyebrow text-[10px] text-[#8f8f8f]">PLATFORM SECTIONS</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate && onNavigate('home')} className="text-[#4d4d4d] hover:text-[#171717] transition-colors">
                  Overview &amp; Telemetry
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('dashboard')} className="text-[#4d4d4d] hover:text-[#171717] transition-colors">
                  National Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('projects')} className="text-[#4d4d4d] hover:text-[#171717] transition-colors">
                  Projects Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('analysis')} className="text-[#4d4d4d] hover:text-[#171717] transition-colors">
                  Explainable AI &amp; SHAP
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('reports')} className="text-[#4d4d4d] hover:text-[#171717] transition-colors">
                  Intelligence Export Dossiers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Ministries */}
          <div className="space-y-3">
            <h4 className="mono-eyebrow text-[10px] text-[#8f8f8f]">KEY MINISTRIES</h4>
            <ul className="space-y-2 text-xs text-[#4d4d4d]">
              <li className="hover:text-[#171717] cursor-default transition-colors">Road Transport &amp; Highways</li>
              <li className="hover:text-[#171717] cursor-default transition-colors">Railways</li>
              <li className="hover:text-[#171717] cursor-default transition-colors">Housing &amp; Urban Affairs</li>
              <li className="hover:text-[#171717] cursor-default transition-colors">Power &amp; Renewable Energy</li>
              <li className="hover:text-[#171717] cursor-default transition-colors">Ports, Shipping &amp; Waterways</li>
            </ul>
          </div>

          {/* Col 4: Security & Compliance */}
          <div className="space-y-3">
            <h4 className="mono-eyebrow text-[10px] text-[#8f8f8f]">GOVERNANCE &amp; SECURITY</h4>
            <p className="text-[11px] text-[#8f8f8f] leading-relaxed">
              All infrastructure metrics, SHAP feature scores, and change audit trails are cryptographically verified under MoSPI data governance protocols.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[6px] bg-white text-[#171717] text-[10px] font-mono border border-[#ebebeb] shadow-whisper">
                <Cpu className="w-3.5 h-3.5 text-[#171717]" />
                <span>NODE_V2 // VERIFIED</span>
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[#ebebeb] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8f8f8f] font-mono">
          <p>© 2026 Ministry of Statistics &amp; Programme Implementation (MoSPI). Government of India.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#171717] cursor-pointer">PRIVACY</span>
            <span>/</span>
            <span className="hover:text-[#171717] cursor-pointer">TERMS</span>
            <span>/</span>
            <span className="text-[#171717] font-semibold">PAIMANA V2.4</span>
          </div>
        </div>

      </div>
    </footer>
  );
}


