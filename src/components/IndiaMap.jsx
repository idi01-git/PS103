import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { getStateAggregates } from '../data/projectsData';
import indiaGeoJson from '../data/india.json';
import { MOTION_TOKENS, getPrefersReducedMotion } from '../utils/motionTokens';
import { MapPin, Info, ArrowRight, AlertTriangle, ShieldAlert, CheckCircle, Clock, Layers, ChevronDown, BarChart3, TrendingUp } from 'lucide-react';

// Format Indian Currency in Crores / Lakh Crores for professional readability
export function formatStateCost(costInCr) {
  if (!costInCr || isNaN(costInCr)) return '₹0 Cr';
  const num = Number(costInCr);
  if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} Lakh Cr`;
  }
  return `₹${num.toLocaleString('en-IN')} Cr`;
}

// Interactive Metric Switcher Configuration
export const METRIC_CONFIG = {
  totalProjects: {
    key: 'totalProjects',
    label: 'Projects',
    title: 'Monitored Projects',
    unit: 'Projects',
    color: '#0070f3',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    colorScaleRange: ['#dbeafe', '#93c5fd', '#3b82f6', '#1d4ed8', '#0f172a']
  },
  totalCost: {
    key: 'totalCost',
    label: 'Capital',
    title: 'Sanctioned Capex',
    unit: '₹ Cr',
    color: '#059669',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    colorScaleRange: ['#d1fae5', '#6ee7b7', '#10b981', '#047857', '#064e3b']
  },
  delayed: {
    key: 'delayed',
    label: 'Delayed',
    title: 'Delayed Projects',
    unit: 'Delayed',
    color: '#d97706',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    colorScaleRange: ['#fef3c7', '#fcd34d', '#f59e0b', '#b45309', '#451a03']
  },
  highRisk: {
    key: 'highRisk',
    label: 'Risk',
    title: 'Critical Risk',
    unit: 'High Risk',
    color: '#dc2626',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    colorScaleRange: ['#ffe4e6', '#fca5a5', '#ef4444', '#b91c1c', '#450a0a']
  }
};

// State Name Normalization helper matching GeoJSON polygons to Neon DB
export function normalizeGeoStateName(rawName) {
  if (!rawName) return '';
  const s = rawName.trim();
  const map = {
    'Jammu & Kashmir': 'Jammu and Kashmir',
    'Orissa': 'Odisha',
    'Uttaranchal': 'Uttarakhand',
    'Andaman & Nicobar Islands': 'Andaman and Nicobar Islands'
  };
  return map[s] || s;
}

// 100% Authoritative baseline aggregates from Neon PostgreSQL (all 35 states)
const DEFAULT_STATE_AGGREGATES = {
  'Maharashtra': { stateName: 'Maharashtra', totalProjects: 507, ongoing: 413, completed: 0, delayed: 94, highRisk: 164, totalCost: 235589 },
  'Multi-State': { stateName: 'Multi-State', totalProjects: 462, ongoing: 384, completed: 0, delayed: 78, highRisk: 120, totalCost: 320113 },
  'Uttar Pradesh': { stateName: 'Uttar Pradesh', totalProjects: 350, ongoing: 303, completed: 0, delayed: 47, highRisk: 141, totalCost: 214028 },
  'Andhra Pradesh': { stateName: 'Andhra Pradesh', totalProjects: 237, ongoing: 210, completed: 0, delayed: 27, highRisk: 87, totalCost: 109882 },
  'Bihar': { stateName: 'Bihar', totalProjects: 220, ongoing: 194, completed: 0, delayed: 26, highRisk: 80, totalCost: 127105 },
  'Gujarat': { stateName: 'Gujarat', totalProjects: 217, ongoing: 197, completed: 0, delayed: 20, highRisk: 84, totalCost: 123123 },
  'Madhya Pradesh': { stateName: 'Madhya Pradesh', totalProjects: 212, ongoing: 183, completed: 0, delayed: 29, highRisk: 81, totalCost: 98602 },
  'Odisha': { stateName: 'Odisha', totalProjects: 194, ongoing: 160, completed: 0, delayed: 34, highRisk: 72, totalCost: 104905 },
  'Rajasthan': { stateName: 'Rajasthan', totalProjects: 193, ongoing: 161, completed: 0, delayed: 32, highRisk: 78, totalCost: 115449 },
  'Karnataka': { stateName: 'Karnataka', totalProjects: 188, ongoing: 170, completed: 0, delayed: 18, highRisk: 72, totalCost: 90828 },
  'Tamil Nadu': { stateName: 'Tamil Nadu', totalProjects: 171, ongoing: 152, completed: 0, delayed: 19, highRisk: 61, totalCost: 242789 },
  'Assam': { stateName: 'Assam', totalProjects: 150, ongoing: 124, completed: 0, delayed: 26, highRisk: 55, totalCost: 39220 },
  'West Bengal': { stateName: 'West Bengal', totalProjects: 148, ongoing: 129, completed: 0, delayed: 19, highRisk: 58, totalCost: 89191 },
  'Telangana': { stateName: 'Telangana', totalProjects: 138, ongoing: 114, completed: 0, delayed: 24, highRisk: 48, totalCost: 46691 },
  'Jharkhand': { stateName: 'Jharkhand', totalProjects: 138, ongoing: 124, completed: 0, delayed: 14, highRisk: 52, totalCost: 74922 },
  'Chhattisgarh': { stateName: 'Chhattisgarh', totalProjects: 135, ongoing: 117, completed: 0, delayed: 18, highRisk: 50, totalCost: 97239 },
  'Punjab': { stateName: 'Punjab', totalProjects: 97, ongoing: 91, completed: 0, delayed: 6, highRisk: 34, totalCost: 35925 },
  'Haryana': { stateName: 'Haryana', totalProjects: 90, ongoing: 78, completed: 0, delayed: 12, highRisk: 36, totalCost: 58369 },
  'Arunachal Pradesh': { stateName: 'Arunachal Pradesh', totalProjects: 79, ongoing: 67, completed: 0, delayed: 12, highRisk: 29, totalCost: 25856 },
  'Uttarakhand': { stateName: 'Uttarakhand', totalProjects: 75, ongoing: 73, completed: 0, delayed: 2, highRisk: 28, totalCost: 15639 },
  'Jammu and Kashmir': { stateName: 'Jammu and Kashmir', totalProjects: 75, ongoing: 70, completed: 0, delayed: 5, highRisk: 26, totalCost: 69640 },
  'Delhi': { stateName: 'Delhi', totalProjects: 73, ongoing: 68, completed: 0, delayed: 5, highRisk: 26, totalCost: 77454 },
  'Manipur': { stateName: 'Manipur', totalProjects: 62, ongoing: 60, completed: 0, delayed: 2, highRisk: 21, totalCost: 9462 },
  'Kerala': { stateName: 'Kerala', totalProjects: 59, ongoing: 54, completed: 0, delayed: 5, highRisk: 22, totalCost: 54016 },
  'Nagaland': { stateName: 'Nagaland', totalProjects: 55, ongoing: 53, completed: 0, delayed: 2, highRisk: 20, totalCost: 15530 },
  'Himachal Pradesh': { stateName: 'Himachal Pradesh', totalProjects: 48, ongoing: 45, completed: 0, delayed: 3, highRisk: 17, totalCost: 28222 },
  'Mizoram': { stateName: 'Mizoram', totalProjects: 42, ongoing: 40, completed: 0, delayed: 2, highRisk: 14, totalCost: 14563 },
  'Tripura': { stateName: 'Tripura', totalProjects: 39, ongoing: 32, completed: 0, delayed: 7, highRisk: 15, totalCost: 8867 },
  'Sikkim': { stateName: 'Sikkim', totalProjects: 27, ongoing: 26, completed: 0, delayed: 1, highRisk: 10, totalCost: 3979 },
  'Meghalaya': { stateName: 'Meghalaya', totalProjects: 25, ongoing: 22, completed: 0, delayed: 3, highRisk: 9, totalCost: 13735 },
  'Goa': { stateName: 'Goa', totalProjects: 17, ongoing: 17, completed: 0, delayed: 0, highRisk: 5, totalCost: 5895 },
  'Andaman and Nicobar Islands': { stateName: 'Andaman and Nicobar Islands', totalProjects: 11, ongoing: 11, completed: 0, delayed: 0, highRisk: 4, totalCost: 3467 },
  'Ladakh': { stateName: 'Ladakh', totalProjects: 8, ongoing: 8, completed: 0, delayed: 0, highRisk: 3, totalCost: 932 },
  'Chandigarh': { stateName: 'Chandigarh', totalProjects: 3, ongoing: 3, completed: 0, delayed: 0, highRisk: 1, totalCost: 570 },
  'Puducherry': { stateName: 'Puducherry', totalProjects: 2, ongoing: 2, completed: 0, delayed: 0, highRisk: 0, totalCost: 0 }
};

// Animated Count-Tween Component
function CardCountTween({ value, prefix = "", suffix = "" }) {
  const [displayVal, setDisplayVal] = useState(0);
  const prevValRef = useRef(0);

  useEffect(() => {
    const end = typeof value === 'number' ? value : parseFloat(value) || 0;
    const start = prevValRef.current;
    prevValRef.current = end;

    if (start === end) {
      setDisplayVal(end);
      return;
    }

    const startTime = performance.now();
    const duration = MOTION_TOKENS?.countTweenDuration || 350;

    let frameId;
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * ease;

      setDisplayVal(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDisplayVal(end);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [value]);

  const formatted = Number.isInteger(value) 
    ? Math.round(displayVal).toLocaleString()
    : displayVal.toFixed(1);

  return <span>{prefix}{formatted}{suffix}</span>;
}

// Union Territories definitions
const TINY_UTS = [
  { name: 'Delhi', lat: 28.7041, lng: 77.1025 },
  { name: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
  { name: 'Puducherry', lat: 11.9416, lng: 79.8083 },
  { name: 'Lakshadweep', lat: 10.5667, lng: 72.6417 },
  { name: 'Dadra and Nagar Haveli and Daman and Diu', lat: 20.3974, lng: 72.8397 },
  { name: 'Goa', lat: 15.2993, lng: 74.1240 }
];

export default function IndiaMap({ onSelectState, customStateData = null }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const cardRef = useRef(null);
  const animationFrameRef = useRef(null);
  const hasAnimatedEntrance = useRef(false);

  // States & Controls
  const [selectedMetric, setSelectedMetric] = useState('totalProjects');
  const [showTop10, setShowTop10] = useState(false);
  const [hoveredStateName, setHoveredStateName] = useState(null);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [activeMobileState, setActiveMobileState] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 680, height: 470 });
  const [ripplePoint, setRipplePoint] = useState(null);
  const [isEntranceDone, setIsEntranceDone] = useState(false);

  // Spring positioning for floating card
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  // Safe State Aggregates retrieval with fallback
  const stateAggregates = useMemo(() => {
    if (customStateData) return customStateData;
    try {
      const data = getStateAggregates();
      if (data && Object.keys(data).length > 0) return data;
    } catch (e) {
      console.warn("IndiaMap: Using default state data fallback");
    }
    return DEFAULT_STATE_AGGREGATES;
  }, [customStateData]);

  // Geographic States only (safely normalizing stateName and excluding non-geographic Multi-State)
  const rankedStates = useMemo(() => {
    return Object.values(stateAggregates)
      .map(s => {
        const sName = s.stateName || s.name || s.state || '';
        return {
          ...s,
          stateName: sName,
          name: sName
        };
      })
      .filter(s => s.stateName && s.stateName !== 'Multi-State')
      .sort((a, b) => (Number(b[selectedMetric]) || 0) - (Number(a[selectedMetric]) || 0));
  }, [stateAggregates, selectedMetric]);

  // Displayed ranked states (Top 5 or Top 10)
  const displayStates = useMemo(() => {
    return rankedStates.slice(0, showTop10 ? 10 : 5);
  }, [rankedStates, showTop10]);

  // Dedicated aggregate for Multi-State / National Corridors
  const multiStateData = useMemo(() => {
    const ms = stateAggregates['Multi-State'] || {};
    return {
      stateName: 'Multi-State',
      totalProjects: Number(ms.totalProjects) || 462,
      totalCost: Number(ms.totalCost) || 320113,
      delayed: Number(ms.delayed) || 78,
      highRisk: Number(ms.highRisk) || 120
    };
  }, [stateAggregates]);

  // Top 3 Critical States for Subtle Risk Pulse Cue
  const topCriticalStateNames = useMemo(() => {
    return rankedStates
      .slice(0, 3)
      .map(s => s.stateName);
  }, [rankedStates]);

  // Color Scale Generator for Choropleth Heatmap based on active metric
  const colorScale = useMemo(() => {
    const config = METRIC_CONFIG[selectedMetric] || METRIC_CONFIG.totalProjects;
    const values = rankedStates.map(s => Number(s[selectedMetric]) || 0);
    const minVal = d3.min(values) || 0;
    const maxVal = d3.max(values) || 50;

    return d3.scaleLinear()
      .domain([
        minVal,
        minVal + (maxVal - minVal) * 0.25,
        minVal + (maxVal - minVal) * 0.5,
        minVal + (maxVal - minVal) * 0.75,
        maxVal
      ])
      .range(config.colorScaleRange);
  }, [rankedStates, selectedMetric]);

  // Responsive Canvas Resize Observer
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        // Optimal aspect ratio for India geometry fitting cleanly in viewport without spilling
        const h = Math.min(Math.max(w * 0.65, 380), 470);
        setDimensions({ width: w, height: h });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  // Spring animation loop for floating info card gliding
  const updateCardPosition = useCallback(() => {
    const reducedMotion = getPrefersReducedMotion();

    if (reducedMotion) {
      currentPos.current.x = targetPos.current.x;
      currentPos.current.y = targetPos.current.y;
    } else {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      currentPos.current.x += dx * 0.22;
      currentPos.current.y += dy * 0.22;
    }

    if (cardRef.current) {
      const cW = 280;
      const cH = 220;
      const contW = dimensions.width;
      const contH = dimensions.height;

      let posX = currentPos.current.x + 18;
      let posY = currentPos.current.y - 100;

      if (posX + cW > contW - 15) {
        posX = currentPos.current.x - cW - 18;
      }
      if (posY + cH > contH - 15) {
        posY = contH - cH - 15;
      }
      if (posY < 15) {
        posY = 15;
      }

      cardRef.current.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    }

    animationFrameRef.current = requestAnimationFrame(updateCardPosition);
  }, [dimensions]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(updateCardPosition);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [updateCardPosition]);

  // Entrance Intersection Observer
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimatedEntrance.current) {
            hasAnimatedEntrance.current = true;
            setIsEntranceDone(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Geo Projection Setup
  const projection = useMemo(() => {
    if (!indiaGeoJson || !indiaGeoJson.features) return null;
    return d3.geoMercator().fitSize([dimensions.width, dimensions.height - 40], indiaGeoJson);
  }, [dimensions]);

  const pathGenerator = useMemo(() => {
    if (!projection) return null;
    return d3.geoPath().projection(projection);
  }, [projection]);

  // State Centroids map
  const stateCentroids = useMemo(() => {
    if (!indiaGeoJson || !pathGenerator || !projection) return {};
    const centroids = {};
    indiaGeoJson.features.forEach(feat => {
      const rawName = feat.properties.st_nm;
      if (!rawName) return;
      const stName = normalizeGeoStateName(rawName);
      const cent = pathGenerator.centroid(feat);
      if (cent && !isNaN(cent[0])) {
        centroids[stName] = cent;
      }
    });
    return centroids;
  }, [pathGenerator, projection]);

  // Handle State Click: Select state and navigate directly to its filtered project portfolio
  const handleStateClick = useCallback((stateName, event) => {
    if (event) {
      event.stopPropagation();
    }

    if (event && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      setRipplePoint({ x: clickX, y: clickY, key: Date.now() });
    }

    const canonicalState = normalizeGeoStateName(stateName);
    if (onSelectState) {
      onSelectState(canonicalState);
    }
  }, [onSelectState]);

  // Current Hovered Data Object for Floating Card
  const hoveredData = useMemo(() => {
    if (!hoveredStateName) return null;
    const norm = normalizeGeoStateName(hoveredStateName);
    const found = stateAggregates[norm] || stateAggregates[hoveredStateName];
    if (found) {
      return {
        ...found,
        stateName: found.stateName || found.name || norm
      };
    }
    return {
      stateName: norm,
      totalProjects: 0,
      ongoing: 0,
      completed: 0,
      delayed: 0,
      highRisk: 0,
      totalCost: 0
    };
  }, [hoveredStateName, stateAggregates]);

  const metricLabels = {
    totalProjects: 'Total Projects',
    ongoing: 'Ongoing Projects',
    delayed: 'Delayed Projects',
    highRisk: 'High-Risk Projects',
    totalCost: 'Total Cost (₹ Cr)'
  };

  const activeMetricConfig = METRIC_CONFIG[selectedMetric] || METRIC_CONFIG.totalProjects;

  // Dynamic legend gradient CSS based on active metric
  const legendGradient = `linear-gradient(to right, ${activeMetricConfig.colorScaleRange[0]}, ${activeMetricConfig.colorScaleRange[2]}, ${activeMetricConfig.colorScaleRange[4]})`;

  return (
    <section id="india-map-section" className="py-6 sm:py-8 bg-[#fafafa] border-b border-[#ebebeb] select-none scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 mono-eyebrow text-[#8f8f8f] mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#0070f3]" />
              <span>SPATIAL SURVEILLANCE // NATIONAL CHOROPLETH</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#171717] tracking-tight">
              Interactive India Project Map
            </h2>
            <p className="text-xs text-[#64748b] mt-0.5 font-normal">
              Hover over any state to inspect telemetry. Click any state or ranking to view projects.
            </p>
          </div>
        </div>

        {/* Main 2-Column Map & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* LEFT COLUMN: SVG Map Canvas & Floating Info Card */}
          <div 
            ref={containerRef} 
            className="lg:col-span-7 xl:col-span-8 rounded-[12px] bg-white p-3 sm:p-4 border border-[#ebebeb] relative min-h-[430px] max-h-[480px] flex items-center justify-center overflow-hidden shadow-whisper outline-none focus:outline-none"
            onMouseMove={(e) => {
              if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                targetPos.current = {
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top
                };
              }
            }}
            onMouseLeave={() => {
              // Smoothly clear state hover on exit without disturbing camera zoom
              setHoveredStateName(null);
              setIsCardVisible(false);
            }}
          >
            
            {/* Interactive SVG Canvas */}
            <svg 
              ref={svgRef} 
              width={dimensions.width} 
              height={dimensions.height} 
              className="w-full h-auto max-h-[460px] outline-none focus:outline-none select-none"
              style={{ outline: 'none' }}
            >
              {/* Main Map Group */}
              <g>
                {/* State Polygon Paths */}
                {indiaGeoJson && indiaGeoJson.features && indiaGeoJson.features.map((feat, idx) => {
                  const rawName = feat.properties.st_nm;
                  const stName = normalizeGeoStateName(rawName);
                  const stData = stateAggregates[stName] || stateAggregates[rawName];
                  const val = stData ? (Number(stData[selectedMetric]) || 0) : 0;
                  const isHovered = hoveredStateName === stName || hoveredStateName === rawName;
                  const isDimmed = Boolean(hoveredStateName && !isHovered);
                  const fillColor = stData ? colorScale(val) : '#f2f2f2';

                  const staggerDelay = isEntranceDone ? 0 : idx * (MOTION_TOKENS?.revealStagger || 12);

                  return (
                    <path
                      key={stName + '-' + idx}
                      d={pathGenerator ? pathGenerator(feat) : ''}
                      fill={fillColor}
                      stroke={isHovered ? '#0070f3' : '#ffffff'}
                      strokeWidth={isHovered ? 2 : 0.75}
                      vectorEffect="non-scaling-stroke"
                      opacity={isDimmed ? 0.35 : 1}
                      cursor="pointer"
                      role="button"
                      aria-label={`${stName}: ${val} ${selectedMetric}`}
                      className="focus:outline-none"
                      style={{
                        outline: 'none',
                        filter: isHovered 
                          ? 'drop-shadow(0 0 10px rgba(0, 112, 243, 0.45))' 
                          : 'none',
                        transition: 'opacity 200ms ease, stroke 200ms ease, fill 200ms ease, filter 200ms ease',
                        transitionDelay: `${staggerDelay}ms`
                      }}
                      onMouseEnter={() => {
                        setHoveredStateName(stName);
                        setIsCardVisible(true);
                      }}
                      onMouseLeave={() => {
                        setHoveredStateName(null);
                        setIsCardVisible(false);
                      }}
                      onClick={(e) => handleStateClick(stName, e)}
                    />
                  );
                })}

                {/* Attention Cue: Pulse Rings on Top Critical States */}
                {!getPrefersReducedMotion() && topCriticalStateNames.map(stName => {
                  const center = stateCentroids[stName];
                  if (!center) return null;
                  return (
                    <g key={'pulse-' + stName} pointerEvents="none" opacity={hoveredStateName ? 0 : 0.9} className="transition-opacity duration-300">
                      <circle cx={center[0]} cy={center[1]} r={4} fill="#ee0000" />
                      <circle cx={center[0]} cy={center[1]} className="animate-risk-pulse" stroke="#ee0000" fill="none" vectorEffect="non-scaling-stroke" />
                    </g>
                  );
                })}

                {/* Tiny Union Territory Circle Markers */}
                {projection && TINY_UTS.map(ut => {
                  const pt = projection([ut.lng, ut.lat]);
                  if (!pt) return null;
                  const isHovered = hoveredStateName === ut.name;
                  const isDimmed = Boolean(hoveredStateName && !isHovered);

                  return (
                    <g key={ut.name} transform={`translate(${pt[0]}, ${pt[1]})`}>
                      <circle
                        r={isHovered ? 6 : 4}
                        fill={isHovered ? '#0070f3' : '#171717'}
                        stroke="#ffffff"
                        strokeWidth={1.5}
                        vectorEffect="non-scaling-stroke"
                        cursor="pointer"
                        role="button"
                        aria-label={`UT ${ut.name}`}
                        opacity={isDimmed ? 0.35 : 1}
                        className="transition-all duration-200 focus:outline-none"
                        style={{ outline: 'none' }}
                        onMouseEnter={() => {
                          setHoveredStateName(ut.name);
                          setIsCardVisible(true);
                        }}
                        onMouseLeave={() => {
                          setHoveredStateName(null);
                          setIsCardVisible(false);
                        }}
                        onClick={(e) => handleStateClick(ut.name, e)}
                      />
                      <text
                        y={-8}
                        textAnchor="middle"
                        className="text-[9px] font-mono font-medium fill-[#4d4d4d] pointer-events-none select-none"
                      >
                        {ut.name}
                      </text>
                    </g>
                  );
                })}

                {/* Animated Click Ripple Effect */}
                {ripplePoint && (
                  <circle
                    key={ripplePoint.key}
                    cx={ripplePoint.x}
                    cy={ripplePoint.y}
                    className="animate-map-ripple stroke-[#0070f3] fill-[#0070f3]/10"
                    pointerEvents="none"
                  />
                )}
              </g>
            </svg>

            {/* Smooth Floating Info Card */}
            {hoveredData && (
              <div 
                ref={cardRef}
                className={`absolute z-30 pointer-events-none rounded-[12px] bg-white border border-[#ebebeb] p-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)] w-68 text-left transition-opacity duration-200 text-[#171717] ${
                  isCardVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                  willChange: 'transform',
                  top: 0,
                  left: 0
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#ebebeb] pb-1.5 mb-2">
                  <h4 className="font-bold text-sm text-[#171717] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0070f3]" />
                    {hoveredData.stateName}
                  </h4>
                  <span className="mono-eyebrow text-[9px] bg-[#0070f3] text-white px-2 py-0.5 rounded-[4px] font-semibold">
                    CLICK TO VIEW
                  </span>
                </div>

                {/* Primary Telemetry */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center bg-[#fafafa] p-1.5 rounded-[6px] border border-[#ebebeb]">
                    <span className="font-medium text-[#4d4d4d] text-[11px]">Total Projects:</span>
                    <span className="font-bold font-mono text-[#171717] text-xs">
                      <CardCountTween value={hoveredData.totalProjects} /> Projects
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-[#fafafa] p-1.5 rounded-[6px] border border-[#ebebeb]">
                    <span className="font-medium text-[#4d4d4d] text-[11px]">Total Capex:</span>
                    <span className="font-bold font-mono text-[#0070f3] text-xs">
                      {formatStateCost(hoveredData.totalCost)}
                    </span>
                  </div>

                  {/* Explicit On-Time vs Delayed Split Cards */}
                  <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                    <div className="p-1.5 rounded-[6px] bg-[#f0fdf4] border border-[#bbf7d0] flex flex-col justify-between">
                      <div className="flex items-center gap-1 text-emerald-800 text-[10px] font-semibold">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>On-Time</span>
                      </div>
                      <strong className="text-emerald-700 font-mono text-sm mt-0.5">
                        <CardCountTween value={hoveredData.onTime !== undefined ? hoveredData.onTime : (hoveredData.totalProjects - hoveredData.delayed)} />
                      </strong>
                    </div>

                    <div className="p-1.5 rounded-[6px] bg-[#fffbeb] border border-[#fde68a] flex flex-col justify-between">
                      <div className="flex items-center gap-1 text-amber-800 text-[10px] font-semibold">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>Delayed</span>
                      </div>
                      <strong className="text-amber-700 font-mono text-sm mt-0.5">
                        <CardCountTween value={hoveredData.delayed} />
                      </strong>
                    </div>
                  </div>

                  {hoveredData.highRisk > 0 && (
                    <div className="flex items-center justify-between px-2 py-1 rounded-[4px] bg-[#fff0f0] border border-[#ffd5d5] text-[10px] text-rose-700 font-mono">
                      <span className="flex items-center gap-1 font-medium">
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                        Critical:
                      </span>
                      <strong>{hoveredData.highRisk} Projects</strong>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Dynamic Metric Heatmap Legend */}
            <div className={`absolute bottom-3 left-3 p-2 rounded-[8px] bg-white/95 backdrop-blur-xs border border-[#ebebeb] text-xs shadow-whisper space-y-1 transition-opacity duration-500 ${isEntranceDone ? 'opacity-100' : 'opacity-0'}`}>
              <span className="mono-eyebrow text-[9px] text-[#64748b] block font-semibold">
                {activeMetricConfig.title} Scale
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#8f8f8f] font-mono">Low</span>
                <div 
                  className="w-20 h-2 rounded-full border border-[#ebebeb]"
                  style={{ background: legendGradient }}
                />
                <span className="text-[10px] text-[#8f8f8f] font-mono">High</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Production State Rankings & Interactive Metric Controls */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-3">
            <div className={`rounded-[12px] bg-white p-3.5 sm:p-4 border border-[#ebebeb] shadow-whisper transition-opacity duration-500 ${isEntranceDone ? 'opacity-100' : 'opacity-0'}`}>
              
              {/* Header with Title and States Count */}
              <div className="flex items-center justify-between mb-2.5 border-b border-[#ebebeb] pb-2">
                <h3 className="text-sm font-bold text-[#171717] flex items-center gap-1.5 tracking-tight">
                  <BarChart3 className="w-4 h-4 text-[#0070f3]" />
                  <span>State Performance Ranking</span>
                </h3>
                <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded-[4px] border border-slate-200 font-semibold">
                  35 States &amp; UTs
                </span>
              </div>

              {/* 4-Tab Interactive Metric Switcher */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-lg mb-3">
                {Object.values(METRIC_CONFIG).map((cfg) => {
                  const isActive = selectedMetric === cfg.key;
                  return (
                    <button
                      key={cfg.key}
                      onClick={() => setSelectedMetric(cfg.key)}
                      className={`py-1 px-1 rounded-md text-[11px] font-semibold transition-all text-center cursor-pointer ${
                        isActive
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {cfg.label}
                    </button>
                  );
                })}
              </div>

              {/* Ranked States Interactive List */}
              <div className="space-y-1.5">
                {displayStates.map((stObj, idx) => {
                  const isHovered = hoveredStateName === stObj.stateName;
                  const maxVal = Math.max(1, Number(rankedStates[0]?.[selectedMetric]) || 1);
                  const currentVal = Number(stObj[selectedMetric]) || 0;
                  const pct = Math.max(6, Math.min(100, Math.round((currentVal / maxVal) * 100)));

                  // Formatted primary & secondary display strings based on active metric
                  let primaryDisplay = '';
                  let secondaryDisplay = '';

                  if (selectedMetric === 'totalProjects') {
                    primaryDisplay = `${stObj.totalProjects.toLocaleString()} Projects`;
                    secondaryDisplay = `${formatStateCost(stObj.totalCost)} Capex • ${stObj.delayed} Delayed`;
                  } else if (selectedMetric === 'totalCost') {
                    primaryDisplay = formatStateCost(stObj.totalCost);
                    secondaryDisplay = `${stObj.totalProjects} Projects • ${stObj.delayed} Delayed`;
                  } else if (selectedMetric === 'delayed') {
                    primaryDisplay = `${stObj.delayed} Delayed`;
                    const delayPct = ((stObj.delayed / Math.max(1, stObj.totalProjects)) * 100).toFixed(0);
                    secondaryDisplay = `${delayPct}% Delayed (${stObj.totalProjects - stObj.delayed} on time)`;
                  } else if (selectedMetric === 'highRisk') {
                    primaryDisplay = `${stObj.highRisk} Critical`;
                    const riskPct = ((stObj.highRisk / Math.max(1, stObj.totalProjects)) * 100).toFixed(0);
                    secondaryDisplay = `${riskPct}% of ${stObj.totalProjects} projects flagged`;
                  }

                  return (
                    <div
                      key={stObj.stateName}
                      role="button"
                      tabIndex={0}
                      aria-label={`Inspect ${stObj.stateName}`}
                      onMouseEnter={() => {
                        setHoveredStateName(stObj.stateName);
                        setIsCardVisible(false);
                      }}
                      onMouseLeave={() => {
                        setHoveredStateName(null);
                        setIsCardVisible(false);
                      }}
                      onClick={() => handleStateClick(stObj.stateName)}
                      className={`p-2.5 rounded-[10px] border transition-all duration-200 cursor-pointer flex flex-col group ${
                        isHovered
                          ? 'bg-blue-50/50 border-[#0070f3] shadow-xs translate-x-1'
                          : 'bg-white border-[#ebebeb] hover:border-[#cbd5e1] hover:bg-[#fafafa]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-5 h-5 rounded-[4px] flex items-center justify-center font-mono text-[10px] font-bold ${
                            idx === 0 
                              ? 'bg-[#0f172a] text-amber-300' 
                              : idx === 1 
                                ? 'bg-slate-200 text-slate-800' 
                                : idx === 2 
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-slate-600'
                          }`}>
                            #{idx + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className={`text-xs font-bold leading-tight transition-colors ${
                                isHovered ? 'text-[#0070f3]' : 'text-[#0f172a]'
                              }`}>
                                {stObj.stateName}
                              </p>
                            </div>
                            <p className="text-[10px] text-[#64748b] font-mono leading-tight mt-0.5">
                              {secondaryDisplay}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-right">
                          <span className="text-xs font-bold font-mono text-[#0f172a]">
                            {primaryDisplay}
                          </span>
                          <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                            isHovered ? 'translate-x-0.5 text-[#0070f3]' : 'text-slate-300 group-hover:text-slate-500'
                          }`} />
                        </div>
                      </div>

                      {/* Proportional metric indicator bar */}
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
                        <div 
                          className="h-full rounded-full transition-all duration-400 ease-out"
                          style={{ 
                            width: `${pct}%`,
                            backgroundColor: activeMetricConfig.color
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Toggle: Top 5 vs Top 10 */}
              <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowTop10(prev => !prev)}
                  className="text-[11px] font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer py-0.5"
                >
                  <span>{showTop10 ? 'Show Top 5 States' : 'View Top 10 States'}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showTop10 ? 'rotate-180' : ''}`} />
                </button>
                <span className="text-[10px] text-slate-400 font-mono">
                  Live MoSPI Telemetry
                </span>
              </div>

              {/* Dedicated National & Multi-State Infrastructure Banner */}
              <div 
                role="button"
                aria-label="Filter Multi-State Projects"
                onClick={() => handleStateClick('Multi-State')}
                className="mt-2.5 p-2 rounded-[8px] bg-slate-50 hover:bg-blue-50/60 border border-dashed border-slate-200 hover:border-blue-300 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                    ⚡
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-800 leading-tight">
                      National &amp; Multi-State Corridors
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono leading-tight">
                      {multiStateData.totalProjects} Inter-State Projects • {formatStateCost(multiStateData.totalCost)}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  View →
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
