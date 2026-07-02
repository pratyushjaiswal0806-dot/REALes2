/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowDown, ArrowUpRight, ShieldCheck, FileText, Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface SwissHeroProps {
  onExploreClick: () => void;
  onAboutClick: () => void;
}

export default function SwissHero({ onExploreClick, onAboutClick }: SwissHeroProps) {
  return (
    <section className="relative border-b-4 border-black select-none bg-white overflow-hidden" id="hero-section">
      {/* Structural Columns (Asymmetric 7:5 ratio) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-100px)]">
        
        {/* Left Side: Massive Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col justify-between p-8 md:p-12 lg:p-16 lg:border-r-4 border-black relative z-10"
        >
          {/* Top Label */}
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs font-black bg-swiss-red text-white px-2.5 py-1 tracking-widest uppercase">
              INDEX 01 / HERO
            </span>
            <span className="font-mono text-xs tracking-widest text-black font-bold uppercase">
              • WE DISMISS THE AMBIGUOUS
            </span>
          </div>

          {/* Core Typography Block */}
          <div className="my-12">
            <h1 className="font-sans font-black text-6xl sm:text-7xl md:text-8xl xl:text-[7.5rem] leading-[0.9] tracking-tighter text-black hover:text-swiss-red transition-colors duration-300 cursor-default uppercase mb-4">
              SAI PROPERTIES
            </h1>
            
            <p className="font-mono text-xs md:text-sm tracking-widest text-swiss-red font-black uppercase mb-6">
              STRUCTURED. VERIFIED. YOURS.
            </p>
            
            <p className="font-sans font-bold text-sm md:text-base text-gray-700 max-w-xl tracking-wide leading-relaxed uppercase mb-8">
              A RADICAL REAL ESTATE AGENCY ROOTED IN COLD OBJECTIVE FIDELITY. WE FORGO STAGE EFFECTS AND ADJECTIVAL CLICHÉS TO SUPPLY CERTIFIED CIVIL RATINGS AND MATHEMATICALLY STABLE LAND TITLES.
            </p>

            {/* Double Action Grid */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <button
                onClick={onExploreClick}
                className="flex-1 bg-black text-white hover:bg-swiss-red h-16 flex items-center justify-center font-sans font-black text-sm tracking-widest transition-colors duration-150 rounded-none border-2 border-black group"
              >
                EXPLORE INDEX
                <ArrowUpRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                onClick={onAboutClick}
                className="flex-1 bg-white text-black hover:bg-black hover:text-white h-16 flex items-center justify-center font-sans font-black text-sm tracking-widest transition-colors duration-150 rounded-none border-2 border-black"
              >
                AGENCY STORY
              </button>
            </div>
          </div>

          {/* Bottom Metre block */}
          <div className="border-t-2 border-black pt-6 grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-swiss-red tracking-widest uppercase">VERIFIED</span>
              <span className="font-sans font-black text-lg md:text-xl text-black">100% TITLE</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-swiss-red tracking-widest uppercase">STRUCTURAL</span>
              <span className="font-sans font-black text-lg md:text-xl text-black">CIVIL AUDITED</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-swiss-red tracking-widest uppercase">SCALE</span>
              <span className="font-sans font-black text-lg md:text-xl text-black">MODULOR</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Bauhaus-Style Abstract Geometric Composition */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="lg:col-span-5 relative min-h-[400px] lg:min-h-0 bg-swiss-muted flex items-center justify-center swiss-grid-pattern p-8 border-t-4 border-black lg:border-t-0"
        >
          
          {/* Subtle diagonal lines underlay */}
          <div className="absolute inset-0 swiss-diagonal opacity-60"></div>
          
          {/* Main Abstract Composition Shell */}
          <div className="relative w-80 h-80 md:w-96 md:h-96 border-4 border-black bg-white flex items-center justify-center relative select-none">
            {/* Grid background inside */}
            <div className="absolute inset-0 swiss-dots opacity-80"></div>

            {/* Diagonal Divider Axis */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[141%] h-1 bg-black rotate-45 transform origin-center opacity-10"></div>
            </div>

            {/* Swiss Red Accent Core Square */}
            <div className="absolute top-8 left-8 w-24 h-24 bg-swiss-red border-2 border-black z-10 flex items-center justify-center hover:translate-x-1 hover:translate-y-1 transition-transform cursor-pointer">
              <span className="font-mono text-2xl font-black text-white">01</span>
            </div>

            {/* Large Hollow black circle */}
            <div className="absolute w-56 h-56 border-4 border-black rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300">
              {/* Inner Solid Muted Gray Circle */}
              <div className="w-32 h-32 bg-swiss-muted border-2 border-black rounded-full flex items-center justify-center">
                <Compass className="w-10 h-10 text-black animate-[spin_20s_linear_infinite]" />
              </div>
            </div>

            {/* Vertical Bold Bar */}
            <div className="absolute right-12 top-0 bottom-16 w-8 bg-black z-0"></div>

            {/* Horizontal Technical Rule lines */}
            <div className="absolute left-0 right-0 bottom-12 h-0.5 bg-black"></div>
            <div className="absolute left-0 right-0 bottom-16 h-0.5 bg-swiss-red"></div>

            {/* Small Floating Coordinate tag */}
            <div className="absolute bottom-4 right-4 bg-black text-white px-3 py-1 text-[9px] font-mono tracking-widest uppercase">
              GRID: L-KP-5
            </div>

            {/* Small Floating Verification Shield */}
            <div className="absolute bottom-20 left-4 bg-white border-2 border-black p-2 z-20 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-swiss-red" />
              <span className="font-mono text-[8px] font-black tracking-wider">CERTIFIED SAFE</span>
            </div>
          </div>

          {/* Floating graphic annotation card for architectural aesthetic */}
          <div className="absolute top-4 right-4 bg-white border-2 border-black p-3 text-[9px] font-mono tracking-widest uppercase leading-tight hidden xl:block shadow-[4px_4px_0_0_#000000]">
            TYPE SPECS:<br />
            1. SANS-SERIF OBJECTIVE<br />
            2. GRID DIVISION 24px<br />
            3. HIERARCHY SCALE 3:1
          </div>
        </motion.div>
        
      </div>
      
      {/* Scroll indicator anchor */}
      <button 
        onClick={onExploreClick}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white border-2 border-black w-12 h-12 rounded-none flex items-center justify-center hover:bg-swiss-red hover:text-white transition-colors duration-150 z-20 animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  );
}
