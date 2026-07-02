/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface EnquiryFormProps {
  propertyId?: string;
  propertyName?: string;
}

export default function EnquiryForm({ propertyId, propertyName }: EnquiryFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState<'VISIT' | 'INFO' | 'CALLBACK'>('INFO');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate API registration
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setType('INFO');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="bg-white border-4 border-black p-8 md:p-12 relative select-none" id="enquiry-form-container">
      
      {/* Background Dots Accent for aesthetic depth */}
      <div className="absolute top-0 right-0 w-24 h-24 swiss-dots opacity-40 z-0"></div>

      <div className="relative z-10">
        <span className="font-mono text-xs text-swiss-red tracking-widest block mb-2">04. APPLICATION SHEET</span>
        <h3 className="font-sans font-black text-3xl tracking-tighter uppercase mb-2">
          {propertyName ? `ENQUIRE: ${propertyName}` : 'TRANSACTION REQUISITION'}
        </h3>
        <p className="font-sans text-xs text-gray-500 uppercase tracking-wider mb-8">
          {propertyId 
            ? `REGISTRATION ASSIGNED TO SPECIFICATION BLOCK ID: ${propertyId}`
            : 'SUBMIT VERIFIED CLIENT DETAILS FOR IMMEDIATE PORTFOLIO ALLOCATION.'}
        </p>

        {submitted ? (
          <div className="bg-swiss-muted border-2 border-black p-8 text-center flex flex-col items-center justify-center space-y-4 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-swiss-red" />
            <h4 className="font-sans font-black text-xl tracking-tighter uppercase text-black">
              SUBMISSION COMPLETED
            </h4>
            <p className="font-sans text-xs text-gray-600 max-w-sm uppercase leading-relaxed">
              YOUR TRANSACTION PROTOCOL ID IS <span className="font-mono font-black text-black">SAI-TX-{Math.floor(100000 + Math.random() * 900000)}</span>. THE ASSIGNED REGISTERED ACQUISITION AGENT WILL TELEPHONE YOU WITHIN 120 METROPOLITAN MINUTES.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Enquiry Type Selector Grid */}
            <div>
              <span className="font-mono text-[10px] text-gray-500 tracking-widest block uppercase mb-3">
                REQUEST TYPE DIRECTIVE
              </span>
              <div className="grid grid-cols-3 border-2 border-black divide-x-2 divide-black">
                {(['VISIT', 'INFO', 'CALLBACK'] as const).map((t) => {
                  const isActive = type === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`py-3 px-2 text-center font-sans font-bold text-[10px] md:text-xs tracking-widest transition-colors duration-150 rounded-none ${isActive ? 'bg-black text-white' : 'bg-white text-black hover:bg-swiss-muted'}`}
                      id={`enquiry-type-${t.toLowerCase()}`}
                    >
                      {t === 'VISIT' ? 'SCHEDULE VISIT' : t === 'INFO' ? 'GET SPEC SHEET' : 'CALLBACK'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input fields in classic Underlined Style */}
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="FULL NAME"
                  className="w-full bg-transparent border-b-2 border-black focus:border-swiss-red focus:outline-none py-3 text-xs font-sans font-bold uppercase tracking-wider placeholder-gray-400"
                  id="enquiry-input-name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL ADDRESS"
                    className="w-full bg-transparent border-b-2 border-black focus:border-swiss-red focus:outline-none py-3 text-xs font-sans font-bold uppercase tracking-wider placeholder-gray-400"
                    id="enquiry-input-email"
                  />
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="TELEPHONE (10 DIGITS)"
                    pattern="[0-9]{10}"
                    className="w-full bg-transparent border-b-2 border-black focus:border-swiss-red focus:outline-none py-3 text-xs font-sans font-bold uppercase tracking-wider placeholder-gray-400"
                    id="enquiry-input-phone"
                  />
                </div>
              </div>

              <div className="relative">
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="SPECIFIC INQUIRY OR TRANSACTION NOTES"
                  className="w-full bg-transparent border-b-2 border-black focus:border-swiss-red focus:outline-none py-3 text-xs font-sans font-bold uppercase tracking-wider placeholder-gray-400 resize-none"
                  id="enquiry-input-message"
                />
              </div>
            </div>

            {/* Legal compliance checkbox */}
            <div className="flex items-start space-x-3 bg-swiss-muted p-4 border border-black/10">
              <input
                type="checkbox"
                required
                id="legal-compliance-checkbox"
                className="mt-0.5 w-4 h-4 text-swiss-red accent-swiss-red border-2 border-black rounded-none cursor-pointer"
              />
              <label htmlFor="legal-compliance-checkbox" className="font-mono text-[9px] text-gray-500 tracking-wide uppercase leading-normal cursor-pointer select-none">
                I VERIFY THAT THE SUBMITTED PARTICULARS ARE TRUE AND LEGALLY ACCURATE. I AUTHORIZE SAI PROPERTIES TO INITIATE REQUISITION VERIFICATION LOGS ACCORDING TO STATE DATA COMPLIANCE CODES.
              </label>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              className="w-full bg-black text-white hover:bg-swiss-red h-16 flex items-center justify-center font-sans font-black text-sm tracking-widest transition-colors duration-150 rounded-none border-2 border-black group uppercase"
              id="enquiry-submit-button"
            >
              TRANSMIT REQUEST PROTOCOL
              <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
