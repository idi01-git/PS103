import React from 'react';
import { ShieldCheck, Building, ExternalLink, Cpu } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#05181C] border-t-2 border-[#145C66] text-slate-200 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Govt Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="w-5 h-5 text-[#A6CFD5]" />
              <span className="font-bold text-sm font-heading tracking-wide text-white">DRISHTI - PAIMANA PORTAL</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Central Infrastructure Project Monitoring System under the Ministry of Statistics & Programme Implementation (MoSPI), Government of India.
            </p>
            <p className="text-[11px] text-[#A6CFD5] font-mono font-semibold">
              Designed for National Transparency & AI Risk Analysis
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase text-[#A6CFD5] tracking-wider">Platform Sections</h4>
            <ul className="space-y-1.5 text-slate-200 font-medium">
              <li>
                <button onClick={() => onNavigate && onNavigate('home')} className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>Home & Overview</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('dashboard')} className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>National Dashboard</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('projects')} className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>Project Directory</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('analysis')} className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>Explainable AI Risk Engine</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('reports')} className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>Download Reports</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Ministries */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase text-[#A6CFD5] tracking-wider">Key Portfolios</h4>
            <ul className="space-y-1.5 text-slate-300">
              <li>Ministry of Road Transport & Highways</li>
              <li>Ministry of Railways</li>
              <li>Ministry of Housing & Urban Affairs</li>
              <li>Ministry of Power & Renewable Energy</li>
              <li>Ministry of Ports, Shipping & Waterways</li>
            </ul>
          </div>

          {/* Col 4: Security & Compliance */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase text-[#A6CFD5] tracking-wider">Security & Compliance</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              All infrastructure metrics, SHAP feature scores, and change audit trails are maintained under MoSPI data governance protocols.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#145C66]/40 text-[#A6CFD5] text-[10px] font-mono border border-[#A6CFD5]/40 shadow-2xs">
                <Cpu className="w-3.5 h-3.5 text-[#A6CFD5]" />
                PAIMANA Intelligence Node v2.0
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-[#145C66]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 Ministry of Statistics & Programme Implementation (MoSPI). All Rights Reserved.</p>
          <p className="font-mono text-[#A6CFD5] font-semibold">PAIMANA DRISHTI v2.0 • Government of India</p>
        </div>

      </div>
    </footer>
  );
}

