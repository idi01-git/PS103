import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import highwayImg from '../assets/images/indian_highway.jpg';
import bridgeImg from '../assets/images/indian_bridge.jpg';
import trainImg from '../assets/images/indian_train.jpg';

const HERO_SLIDES = [
  { id: 1, image: highwayImg, alt: "National Expressway Infrastructure Corridor" },
  { id: 2, image: bridgeImg, alt: "Coastal Bridge and Marine Infrastructure" },
  { id: 3, image: trainImg, alt: "High-Speed Rail Transit Viaduct" }
];

export default function HeroSection({ onExploreMap, onViewProjects, onExploreDashboard }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Smooth image rotation with 200ms transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#fafafc] border-b border-slate-200 min-h-[calc(100vh-3.5rem)] flex flex-col justify-between">
      
      {/* Background Architectural/Infrastructure Visual Canvas spanning full 100vh viewport height */}
      <div className="absolute top-0 right-0 w-full lg:w-[62%] xl:w-[60%] h-full overflow-hidden pointer-events-none select-none">
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-200 ease-in-out ${
              currentSlide === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={s.image}
              alt={s.alt}
              className="w-full h-full object-cover object-center lg:object-left"
            />
          </div>
        ))}

        {/* Desktop Left-to-Right feather: strictly restricted to 40% of the image */}
        <div className="hidden lg:block absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-[#fafafc] via-[#fafafc]/75 to-transparent pointer-events-none" />
        
        {/* Mobile/Tablet Vertical Gradient Overlay */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#fafafc] via-[#fafafc]/92 via-55% to-[#fafafc]/40 pointer-events-none" />

        {/* Viewport Height Grounding Overlays (Top & Bottom Fades) */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#fafafc] via-[#fafafc]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#fafafc] via-[#fafafc]/60 to-transparent pointer-events-none" />
      </div>

      {/* Main Content Area: Centered Vertically in the 100vh Viewport */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center py-10 lg:py-16">
        
        {/* Left Column: Direct High-Impact Headline, CTAs, & Telemetry */}
        <div className="max-w-2xl lg:max-w-3xl">

          {/* High-Impact 2-Line Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[60px] xl:text-[66px] font-extrabold text-slate-900 tracking-tight leading-[1.05] mb-6">
            Built Smarter.<br />
            <span className="text-[#0052FF]">Delivered Faster.</span>
          </h1>

          {/* Descriptive Body Copy */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed mb-9 max-w-xl font-normal">
            Real-time surveillance and predictive AI early warning systems across the ₹31.1 Lakh Cr national infrastructure portfolio. Engineered for precision, accountability, and zero-delay delivery.
          </p>

          {/* Exactly Two Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10 sm:mb-12">
            {/* Primary CTA: Redirects directly to Map Section */}
            <button
              onClick={onExploreMap}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#0052FF] hover:bg-[#0041d8] text-white font-semibold text-[15px] sm:text-base shadow-lg shadow-blue-500/25 transition-all duration-200 group active:scale-[0.98] cursor-pointer"
            >
              <span>Explore Map</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary CTA: Explores Projects Directory */}
            <button
              onClick={onViewProjects}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white hover:bg-blue-50/60 border-2 border-[#0052FF] text-[#0052FF] font-semibold text-[15px] sm:text-base transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <span>Explore Projects</span>
            </button>
          </div>

          {/* Clean Integrated Telemetry Metrics Strip */}
          <div className="pt-8 sm:pt-10 border-t border-slate-200/90 grid grid-cols-3 gap-6 sm:gap-8 max-w-xl">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">4,547</div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Projects Monitored</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0052FF] tracking-tight">₹31.1L Cr</div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Capital Portfolio</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">84.2%</div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">AI Risk Precision</div>
            </div>
          </div>

        </div>

      </div>

      {/* Subtle Scroll Cue at the bottom of the 100vh viewport */}
      <div className="hidden sm:flex relative z-10 justify-center pb-4 pointer-events-none select-none">
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">Scroll</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-slate-400" />
        </div>
      </div>

    </section>
  );
}
