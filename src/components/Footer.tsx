/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setView: (view: string) => void;
  onClearSelectedProperty: () => void;
}

export default function Footer({ setView, onClearSelectedProperty }: FooterProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  const handleFooterNav = (viewId: string) => {
    if (viewId === 'listings') {
      onClearSelectedProperty();
    }
    setView(viewId);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer className="bg-white border-t-4 border-black text-black select-none" id="footer-section">
      {/* Upper Footer: Newsletter & Logo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-black">
        {/* Left Brand Col */}
        <div className="lg:col-span-7 p-8 md:p-12 lg:border-r border-black flex flex-col justify-between">
          <div>
            <div className="font-sans font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-black mb-4">
              SAI PROPERTIES
            </div>
            <p className="font-sans font-medium text-sm text-gray-700 max-w-lg tracking-wide leading-relaxed uppercase">
              REDEFINING REAL ESTATE INTEGRITY THROUGH THE DISCIPLINE OF OBJECTIVE STANDARDS, RIGOROUS PHYSICAL VERIFICATION, AND ASYMMETRIC GRID PLANNING.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 pt-8 border-t border-gray-200">
            <div>
              <span className="font-mono text-[10px] text-swiss-red tracking-widest block mb-2">01. GEOLOCATION</span>
              <span className="font-sans font-bold text-xs tracking-wider block">WESTERN METROPOLITAN</span>
              <span className="font-sans font-bold text-xs tracking-wider text-gray-500 block">INDIA (PUNE • MUMBAI • BLR)</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-swiss-red tracking-widest block mb-2">02. ESTABLISHED</span>
              <span className="font-sans font-bold text-xs tracking-wider block">ANNO DOMINI 2011</span>
              <span className="font-sans font-bold text-xs tracking-wider text-gray-500 block">REGISTRATION NO. 412098-B</span>
            </div>
          </div>
        </div>

        {/* Right Newsletter Col */}
        <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between swiss-grid-pattern bg-swiss-muted">
          <div>
            <span className="font-mono text-xs text-swiss-red tracking-widest block mb-2">05. SUBSCRIPTION</span>
            <h3 className="font-sans font-black text-2xl tracking-tighter mb-4 uppercase">
              RECEIVE TRANSACTION REPORTS
            </h3>
            <p className="font-sans text-xs text-gray-600 leading-relaxed mb-6 uppercase">
              OUR QUARTERLY DATA ANALYSIS JOURNAL HIGHLIGHTS VERIFIED PRICE CHARTS, STRUCTURAL TRENDS, AND REGULATORY UPDATES. NO ADJECTIVES. ONLY NUMBERS.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="relative mt-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER CLIENT EMAIL ADDRESS"
                  required
                  className="w-full bg-transparent border-b-2 border-black focus:border-swiss-red focus:outline-none py-3 text-sm font-sans font-bold uppercase tracking-wider placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white hover:bg-swiss-red hover:text-white h-12 flex items-center justify-center font-sans font-bold text-xs tracking-widest transition-colors duration-150 rounded-none uppercase"
              >
                {submitted ? 'COMMUNICATION REGISTERED' : 'SUBSCRIBE TO METRICS'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Middle Footer: Grid of Navigation & Offices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-black">
        {/* Navigation Column */}
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-black flex flex-col">
          <span className="font-mono text-xs text-swiss-red tracking-widest mb-6 block">01. DIRECTORY</span>
          <div className="flex flex-col space-y-3">
            <button onClick={() => handleFooterNav('home')} className="text-left font-sans font-bold text-sm tracking-wider hover:text-swiss-red transition-colors w-max uppercase">
              HOME ARCHIVE
            </button>
            <button onClick={() => handleFooterNav('listings')} className="text-left font-sans font-bold text-sm tracking-wider hover:text-swiss-red transition-colors w-max uppercase">
              PROPERTY INDEX
            </button>
            <button onClick={() => handleFooterNav('about')} className="text-left font-sans font-bold text-sm tracking-wider hover:text-swiss-red transition-colors w-max uppercase">
              ABOUT AGENCY
            </button>
            <button onClick={() => handleFooterNav('contact')} className="text-left font-sans font-bold text-sm tracking-wider hover:text-swiss-red transition-colors w-max uppercase">
              CONTACT & INQUIRY
            </button>
          </div>
        </div>

        {/* Office Pune Column */}
        <div className="p-8 md:p-12 border-b md:border-b-0 lg:border-r border-black flex flex-col">
          <span className="font-mono text-xs text-swiss-red tracking-widest mb-6 block">02. HQ PUNE</span>
          <p className="font-sans font-bold text-xs tracking-wider leading-relaxed mb-4 uppercase">
            SUITE 801, THE GRID PLATE,<br />
            LANE 5, KOREGAON PARK,<br />
            PUNE - 411001
          </p>
          <span className="font-mono text-xs text-gray-500 block">T: +91 98200 12345</span>
          <span className="font-mono text-xs text-gray-500 block">E: PUNE@SAIPROPERTIES.COM</span>
        </div>

        {/* Office Mumbai Column */}
        <div className="p-8 md:p-12 border-b md:border-r border-black flex flex-col">
          <span className="font-mono text-xs text-swiss-red tracking-widest mb-6 block">03. OFFICE MUMBAI</span>
          <p className="font-sans font-bold text-xs tracking-wider leading-relaxed mb-4 uppercase">
            LEVEL 12, CAPITAL TOWER C,<br />
            G-BLOCK, BANDRA KURLA COMPLEX,<br />
            MUMBAI - 400051
          </p>
          <span className="font-mono text-xs text-gray-500 block">T: +91 98200 67890</span>
          <span className="font-mono text-xs text-gray-500 block">E: MUMBAI@SAIPROPERTIES.COM</span>
        </div>

        {/* Office Bangalore Column */}
        <div className="p-8 md:p-12 flex flex-col">
          <span className="font-mono text-xs text-swiss-red tracking-widest mb-6 block">04. OFFICE BANGALORE</span>
          <p className="font-sans font-bold text-xs tracking-wider leading-relaxed mb-4 uppercase">
            UNIT 4A, MODULOR SQUARE,<br />
            100 FEET ROAD, INDIRANAGAR,<br />
            BANGALORE - 560038
          </p>
          <span className="font-mono text-xs text-gray-500 block">T: +91 98200 54321</span>
          <span className="font-mono text-xs text-gray-500 block">E: BLR@SAIPROPERTIES.COM</span>
        </div>
      </div>

      {/* Lower Footer: Copyright & Stamp */}
      <div className="bg-black text-white px-8 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-8">
          <span className="font-sans font-black tracking-widest text-sm text-swiss-red">
            SAI PROPERTIES
          </span>
          <span className="font-mono text-[9px] text-gray-400 tracking-widest uppercase">
            © 2011-{new Date().getFullYear()} ALL RIGHTS RESERVED. CONSTRUCTED ON SWISS GRID PRINCIPLES.
          </span>
        </div>
        <div className="mt-4 md:mt-0 font-mono text-[10px] text-gray-400 tracking-widest flex items-center uppercase">
          METRIC CLASSIFICATION: CLASS 1 SECURE APPMETRIC
          <span className="w-2 h-2 bg-swiss-red ml-2 inline-block"></span>
        </div>
      </div>
    </footer>
  );
}
