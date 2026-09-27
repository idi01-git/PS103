// PAIMANA Intelligence: Central Data Context powered by Neon PostgreSQL
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { 
  fetchPlatformStatsFromNeon, 
  fetchStateSummariesFromNeon, 
  fetchMinistrySummariesFromNeon, 
  fetchProjectsFromNeon, 
  fetchProjectDetailFromNeon 
} from '../services/neonDb';
import { 
  PROJECTS_MASTER as FALLBACK_PROJECTS, 
  MINISTRIES_DATA as FALLBACK_MINISTRIES, 
  getStateAggregates as getFallbackStateAggregates, 
  getOverallPlatformStats as getFallbackPlatformStats 
} from '../data/projectsData';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  // Initial fallback states for instantaneous zero-latency first paint
  const [platformStats, setPlatformStats] = useState(() => getFallbackPlatformStats());
  const [stateAggregates, setStateAggregates] = useState(() => getFallbackStateAggregates());
  const [ministriesData, setMinistriesData] = useState(() => FALLBACK_MINISTRIES);
  const [projects, setProjects] = useState(() => FALLBACK_PROJECTS);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [dbError, setDbError] = useState(null);

  // In-memory cache for ultra-fast instantaneous retrieval of complete ML results & predictions
  const projectDetailCache = useRef(new Map());

  // Hydrate all data directly from Neon PostgreSQL on initial load
  useEffect(() => {
    let isMounted = true;

    async function loadNeonData() {
      try {
        setIsLoading(true);
        // Parallel queries to Neon PostgreSQL
        const [liveStats, liveStates, liveMinistries, liveProjects] = await Promise.allSettled([
          fetchPlatformStatsFromNeon(),
          fetchStateSummariesFromNeon(),
          fetchMinistrySummariesFromNeon(),
          fetchProjectsFromNeon({ limit: 5000 })
        ]);

        if (!isMounted) return;

        let connected = false;

        if (liveStats.status === 'fulfilled' && liveStats.value) {
          setPlatformStats(liveStats.value);
          connected = true;
        }

        if (liveStates.status === 'fulfilled' && liveStates.value && Object.keys(liveStates.value).length > 0) {
          setStateAggregates(liveStates.value);
          connected = true;
        }

        if (liveMinistries.status === 'fulfilled' && liveMinistries.value && liveMinistries.value.length > 0) {
          setMinistriesData(liveMinistries.value);
          connected = true;
        }

        if (liveProjects.status === 'fulfilled' && liveProjects.value && liveProjects.value.length > 0) {
          setProjects(liveProjects.value);
          connected = true;
        }

        setIsLiveConnected(connected);
      } catch (err) {
        console.error('[DataContext] Error connecting to Neon PostgreSQL:', err);
        setDbError(err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadNeonData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Live query for searching & filtering projects across the entire 4,547 database
  const searchProjects = useCallback(async ({ state, ministry, search, limit = 100 } = {}) => {
    try {
      const results = await fetchProjectsFromNeon({ state, ministry, search, limit });
      if (results && results.length > 0) {
        return results;
      }
    } catch (e) {
      console.warn('[DataContext] Neon search failed, using local filter', e);
    }
    // Fallback local search
    return projects.filter(p => {
      if (state && state !== 'All' && p.state !== state) return false;
      if (ministry && ministry !== 'All' && !p.ministry.includes(ministry)) return false;
      if (search && search.trim()) {
        const q = search.toLowerCase();
        return (p.name || '').toLowerCase().includes(q) || (p.rawId || '').includes(q);
      }
      return true;
    });
  }, [projects]);

  // Fetch complete project details with 4-horizon ML predictions & SHAP factors with instant memory cache
  const getProjectById = useCallback(async (projectId) => {
    if (!projectId) return projects[0];
    const key = String(projectId).replace(/^OCMS-/, '');

    // 1. Check in-memory cache for 0ms instantaneous retrieval
    if (projectDetailCache.current.has(key)) {
      return projectDetailCache.current.get(key);
    }

    try {
      const liveDetail = await fetchProjectDetailFromNeon(projectId);
      if (liveDetail) {
        projectDetailCache.current.set(key, liveDetail);
        projectDetailCache.current.set(`OCMS-${key}`, liveDetail);
        return liveDetail;
      }
    } catch (e) {
      console.warn('[DataContext] Neon project detail lookup failed', e);
    }
    // Fallback local lookup
    const local = projects.find(p => p.id === projectId || p.rawId === String(projectId)) || projects[0];
    if (local) {
      projectDetailCache.current.set(key, local);
    }
    return local;
  }, [projects]);

  const value = {
    platformStats,
    stateAggregates,
    ministriesData,
    projects,
    isLoading,
    isLiveConnected,
    dbError,
    searchProjects,
    getProjectById
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useProjectData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useProjectData must be used within a DataProvider');
  }
  return context;
}
