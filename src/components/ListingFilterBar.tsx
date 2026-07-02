/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, SlidersHorizontal, ArrowDownWideNarrow } from 'lucide-react';
import { PropertyType, PropertyStatus } from '../types';

interface ListingFilterBarProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedConfig: string;
  setSelectedConfig: (config: string) => void;
  minPrice: string;
  setMinPrice: (price: string) => void;
  maxPrice: string;
  setMaxPrice: (price: string) => void;
  onReset: () => void;
  totalCount: number;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export default function ListingFilterBar({
  selectedType,
  setSelectedType,
  selectedStatus,
  setSelectedStatus,
  selectedCity,
  setSelectedCity,
  selectedConfig,
  setSelectedConfig,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onReset,
  totalCount,
  sortBy,
  setSortBy,
}: ListingFilterBarProps) {
  const types: { value: string; label: string }[] = [
    { value: 'ALL', label: 'ALL TYPES' },
    { value: 'RESIDENTIAL', label: 'RESIDENTIAL' },
    { value: 'COMMERCIAL', label: 'COMMERCIAL' },
    { value: 'PLOT', label: 'PLOT / LAND' },
    { value: 'RENTAL', label: 'RENTALS' },
  ];

  const statuses: { value: string; label: string }[] = [
    { value: 'ALL', label: 'ALL STATUS' },
    { value: 'FOR_SALE', label: 'FOR SALE' },
    { value: 'FOR_RENT', label: 'FOR RENT' },
    { value: 'SOLD', label: 'SOLD' },
  ];

  const configs = [
    { value: 'ALL', label: 'ALL CONFIGS' },
    { value: '2 BHK', label: '2 BHK' },
    { value: '3 BHK', label: '3 BHK' },
    { value: '4 BHK', label: '4 BHK' },
    { value: 'PENTHOUSE', label: 'PENTHOUSE' },
    { value: 'OFFICE', label: 'COMMERCIAL OFFICE' },
  ];

  const cities = [
    { value: 'ALL', label: 'ALL CITIES' },
    { value: 'PUNE', label: 'PUNE' },
    { value: 'MUMBAI', label: 'MUMBAI' },
    { value: 'BANGALORE', label: 'BANGALORE' },
  ];

  return (
    <div className="bg-white border-4 border-black select-none" id="listing-filter-bar">
      
      {/* Segmented Type Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-b-2 border-black divide-x-2 divide-black">
        {types.map((t) => {
          const isActive = selectedType === t.value;
          return (
            <button
              key={t.value}
              onClick={() => setSelectedType(t.value)}
              className={`py-4 px-3 font-sans font-black text-xs tracking-widest text-center transition-colors duration-150 rounded-none first:border-l-0 ${isActive ? 'bg-black text-white' : 'bg-white text-black hover:bg-swiss-muted'}`}
              id={`filter-type-${t.value.toLowerCase()}`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Main Filter Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black bg-white">
        
        {/* City Filter */}
        <div className="lg:col-span-3 p-4 flex flex-col justify-center">
          <label className="font-mono text-[9px] text-swiss-red tracking-widest uppercase mb-1 block">
            LOCATION / REGION
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full bg-white border-2 border-black h-10 px-3 text-xs font-sans font-black tracking-wider uppercase focus:border-swiss-red focus:outline-none rounded-none"
            id="filter-select-city"
          >
            {cities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="lg:col-span-3 p-4 flex flex-col justify-center">
          <label className="font-mono text-[9px] text-swiss-red tracking-widest uppercase mb-1 block">
            TRANSACTION STATUS
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-white border-2 border-black h-10 px-3 text-xs font-sans font-black tracking-wider uppercase focus:border-swiss-red focus:outline-none rounded-none"
            id="filter-select-status"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Config Filter */}
        <div className="lg:col-span-3 p-4 flex flex-col justify-center">
          <label className="font-mono text-[9px] text-swiss-red tracking-widest uppercase mb-1 block">
            UNIT CONFIGURATION
          </label>
          <select
            value={selectedConfig}
            onChange={(e) => setSelectedConfig(e.target.value)}
            className="w-full bg-white border-2 border-black h-10 px-3 text-xs font-sans font-black tracking-wider uppercase focus:border-swiss-red focus:outline-none rounded-none"
            id="filter-select-config"
          >
            {configs.map((config) => (
              <option key={config.value} value={config.value}>
                {config.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Inputs */}
        <div className="lg:col-span-3 p-4 flex flex-col justify-center">
          <label className="font-mono text-[9px] text-swiss-red tracking-widest uppercase mb-1 block">
            PRICE LIMITS (INR)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="MIN INR"
              className="bg-transparent border-b-2 border-black py-1 text-xs font-sans font-bold uppercase tracking-wider focus:border-swiss-red focus:outline-none text-center"
              id="filter-input-minprice"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="MAX INR"
              className="bg-transparent border-b-2 border-black py-1 text-xs font-sans font-bold uppercase tracking-wider focus:border-swiss-red focus:outline-none text-center"
              id="filter-input-maxprice"
            />
          </div>
        </div>

      </div>

      {/* Result Metrics & Sort Banner */}
      <div className="border-t-2 border-black px-6 py-4 flex flex-col sm:flex-row items-center justify-between bg-swiss-muted/60 text-xs font-mono tracking-widest">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <span className="w-2.5 h-2.5 bg-swiss-red"></span>
          <span className="font-bold text-black uppercase">
            {totalCount} PROPERTIES REGISTERED IN FILTER SET
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Reset Filters Trigger */}
          {(selectedType !== 'ALL' || selectedStatus !== 'ALL' || selectedCity !== 'ALL' || selectedConfig !== 'ALL' || minPrice !== '' || maxPrice !== '') && (
            <button
              onClick={onReset}
              className="flex items-center space-x-1 hover:text-swiss-red transition-colors text-black font-black uppercase text-[10px]"
              id="filter-reset-button"
            >
              <X className="w-3.5 h-3.5" />
              <span>RESET FILTER SHEETS</span>
            </button>
          )}

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <ArrowDownWideNarrow className="w-4 h-4 text-black" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-sans font-black tracking-wider text-xs uppercase focus:outline-none focus:text-swiss-red cursor-pointer border border-black/10 px-2 py-1"
              id="filter-select-sort"
            >
              <option value="DEFAULT">DEFAULT SORT</option>
              <option value="PRICE_ASC">PRICE: LOW TO HIGH</option>
              <option value="PRICE_DESC">PRICE: HIGH TO LOW</option>
              <option value="AREA_DESC">AREA: LARGE FIRST</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  );
}
