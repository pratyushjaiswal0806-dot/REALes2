/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Ruler, 
  Grid, 
  Plus, 
  Minus, 
  ArrowLeft,
  Briefcase,
  Compass,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import SwissHero from './components/SwissHero';
import PropertyCard, { formatPrice } from './components/PropertyCard';
import ListingFilterBar from './components/ListingFilterBar';
import EnquiryForm from './components/EnquiryForm';

import { properties, agents, journalPosts, testimonials, faqs, milestones, stats } from './data';
import { Property, JournalPost } from './types';

export default function App() {
  const [currentView, setView] = useState<string>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  
  // Filter states
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [selectedConfig, setSelectedConfig] = useState<string>('ALL');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('DEFAULT');

  // FAQ Accordion state
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Journal Drawer state
  const [activeJournalPost, setActiveJournalPost] = useState<JournalPost | null>(null);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView, selectedPropertyId]);

  const handlePropertyClick = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setView('property-detail');
  };

  const handleClearSelectedProperty = () => {
    setSelectedPropertyId(null);
  };

  const resetFilters = () => {
    setSelectedType('ALL');
    setSelectedStatus('ALL');
    setSelectedCity('ALL');
    setSelectedConfig('ALL');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('DEFAULT');
  };

  // Filter & Sort Logic
  const filteredProperties = properties.filter((p) => {
    // Type Filter
    if (selectedType !== 'ALL' && p.type !== selectedType) return false;
    
    // Status Filter
    if (selectedStatus !== 'ALL' && p.status !== selectedStatus) return false;
    
    // City Filter
    if (selectedCity !== 'ALL' && p.city !== selectedCity) return false;
    
    // Config Filter
    if (selectedConfig !== 'ALL') {
      if (selectedConfig === 'PENTHOUSE') {
        if (!p.configuration.includes('PENTHOUSE')) return false;
      } else if (selectedConfig === 'OFFICE') {
        if (!p.configuration.includes('COMMERCIAL') && !p.configuration.includes('OFFICE')) return false;
      } else {
        if (!p.configuration.startsWith(selectedConfig.split(' ')[0])) return false;
      }
    }
    
    // Min Price
    if (minPrice !== '' && p.price < parseFloat(minPrice)) return false;
    
    // Max Price
    if (maxPrice !== '' && p.price > parseFloat(maxPrice)) return false;

    return true;
  });

  // Sort logic
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'PRICE_ASC') return a.price - b.price;
    if (sortBy === 'PRICE_DESC') return b.price - a.price;
    if (sortBy === 'AREA_DESC') return b.areaSqFt - a.areaSqFt;
    return 0; // Default
  });

  const featuredProperties = properties.slice(0, 3);
  const selectedProperty = properties.find(p => p.id === selectedPropertyId);
  const selectedAgent = selectedProperty ? agents.find(a => a.id === selectedProperty.agentId) : null;
  const similarProperties = selectedProperty 
    ? properties.filter(p => p.id !== selectedProperty.id && p.type === selectedProperty.type).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header component */}
      <Header 
        currentView={currentView} 
        setView={setView} 
        selectedPropertyId={selectedPropertyId}
        onClearSelectedProperty={handleClearSelectedProperty}
      />

      {/* Main Content Area with standard page transition animation wrapper */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* HOME VIEW */}
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <SwissHero 
                onExploreClick={() => setView('listings')} 
                onAboutClick={() => setView('about')} 
              />

              {/* Stats Section */}
              <section className="bg-black text-white border-b-4 border-black select-none">
                <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-800">
                  {stats.map((stat, i) => (
                    <div key={i} className="p-8 md:p-12 flex flex-col justify-between group cursor-pointer hover:bg-swiss-red transition-colors duration-200">
                      <span className="font-mono text-[10px] text-gray-400 tracking-widest block mb-6 uppercase">
                        METRIC MODULE 0{i + 1}
                      </span>
                      <div>
                        <div className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter mb-2">
                          {stat.prefix}{stat.value}
                        </div>
                        <div className="font-mono text-[9px] sm:text-xs tracking-widest text-gray-300 uppercase">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 01: Featured Properties */}
              <section className="py-20 md:py-28 border-b-4 border-black px-6 md:px-12 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
                  <div className="lg:col-span-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="font-mono text-xs font-black text-swiss-red tracking-widest uppercase">
                        01. PORTFOLIO
                      </span>
                      <span className="w-1.5 h-1.5 bg-black"></span>
                      <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">
                        FEATURED SELECTIONS
                      </span>
                    </div>
                    <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-7xl tracking-tighter uppercase leading-none">
                      VERIFIED RESIDENCES
                    </h2>
                  </div>
                  <div className="lg:col-span-4 lg:text-right">
                    <button 
                      onClick={() => setView('listings')}
                      className="border-2 border-black px-6 h-14 font-sans font-black text-xs tracking-widest bg-white text-black hover:bg-black hover:text-white transition-colors duration-150 inline-flex items-center rounded-none"
                    >
                      VIEW COMPLETE INDEX
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Grid of Property Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProperties.map((p) => (
                    <PropertyCard 
                      key={p.id} 
                      property={p} 
                      onClick={handlePropertyClick} 
                    />
                  ))}
                </div>
              </section>

              {/* Section 02: Why Sai Properties */}
              <section className="border-b-4 border-black bg-swiss-muted/50 select-none overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
                  {/* Left explanation block */}
                  <div className="lg:col-span-4 p-8 md:p-12 lg:p-16 flex flex-col justify-between border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-white">
                    <div>
                      <span className="font-mono text-xs font-black text-swiss-red tracking-widest uppercase block mb-4">
                        02. WHY SAI PROPERTIES
                      </span>
                      <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter uppercase leading-none mb-6">
                        THE COLD FACT PROTOCOL
                      </h2>
                    </div>
                    <p className="font-sans text-xs text-gray-600 leading-relaxed uppercase">
                      THE REAL ESTATE SECTOR REPEATEDLY SELLS DREAMS EMBELLISHED WITH VISUAL CHROME. WE REJECT THE TRADITIONAL EMOTIONAL PLAYBOOK. OUR VALUES EMBODY COLD SYSTEMIC GEOMETRIES, TRIPLE-VERIFIED PAPERS, AND REINFORCED METRICS.
                    </p>
                  </div>

                  {/* Right Bento Grid */}
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">
                    
                    {/* Bento Card 1 */}
                    <div className="p-8 md:p-12 flex flex-col justify-between bg-white hover:bg-swiss-red hover:text-white transition-colors duration-200 group">
                      <div className="flex justify-between items-start mb-12">
                        <span className="font-mono text-xs font-black text-swiss-red group-hover:text-white uppercase tracking-widest">
                          02A / CIVIL METRICS
                        </span>
                        <Plus className="w-6 h-6 text-black group-hover:text-white group-hover:rotate-90 transition-transform duration-200" />
                      </div>
                      <div>
                        <h3 className="font-sans font-black text-2xl tracking-tighter uppercase mb-4">
                          CIVIL ENGINE AUDITS
                        </h3>
                        <p className="font-sans text-xs leading-relaxed opacity-80 uppercase">
                          WE COMMISSION INDEPENDENT CIVIL ENGINEERING FIRMS TO COMPREHENSIVELY AUDIT EVERY CONCRETE CORE AND ENERGY COEFFICIENT IN OUR BUILDINGS BEFORE RATIFYING THE DATA SHEET.
                        </p>
                      </div>
                    </div>

                    {/* Bento Card 2 */}
                    <div className="p-8 md:p-12 flex flex-col justify-between bg-white hover:bg-swiss-red hover:text-white transition-colors duration-200 group border-t-2 md:border-t-0 border-black">
                      <div className="flex justify-between items-start mb-12">
                        <span className="font-mono text-xs font-black text-swiss-red group-hover:text-white uppercase tracking-widest">
                          02B / TRANSACTION
                        </span>
                        <Plus className="w-6 h-6 text-black group-hover:text-white group-hover:rotate-90 transition-transform duration-200" />
                      </div>
                      <div>
                        <h3 className="font-sans font-black text-2xl tracking-tighter uppercase mb-4">
                          100% REGISTRY FIDELITY
                        </h3>
                        <p className="font-sans text-xs leading-relaxed opacity-80 uppercase">
                          TITLE SEARCH REPORTS ARE COMPILED GOING BACK 30 YEARS. WE NEVER ONBOARD ANY RESIDENCE WITH RESOLUTELY PENDING DISPUTES OR UNCHECKED DEBT LIENS.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Section 03: Process Steps */}
              <section className="py-20 md:py-28 border-b-4 border-black px-6 md:px-12 max-w-7xl mx-auto w-full">
                <div className="mb-16">
                  <span className="font-mono text-xs font-black text-swiss-red tracking-widest uppercase block mb-2">
                    03. PROTOCOL
                  </span>
                  <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-7xl tracking-tighter uppercase leading-none">
                    TRANSACTION PROCESS
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { nr: '01', title: 'TECHNICAL FILING', desc: 'SUBMIT SPECIFIC REQUIREMENTS. COMPACT HOUSING AND RECTANGULAR CONFIGURATIONS ARE COMPILED INTO AN ANALYTICAL PROFILE INDEX.' },
                    { nr: '02', title: 'CIVIL VERIFICATION', desc: 'PHYSICAL ON-SITE RE-MEASUREMENT AND AUDITING. PRICE ESTIMATION COMPARISONS BASED ON REGIONAL CONCRETE MARKET COSTS.' },
                    { nr: '03', title: 'LEGAL PROTOCOL', desc: 'MANDATORY VERIFICATION OF INDEPENDENT SEARCH CERTIFICATES, APPROVED PLANS, TITLE DEEDS, AND TAX CLEARANCE GRIDS.' },
                    { nr: '04', title: 'SECURE EXECUTION', desc: 'SEAMLESS CONTRACT FORMULATION AND PHYSICAL HANDOVER ACCORDING TO SYSTEMATIC REGISTERED DEEDS AND STAMP CODES.' }
                  ].map((step, i) => (
                    <div key={i} className="border-2 border-black p-6 bg-white relative hover:-translate-y-1 transition-transform duration-200">
                      <span className="font-sans font-black text-4xl text-swiss-red block mb-6">
                        {step.nr}.
                      </span>
                      <h3 className="font-sans font-black text-lg tracking-tighter uppercase mb-3">
                        {step.title}
                      </h3>
                      <p className="font-sans text-xs text-gray-500 leading-relaxed uppercase">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 04: Journal / Insights */}
              <section className="border-b-4 border-black bg-swiss-muted select-none swiss-grid-pattern py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                  <div className="mb-16">
                    <span className="font-mono text-xs font-black text-swiss-red tracking-widest uppercase block mb-2">
                      04. PUBLICATIONS
                    </span>
                    <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-7xl tracking-tighter uppercase leading-none">
                      THE ARCHITECTURAL JOURNAL
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {journalPosts.map((post) => (
                      <div 
                        key={post.id}
                        onClick={() => setActiveJournalPost(post)}
                        className="bg-white border-2 border-black p-8 flex flex-col justify-between hover:border-swiss-red cursor-pointer transition-colors duration-200 relative group"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <span className="font-mono text-xs font-black text-swiss-red uppercase tracking-widest">
                              {post.category}
                            </span>
                            <span className="font-mono text-xs text-gray-400">
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="font-sans font-black text-xl tracking-tighter uppercase mb-4 group-hover:text-swiss-red transition-colors duration-150">
                            {post.title}
                          </h3>
                          <p className="font-sans text-xs text-gray-600 leading-relaxed uppercase">
                            {post.summary}
                          </p>
                        </div>

                        <div className="mt-8 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono font-bold">
                          <span>{post.date}</span>
                          <span className="text-swiss-red flex items-center">
                            READ PAPER <ArrowUpRight className="ml-1 w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Testimonials */}
              <section className="py-20 md:py-28 border-b-4 border-black bg-white select-none">
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left title info */}
                    <div className="lg:col-span-4">
                      <span className="font-mono text-xs font-black text-swiss-red tracking-widest uppercase block mb-2">
                        05. REPUTATION
                      </span>
                      <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter uppercase leading-none mb-6">
                        CLIENT FIDELITY LOGS
                      </h2>
                      <p className="font-sans text-xs text-gray-500 uppercase leading-relaxed">
                        TRANSACTION RATINGS SECURED THROUGH SYSTEMATIC LEGAL ADHERENCE AND ABSOLUTE TRANSPARENCY CODES.
                      </p>
                    </div>

                    {/* Right testimonial blocks */}
                    <div className="lg:col-span-8 space-y-8">
                      {testimonials.map((test, i) => (
                        <div 
                          key={test.id} 
                          className="border-2 border-black p-8 bg-white hover:-translate-y-1 hover:border-swiss-red hover:shadow-[4px_4px_0_0_#000000] transition-all duration-200"
                        >
                          <p className="font-sans font-bold text-sm leading-relaxed mb-6 uppercase text-black">
                            "{test.quote}"
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-gray-100 pt-4">
                            <div>
                              <span className="font-sans font-black text-xs text-black block">
                                {test.name}
                              </span>
                              <span className="font-mono text-[9px] text-gray-500 uppercase">
                                {test.role} • {test.company}
                              </span>
                            </div>
                            <span className="font-mono text-[10px] text-swiss-red font-black uppercase mt-2 sm:mt-0">
                              {test.date}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="py-20 md:py-28 border-b-4 border-black bg-swiss-muted select-none">
                <div className="max-w-3xl mx-auto px-6 w-full">
                  <div className="text-center mb-16">
                    <span className="font-mono text-xs font-black text-swiss-red tracking-widest uppercase block mb-2">
                      06. FREQUENT SHEET
                    </span>
                    <h2 className="font-sans font-black text-4xl sm:text-5xl tracking-tighter uppercase">
                      RESOLUTE INQUIRIES
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {faqs.map((faq) => {
                      const isExpanded = expandedFaqId === faq.id;
                      return (
                        <div 
                          key={faq.id} 
                          className="border-2 border-black bg-white transition-all duration-150"
                        >
                          <button
                            onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                            className="w-full text-left p-6 flex items-center justify-between font-sans font-black text-sm tracking-tight uppercase hover:bg-swiss-muted"
                          >
                            <span>{faq.question}</span>
                            <div className="bg-black text-white p-1 rounded-none">
                              {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </div>
                          </button>
                          
                          {isExpanded && (
                            <div className="p-6 border-t-2 border-black bg-swiss-muted/30 font-sans text-xs text-gray-600 leading-relaxed uppercase animate-fade-in">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* LISTINGS VIEW */}
          {currentView === 'listings' && (
            <motion.div
              key="listings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 w-full"
            >
              {/* Header block */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 select-none">
                <div className="lg:col-span-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="font-mono text-xs font-black text-swiss-red tracking-widest uppercase">
                      02. REGISTER
                    </span>
                    <span className="w-1.5 h-1.5 bg-black"></span>
                    <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">
                      PROPERTY COLLECTION
                    </span>
                  </div>
                  <h1 className="font-sans font-black text-5xl sm:text-6xl lg:text-8xl tracking-tighter uppercase leading-none">
                    ALL LISTINGS
                  </h1>
                </div>
                <div className="lg:col-span-4 lg:text-right">
                  <span className="font-mono text-xs text-gray-500 uppercase tracking-widest block mb-1">
                    TOTAL VERIFIED UNITS
                  </span>
                  <span className="font-sans font-black text-3xl text-black">
                    {sortedProperties.length} ACTIVE
                  </span>
                </div>
              </div>

              {/* Filter bar */}
              <div className="mb-12 sticky top-24 z-30">
                <ListingFilterBar
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  selectedConfig={selectedConfig}
                  setSelectedConfig={setSelectedConfig}
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  onReset={resetFilters}
                  totalCount={sortedProperties.length}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              </div>

              {/* Listing grid */}
              {sortedProperties.length > 0 ? (
                <div className="relative">
                  {/* Subtle Grid underlay for full site aesthetic */}
                  <div className="absolute inset-0 swiss-grid-pattern opacity-10 pointer-events-none"></div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {sortedProperties.map((p) => (
                      <PropertyCard 
                        key={p.id} 
                        property={p} 
                        onClick={handlePropertyClick} 
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="border-4 border-black p-16 text-center flex flex-col items-center justify-center space-y-6 select-none bg-swiss-muted/30">
                  <Grid className="w-16 h-16 text-gray-400" />
                  <h2 className="font-sans font-black text-3xl sm:text-4xl tracking-tighter uppercase text-black">
                    NO MATCHING PROPERTIES
                  </h2>
                  <p className="font-sans text-xs text-gray-500 uppercase max-w-sm leading-relaxed">
                    THERE ARE CURRENTLY NO REGISTERED UNITS IN OUR DATABASE THAT CONFORM TO THESE SPECIFIC PRICE OR CONFIGURATION LIMITS.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="bg-black text-white hover:bg-swiss-red h-14 px-8 flex items-center justify-center font-sans font-black text-xs tracking-widest transition-colors duration-150 rounded-none border-2 border-black"
                  >
                    RESET FILTER SHEET
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* PROPERTY DETAIL VIEW */}
          {currentView === 'property-detail' && selectedProperty && (
            <motion.div
              key="property-detail"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 w-full"
            >
              {/* Back Button and Path navigation */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-6 mb-10 select-none">
                <button
                  onClick={() => setView('listings')}
                  className="inline-flex items-center space-x-2 font-sans font-black text-xs tracking-widest uppercase hover:text-swiss-red transition-colors mb-4 sm:mb-0"
                  id="property-detail-back-button"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK TO PROPERTY INDEX</span>
                </button>
                <div className="font-mono text-[10px] text-gray-400 tracking-widest uppercase">
                  REGISTRY: SAI / PORTFOLIO / {selectedProperty.id}
                </div>
              </div>

              {/* Asymmetric Split Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Side: Images, Descriptions, Specs (7 Columns) */}
                <div className="lg:col-span-7 space-y-12 select-none">
                  
                  {/* Primary Large Image plate with no rounding */}
                  <div className="relative border-2 border-black aspect-[16/10] bg-swiss-muted overflow-hidden">
                    <span className="absolute top-4 left-4 bg-swiss-red text-white px-3 py-1 text-[10px] font-sans font-black tracking-widest z-10 border border-white uppercase">
                      {selectedProperty.status.replace('_', ' ')}
                    </span>
                    <img 
                      src={selectedProperty.images[0]} 
                      alt={selectedProperty.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Asymmetric Gallery Strip */}
                  {selectedProperty.images.length > 1 && (
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProperty.images.slice(1).map((img, i) => (
                        <div key={i} className="border-2 border-black aspect-[3/2] bg-swiss-muted overflow-hidden">
                          <img 
                            src={img} 
                            alt={`${selectedProperty.title} view ${i + 2}`} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Core Factual Description */}
                  <div>
                    <span className="font-mono text-xs text-swiss-red tracking-widest block uppercase mb-2">01. GEOMETRIC OVERVIEW</span>
                    <h2 className="font-sans font-black text-3xl tracking-tighter uppercase mb-4">
                      {selectedProperty.title}
                    </h2>
                    <div className="flex items-center space-x-2 text-xs font-sans font-bold text-gray-500 uppercase mb-6">
                      <MapPin className="w-4 h-4 text-swiss-red" />
                      <span>{selectedProperty.location}</span>
                    </div>
                    <p className="font-sans text-sm text-gray-700 leading-relaxed uppercase">
                      {selectedProperty.description}
                    </p>
                  </div>

                  {/* Highlights Bullet block */}
                  <div className="bg-swiss-muted/50 p-6 md:p-8 border-2 border-black relative">
                    <div className="absolute top-0 right-0 w-16 h-16 swiss-diagonal opacity-40"></div>
                    <span className="font-mono text-xs text-swiss-red tracking-widest block uppercase mb-4">02. COMPONENT HIGHLIGHTS</span>
                    <ul className="space-y-3">
                      {selectedProperty.highlights.map((high, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <span className="mt-1 w-2.5 h-2.5 bg-swiss-red flex-shrink-0"></span>
                          <span className="font-sans font-bold text-xs text-black uppercase tracking-wide">
                            {high}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Complete Civil Specifications as a Data Table */}
                  <div>
                    <span className="font-mono text-xs text-swiss-red tracking-widest block uppercase mb-4">03. CIVIL ENGINEERING DATA</span>
                    <div className="border-2 border-black overflow-hidden">
                      <table className="w-full text-left text-xs uppercase font-sans">
                        <thead>
                          <tr className="bg-black text-white font-mono text-[10px] tracking-widest">
                            <th className="p-4 border-r border-black/20">SPECIFICATION SYSTEM</th>
                            <th className="p-4">TECHNICAL SPEC DETAILS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y border-black">
                          {Object.entries(selectedProperty.specifications).map(([key, val], i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-swiss-muted/40'}>
                              <td className="p-4 font-bold border-r border-black/10 w-1/3 tracking-wider">{key}</td>
                              <td className="p-4 text-gray-600 leading-relaxed font-medium">{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                {/* Right Side: Key Specs, Agent, Enquiry (5 Columns) */}
                <div className="lg:col-span-5 space-y-8">
                  
                  {/* Primary Metrics Panel */}
                  <div className="border-4 border-black p-8 bg-white select-none relative">
                    {/* Grid texture */}
                    <div className="absolute inset-0 swiss-dots opacity-20 pointer-events-none"></div>

                    <div className="relative z-10 space-y-6">
                      <span className="font-mono text-[10px] text-swiss-red tracking-widest block uppercase">
                        INDEX METRIC SYSTEM
                      </span>

                      {/* Giant Price Box */}
                      <div className="border-b-2 border-black pb-6">
                        <span className="font-mono text-[9px] text-gray-400 block uppercase">CERTIFIED REGISTRATION VALUE</span>
                        <span className="font-sans font-black text-4xl md:text-5xl tracking-tighter text-black block mt-1">
                          {formatPrice(selectedProperty.price, selectedProperty.status)}
                        </span>
                      </div>

                      {/* Technical Specs Rows */}
                      <div className="grid grid-cols-2 gap-6 border-b-2 border-black pb-6">
                        <div>
                          <span className="font-mono text-[9px] text-gray-400 block uppercase flex items-center">
                            <Ruler className="w-3.5 h-3.5 text-swiss-red mr-1" /> CIVIL AREA
                          </span>
                          <span className="font-sans font-black text-xl text-black block mt-1">
                            {selectedProperty.areaSqFt} SQFT
                          </span>
                        </div>
                        <div>
                          <span className="font-mono text-[9px] text-gray-400 block uppercase flex items-center">
                            <Briefcase className="w-3.5 h-3.5 text-swiss-red mr-1" /> CONFIGURATION
                          </span>
                          <span className="font-sans font-black text-xl text-black block mt-1">
                            {selectedProperty.configuration}
                          </span>
                        </div>
                      </div>

                      {/* Possession Data block */}
                      <div>
                        <span className="font-mono text-[9px] text-gray-400 block uppercase flex items-center">
                          <Calendar className="w-3.5 h-3.5 text-swiss-red mr-1" /> POSSESSION STATUS
                        </span>
                        <span className="font-sans font-black text-lg text-black block mt-1">
                          {selectedProperty.possessionDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Registered Acquisition Agent */}
                  {selectedAgent && (
                    <div className="border-2 border-black p-6 bg-white select-none">
                      <span className="font-mono text-[10px] text-swiss-red tracking-widest block uppercase mb-4">
                        ASSIGNED ACQUISITIONS OFFICER
                      </span>
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-16 h-16 border-2 border-black flex-shrink-0 bg-swiss-muted overflow-hidden">
                          <img 
                            src={selectedAgent.image} 
                            alt={selectedAgent.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover grayscale"
                          />
                        </div>
                        <div>
                          <h4 className="font-sans font-black text-base tracking-tight text-black">
                            {selectedAgent.name}
                          </h4>
                          <span className="font-mono text-[9px] text-gray-500 uppercase block mb-2">
                            {selectedAgent.role}
                          </span>
                          <div className="space-y-1">
                            <a href={`tel:${selectedAgent.phone}`} className="font-mono text-[10px] text-black hover:text-swiss-red block flex items-center">
                              <Phone className="w-3 h-3 mr-1 text-swiss-red" /> {selectedAgent.phone}
                            </a>
                            <a href={`mailto:${selectedAgent.email}`} className="font-mono text-[10px] text-black hover:text-swiss-red block flex items-center">
                              <Mail className="w-3 h-3 mr-1 text-swiss-red" /> {selectedAgent.email}
                            </a>
                          </div>
                        </div>
                      </div>
                      <p className="font-sans text-[10px] text-gray-500 leading-relaxed uppercase border-t border-gray-100 pt-3">
                        {selectedAgent.bio}
                      </p>
                    </div>
                  )}

                  {/* Enquiry Form */}
                  <EnquiryForm 
                    propertyId={selectedProperty.id} 
                    propertyName={selectedProperty.title} 
                  />

                </div>

              </div>

              {/* Similar Properties strip */}
              {similarProperties.length > 0 && (
                <div className="mt-20 border-t-4 border-black pt-16">
                  <div className="flex items-center justify-between mb-12 select-none">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs font-black text-swiss-red tracking-widest uppercase">
                        04. RELATED
                      </span>
                      <span className="w-1.5 h-1.5 bg-black"></span>
                      <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">
                        SIMILAR CONFIGURATIONS
                      </span>
                    </div>
                    <h3 className="font-sans font-black text-2xl tracking-tighter uppercase">
                      SIMILAR REGISTRIES
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {similarProperties.map((p) => (
                      <PropertyCard 
                        key={p.id} 
                        property={p} 
                        onClick={handlePropertyClick} 
                      />
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          )}

          {/* ABOUT VIEW */}
          {currentView === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 w-full"
            >
              {/* Header Title block */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 select-none">
                <div className="lg:col-span-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="font-mono text-xs font-black text-swiss-red tracking-widest uppercase">
                      03. AGENCY
                    </span>
                    <span className="w-1.5 h-1.5 bg-black"></span>
                    <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">
                      ABOUT SAI PROPERTIES
                    </span>
                  </div>
                  <h1 className="font-sans font-black text-5xl sm:text-6xl lg:text-8xl tracking-tighter uppercase leading-none">
                    THE STRUCTURE
                  </h1>
                </div>
                <div className="lg:col-span-4 lg:text-right">
                  <p className="font-sans text-xs text-gray-500 uppercase leading-relaxed">
                    AN OBJECTIVE PHYSICAL TRADING ENGINE SPECIALIZING IN HIGH-CONTRAST CONCRETE REALTY, SECURED TITLE DEEDS, AND ZERO GLOSS.
                  </p>
                </div>
              </div>

              {/* Asymmetric Core Narrative */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t-2 border-black pt-12 mb-20 select-none">
                <div className="lg:col-span-8 space-y-6">
                  <h2 className="font-sans font-black text-3xl tracking-tighter uppercase">
                    ESTABLISHED ON SYSTEMIC FIDELITY
                  </h2>
                  <p className="font-sans text-sm text-gray-700 leading-relaxed uppercase">
                    FOUNDED IN 2011, SAI PROPERTIES REJECTS THE EMOTIONAL DRAMA TRADITIONALLY INTEGRATED INTO REAL ESTATE SERVICES. WE DO NOT SELL "COZY HEAVENS" OR "DREAM HARBORS." WE FACILITATE PHYSICAL SPACE ALLOCATION CONSTRUCTED ON COMPLEMENTARY RECTANGULAR GRIDS, VERIFIED CORE CONCRETE THICKNESS, AND ABSOLUTE LEGAL VALIDITY.
                  </p>
                  <p className="font-sans text-sm text-gray-700 leading-relaxed uppercase">
                    OUR CLIENTS ARE CIVIL PROFESSIONALS, INVESTORS, CORPORATE INSTITUTIONS, AND HIGH-NET-WORTH FAMILY OFFICES WHO UNDERSTAND THAT CAPITAL RESILIENCE IS COMMITTED BY STRATEGIC ARCHITECTURAL FORM AND INVIOLABLE PAPERS—NOT BY STAGE LIGHTING OR ADJECTIVES.
                  </p>
                </div>

                <div className="lg:col-span-4 bg-swiss-muted p-8 border-2 border-black relative">
                  <div className="absolute inset-0 swiss-diagonal opacity-60"></div>
                  <div className="relative z-10 space-y-4">
                    <span className="font-mono text-xs text-swiss-red tracking-widest block uppercase">
                      METRIC OBJECTS
                    </span>
                    <div className="space-y-2 text-xs font-sans font-bold">
                      <div className="flex justify-between border-b border-black/10 py-2">
                        <span>ESTABLISHED YEAR</span>
                        <span className="font-mono text-swiss-red">2011</span>
                      </div>
                      <div className="flex justify-between border-b border-black/10 py-2">
                        <span>TITLES REGISTERED</span>
                        <span className="font-mono text-swiss-red">100% CLEAR</span>
                      </div>
                      <div className="flex justify-between border-b border-black/10 py-2">
                        <span>CIVIL COMPLIANCE RATIO</span>
                        <span className="font-mono text-swiss-red">1.0 / 1.0</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span>MARKET VALUATION</span>
                        <span className="font-mono text-swiss-red">₹25 BILLION+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Numbered milestones timeline */}
              <div className="mb-20 border-t-4 border-black pt-16 select-none">
                <div className="mb-12">
                  <span className="font-mono text-xs text-swiss-red tracking-widest block uppercase mb-2">03B. HISTORIC TIMELINE</span>
                  <h2 className="font-sans font-black text-3xl tracking-tighter uppercase">PORTFOLIO EVOLUTION</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {milestones.map((m, i) => (
                    <div key={i} className="border-2 border-black p-6 bg-white flex flex-col justify-between hover:border-swiss-red transition-colors">
                      <div>
                        <span className="font-sans font-black text-3xl text-swiss-red block mb-4">
                          {m.year}
                        </span>
                        <h3 className="font-sans font-black text-base tracking-tight uppercase mb-3 text-black">
                          {m.title}
                        </h3>
                        <p className="font-sans text-[11px] text-gray-500 leading-relaxed uppercase">
                          {m.description}
                        </p>
                      </div>
                      <span className="font-mono text-[9px] text-gray-300 tracking-widest block mt-8">
                        STAGE 0{i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agent Grid */}
              <div className="border-t-4 border-black pt-16 select-none">
                <div className="mb-12">
                  <span className="font-mono text-xs text-swiss-red tracking-widest block uppercase mb-2">03C. COMPOSITION</span>
                  <h2 className="font-sans font-black text-3xl tracking-tighter uppercase">ACQUISITION OFFICERS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {agents.map((agent) => (
                    <div key={agent.id} className="border-2 border-black bg-white flex flex-col h-full group hover:border-swiss-red transition-all hover:shadow-[4px_4px_0_0_#000000]">
                      <div className="aspect-square bg-swiss-muted border-b-2 border-black overflow-hidden relative">
                        {/* Dot Matrix overlay */}
                        <div className="absolute inset-0 swiss-dots opacity-25"></div>
                        <img 
                          src={agent.image} 
                          alt={agent.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
                        />
                      </div>
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-mono text-[10px] text-swiss-red tracking-widest uppercase">
                              ID: {agent.id}
                            </span>
                            <span className="w-1.5 h-1.5 bg-black"></span>
                          </div>
                          <h3 className="font-sans font-black text-lg tracking-tight text-black uppercase mb-1">
                            {agent.name}
                          </h3>
                          <span className="font-mono text-[9px] text-gray-500 uppercase block mb-4">
                            {agent.role}
                          </span>
                          <p className="font-sans text-[11px] text-gray-600 leading-relaxed uppercase">
                            {agent.bio}
                          </p>
                        </div>

                        <div className="mt-8 pt-4 border-t border-gray-100 space-y-1">
                          <a href={`tel:${agent.phone}`} className="font-mono text-[10px] text-black hover:text-swiss-red block flex items-center">
                            <Phone className="w-3.5 h-3.5 mr-2 text-swiss-red" /> {agent.phone}
                          </a>
                          <a href={`mailto:${agent.email}`} className="font-mono text-[10px] text-black hover:text-swiss-red block flex items-center">
                            <Mail className="w-3.5 h-3.5 mr-2 text-swiss-red" /> {agent.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* CONTACT VIEW */}
          {currentView === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 w-full"
            >
              {/* Title Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 select-none">
                <div className="lg:col-span-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="font-mono text-xs font-black text-swiss-red tracking-widest uppercase">
                      04. CHANNELS
                    </span>
                    <span className="w-1.5 h-1.5 bg-black"></span>
                    <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">
                      CONTACT & ENQUIRY
                    </span>
                  </div>
                  <h1 className="font-sans font-black text-5xl sm:text-6xl lg:text-8xl tracking-tighter uppercase leading-none">
                    TRANSMISSION
                  </h1>
                </div>
                <div className="lg:col-span-4 lg:text-right">
                  <p className="font-sans text-xs text-gray-500 uppercase leading-relaxed">
                    REGISTER DIRECT INQUIRIES OR SCHEDULE METROPOLITAN ACQUISITIONS TOURS IMMEDIATELY WITH OUR CHIEF OFFICERS.
                  </p>
                </div>
              </div>

              {/* Grid split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Side: Offices Info and Coordinates */}
                <div className="lg:col-span-5 space-y-12 select-none">
                  
                  {/* HQ Pune Section */}
                  <div>
                    <span className="font-mono text-xs text-swiss-red tracking-widest block uppercase mb-3">
                      HQ DIVISION / PUNE
                    </span>
                    <h3 className="font-sans font-black text-2xl tracking-tighter uppercase mb-2">
                      KOREGAON PARK HQ
                    </h3>
                    <p className="font-sans text-xs text-gray-600 leading-relaxed uppercase mb-4">
                      SUITE 801, THE GRID PLATE, LANE 5, KOREGAON PARK, PUNE - 411001
                    </p>
                    <div className="font-mono text-xs space-y-1">
                      <span className="block text-gray-500">T: +91 98200 12345</span>
                      <span className="block text-gray-500">E: PUNE@SAIPROPERTIES.COM</span>
                      <span className="block text-swiss-red">COORDINATES: 18.5362° N, 73.8940° E</span>
                    </div>
                  </div>

                  {/* Mumbai Division */}
                  <div>
                    <span className="font-mono text-xs text-swiss-red tracking-widest block uppercase mb-3">
                      BRANCH DIVISION / MUMBAI
                    </span>
                    <h3 className="font-sans font-black text-2xl tracking-tighter uppercase mb-2">
                      BANDRA KURLA COMPLEX
                    </h3>
                    <p className="font-sans text-xs text-gray-600 leading-relaxed uppercase mb-4">
                      LEVEL 12, CAPITAL TOWER C, G-BLOCK, BKC, MUMBAI - 400051
                    </p>
                    <div className="font-mono text-xs space-y-1">
                      <span className="block text-gray-500">T: +91 98200 67890</span>
                      <span className="block text-gray-500">E: MUMBAI@SAIPROPERTIES.COM</span>
                      <span className="block text-swiss-red">COORDINATES: 19.0596° N, 72.8682° E</span>
                    </div>
                  </div>

                  {/* Bangalore Division */}
                  <div>
                    <span className="font-mono text-xs text-swiss-red tracking-widest block uppercase mb-3">
                      BRANCH DIVISION / BANGALORE
                    </span>
                    <h3 className="font-sans font-black text-2xl tracking-tighter uppercase mb-2">
                      INDIRANAGAR
                    </h3>
                    <p className="font-sans text-xs text-gray-600 leading-relaxed uppercase mb-4">
                      UNIT 4A, MODULOR SQUARE, 100 FEET ROAD, INDIRANAGAR, BANGALORE - 560038
                    </p>
                    <div className="font-mono text-xs space-y-1">
                      <span className="block text-gray-500">T: +91 98200 54321</span>
                      <span className="block text-gray-500">E: BLR@SAIPROPERTIES.COM</span>
                      <span className="block text-swiss-red">COORDINATES: 12.9719° N, 77.5946° E</span>
                    </div>
                  </div>

                  {/* Swiss styled graphic coordinate card map representation */}
                  <div className="border-4 border-black p-6 bg-swiss-muted relative select-none">
                    <div className="absolute inset-0 swiss-grid-pattern opacity-60"></div>
                    <div className="relative z-10 flex flex-col justify-between min-h-[160px]">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[10px] text-swiss-red tracking-widest">
                          GRID SCHEMATIC MAP v1.2
                        </span>
                        <Compass className="w-8 h-8 text-black animate-[spin_30s_linear_infinite]" />
                      </div>
                      
                      {/* Geometric lines map placeholder */}
                      <div className="my-4 border border-black h-20 bg-white relative overflow-hidden flex items-center justify-center">
                        <div className="absolute top-0 bottom-0 left-1/3 w-0.5 bg-black/10"></div>
                        <div className="absolute top-0 bottom-0 left-2/3 w-0.5 bg-black/10"></div>
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-black/10"></div>
                        
                        {/* Bold axis line */}
                        <div className="absolute left-0 right-0 top-1/3 h-1 bg-swiss-red/25"></div>
                        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-black/25"></div>
                        
                        {/* Dot labels */}
                        <span className="absolute top-4 left-6 w-3 h-3 bg-black rounded-full border border-white"></span>
                        <span className="absolute bottom-4 right-12 w-3 h-3 bg-swiss-red rounded-full border border-white"></span>
                        
                        <span className="font-mono text-[8px] absolute top-1.5 left-10">KP-HQ</span>
                        <span className="font-mono text-[8px] absolute bottom-1.5 right-16 text-swiss-red">BKC-BRANCH</span>
                      </div>

                      <div className="flex justify-between items-end text-[9px] font-mono text-gray-500 uppercase">
                        <span>MAP SCALE: 1 : 25,000</span>
                        <span>GRID SYSTEM MERCATOR</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Side: Large Enquiry form */}
                <div className="lg:col-span-7">
                  <EnquiryForm />
                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Journal Post Detail modal overlay */}
      <AnimatePresence>
        {activeJournalPost && (
          <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-end"
            id="journal-post-modal-overlay"
          >
            {/* Dark background close click target */}
            <div 
              onClick={() => setActiveJournalPost(null)}
              className="absolute inset-0 cursor-pointer"
            ></div>

            {/* Sidebar drawer in absolute Swiss style */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="relative w-full max-w-2xl h-full bg-white border-l-4 border-black p-8 md:p-12 overflow-y-auto flex flex-col justify-between select-none z-10"
              id="journal-post-modal-drawer"
            >
              <div>
                <div className="flex items-center justify-between border-b border-black pb-6 mb-8">
                  <span className="font-mono text-xs font-black text-swiss-red uppercase tracking-widest">
                    JOURNAL PAPER: {activeJournalPost.category}
                  </span>
                  <button 
                    onClick={() => setActiveJournalPost(null)}
                    className="font-sans font-black text-xs tracking-widest hover:text-swiss-red uppercase"
                  >
                    [ CLOSE ]
                  </button>
                </div>

                <span className="font-mono text-xs text-gray-400 block mb-2">
                  PUBLISHED PROTOCOL DATE: {activeJournalPost.date} • {activeJournalPost.readTime} READ
                </span>
                
                <h2 className="font-sans font-black text-3xl sm:text-4xl tracking-tighter uppercase leading-none mb-6">
                  {activeJournalPost.title}
                </h2>

                <p className="font-sans font-bold text-sm text-swiss-red leading-relaxed uppercase mb-8">
                  {activeJournalPost.summary}
                </p>

                <div className="border-t-2 border-black pt-6 font-sans text-xs sm:text-sm text-gray-700 leading-relaxed uppercase space-y-6">
                  <p>{activeJournalPost.content}</p>
                  <p>
                    IN THE RETROSPECTIVE MATRIX OF PHYSICAL REALTY, EXTREME GEOMETRIES ARE NOT MERELY AN AESTHETIC COMPOSITION BUT A PRIMARY METHODOLOGY FOR OPTIMIZING CAPITAL EXPOSURE. WHEN SPATIAL FORMS ALIGN PRECELY TO RECTANGULAR GRID SYSTEMS, BOTH WASTED INTERNAL DENSITIES AND CONSTRUCTION DEFECT RATIOS RECEDE TOWARDS STRUCTURAL ZERO.
                  </p>
                  <p>
                    WE THEREFORE CONCLUDE THAT THE MODERNIST PROJECT COMPORTS DIRECTLY WITH STRATEGIC ECONOMIC PRESERVATION, COMMITTING OUTSIZED TRANSACTION VALUE STABILITY COMPARED TO HIGHLY ORNAMENTED OR STYLIZED POPULAR DEVELOPMENTS IN ADJACENT MARKETS.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-400 uppercase">
                <span>SAI REAL ESTATE RESEARCH DEPT</span>
                <span className="mt-2 sm:mt-0 text-swiss-red">METRIC CODE VERIFIED</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer component */}
      <Footer 
        setView={setView}
        onClearSelectedProperty={handleClearSelectedProperty}
      />
    </div>
  );
}
