import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { getStateAggregates } from '../data/projectsData';
import indiaGeoJson from '../data/india.json';
import { MOTION_TOKENS, getPrefersReducedMotion } from '../utils/motionTokens';
import { MapPin, Info, ArrowRight, X, AlertTriangle, ShieldAlert, CheckCircle, Clock, Layers } from 'lucide-react';

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

  // Color Scale Generator for Choropleth Heatmap (Vercel Geist Blue-to-Ink Palette)
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
      .range(['#d3e5ff', '#70aeff', '#0070f3', '#0761d1', '#171717']);
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
      const rawName = feat.properties?.st_nm;
      if (!rawName) return;
      const stName = normalizeGeoStateName(rawName);
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

    const canonicalState = normalizeGeoStateName(stateName);

    // 1. Smoothly zoom into the clicked state boundary
    zoomToState(canonicalState);

    // 2. Transition immediately to state projects after smooth click feedback
    setTimeout(() => {
      if (onSelectState) {
        onSelectState(canonicalState);
      }
    }, 220);
  }, [zoomToState, onSelectState]);

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

  return (
    <section id="india-map-section" className="py-14 sm:py-20 bg-[#fafafa] border-b border-[#ebebeb] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mono-eyebrow text-[#8f8f8f] mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#0070f3]" />
              <span>SPATIAL SURVEILLANCE // NATIONAL CHOROPLETH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-[#171717] tracking-[-1.28px]">
              Interactive India Project Map
            </h2>
            <p className="text-sm text-[#4d4d4d] mt-1 font-normal">
              Hover over any state to zoom in &amp; inspect telemetry. Click to open state project portfolio.
            </p>
          </div>
        </div>

        {/* Main 2-Column Map & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: SVG Map Canvas & Floating Info Card */}
          <div 
            ref={containerRef} 
            className="lg:col-span-8 rounded-[12px] bg-white p-4 border border-[#ebebeb] relative min-h-[520px] flex items-center justify-center overflow-hidden shadow-whisper outline-none focus:outline-none"
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
                  const rawName = feat.properties.st_nm;
                  const stName = normalizeGeoStateName(rawName);
                  const stData = stateAggregates[stName] || stateAggregates[rawName];
                  const val = stData ? (stData[selectedMetric] || 0) : 0;
                  const isHovered = hoveredStateName === stName || hoveredStateName === rawName;
                  const isFocused = zoomedState === stName || zoomedState === rawName;
                  const isDimmed = (hoveredStateName && !isHovered) || (zoomedState && !isFocused);
                  const fillColor = stData ? colorScale(val) : '#f2f2f2';

                  const staggerDelay = isEntranceDone ? 0 : idx * (MOTION_TOKENS?.revealStagger || 12);

                  return (
                    <path
                      key={stName + '-' + idx}
                      d={pathGenerator ? pathGenerator(feat) : ''}
                      fill={fillColor}
                      stroke={isHovered ? '#0070f3' : isFocused ? '#171717' : '#ffffff'}
                      strokeWidth={isHovered ? 2.5 : isFocused ? 2 : 0.75}
                      opacity={isDimmed ? (MOTION_TOKENS?.spotlightOpacity || 0.4) : 1}
                      cursor="pointer"
                      role="button"
                      aria-label={`${stName}: ${val} ${selectedMetric}`}
                      className="map-state-path transition-all duration-300 focus:outline-none focus:ring-0"
                      style={{
                        outline: 'none',
                        transform: isHovered ? 'scale(1.025)' : 'scale(1)',
                        transformBox: 'fill-box',
                        transformOrigin: 'center',
                        filter: isHovered ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.18))' : 'none',
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
                      <circle cx={center[0]} cy={center[1]} r={4} fill="#ee0000" />
                      <circle cx={center[0]} cy={center[1]} className="animate-risk-pulse" stroke="#ee0000" fill="none" />
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
                        r={isHovered ? 6 : 4}
                        fill={isHovered ? '#0070f3' : '#171717'}
                        stroke="#ffffff"
                        strokeWidth={1.5}
                        cursor="pointer"
                        role="button"
                        aria-label={`UT ${ut.name}`}
                        opacity={isDimmed ? 0.4 : 1}
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
                        className="text-[9px] font-mono font-medium fill-[#4d4d4d] pointer-events-none"
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

            {/* Smooth Floating Info Card (Geist Spec) */}
            {hoveredData && (
              <div 
                ref={cardRef}
                className={`absolute z-30 pointer-events-none rounded-[12px] bg-white border border-[#ebebeb] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.1)] w-72 text-left transition-opacity duration-200 text-[#171717] ${
                  isCardVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                  willChange: 'transform',
                  top: 0,
                  left: 0
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#ebebeb] pb-2 mb-2.5">
                  <h4 className="font-semibold text-sm text-[#171717] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0070f3]" />
                    {hoveredData.stateName}
                  </h4>
                  <span className="mono-eyebrow text-[9px] bg-[#171717] text-white px-2 py-0.5 rounded-[4px]">
                    CLICK TO FILTER
                  </span>
                </div>

                {/* Primary Telemetry: Total Projects & Total Investment */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-[#fafafa] p-2 rounded-[6px] border border-[#ebebeb]">
                    <span className="font-medium text-[#4d4d4d] text-[11px]">Total Projects:</span>
                    <span className="font-bold font-mono text-[#171717] text-sm">
                      <CardCountTween value={hoveredData.totalProjects} /> Projects
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-[#fafafa] p-2 rounded-[6px] border border-[#ebebeb]">
                    <span className="font-medium text-[#4d4d4d] text-[11px]">Total Amount (Latest):</span>
                    <span className="font-bold font-mono text-[#0070f3] text-sm">
                      <CardCountTween value={hoveredData.totalCost} prefix="₹ " suffix=" Cr" />
                    </span>
                  </div>

                  {/* Explicit On-Time vs Delayed Split Cards */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2 rounded-[6px] bg-[#f0fdf4] border border-[#bbf7d0] flex flex-col justify-between">
                      <div className="flex items-center gap-1 text-emerald-800 text-[10px] font-semibold">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>On-Time</span>
                      </div>
                      <strong className="text-emerald-700 font-mono text-base mt-1">
                        <CardCountTween value={hoveredData.onTime !== undefined ? hoveredData.onTime : (hoveredData.totalProjects - hoveredData.delayed)} />
                      </strong>
                    </div>

                    <div className="p-2 rounded-[6px] bg-[#fffbeb] border border-[#fde68a] flex flex-col justify-between">
                      <div className="flex items-center gap-1 text-amber-800 text-[10px] font-semibold">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>Delayed</span>
                      </div>
                      <strong className="text-amber-700 font-mono text-base mt-1">
                        <CardCountTween value={hoveredData.delayed} />
                      </strong>
                    </div>
                  </div>

                  {hoveredData.highRisk > 0 && (
                    <div className="flex items-center justify-between px-2 py-1 rounded-[4px] bg-[#fff0f0] border border-[#ffd5d5] text-[10px] text-rose-700 font-mono">
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                        Critical / High Risk:
                      </span>
                      <strong>{hoveredData.highRisk} Projects</strong>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Vertical Heatmap Legend */}
            <div className={`absolute bottom-4 left-4 p-2.5 rounded-[8px] bg-white border border-[#ebebeb] text-xs shadow-whisper space-y-1.5 transition-opacity duration-500 ${isEntranceDone ? 'opacity-100' : 'opacity-0'}`}>
              <span className="mono-eyebrow text-[9px] text-[#8f8f8f] block">
                Project Density Scale
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#8f8f8f] font-mono">Low</span>
                <div className="w-24 h-2 rounded-full bg-gradient-to-r from-[#d3e5ff] via-[#0070f3] to-[#171717] border border-[#ebebeb]"></div>
                <span className="text-[10px] text-[#8f8f8f] font-mono">High</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Top 5 States Ranking List */}
          <div className="lg:col-span-4 space-y-4">
            <div className={`rounded-[12px] bg-white p-5 border border-[#ebebeb] shadow-whisper transition-opacity duration-500 ${isEntranceDone ? 'opacity-100' : 'opacity-0'}`}>
              
              <div className="flex items-center justify-between mb-3 border-b border-[#ebebeb] pb-2">
                <h3 className="text-sm font-semibold text-[#171717] flex items-center gap-2 tracking-tight">
                  <Info className="w-4 h-4 text-[#8f8f8f]" />
                  Top 5 States Ranking
                </h3>
                <span className="mono-eyebrow text-[10px] bg-[#f2f2f2] text-[#171717] px-2 py-0.5 rounded-[4px] border border-[#ebebeb]">
                  Monitored Projects
                </span>
              </div>

              <p className="text-xs text-[#4d4d4d] mb-4 font-normal">
                Hover to focus map region. Click any state row to view all matching projects.
              </p>

              {/* Top 5 States Interactive Ranking List */}
              <div className="space-y-2">
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
                      className={`p-2.5 rounded-[8px] border transition-all duration-150 cursor-pointer flex items-center justify-between group focus:outline-none ${
                        isHovered || isFocused
                          ? 'bg-[#fafafa] border-[#171717] shadow-xs -translate-y-0.5'
                          : 'bg-[#ffffff] border-[#ebebeb] hover:border-[#d4d4d4] hover:bg-[#fafafa]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-5 h-5 rounded-[4px] flex items-center justify-center font-mono text-[11px] font-semibold ${
                          isHovered || isFocused ? 'bg-[#171717] text-white' : 'bg-[#f2f2f2] text-[#171717]'
                        }`}>
                          {idx + 1}
                        </span>
                        <div>
                          <p className={`text-xs font-semibold transition-colors ${
                            isHovered || isFocused ? 'text-[#0070f3]' : 'text-[#171717]'
                          }`}>
                            {stObj.stateName}
                          </p>
                          <p className="text-[10px] text-[#8f8f8f] font-mono mt-0.5">
                            {stObj.totalProjects} Projects • ₹{(stObj.totalCost / 1000).toFixed(1)}k Cr
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {stObj.highRisk > 0 && (
                          <span className="px-1.5 py-0.5 rounded-[4px] bg-[#fff0f0] text-[#ee0000] text-[9px] font-mono border border-[#ffd5d5] font-semibold">
                            {stObj.highRisk} Risk
                          </span>
                        )}
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                          isHovered || isFocused ? 'translate-x-0.5 text-[#0070f3]' : 'text-[#8f8f8f]'
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
