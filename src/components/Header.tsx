/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  selectedPropertyId: string | null;
  onClearSelectedProperty: () => void;
}

export default function Header({ currentView, setView, selectedPropertyId, onClearSelectedProperty }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'listings', label: 'PROPERTIES' },
    { id: 'about', label: 'ABOUT SAI' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (viewId: string) => {
    if (viewId === 'listings') {
      onClearSelectedProperty();
    }
    setView(viewId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-black select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* Brand Wordmark */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="cursor-pointer group flex flex-col justify-center"
          id="header-brand-wordmark"
        >
          <span className="font-sans font-black text-2xl md:text-3xl tracking-tighter text-black leading-none group-hover:text-swiss-red transition-colors duration-200">
            SAI PROPERTIES
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-stretch h-full" id="header-desktop-navigation">
          {navItems.map((item) => {
            const isActive = currentView === item.id && (item.id !== 'listings' || !selectedPropertyId);
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-6 flex items-center font-sans font-bold text-sm tracking-widest transition-all duration-150 h-full border-r border-black last:border-r-0 overflow-hidden group`}
                id={`nav-item-${item.id}`}
              >
                {/* Background transition on hover */}
                <span className="absolute inset-0 bg-swiss-red translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out z-0" />
                
                {/* Label text sliding animation */}
                <span className="relative z-10 flex flex-col overflow-hidden h-5">
                  <span className={`transition-transform duration-200 ease-out group-hover:-translate-y-full ${isActive ? 'text-swiss-red' : 'text-black'}`}>
                    {item.label}
                  </span>
                  <span className="absolute top-0 left-0 transition-transform duration-200 ease-out translate-y-full group-hover:translate-y-0 text-white">
                    {item.label}
                  </span>
                </span>

                {/* Micro-indicator */}
                {isActive && (
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-swiss-red rounded-none" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Call to Action - Quick Inquiry */}
        <div className="hidden lg:flex items-center">
          <button 
            onClick={() => handleNavClick('contact')}
            className="border-2 border-black h-12 px-6 flex items-center justify-center font-sans font-black text-xs tracking-widest bg-black text-white hover:bg-swiss-red hover:border-swiss-red hover:text-white transition-all duration-150 rounded-none group"
            id="header-cta-button"
          >
            ENQUIRE NOW
            <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-black hover:text-swiss-red transition-colors"
          aria-label="Toggle navigation menu"
          id="header-mobile-toggle"
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Full-Screen Overlay Menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 top-[84px] md:top-[100px] z-40 bg-white border-t-4 border-black flex flex-col justify-between"
          id="header-mobile-menu-overlay"
        >
          <div className="swiss-grid-pattern flex-grow flex flex-col justify-center px-6 py-12">
            <div className="flex flex-col space-y-6">
              {navItems.map((item, index) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="flex items-center text-left py-4 border-b-2 border-black group"
                    id={`mobile-nav-item-${item.id}`}
                  >
                    <span className="font-mono text-xs text-swiss-red tracking-widest mr-4">
                      0{index + 1}.
                    </span>
                    <span className={`font-sans font-black text-4xl tracking-tighter ${isActive ? 'text-swiss-red' : 'text-black'} group-hover:text-swiss-red transition-colors`}>
                      {item.label}
                    </span>
                    <ArrowUpRight className="ml-auto w-8 h-8 text-black group-hover:text-swiss-red transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Mobile Menu Footer */}
          <div className="p-6 bg-black text-white border-t-2 border-black flex flex-col space-y-4">
            <div className="font-mono text-[10px] tracking-widest text-gray-400">
              OFFICE HOURS: MON - SAT [09:00 - 19:00]
            </div>
            <div className="flex justify-between items-center">
              <span className="font-sans font-bold text-xs tracking-wider text-white">SAI PROPERTIES SOLUTIONS</span>
              <span className="font-sans font-bold text-xs tracking-wider text-swiss-red">+91 98200 12345</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
