/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onClick: (propertyId: string) => void;
}

export function formatPrice(price: number, status: string): string {
  if (status === 'FOR_RENT' && price < 1000000) {
    return `₹${(price / 100000).toFixed(2)} L/Mo`;
  }
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else {
    return `₹${(price / 100000).toFixed(2)} L`;
  }
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  const { id, title, location, price, areaSqFt, configuration, status, type, images } = property;
  const displayPrice = formatPrice(price, status);

  // Status Badge styles
  const getStatusBadge = () => {
    switch (status) {
      case 'SOLD':
        return (
          <span className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-[10px] font-sans font-black tracking-widest z-10 border border-white">
            SOLD OUT
          </span>
        );
      case 'FOR_RENT':
        return (
          <span className="absolute top-4 right-4 bg-swiss-red text-white px-3 py-1 text-[10px] font-sans font-black tracking-widest z-10 border border-white">
            FOR RENT
          </span>
        );
      case 'FOR_SALE':
      default:
        return (
          <span className="absolute top-4 right-4 bg-swiss-red text-white px-3 py-1 text-[10px] font-sans font-black tracking-widest z-10 border border-white">
            FOR SALE
          </span>
        );
    }
  };

  return (
    <article 
      onClick={() => onClick(id)}
      className="bg-white border-2 border-black rounded-none flex flex-col h-full cursor-pointer hover:-translate-y-px hover:border-swiss-red hover:shadow-[0_4px_0_0_#FF3000] active:translate-y-0 transition-all duration-100 ease-out select-none group"
      id={`property-card-${id}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[3/2] border-b-2 border-black bg-swiss-muted">
        {getStatusBadge()}
        <span className="absolute top-4 left-4 bg-white/90 text-black border border-black px-2 py-0.5 text-[9px] font-mono tracking-widest z-10 uppercase">
          {type}
        </span>
        
        {/* Underlay Grid Pattern visible on slow-loading images */}
        <div className="absolute inset-0 swiss-grid-pattern opacity-30"></div>
        
        <img 
          src={images[0]} 
          alt={`${configuration} in ${location}, Sai Properties ID ${id}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>

      {/* Details Area */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          {/* Header row with arrow indicator */}
          <div className="flex items-start justify-between mb-2">
            <span className="font-mono text-[10px] text-swiss-red tracking-widest uppercase">
              ID: {id}
            </span>
            <div className="bg-black text-white group-hover:bg-swiss-red p-1 transition-colors duration-150 rounded-none">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45" />
            </div>
          </div>

          <h3 className="font-sans font-black text-xl tracking-tighter text-black uppercase mb-1 leading-tight group-hover:text-swiss-red transition-colors duration-150">
            {title}
          </h3>
          
          <p className="font-sans font-bold text-xs tracking-wide text-gray-500 uppercase">
            {location}
          </p>
        </div>

        {/* Structured Spec Table Grid */}
        <div className="mt-6 border-t-2 border-black">
          <div className="grid grid-cols-3 text-center border-b border-black divide-x divide-black bg-swiss-muted/30">
            <div className="py-2.5 flex flex-col justify-center">
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">CONFIG</span>
              <span className="font-sans font-bold text-xs text-black uppercase tracking-tight truncate px-1">
                {configuration.split(' ')[0]} {configuration.split(' ')[1] || ''}
              </span>
            </div>
            <div className="py-2.5 flex flex-col justify-center">
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">AREA</span>
              <span className="font-sans font-bold text-xs text-black tracking-tight">
                {areaSqFt} SQFT
              </span>
            </div>
            <div className="py-2.5 flex flex-col justify-center">
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">PRICE</span>
              <span className="font-sans font-black text-xs text-swiss-red tracking-tighter">
                {displayPrice.split(' ')[0]}
              </span>
            </div>
          </div>
          
          <div className="py-2 flex items-center justify-between text-[10px] font-mono tracking-widest text-gray-400 bg-white">
            <span>UNIT SPECIFICATIONS VERIFIED</span>
            <span className="w-2 h-2 bg-black group-hover:bg-swiss-red transition-colors duration-150"></span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;
