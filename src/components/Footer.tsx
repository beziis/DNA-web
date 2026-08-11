import React from 'react';
import { PageType } from '../types';
import { companyProfile } from '../data';
import { 
  Mail, Phone, MapPin, Linkedin, Send, 
  Instagram, Facebook, Globe
} from 'lucide-react';
import { motion } from 'motion/react';
import { LogoIcon } from './Logo';

interface FooterProps {
  currentView: PageType;
  setView: (view: PageType) => void;
}

export default function Footer({ currentView, setView }: FooterProps) {
  
  const handleNavClick = (view: PageType) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { label: string; view: PageType }[] = [
    { label: "Home", view: "home" },
    { label: "About", view: "about" },
    { label: "Services", view: "services" },
    { label: "Solutions", view: "solutions" },
    { label: "Contact", view: "contact" }
  ];

  const servicesList = [
    "Market Research",
    "Data Collection",
    "Data Analytics",
    "Dashboard Development",
    "AI Solutions",
    "Software Development"
  ];

  return (
    <footer className="bg-[#0B2545] text-white/90 border-t border-white/15 font-sans pt-16 pb-12 relative overflow-hidden">
      {/* Background Section Glows in #0B2545 */}
      <div className="absolute top-0 right-0 w-[600px] h-[350px] bg-[#0B2545] rounded-full blur-xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-[#0B2545] rounded-full blur-xl opacity-20 pointer-events-none" />

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Top Border Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div 
              className="inline-flex items-center space-x-3 cursor-pointer group" 
              onClick={() => handleNavClick("home")}
            >
              <div className="w-10 h-10 rounded-[12px] bg-white text-[#0B2442] p-2 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <LogoIcon className="w-full h-full" />
              </div>
              <span className="font-sans text-lg font-extrabold tracking-tight text-white">
                DNA <span className="font-sans font-extrabold text-white">TECH</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              DNA TECH helps organizations transform data into actionable insights through research, analytics, AI-powered solutions, and technology innovation.
            </p>

            {/* Social icons */}
            <div className="flex items-center space-x-2.5 pt-1">
              {[
                { icon: Linkedin, href: companyProfile.socials.linkedin, title: "LinkedIn" },
                { icon: Send, href: companyProfile.socials.telegram, title: "Telegram" },
                { icon: Instagram, href: companyProfile.socials.instagram, title: "Instagram" },
                { icon: Facebook, href: companyProfile.socials.facebook, title: "Facebook" }
              ].map((soc, idx) => {
                const IconComponent = soc.icon;
                return (
                  <motion.a 
                    key={idx}
                    href={soc.href} 
                    target="_blank" 
                    rel="noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-[12px] bg-white/5 border border-white/15 hover:border-white text-white/70 hover:text-[#0B2442] hover:bg-white flex items-center justify-center transition-all shadow-sm"
                    title={soc.title}
                  >
                    <IconComponent className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => handleNavClick(link.view)}
                    className={`transition-all duration-200 cursor-pointer text-left py-0.5 inline-flex items-center space-x-1.5 ${
                      currentView === link.view 
                        ? 'text-white font-bold underline decoration-white decoration-2 underline-offset-4' 
                        : 'text-white/70 hover:text-white hover:translate-x-1'
                    }`}
                  >
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/70">
              {servicesList.map((srv, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="hover:text-white transition-colors cursor-pointer text-left py-0.5"
                  >
                    {srv}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-3 space-y-4 text-left text-xs sm:text-sm">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">
              Contact Us
            </h4>
            
            <div className="space-y-3 text-white/70 leading-relaxed">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                <span className="text-xs">{companyProfile.address}</span>
              </div>
              <div className="flex items-center space-x-3 border-t border-white/5 pt-2">
                <Phone className="w-4 h-4 text-white flex-shrink-0" />
                <a href={`tel:${companyProfile.phone}`} className="font-mono text-xs text-white hover:underline transition-colors">{companyProfile.phone}</a>
              </div>
              <div className="flex items-center space-x-3 border-t border-white/5 pt-2">
                <Mail className="w-4 h-4 text-white flex-shrink-0" />
                <a href={`mailto:${companyProfile.email}`} className="font-mono text-xs lowercase text-white hover:underline">{companyProfile.email}</a>
              </div>
              <div className="flex items-center space-x-3 border-t border-white/5 pt-2">
                <Globe className="w-4 h-4 text-white flex-shrink-0" />
                <a href={companyProfile.website.startsWith('http') ? companyProfile.website : `https://${companyProfile.website}`} target="_blank" rel="noreferrer" className="font-mono text-xs text-white hover:underline">
                  {companyProfile.website}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-white/50">
          <div>
            &copy; 2026 DNA TECH. All Rights Reserved.
          </div>
          <div>
            Data Neutral Analysis Technology // Addis Ababa, Ethiopia
          </div>
        </div>

      </div>
    </footer>
  );
}
