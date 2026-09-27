import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart3, 
  MapPin, 
  Search, 
  Menu, 
  X,
  Layers,
  Sparkles,
  Building2
} from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onSearch, 
  selectedState, 
  resetStateFilter
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  // Global Keyboard Shortcut: '/' or '⌘K' / 'Ctrl+K' focuses search input, 'Escape' blurs
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);

      if ((e.key === '/' && !isTyping) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }

      if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
    setActiveTab('projects');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  // Strictly consistent single-word navigation items (1 word, 1 line, zero wrapping)
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'ministries', label: 'Ministries', icon: Building2 },
    { id: 'analysis', label: 'Analytics', icon: Sparkles }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#ebebeb] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-14 gap-4">
          
          {/* ==================================================== */}
          {/* 1. BRAND & IDENTITY                                  */}
          {/* ==================================================== */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="cursor-pointer group select-none shrink-0"
            title="PAIMANA - National Infrastructure Surveillance (MoSPI)"
          >
            <BrandLogo size="md" showBadge={true} />
          </div>

          {/* ==================================================== */}
          {/* 2. CENTER NAVIGATION (DEAD-CENTERED)                 */}
          {/* ==================================================== */}
          <nav className="hidden md:flex items-center gap-1.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`h-8 px-3 rounded-[6px] text-xs font-medium tracking-tight whitespace-nowrap flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer select-none ${
                    isActive 
                      ? 'bg-[#171717] text-white shadow-xs' 
                      : 'text-[#666666] hover:text-[#171717] hover:bg-[#f5f5f5]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#8f8f8f]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ==================================================== */}
          {/* 3. RIGHT UTILITIES & ACTION CHROME (EQUAL HEIGHT 32px) */}
          {/* ==================================================== */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Quick Search Input (Exact h-8 / 32px alignment) */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex relative items-center">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 w-36 md:w-44 lg:w-48 focus:w-56 bg-[#fafafa] focus:bg-white text-xs text-[#171717] placeholder-[#8f8f8f] rounded-[6px] pl-8 pr-8 border border-[#ebebeb] focus:outline-none focus:border-[#171717] transition-all duration-200"
              />
              <Search className="w-3.5 h-3.5 text-[#8f8f8f] absolute left-2.5 pointer-events-none" />
              
              {searchQuery ? (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-2 text-[#8f8f8f] hover:text-[#171717] p-0.5 cursor-pointer flex items-center justify-center"
                  title="Clear"
                >
                  <X className="w-3 h-3" />
                </button>
              ) : (
                <kbd className="hidden lg:inline-flex items-center absolute right-2 px-1 py-0.2 text-[9px] font-mono text-[#8f8f8f] bg-[#f2f2f2] border border-[#ebebeb] rounded pointer-events-none select-none">
                  /
                </kbd>
              )}
            </form>

            {/* State Filter Indicator Pill (Exact h-8 alignment) */}
            {selectedState && (
              <div className="h-8 flex items-center gap-1.5 bg-[#eff6ff] border border-[#bfdbfe] text-[#0070f3] pl-2.5 pr-1.5 rounded-full text-xs shrink-0 select-none">
                <MapPin className="w-3 h-3 text-[#0070f3] shrink-0" />
                <span className="font-mono text-[11px] font-semibold truncate max-w-[80px] sm:max-w-[120px]">
                  {selectedState}
                </span>
                <button 
                  onClick={resetStateFilter} 
                  className="hover:text-rose-600 hover:bg-[#dbeafe] rounded-full p-0.5 cursor-pointer flex items-center justify-center"
                  title="Clear State Filter"
                >
                  <X className="w-3 h-3 text-[#0070f3]" />
                </button>
              </div>
            )}



            {/* Mobile Menu Toggle Button (Exact h-8 / 32px alignment) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="h-8 w-8 rounded-[6px] bg-white border border-[#ebebeb] text-[#171717] hover:bg-[#f5f5f5] flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* MOBILE EXPANDED DRAWER                               */}
      {/* ==================================================== */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#ebebeb] bg-white px-4 pt-3 pb-5 space-y-3">
          
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full bg-[#fafafa] text-xs text-[#171717] placeholder-[#8f8f8f] rounded-[6px] pl-8 pr-3 border border-[#ebebeb] focus:outline-none focus:border-[#171717]"
            />
            <Search className="w-3.5 h-3.5 text-[#8f8f8f] absolute left-2.5 top-3" />
          </form>

          {/* Active State in Mobile */}
          {selectedState && (
            <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#eff6ff] border border-[#bfdbfe] text-xs text-[#0070f3]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0070f3]" />
                <span className="font-mono text-[11px]">State Filter: <strong>{selectedState}</strong></span>
              </div>
              <button 
                onClick={resetStateFilter} 
                className="text-xs text-rose-600 hover:underline font-mono"
              >
                Clear
              </button>
            </div>
          )}

          {/* Nav Items List */}
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
                  className={`h-9 w-full flex items-center gap-2.5 px-3 rounded-[6px] text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-[#171717] text-white' 
                      : 'text-[#666666] hover:bg-[#f5f5f5] hover:text-[#171717]'
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
