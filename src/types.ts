/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PropertyType = 'RESIDENTIAL' | 'COMMERCIAL' | 'PLOT' | 'RENTAL';

export type PropertyStatus = 'FOR_SALE' | 'FOR_RENT' | 'SOLD';

export interface Agent {
  id: string;
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
  bio: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number;
  areaSqFt: number;
  configuration: string;
  status: PropertyStatus;
  type: PropertyType;
  possessionDate: string;
  description: string;
  images: string[];
  highlights: string[];
  specifications: Record<string, string>;
  agentId: string;
}

export interface Enquiry {
  id: string;
  propertyId?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'VISIT' | 'INFO' | 'CALLBACK';
  timestamp: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface JournalPost {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  content: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface StatsBlock {
  label: string;
  value: string;
  prefix: string;
}
