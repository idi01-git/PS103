import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { getStateAggregates } from '../data/projectsData';
import indiaGeoJson from '../data/india.json';
import { MOTION_TOKENS, getPrefersReducedMotion } from '../utils/motionTokens';
import { MapPin, Info, ArrowRight, X, AlertTriangle, ShieldAlert, CheckCircle, Clock, Layers } from 'lucide-react';

// Default state aggregates fallback for standalone usage without external props
const DEFAULT_STATE_AGGREGATES = {
  'Maharashtra': { stateName: 'Maharashtra', totalProjects: 142, ongoing: 78, completed: 42, delayed: 22, highRisk: 8, totalCost: 185000 },
  'Gujarat': { stateName: 'Gujarat', totalProjects: 118, ongoing: 62, completed: 38, delayed: 18, highRisk: 5, totalCost: 142000 },
  'Uttar Pradesh': { stateName: 'Uttar Pradesh', totalProjects: 135, ongoing: 70, completed: 39, delayed: 26, highRisk: 9, totalCost: 168000 },
  'Tamil Nadu': { stateName: 'Tamil Nadu', totalProjects: 98, ongoing: 52, completed: 31, delayed: 15, highRisk: 4, totalCost: 115000 },
  'Karnataka': { stateName: 'Karnataka', totalProjects: 105, ongoing: 58, completed: 32, delayed: 15, highRisk: 6, totalCost: 128000 },
  'Jammu & Kashmir': { stateName: 'Jammu & Kashmir', totalProjects: 64, ongoing: 34, completed: 18, delayed: 12, highRisk: 7, totalCost: 74000 },
  'Ladakh': { stateName: 'Ladakh', totalProjects: 28, ongoing: 14, completed: 8, delayed: 6, highRisk: 3, totalCost: 32000 },
  'West Bengal': { stateName: 'West Bengal', totalProjects: 88, ongoing: 46, completed: 26, delayed: 16, highRisk: 5, totalCost: 95000 },
  'Rajasthan': { stateName: 'Rajasthan', totalProjects: 92, ongoing: 48, completed: 28, delayed: 16, highRisk: 4, totalCost: 102000 },
  'Madhya Pradesh': { stateName: 'Madhya Pradesh', totalProjects: 96, ongoing: 50, completed: 29, delayed: 17, highRisk: 6, totalCost: 110000 },
  'Kerala': { stateName: 'Kerala', totalProjects: 68, ongoing: 36, completed: 21, delayed: 11, highRisk: 2, totalCost: 78000 },
  'Assam': { stateName: 'Assam', totalProjects: 58, ongoing: 30, completed: 18, delayed: 10, highRisk: 4, totalCost: 62000 },
  'Odisha': { stateName: 'Odisha', totalProjects: 82, ongoing: 44, completed: 24, delayed: 14, highRisk: 5, totalCost: 89000 },
  'Telangana': { stateName: 'Telangana', totalProjects: 76, ongoing: 40, completed: 24, delayed: 12, highRisk: 3, totalCost: 84000 },
  'Andhra Pradesh': { stateName: 'Andhra Pradesh', totalProjects: 84, ongoing: 44, completed: 26, delayed: 14, highRisk: 4, totalCost: 92000 },
  'Bihar': { stateName: 'Bihar', totalProjects: 79, ongoing: 40, completed: 23, delayed: 16, highRisk: 7, totalCost: 81000 },
  'Punjab': { stateName: 'Punjab', totalProjects: 62, ongoing: 32, completed: 20, delayed: 10, highRisk: 3, totalCost: 68000 },
  'Haryana': { stateName: 'Haryana', totalProjects: 66, ongoing: 35, completed: 21, delayed: 10, highRisk: 3, totalCost: 71000 },
  'Delhi': { stateName: 'Delhi', totalProjects: 72, ongoing: 38, completed: 24, delayed: 10, highRisk: 2, totalCost: 85000 },
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
  const [hoveredStateName, setHoveredStateName] = useState(null);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [activeMobileState, setActiveMobileState] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 680, height: 600 });
  const [ripplePoint, setRipplePoint] = useState(null);
  const [zoomTransform, setZoomTransform] = useState({ k: 1, x: 0, y: 0 });
  const [zoomedState, setZoomedState] = useState(null);
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

  // Top 5 States computed by selected metric
  const top5States = useMemo(() => {
    return Object.values(stateAggregates)
      .sort((a, b) => (b[selectedMetric] || 0) - (a[selectedMetric] || 0))
      .slice(0, 5);
  }, [stateAggregates, selectedMetric]);

  // Top 3 Critical States for Subtle Risk Pulse Cue
  const topCriticalStateNames = useMemo(() => {
    return Object.values(stateAggregates)
      .sort((a, b) => (b.highRisk || 0) - (a.highRisk || 0))
      .slice(0, 3)
      .map(s => s.stateName);
  }, [stateAggregates]);

  // Color Scale Generator for Choropleth Heatmap (Blue Shades Palette)
  const colorScale = useMemo(() => {
    const values = Object.values(stateAggregates).map(s => s[selectedMetric] || 0);
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
      .range(['#BAE6FD', '#60A5FA', '#2563EB', '#1D4ED8', '#03045E']);
  }, [stateAggregates, selectedMetric]);

  // Responsive Canvas Resize Observer
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        const h = Math.min(Math.max(w * 0.92, 460), 650);
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

  // State Bounding Boxes Lookup
  const stateBoundsMap = useMemo(() => {
    if (!indiaGeoJson || !pathGenerator) return {};
    const boundsMap = {};

    indiaGeoJson.features.forEach(feat => {
      const stName = feat.properties?.st_nm;
      if (!stName) return;
      const b = pathGenerator.bounds(feat);
      if (!b || isNaN(b[0][0])) return;

      if (!boundsMap[stName]) {
        boundsMap[stName] = {
          x0: b[0][0],
          y0: b[0][1],
          x1: b[1][0],
          y1: b[1][1]
        };
      } else {
        boundsMap[stName].x0 = Math.min(boundsMap[stName].x0, b[0][0]);
        boundsMap[stName].y0 = Math.min(boundsMap[stName].y0, b[0][1]);
        boundsMap[stName].x1 = Math.max(boundsMap[stName].x1, b[1][0]);
        boundsMap[stName].y1 = Math.max(boundsMap[stName].y1, b[1][1]);
      }
    });

    return boundsMap;
  }, [pathGenerator]);

  // State Centroids map
  const stateCentroids = useMemo(() => {
    if (!indiaGeoJson || !pathGenerator || !projection) return {};
    const centroids = {};
    indiaGeoJson.features.forEach(feat => {
      const stName = feat.properties.st_nm;
      const cent = pathGenerator.centroid(feat);
      if (cent && !isNaN(cent[0])) {
        centroids[stName] = cent;
      }
    });
    return centroids;
  }, [pathGenerator, projection]);

  // Zoom specifically to a target state's bounding box
  const zoomToState = useCallback((stateName) => {
    if (!stateName) {
      setZoomTransform({ k: 1, x: 0, y: 0 });
      setZoomedState(null);
      return;
    }

    const bounds = stateBoundsMap[stateName];
    const canvasW = dimensions.width;
    const canvasH = dimensions.height - 40;

    if (bounds && canvasW && canvasH) {
      const stateW = Math.max(bounds.x1 - bounds.x0, 15);
      const stateH = Math.max(bounds.y1 - bounds.y0, 15);
      const centerX = (bounds.x0 + bounds.x1) / 2;
      const centerY = (bounds.y0 + bounds.y1) / 2;

      const targetScale = Math.max(1.8, Math.min(6.5, 0.65 / Math.max(stateW / canvasW, stateH / canvasH)));
      const targetX = canvasW / 2 - targetScale * centerX;
      const targetY = canvasH / 2 - targetScale * centerY;

      setZoomTransform({ k: targetScale, x: targetX, y: targetY });
      setZoomedState(stateName);
    } else {
      setZoomTransform({ k: 2.2, x: 0, y: 0 });
      setZoomedState(stateName);
    }
  }, [stateBoundsMap, dimensions]);

  // Handle State Click: Zoom map into state first, then redirect to projects after animation
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

    // 1. Smoothly zoom into the clicked state boundary
    zoomToState(stateName);

    // 2. Redirect to state projects after 2.5 seconds delay (2500ms)
    setTimeout(() => {
      if (onSelectState) {
        onSelectState(stateName);
      }
    }, 2500);
  }, [zoomToState, onSelectState]);

  // Current Hovered Data Object for Floating Card
  const hoveredData = useMemo(() => {
    if (!hoveredStateName) return null;
    return stateAggregates[hoveredStateName] || {
      stateName: hoveredStateName,
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

  return (
    <section id="india-map-section" className="py-10 bg-white/60 border-b border-[#A6CFD5]/50 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Metric Switches */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-900 bg-amber-100 px-2.5 py-1 rounded border border-amber-300 mb-2 font-bold shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              INTERACTIVE CHOROPLETH HEATMAP & SPATIAL INTEL
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
              Interactive India Project Map
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Hover over any state to zoom in & inspect details. Click to open state project portfolio. Pointer leave automatically zooms out.
            </p>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#E8F4F5] border border-[#A6CFD5] shadow-xs">
            {Object.keys(metricLabels).map(mKey => (
              <button
                key={mKey}
                onClick={() => setSelectedMetric(mKey)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedMetric === mKey
                    ? 'bg-[#145C66] text-white shadow-sm scale-105'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-[#A6CFD5]/40'
                }`}
              >
                {metricLabels[mKey]}
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-Column Map & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: SVG Map Canvas & Floating Info Card */}
          <div 
            ref={containerRef} 
            className="lg:col-span-8 rounded-3xl glass-panel p-4 border border-[#A6CFD5] relative min-h-[520px] flex items-center justify-center overflow-hidden bg-white shadow-md outline-none focus:outline-none"
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
              // Automatically zoom out to national view when pointer leaves map area
              setHoveredStateName(null);
              setIsCardVisible(false);
              setZoomTransform({ k: 1, x: 0, y: 0 });
              setZoomedState(null);
            }}
          >
            
            {/* Interactive SVG Canvas */}
            <svg 
              ref={svgRef} 
              width={dimensions.width} 
              height={dimensions.height} 
              className="w-full h-auto max-h-[600px] outline-none focus:outline-none"
              style={{ outline: 'none' }}
            >
              {/* Main Map Group with Smooth GPU Viewport Transform */}
              <g
                style={{
                  transform: `translate(${zoomTransform.x}px, ${zoomTransform.y}px) scale(${zoomTransform.k})`,
                  transformOrigin: '0 0',
                  transition: getPrefersReducedMotion() ? 'none' : 'transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* State Polygon Paths */}
                {indiaGeoJson && indiaGeoJson.features && indiaGeoJson.features.map((feat, idx) => {
                  const stName = feat.properties.st_nm;
                  const stData = stateAggregates[stName];
                  const val = stData ? (stData[selectedMetric] || 0) : 0;
                  const isHovered = hoveredStateName === stName;
                  const isFocused = zoomedState === stName;
                  const isDimmed = (hoveredStateName && !isHovered) || (zoomedState && !isFocused);
                  const fillColor = stData ? colorScale(val) : '#E8F4F5';

                  const staggerDelay = isEntranceDone ? 0 : idx * (MOTION_TOKENS?.revealStagger || 12);

                  return (
                    <path
                      key={stName + '-' + idx}
                      d={pathGenerator ? pathGenerator(feat) : ''}
                      fill={fillColor}
                      stroke={isHovered ? (MOTION_TOKENS?.saffronOutline || '#FF9933') : isFocused ? '#145C66' : '#A6CFD5'}
                      strokeWidth={isHovered ? 2.5 : isFocused ? 2 : 0.85}
                      opacity={isDimmed ? (MOTION_TOKENS?.spotlightOpacity || 0.45) : 1}
                      cursor="pointer"
                      role="button"
                      aria-label={`${stName}: ${val} ${selectedMetric}`}
                      className="map-state-path transition-all duration-300 focus:outline-none focus:ring-0"
                      style={{
                        outline: 'none',
                        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                        transformBox: 'fill-box',
                        transformOrigin: 'center',
                        filter: isHovered ? 'drop-shadow(0 6px 14px rgba(0,0,0,0.28))' : 'none',
                        transitionDelay: `${staggerDelay}ms`
                      }}
                      onMouseEnter={() => {
                        setHoveredStateName(stName);
                        setIsCardVisible(true);
                      }}
                      onFocus={() => {
                        setHoveredStateName(stName);
                        setIsCardVisible(true);
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
                      <circle cx={center[0]} cy={center[1]} r={5} fill="#EF4444" />
                      <circle cx={center[0]} cy={center[1]} className="animate-risk-pulse" stroke="#EF4444" fill="none" />
                    </g>
                  );
                })}

                {/* Tiny Union Territory Circle Markers */}
                {projection && TINY_UTS.map(ut => {
                  const pt = projection([ut.lng, ut.lat]);
                  if (!pt) return null;
                  const isHovered = hoveredStateName === ut.name;
                  const isDimmed = (hoveredStateName && !isHovered) || (zoomedState && zoomedState !== ut.name);

                  return (
                    <g key={ut.name} transform={`translate(${pt[0]}, ${pt[1]})`}>
                      <circle
                        r={isHovered ? 7 : 4.5}
                        fill={isHovered ? (MOTION_TOKENS?.saffronOutline || '#FF9933') : '#0A434B'}
                        stroke="#ffffff"
                        strokeWidth={1.5}
                        cursor="pointer"
                        role="button"
                        aria-label={`UT ${ut.name}`}
                        opacity={isDimmed ? 0.45 : 1}
                        className="transition-all duration-200 focus:outline-none focus:ring-0"
                        style={{ outline: 'none' }}
                        onMouseEnter={() => {
                          setHoveredStateName(ut.name);
                          setIsCardVisible(true);
                        }}
                        onClick={(e) => handleStateClick(ut.name, e)}
                      />
                      <text
                        y={-8}
                        textAnchor="middle"
                        className="text-[9px] font-bold fill-slate-700 pointer-events-none"
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
                    className="animate-map-ripple stroke-amber-500 fill-amber-300/30"
                    pointerEvents="none"
                  />
                )}
              </g>
            </svg>

            {/* Smooth Floating Info Card (Glides with Spring Lerp) */}
            {hoveredData && (
              <div 
                ref={cardRef}
                className={`absolute z-30 pointer-events-none rounded-2xl bg-white/95 border border-[#A6CFD5] p-4 shadow-2xl backdrop-blur-md w-72 text-left transition-opacity duration-200 text-slate-800 ${
                  isCardVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                  willChange: 'transform',
                  top: 0,
                  left: 0
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#A6CFD5]/50 pb-2 mb-3">
                  <h4 className="font-bold font-heading text-sm text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    {hoveredData.stateName}
                  </h4>
                  <span className="text-[10px] font-mono bg-[#E8F4F5] text-[#0A434B] px-2 py-0.5 rounded-full border border-[#A6CFD5] font-bold">
                    Click for Projects
                  </span>
                </div>

                {/* Animated Number Metrics */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="font-medium">Total Projects:</span>
                    <span className="font-extrabold font-mono text-slate-900 text-sm">
                      <CardCountTween value={hoveredData.totalProjects} />
                    </span>
                  </div>

                  {/* Slim Stacked Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex my-2 border border-slate-200">
                    <div 
                      className="bg-cyan-500 h-full transition-all duration-300"
                      style={{
                        width: `${hoveredData.totalProjects ? (hoveredData.ongoing / hoveredData.totalProjects) * 100 : 0}%`
                      }}
                      title={`Ongoing: ${hoveredData.ongoing}`}
                    />
                    <div 
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{
                        width: `${hoveredData.totalProjects ? (hoveredData.completed / hoveredData.totalProjects) * 100 : 0}%`
                      }}
                      title={`Completed: ${hoveredData.completed}`}
                    />
                    <div 
                      className="bg-amber-500 h-full transition-all duration-300"
                      style={{
                        width: `${hoveredData.totalProjects ? (hoveredData.delayed / hoveredData.totalProjects) * 100 : 0}%`
                      }}
                      title={`Delayed: ${hoveredData.delayed}`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div className="p-1.5 rounded-lg bg-cyan-50 border border-cyan-200 flex justify-between">
                      <span className="text-cyan-900 font-semibold">Ongoing</span>
                      <strong className="text-cyan-900"><CardCountTween value={hoveredData.ongoing} /></strong>
                    </div>
                    <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 flex justify-between">
                      <span className="text-emerald-900 font-semibold">Completed</span>
                      <strong className="text-emerald-900"><CardCountTween value={hoveredData.completed} /></strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 flex justify-between">
                      <span className="text-amber-900 font-semibold">Delayed</span>
                      <strong className="text-amber-900"><CardCountTween value={hoveredData.delayed} /></strong>
                    </div>
                    <div className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 flex justify-between">
                      <span className="text-rose-900 font-semibold">High-Risk</span>
                      <strong className="text-rose-900"><CardCountTween value={hoveredData.highRisk} /></strong>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-[#A6CFD5]/50 text-slate-800 text-xs font-bold">
                    <span>Est. Expenditure:</span>
                    <span className="text-amber-800 font-mono">
                      <CardCountTween value={hoveredData.totalCost} prefix="₹ " suffix=" Cr" />
                    </span>
                  </div>
                </div>

              </div>
            )}

            {/* Vertical Heatmap Legend */}
            <div className={`absolute bottom-4 left-4 p-3 rounded-2xl bg-white/95 border border-[#A6CFD5] text-xs backdrop-blur-md space-y-2 shadow-sm transition-opacity duration-500 ${isEntranceDone ? 'opacity-100' : 'opacity-0'}`}>
              <span className="font-mono text-[10px] text-slate-600 block uppercase font-bold">
                {metricLabels[selectedMetric]} Scale
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-600 font-mono font-semibold">Low</span>
                <div className="w-28 h-3 rounded-full bg-gradient-to-r from-[#BAE6FD] via-[#2563EB] to-[#03045E] border border-slate-300"></div>
                <span className="text-[10px] text-slate-600 font-mono font-semibold">High</span>
              </div>
              <p className="text-[10px] text-slate-500 italic">Hover to zoom • Click to view projects</p>
            </div>

          </div>

          {/* RIGHT COLUMN: Top 5 States Ranking List */}
          <div className="lg:col-span-4 space-y-4">
            <div className={`rounded-3xl glass-panel p-5 border border-[#A6CFD5] bg-white shadow-md transition-opacity duration-500 ${isEntranceDone ? 'opacity-100' : 'opacity-0'}`}>
              
              <div className="flex items-center justify-between mb-3 border-b border-[#A6CFD5]/50 pb-2">
                <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#145C66]" />
                  Top 5 States Portfolio
                </h3>
                <span className="text-[10px] font-mono font-bold bg-[#E8F4F5] text-[#0A434B] px-2 py-0.5 rounded border border-[#A6CFD5]">
                  {metricLabels[selectedMetric]}
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Hover to zoom map. Click any state in the list to open its project portfolio.
              </p>

              {/* Top 5 States Interactive Ranking List */}
              <div className="space-y-2.5">
                {top5States.map((stObj, idx) => {
                  const isHovered = hoveredStateName === stObj.stateName;
                  const isFocused = zoomedState === stObj.stateName;

                  return (
                    <div
                      key={stObj.stateName}
                      role="button"
                      aria-label={`Open ${stObj.stateName} projects`}
                      onMouseEnter={() => {
                        setHoveredStateName(stObj.stateName);
                        setIsCardVisible(true);
                      }}
                      onMouseLeave={() => {
                        setHoveredStateName(null);
                        setIsCardVisible(false);
                      }}
                      onClick={(e) => handleStateClick(stObj.stateName, e)}
                      className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between group focus:outline-none ${
                        isHovered || isFocused
                          ? 'bg-[#E8F4F5] border-[#FF9933] shadow-md -translate-y-0.5'
                          : 'bg-[#F4F9F9]/80 border-[#A6CFD5]/60 hover:bg-white hover:border-[#145C66]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                          isHovered || isFocused ? 'bg-[#FF9933] text-white' : 'bg-[#A6CFD5]/40 text-[#0A434B]'
                        }`}>
                          {idx + 1}
                        </span>
                        <div>
                          <p className={`text-xs font-bold transition-colors ${
                            isHovered || isFocused ? 'text-[#0A434B]' : 'text-slate-900 group-hover:text-[#145C66]'
                          }`}>
                            {stObj.stateName}
                          </p>
                          <p className="text-[10px] text-slate-500 font-medium">
                            {stObj.totalProjects} Projects • ₹{(stObj.totalCost / 1000).toFixed(1)}k Cr
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {stObj.highRisk > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-mono border border-rose-300 font-bold">
                            {stObj.highRisk} Risk
                          </span>
                        )}
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                          isHovered || isFocused ? 'translate-x-1 text-[#FF9933]' : 'text-slate-400 group-hover:text-[#145C66]'
                        }`} />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
