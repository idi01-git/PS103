import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Layers, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import highwayImg from '../assets/images/indian_highway.jpg';
import bridgeImg from '../assets/images/indian_bridge.jpg';
import trainImg from '../assets/images/indian_train.jpg';

const HERO_SLIDES = [
  {
    id: 1,
    eyebrow: "INFRASTRUCTURE ACCELERATION // 36 STATES & UTS",
    title: "National Infrastructure Acceleration & Audit",
    subtitle: "Real-time surveillance of mega projects above ₹150 Crore across Bharat's critical economic corridors.",
    tag: "Bharatmala & Strategic Corridors",
    metrics: "₹48.5 Lakh Cr Portfolio",
    kpi: "1,842 Active Projects",
    image: highwayImg
  },
  {
    id: 2,
    eyebrow: "EXPLAINABLE AI ENGINE // PREDICTIVE SHAP ANALYSIS",
    title: "Explainable AI Risk Analysis & Cost Tracking",
    subtitle: "Predictive SHAP decision-support models identifying cost overruns and inter-departmental bottlenecks before delays occur.",
    tag: "MoSPI Intelligence Engine",
    metrics: "84% Bottleneck Accuracy",
    kpi: "28.4% Avg Cost Overrun Identified",
    image: bridgeImg
  },
  {
    id: 3,
    eyebrow: "MULTI-MINISTRY GOVERNANCE // CENTRAL AUDIT TRAIL",
    title: "Transparent Multi-Ministry Project Governance",
    subtitle: "Verifiable audit trails, interactive spatial choropleths, and inter-departmental dependency graphs with cryptographic precision.",
    tag: "Public Accountability Portal",
    metrics: "1,200+ Audit Trail Records",
    kpi: "18 Union Ministries Linked",
    image: trainImg
  }
];

export default function HeroSection({ onExploreDashboard, onViewProjects, onExploreMap }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative overflow-hidden geist-hero-mesh border-b border-[#ebebeb] pt-12 pb-16 lg:pt-16 lg:pb-24">
      
      {/* Mesh Glow Ambient Light */}
      <div className="geist-hero-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Grid: Text & CTAs on Left, Product Feature Card with Indian Infrastructure Visual on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Tightly Tracked Geist Sans & Pill CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Technical Eyebrow in Geist Mono */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[100px] bg-white border border-[#ebebeb] shadow-whisper text-[#171717]">
              <span className="w-2 h-2 rounded-full bg-[#0070f3] animate-pulse" />
              <span className="mono-eyebrow text-[11px] text-[#171717]">
                {slide.eyebrow}
              </span>
            </div>

            {/* Display XL Headline with tight negative tracking (-2.4px) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-semibold text-[#171717] tracking-[-2.4px] leading-[1.08]">
              {slide.title}
            </h1>

            {/* Body Copy */}
            <p className="text-base sm:text-lg text-[#4d4d4d] leading-relaxed max-w-2xl font-normal">
              {slide.subtitle}
            </p>

            {/* Marketing Pill CTAs per Vercel Spec */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Marketing Primary Pill */}
              <button
                onClick={onExploreDashboard}
                className="btn-marketing-primary group"
              >
                <BarChart3 className="w-4 h-4 mr-2 text-white" />
                <span>Explore Dashboard</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Marketing Secondary Pill */}
              <button
                onClick={onViewProjects}
                className="btn-marketing-secondary"
              >
                <Layers className="w-4 h-4 mr-2 text-[#4d4d4d]" />
                <span>View Projects</span>
              </button>

              {/* Marketing Secondary Pill for Map */}
              <button
                onClick={onExploreMap}
                className="btn-marketing-secondary hover:bg-[#fafafa]"
              >
                <MapPin className="w-4 h-4 mr-2 text-[#0070f3]" />
                <span>India Map</span>
              </button>
            </div>

            {/* Technical Spec Telemetry Bar */}
            <div className="pt-6 border-t border-[#ebebeb] flex flex-wrap items-center gap-6 text-xs text-[#8f8f8f] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#50e3c2]" />
                <span className="text-[#171717] font-semibold">{slide.metrics}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7928ca]" />
                <span className="text-[#171717] font-semibold">{slide.kpi}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#eb367f]" />
                <span>{slide.tag}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Precise Hairline Visual Card Container */}
          <div className="lg:col-span-5">
            <div className="geist-card-elevated overflow-hidden relative group">
              
              {/* Infrastructure Image Window */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-[#fafafa]">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span className="font-mono text-[11px] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-[6px] border border-white/20">
                    {slide.tag}
                  </span>
                  <span className="font-mono text-[11px] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-[6px] border border-white/20">
                    0{currentSlide + 1} / 0{HERO_SLIDES.length}
                  </span>
                </div>
              </div>

              {/* Bottom Card Console Details */}
              <div className="p-5 bg-white space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="mono-eyebrow text-[#8f8f8f]">STATUS: ACTIVE TELEMETRY</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-mono text-[11px] text-[#171717] font-semibold">ONLINE</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 rounded-[6px] bg-[#fafafa] border border-[#ebebeb]">
                    <span className="mono-eyebrow text-[10px] text-[#8f8f8f] block">SURVEILLANCE</span>
                    <span className="font-semibold text-sm text-[#171717] font-mono mt-0.5 block">{slide.metrics}</span>
                  </div>
                  <div className="p-2.5 rounded-[6px] bg-[#fafafa] border border-[#ebebeb]">
                    <span className="mono-eyebrow text-[10px] text-[#8f8f8f] block">SYSTEM BENCHMARK</span>
                    <span className="font-semibold text-sm text-[#171717] font-mono mt-0.5 block">{slide.kpi}</span>
                  </div>
                </div>

                {/* Carousel Controls Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-[#ebebeb]">
                  <div className="flex space-x-1.5">
                    {HERO_SLIDES.map((s, idx) => (
                      <button
                        key={s.id}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          currentSlide === idx ? 'w-6 bg-[#171717]' : 'w-2 bg-[#ebebeb] hover:bg-[#d4d4d4]'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
                      className="p-1.5 rounded-[6px] bg-white border border-[#ebebeb] text-[#171717] hover:bg-[#fafafa] transition-colors"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                      className="p-1.5 rounded-[6px] bg-white border border-[#ebebeb] text-[#171717] hover:bg-[#fafafa] transition-colors"
                      aria-label="Next Slide"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}


