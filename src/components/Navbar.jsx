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
    <header className="sticky top-0 z-50 glass-panel border-b border-[#A6CFD5]/60 bg-white/90 backdrop-blur-md shadow-sm">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#145C66] via-[#1E7D8A] to-[#0A434B] border border-[#A6CFD5] shadow-md shadow-[#A6CFD5]/30 group-hover:scale-105 transition-all">
              <span className="text-xl font-bold font-heading text-white tracking-wider">दृ</span>
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-tight text-slate-900 group-hover:text-[#145C66] transition-colors">
              DRISHTI
            </span>
          </div>

          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xs relative">
            <input
              type="text"
              placeholder="Search project, state, ministry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-sm text-slate-800 placeholder-slate-400 rounded-lg pl-9 pr-3 py-1.5 border border-[#A6CFD5] focus:outline-none focus:border-[#145C66] focus:ring-1 focus:ring-[#145C66] transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-[#145C66] absolute left-3 top-2.5" />
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
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    isActive 
                      ? 'bg-[#A6CFD5]/35 text-[#0A434B] border border-[#A6CFD5] shadow-sm font-semibold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-[#E8F4F5]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#145C66]' : 'text-slate-400'}`} />
                  {item.label}
                  {item.badge && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded border border-amber-300 max-w-[80px] truncate font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* State Filter Indicator Pill (if state filter active) */}
          {selectedState && (
            <div className="hidden sm:flex items-center gap-2 bg-amber-50 border border-amber-300 text-amber-900 px-2.5 py-1 rounded-full text-xs font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>State: <strong>{selectedState}</strong></span>
              <button 
                onClick={resetStateFilter} 
                className="hover:text-amber-950 bg-amber-200/60 rounded-full p-0.5"
                title="Clear State Filter"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white border border-[#A6CFD5] text-slate-700 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#A6CFD5]/60 bg-white px-4 pt-3 pb-6 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 text-sm text-slate-800 placeholder-slate-400 rounded-lg pl-9 pr-3 py-2 border border-[#A6CFD5] focus:outline-none focus:border-[#145C66]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
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
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-[#A6CFD5]/35 text-[#0A434B] border border-[#A6CFD5] font-semibold' 
                      : 'text-slate-700 hover:bg-[#E8F4F5]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#145C66]' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
