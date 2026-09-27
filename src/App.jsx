import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsOverview from './components/StatsOverview';
import MinistrySection from './components/MinistrySection';
import IndiaMap from './components/IndiaMap';
import MinistryDirectory from './components/MinistryDirectory';
import ProjectListing from './components/ProjectListing';
import ProjectDetails from './components/ProjectDetails';
import ReportDownloadModal from './components/ReportDownloadModal';
import GovernancePrivacyModal from './components/GovernancePrivacyModal';
import Footer from './components/Footer';
import { DataProvider, useProjectData } from './context/DataContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'projects' | 'ministries' | 'analysis' | 'details' | 'reports'
  const [selectedState, setSelectedState] = useState(null);
  const [selectedMinistry, setSelectedMinistry] = useState('All');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedProjectId, setSelectedProjectId] = useState('020100044');
  const [filterStatus, setFilterStatus] = useState('All');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportTargetProject, setReportTargetProject] = useState(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [privacyModalMode, setPrivacyModalMode] = useState('privacy');

  // Live real data hooks from Neon PostgreSQL
  const { 
    platformStats, 
    stateAggregates, 
    ministriesData, 
    projects, 
    isLiveConnected 
  } = useProjectData();

  // Clean instant scroll-to-top helper for all view transitions
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  // Scroll to absolute top whenever active view or tab changes
  useEffect(() => {
    scrollToTop();
  }, [activeTab]);

  // Handlers for interactive navigation
  const handleSelectStateFromMap = (stateName) => {
    setSelectedState(stateName);
    setSelectedMinistry('All');
    setSelectedSector('All');
    setFilterStatus('All');
    setActiveTab('projects');
    scrollToTop();
  };

  const handleSelectMinistry = (ministryName) => {
    setSelectedMinistry(ministryName);
    setSelectedSector('All');
    setSelectedState(null);
    setFilterStatus('All');
    setActiveTab('projects');
    scrollToTop();
  };

  const handleSelectSector = (sectorName) => {
    setSelectedSector(sectorName);
    setSelectedMinistry('All');
    setSelectedState(null);
    setFilterStatus('All');
    setActiveTab('projects');
    scrollToTop();
  };

  const handleStatFilterClick = (status) => {
    setFilterStatus(status);
    setSelectedState(null);
    setSelectedMinistry('All');
    setSelectedSector('All');
    setActiveTab('projects');
    scrollToTop();
  };

  const handleSelectProject = (id) => {
    setSelectedProjectId(id);
    setActiveTab('details');
    scrollToTop();
  };

  const activeProject = useMemo(() => {
    if (!projects || projects.length === 0) return null;
    const cleanId = String(selectedProjectId || '').replace('OCMS-', '').trim();
    return projects.find(p => 
      p.id === selectedProjectId || 
      p.rawId === String(selectedProjectId) ||
      String(p.id).replace('OCMS-', '').trim() === cleanId ||
      String(p.rawId).trim() === cleanId ||
      p.id === `OCMS-${cleanId}`
    ) || projects[0];
  }, [selectedProjectId, projects]);

  const handleOpenReportModal = (projectObj) => {
    const prj = projectObj || activeProject;
    setReportTargetProject(prj);
    setIsReportModalOpen(true);
  };

  const handleGlobalSearch = (query) => {
    setGlobalSearchQuery(query);
    setActiveTab('projects');
    scrollToTop();
  };

  const handleOpenPrivacy = (mode = 'privacy') => {
    setPrivacyModalMode(mode);
    setIsPrivacyModalOpen(true);
  };

  // Synchronize Tab Navigation with modal state
  const handleTabChange = (tabId) => {
    if (tabId === 'reports') {
      setReportTargetProject(activeProject);
      setIsReportModalOpen(true);
    } else {
      setActiveTab(tabId);
      scrollToTop();
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#171717] flex flex-col font-sans selection:bg-[#171717] selection:text-white">
      
      {/* Navigation Header (Clean, un-cluttered single header) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onSearch={handleGlobalSearch}
        selectedState={selectedState}
        resetStateFilter={() => setSelectedState(null)}
        isLiveConnected={isLiveConnected}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        
        {/* COMBINED HOME & DASHBOARD VIEW */}
        {(activeTab === 'home' || activeTab === 'dashboard') && (
          <>
            {/* 1. Hero Section at top */}
            <HeroSection
              onExploreDashboard={() => {
                const statsEl = document.getElementById('national-portfolio-section');
                if (statsEl) statsEl.scrollIntoView({ behavior: 'smooth' });
              }}
              onViewProjects={() => handleTabChange('projects')}
              onExploreMap={() => {
                const mapEl = document.getElementById('india-map-section');
                if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2 & 3. National Portfolio Metrics and PAIMANA Live Monitor */}
            <div id="national-portfolio-section">
              <StatsOverview
                stats={platformStats}
                onFilterClick={handleStatFilterClick}
                onSelectProject={handleSelectProject}
              />
            </div>

            {/* 4. Interactive India Project Map (Powered by Neon state_summaries) */}
            <div id="india-map-section">
              <IndiaMap 
                onSelectState={handleSelectStateFromMap} 
                customStateData={stateAggregates}
              />
            </div>

            {/* 5. Ministry & Sector Project Portfolio */}
            <MinistrySection
              onSelectMinistry={handleSelectMinistry}
              onSelectSector={handleSelectSector}
              onViewAllProjects={() => handleTabChange('projects')}
            />
          </>
        )}

        {/* VIEW 2: DEDICATED MINISTRIES DIRECTORY */}
        {activeTab === 'ministries' && (
          <MinistryDirectory
            onSelectMinistry={handleSelectMinistry}
            onSelectSector={handleSelectSector}
          />
        )}

        {/* VIEW 3: STATE & MINISTRY PROJECT LISTING */}
        {activeTab === 'projects' && (
          <ProjectListing
            selectedState={selectedState}
            onStateChange={setSelectedState}
            onSelectProject={handleSelectProject}
            initialFilterStatus={filterStatus}
            initialMinistry={selectedMinistry}
            initialSector={selectedSector}
            initialSearchQuery={globalSearchQuery}
          />
        )}

        {/* VIEW 4: RISK & SHAP ANALYSIS DIRECT VIEW */}
        {activeTab === 'analysis' && (
          <ProjectDetails
            projectId={selectedProjectId}
            onBack={() => handleTabChange('projects')}
            onOpenReportModal={handleOpenReportModal}
          />
        )}

        {/* VIEW 5: PROJECT DETAILS */}
        {activeTab === 'details' && (
          <ProjectDetails
            projectId={selectedProjectId}
            onBack={() => handleTabChange('projects')}
            onOpenReportModal={handleOpenReportModal}
          />
        )}

      </main>

      {/* Report Download Modal */}
      <ReportDownloadModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        project={reportTargetProject || activeProject}
        selectedState={selectedState}
      />

      {/* Governance & Privacy Protocol Modal */}
      <GovernancePrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        mode={privacyModalMode}
      />

      {/* Government Footer */}
      <Footer 
        onNavigate={handleTabChange}
        onSelectMinistry={handleSelectMinistry}
        onOpenPrivacy={handleOpenPrivacy}
      />

    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
