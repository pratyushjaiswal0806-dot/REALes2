/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setView: (view: string) => void;
  onClearSelectedProperty: () => void;
}

const expoOut = [0.16, 1, 0.3, 1] as const;

export default function Footer({ setView, onClearSelectedProperty }: FooterProps) {
  const handleFooterNav = (viewId: string) => {
    if (viewId === 'listings') {
      onClearSelectedProperty();
    }
    setView(viewId);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: expoOut }}
      className="bg-white border-t-4 border-black text-black select-none"
      id="footer-section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-black">
        {/* Brand Col */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: expoOut }}
          className="lg:col-span-8 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-black flex flex-col justify-between"
        >
          <div>
            <div className="font-sans font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-black mb-4">
              SAI PROPERTIES
            </div>
            <p className="font-sans font-medium text-sm text-gray-700 max-w-lg tracking-wide leading-relaxed uppercase">
              REDEFINING REAL ESTATE INTEGRITY THROUGH THE DISCIPLINE OF OBJECTIVE STANDARDS, RIGOROUS PHYSICAL VERIFICATION, AND ASYMMETRIC GRID PLANNING.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-gray-200">
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
        </motion.div>

        {/* Navigation Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: expoOut }}
          className="lg:col-span-4 p-8 md:p-12 flex flex-col bg-swiss-muted swiss-grid-pattern"
        >
          <span className="font-mono text-xs text-swiss-red tracking-widest mb-6 block">01. DIRECTORY</span>
          <div className="flex flex-col space-y-4">
            {[
              { id: 'home', label: 'HOME ARCHIVE' },
              { id: 'listings', label: 'PROPERTY INDEX' },
              { id: 'about', label: 'ABOUT AGENCY' },
              { id: 'contact', label: 'CONTACT & INQUIRY' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleFooterNav(item.id)}
                className="text-left font-sans font-bold text-sm tracking-wider hover:text-swiss-red transition-colors w-max uppercase group flex items-center"
              >
                {item.label}
                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </button>
            ))}
          </div>
        </motion.div>
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
          <span className="w-2 h-2 bg-swiss-red ml-2 inline-block animate-status-blink"></span>
        </div>
      </div>
    </motion.footer>
  );
}
