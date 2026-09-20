import React, { useState } from 'react';
import { 
  BarChart3, 
  MapPin, 
  FileText, 
  Search, 
  Menu, 
  X,
  Layers,
  Sparkles
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onSearch, selectedState, resetStateFilter }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
    setActiveTab('projects');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: Layers, badge: selectedState ? selectedState : null },
    { id: 'analysis', label: 'Risk & AI Analysis', icon: Sparkles },
    { id: 'reports', label: 'Download Report', icon: FileText }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fafafa]/90 backdrop-blur-md border-b border-[#ebebeb] transition-all">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Vercel-style stark black geometric triangle mark */}
            <div className="flex items-center justify-center w-8 h-8 rounded-[6px] bg-[#171717] text-white transition-transform group-hover:scale-105">
              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 2L24 22H0L12 2Z" />
              </svg>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-lg tracking-[-0.6px] text-[#171717]">
                DRISHTI
              </span>
              <span className="hidden sm:inline-block font-mono text-[11px] font-medium text-[#8f8f8f] uppercase tracking-wider">
                PAIMANA v2.0
              </span>
            </div>
          </div>

          {/* Quick Search Field (6px square, hairline border, Geist spec) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xs relative">
            <input
              type="text"
              placeholder="Search projects, state, ministry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-sm text-[#171717] placeholder-[#8f8f8f] rounded-[6px] pl-9 pr-8 py-1.5 border border-[#ebebeb] focus:outline-none focus:border-[#171717] focus:ring-1 focus:ring-[#171717] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            />
            <Search className="w-4 h-4 text-[#8f8f8f] absolute left-2.5 top-2.5" />
            <kbd className="hidden sm:inline-flex items-center absolute right-2 top-2 px-1.5 py-0.5 text-[10px] font-mono text-[#8f8f8f] bg-[#f2f2f2] border border-[#ebebeb] rounded-[4px]">
              /
            </kbd>
          </form>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-[#171717] text-white shadow-xs' 
                      : 'text-[#4d4d4d] hover:text-[#171717] hover:bg-[#f2f2f2]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#8f8f8f]'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isActive ? 'bg-[#333333] text-white' : 'bg-[#ebebeb] text-[#171717]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* State Filter Indicator Pill (if state filter active) */}
          {selectedState && (
            <div className="hidden sm:flex items-center gap-1.5 bg-[#ffffff] border border-[#ebebeb] text-[#171717] px-2.5 py-1 rounded-[100px] text-xs shadow-whisper">
              <MapPin className="w-3 h-3 text-[#0070f3]" />
              <span className="font-mono text-[11px]">State: <strong>{selectedState}</strong></span>
              <button 
                onClick={resetStateFilter} 
                className="hover:text-black hover:bg-[#f2f2f2] rounded-full p-0.5 ml-1 transition-colors"
                title="Clear State Filter"
              >
                <X className="w-3 h-3 text-[#8f8f8f]" />
              </button>
            </div>
          )}

          {/* Right Action Chrome: 6px square buttons per Geist nav spec */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setActiveTab('reports')}
              className="btn-app-ghost text-xs font-medium"
            >
              Export Data
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className="btn-app-sm bg-[#171717] hover:bg-[#333333] text-white text-xs font-medium"
            >
              Explore
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-[6px] bg-white border border-[#ebebeb] text-[#171717] hover:bg-[#f2f2f2]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#ebebeb] bg-[#fafafa] px-4 pt-3 pb-6 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-sm text-[#171717] placeholder-[#8f8f8f] rounded-[6px] pl-9 pr-3 py-2 border border-[#ebebeb] focus:outline-none focus:border-[#171717]"
            />
            <Search className="w-4 h-4 text-[#8f8f8f] absolute left-3 top-3" />
          </form>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-[#171717] text-white' 
                      : 'text-[#4d4d4d] hover:bg-[#f2f2f2] hover:text-[#171717]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8f8f8f]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

