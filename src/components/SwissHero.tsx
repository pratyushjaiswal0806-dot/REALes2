/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { properties } from '../data';
import { formatPrice } from './PropertyCard';

interface SwissHeroProps {
  onExploreClick: () => void;
  onAboutClick: () => void;
  onPropertyClick: (propertyId: string) => void;
}

export default function SwissHero({ onExploreClick, onAboutClick, onPropertyClick }: SwissHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const featured = properties.slice(0, 3);
  const currentProperty = featured[activeIndex];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % featured.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + featured.length) % featured.length);
  };

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
          className="lg:col-span-7 flex flex-col justify-between p-6 md:p-8 lg:p-10 lg:border-r-4 border-black relative z-10"
        >
          {/* Top Label */}
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs font-black bg-swiss-red text-white px-2.5 py-1 tracking-widest uppercase">
              FEATURED ACQUISITIONS
            </span>
            <span className="font-mono text-xs tracking-widest text-black font-bold uppercase">
              • SAI PROPERTIES DIRECTORY
            </span>
          </div>

          {/* Core Typography Block */}
          <div className="my-6">
            <h1 className="font-sans font-black text-5xl sm:text-6xl md:text-7xl xl:text-[5rem] leading-[0.9] tracking-tighter text-black hover:text-swiss-red transition-colors duration-300 cursor-default uppercase mb-3">
              SAI PROPERTIES
            </h1>
            
            <p className="font-mono text-xs md:text-sm tracking-widest text-swiss-red font-black uppercase mb-4">
              STRUCTURED. VERIFIED. YOURS.
            </p>

            <p className="font-sans font-bold text-sm text-gray-700 max-w-xl tracking-wide leading-relaxed uppercase mb-6">
              A PRECISE REAL ESTATE SELECTION BUILT ON INDEPENDENT CIVIL ENGINEERING AUDITS, 100% VERIFIED TITLE HISTORIES, AND STRUCTURAL METRICS.
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

        {/* Right Side: High-End Real Estate Showcase Slider */}
        <div className="lg:col-span-5 relative min-h-[450px] lg:min-h-0 bg-swiss-muted flex flex-col justify-between border-t-4 border-black lg:border-t-0 select-none overflow-hidden">
          {/* Active slide image */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentProperty.id}
                src={currentProperty.images[0]}
                alt={currentProperty.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-90 contrast-110 transition-all duration-300"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10"></div>
            {/* Subtle grid underlay on top of image */}
            <div className="absolute inset-0 swiss-grid-pattern opacity-20 z-10 pointer-events-none"></div>
          </div>

          {/* Top annotation or metadata badge */}
          <div className="relative z-20 p-4 md:p-6 flex justify-between items-start">
            <span className="bg-swiss-red text-white px-3 py-1 text-[10px] font-sans font-black tracking-widest border border-white uppercase">
              {currentProperty.status.replace('_', ' ')}
            </span>
            <div className="bg-white border-2 border-black text-black px-3 py-1 text-[9px] font-mono tracking-widest uppercase font-bold">
              REGISTRY: {currentProperty.id}
            </div>
          </div>

          {/* Bottom Property Info Card & Controls */}
          <div className="relative z-20 p-4 md:p-6">
            <div className="border-4 border-black bg-white p-4 relative shadow-[8px_8px_0_0_#FF3000] transition-all duration-200">
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-[9px] text-swiss-red tracking-widest uppercase font-black">
                  {currentProperty.type} SPECIFICATION
                </span>
                <span className="font-mono text-[10px] font-black text-black">
                  0{activeIndex + 1} / 0{featured.length}
                </span>
              </div>

              <h3 className="font-sans font-black text-2xl tracking-tighter text-black uppercase mb-1 leading-tight">
                {currentProperty.title}
              </h3>
              
              <div className="flex items-center space-x-1.5 text-[11px] font-sans font-bold text-gray-500 uppercase mb-4">
                <MapPin className="w-3.5 h-3.5 text-swiss-red" />
                <span>{currentProperty.location}</span>
              </div>

              {/* Specs Row */}
              <div className="grid grid-cols-3 text-center border-t-2 border-b-2 border-black divide-x divide-black bg-swiss-muted/30 mb-4">
                <div className="py-2 flex flex-col justify-center">
                  <span className="font-mono text-[8px] text-gray-500 uppercase">CONFIG</span>
                  <span className="font-sans font-bold text-xs text-black uppercase truncate px-1">
                    {currentProperty.configuration.split(' ')[0]} {currentProperty.configuration.split(' ')[1] || ''}
                  </span>
                </div>
                <div className="py-2 flex flex-col justify-center">
                  <span className="font-mono text-[8px] text-gray-500 uppercase">AREA</span>
                  <span className="font-sans font-bold text-xs text-black">
                    {currentProperty.areaSqFt} SQFT
                  </span>
                </div>
                <div className="py-2 flex flex-col justify-center">
                  <span className="font-mono text-[8px] text-gray-500 uppercase">VALUE</span>
                  <span className="font-sans font-black text-xs text-swiss-red">
                    {formatPrice(currentProperty.price, currentProperty.status).split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Action buttons inside the card */}
              <div className="flex items-stretch gap-2 h-12">
                {/* Navigation controls */}
                <div className="flex border-2 border-black">
                  <button 
                    onClick={prevSlide}
                    className="w-12 bg-white hover:bg-black hover:text-white flex items-center justify-center border-r-2 border-black transition-colors"
                    aria-label="Previous property"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-12 bg-white hover:bg-black hover:text-white flex items-center justify-center transition-colors"
                    aria-label="Next property"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => onPropertyClick(currentProperty.id)}
                  className="flex-1 bg-black text-white hover:bg-swiss-red flex items-center justify-center font-sans font-black text-xs tracking-widest transition-colors duration-150 rounded-none border-2 border-black group"
                >
                  VIEW REGISTRY
                  <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      

    </section>
  );
}
