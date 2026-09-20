import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsOverview from './components/StatsOverview';
import MinistrySection from './components/MinistrySection';
import IndiaMap from './components/IndiaMap';
import ProjectListing from './components/ProjectListing';
import ProjectDetails from './components/ProjectDetails';
import ReportDownloadModal from './components/ReportDownloadModal';
import Footer from './components/Footer';
import { getOverallPlatformStats, PROJECTS_MASTER } from './data/projectsData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'projects' | 'analysis' | 'details' | 'reports'
  const [selectedState, setSelectedState] = useState(null);
  const [selectedMinistry, setSelectedMinistry] = useState('All');
  const [selectedProjectId, setSelectedProjectId] = useState('PRJ-2026-MH-001');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportTargetProject, setReportTargetProject] = useState(null);

  const overallStats = useMemo(() => getOverallPlatformStats(), []);

  // Handlers for interactive navigation
  const handleSelectStateFromMap = (stateName) => {
    setSelectedState(stateName);
    setActiveTab('projects');
  };

  const handleSelectMinistry = (ministryName) => {
    setSelectedMinistry(ministryName);
    setActiveTab('projects');
  };

  const handleStatFilterClick = (status) => {
    setFilterStatus(status);
    setActiveTab('projects');
  };

  const handleSelectProject = (id) => {
    setSelectedProjectId(id);
    setActiveTab('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenReportModal = (projectObj) => {
    const prj = projectObj || PROJECTS_MASTER.find(p => p.id === selectedProjectId) || PROJECTS_MASTER[0];
    setReportTargetProject(prj);
    setIsReportModalOpen(true);
  };

  // Synchronize Tab Navigation with modal state
  const handleTabChange = (tabId) => {
    if (tabId === 'reports') {
      const prj = PROJECTS_MASTER.find(p => p.id === selectedProjectId) || PROJECTS_MASTER[0];
      setReportTargetProject(prj);
      setIsReportModalOpen(true);
    } else {
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeProject = useMemo(() => {
    return PROJECTS_MASTER.find(p => p.id === selectedProjectId) || PROJECTS_MASTER[0];
  }, [selectedProjectId]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#171717] flex flex-col font-sans selection:bg-[#171717] selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        selectedState={selectedState}
        resetStateFilter={() => setSelectedState(null)}
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

            {/* 2 & 3. National Portfolio Metrics and PAIMANA Live Monitor (Small size) + High Value Projects */}
            <div id="national-portfolio-section">
              <StatsOverview
                stats={overallStats}
                onFilterClick={handleStatFilterClick}
              />
            </div>

            {/* 4. Interactive India Project Map */}
            <div id="india-map-section">
              <IndiaMap onSelectState={handleSelectStateFromMap} />
            </div>

            {/* 5. Ministry-wise Project Portfolio (at the end) */}
            <MinistrySection
              onSelectMinistry={handleSelectMinistry}
              onViewAllProjects={() => handleTabChange('projects')}
            />
          </>
        )}

        {/* VIEW 3: STATE-WISE PROJECT LISTING */}
        {activeTab === 'projects' && (
          <ProjectListing
            selectedState={selectedState}
            onStateChange={setSelectedState}
            onSelectProject={handleSelectProject}
            initialFilterStatus={filterStatus}
            initialMinistry={selectedMinistry}
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

      {/* Government Footer */}
      <Footer onNavigate={handleTabChange} />

    </div>
  );
}
