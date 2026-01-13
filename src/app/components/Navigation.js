"use client";
import { useState } from 'react';

export default function Navigation({ scrollY, scrollToSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-black/90 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="/logo.png"
            alt="MunTech"
            className="h-14 w-auto object-contain 
                      mix-blend-lighten 
                      contrast-125 
                      brightness-110"
          />

          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-500 bg-clip-text text-transparent animate-gradient">
            muntech
          </span>
        </div>


        
        <div className="hidden md:flex items-center gap-8">
          {['home', 'services', 'about', 'contact'].map((section, i) => (
            <button 
              key={i}
              onClick={() => scrollToSection(section)} 
              className={`${section === 'contact' ? 'relative px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-600 overflow-hidden group' : 'text-gray-300 hover:text-white transition-all duration-300 relative group'}`}
            >
              <span className="relative z-10">
                {section === 'home' ? 'Ana Sayfa' : section === 'services' ? 'Hizmetler' : section === 'about' ? 'Hakkımızda' : 'İletişim'}
              </span>
              {section !== 'contact' && <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>}
              {section === 'contact' && <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white transition-transform duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      <div className={`md:hidden bg-black/95 backdrop-blur-xl border-t border-gray-800/50 transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-6 py-4 space-y-4">
          {['home', 'services', 'about'].map((section, i) => (
            <button 
              key={i}
              onClick={() => { scrollToSection(section); setIsMenuOpen(false); }} 
              className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
            >
              {section === 'home' ? 'Ana Sayfa' : section === 'services' ? 'Hizmetler' : 'Hakkımızda'}
            </button>
          ))}
          <button 
            onClick={() => { scrollToSection('contact'); setIsMenuOpen(false); }} 
            className="block w-full text-left px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-600 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
          >
            İletişim
          </button>
        </div>
      </div>
    </nav>
  );
}