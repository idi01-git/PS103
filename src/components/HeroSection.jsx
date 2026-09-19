import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Layers, 
  MapPin, 
  ChevronRight, 
  ChevronLeft
} from 'lucide-react';
import highwayImg from '../assets/images/indian_highway.jpg';
import bridgeImg from '../assets/images/indian_bridge.jpg';
import trainImg from '../assets/images/indian_train.jpg';

const HERO_SLIDES = [
  {
    id: 1,
    title: "National Infrastructure Acceleration & Audit",
    subtitle: "Real-time monitoring of mega projects above ₹150 Crore across 36 States & UTs",
    tag: "Bharatmala & Strategic Corridors",
    metrics: "₹48.5 Lakh Cr Portfolio Monitored",
    image: highwayImg
  },
  {
    id: 2,
    title: "Explainable AI Risk Analysis & Cost Tracking",
    subtitle: "Predictive SHAP decision-support models identifying cost overruns & administrative bottlenecks early",
    tag: "MoSPI Intelligence Engine",
    metrics: "84% Predictive Bottleneck Accuracy",
    image: bridgeImg
  },
  {
    id: 3,
    title: "Transparent Multi-Ministry Project Governance",
    subtitle: "Verifiable audit trails, interactive spatial choropleths, and inter-departmental dependency graphs",
    tag: "Public Accountability Portal",
    metrics: "1,200+ Active Audit Trail Records",
    image: trainImg
  }
];

export default function HeroSection({ onExploreDashboard, onViewProjects, onExploreMap }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative overflow-hidden border-b border-[#A6CFD5]/60 bg-[#F4F9F9] pt-6 pb-12">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Full-Width Carousel Slide Card Container with Indian Infrastructure Photo Background */}
        <div 
          className="relative rounded-3xl overflow-hidden border border-[#A6CFD5] shadow-2xl transition-all duration-700 bg-cover bg-center min-h-[420px] flex flex-col justify-between"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {/* Lighter Overlay to let background image show with high opacity & vividness */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/65 via-white/30 to-transparent pointer-events-none" />

          {/* Slide Content with Frost Glass Container */}
          <div className="relative z-10 p-6 sm:p-10 max-w-3xl">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xl space-y-5">
              
              {/* Title */}
              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-800 font-semibold leading-relaxed max-w-2xl">
                {slide.subtitle}
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onExploreDashboard}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#145C66] hover:bg-[#0A434B] text-white font-bold text-sm shadow-lg shadow-[#145C66]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <BarChart3 className="w-4 h-4" />
                  Explore Dashboard
                </button>

                <button
                  onClick={onViewProjects}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#E8F4F5] text-slate-900 font-bold text-sm border border-[#A6CFD5] shadow-md transition-all hover:scale-[1.02]"
                >
                  <Layers className="w-4 h-4 text-[#145C66]" />
                  View Projects
                </button>

                <button
                  onClick={onExploreMap}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-950 font-bold text-sm border border-amber-300 shadow-md backdrop-blur-sm transition-all"
                >
                  <MapPin className="w-4 h-4 text-amber-700" />
                  Explore India Map
                </button>
              </div>

            </div>
          </div>

          {/* Carousel Slide Indicators & Controls Bar */}
          <div className="relative z-10 px-8 py-4 bg-white/90 backdrop-blur-md border-t border-[#A6CFD5]/60 flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="flex space-x-2">
                {HERO_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      currentSlide === idx ? 'w-10 bg-[#145C66]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-600 font-mono font-bold">
                0{currentSlide + 1} / 0{HERO_SLIDES.length}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
                className="p-2 rounded-xl bg-white border border-[#A6CFD5] text-slate-800 hover:bg-[#E8F4F5] shadow-sm transition-colors"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                className="p-2 rounded-xl bg-white border border-[#A6CFD5] text-slate-800 hover:bg-[#E8F4F5] shadow-sm transition-colors"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

