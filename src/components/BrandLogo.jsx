import React from 'react';

/**
 * PAIMANA Official National Infrastructure Intelligence Brand Mark
 * Combines the Indian Ashoka Chakra precision geometry with modern
 * infrastructure convergence vectors (GatiShakti / MoSPI).
 */
export default function BrandLogo({ size = 'md', showBadge = true, className = '' }) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const boxSize = isSm ? 'w-6 h-6' : isLg ? 'w-9 h-9' : 'w-7 h-7';
  const textSize = isSm ? 'text-sm' : isLg ? 'text-lg' : 'text-base';
  const iconPixel = isSm ? 24 : isLg ? 36 : 28;

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Precision SVG Emblem */}
      <div 
        className={`${boxSize} rounded-[7px] bg-[#0f172a] shadow-sm flex items-center justify-center p-1 relative overflow-hidden transition-transform duration-200 group-hover:scale-105 shrink-0`}
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0070f3 100%)'
        }}
      >
        <svg 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full text-white"
        >
          {/* Subtle Radar Ring */}
          <circle cx="16" cy="16" r="14" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 2" />
          
          {/* Infrastructure Tri-Convergence Geometry */}
          <path 
            d="M16 3L27 22H5L16 3Z" 
            stroke="#ffffff" 
            strokeWidth="1.8" 
            strokeLinejoin="round" 
            fill="#0070f3" 
            fillOpacity="0.15" 
          />
          
          {/* Central Ashoka Core Hub */}
          <circle cx="16" cy="15.5" r="4.5" fill="#ffffff" />
          <circle cx="16" cy="15.5" r="2.2" fill="#0070f3" />

          {/* Micro Compass / Surveillance Pointers */}
          <line x1="16" y1="8" x2="16" y2="12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="10" y1="18.5" x2="13.5" y2="16.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="18.5" x2="18.5" y2="16.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

          {/* Indian Tricolor Subtle Corner Indicators */}
          <circle cx="5" cy="5" r="1.2" fill="#ff9933" />
          <circle cx="27" cy="27" r="1.2" fill="#138808" />
        </svg>
      </div>

      {/* Brand Name & National Authority Pill */}
      <div className="flex items-center gap-1.5">
        <span className={`font-bold ${textSize} tracking-tight text-[#0f172a] leading-none`}>
          PAIMANA
        </span>
        {showBadge && (
          <span className="px-1.5 py-0.5 rounded-[4px] text-[9px] font-mono font-bold bg-[#eff6ff] text-[#0070f3] border border-[#bfdbfe] leading-none tracking-wide">
            MoSPI
          </span>
        )}
      </div>
    </div>
  );
}
