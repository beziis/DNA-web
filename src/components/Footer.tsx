import React from "react";
import { PageType } from "../types";
import { companyProfile } from "../data";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Send,
  Instagram,
  Facebook,
  Globe,
} from "lucide-react";
import { motion } from "motion/react";
import { LogoIcon } from "./Logo";

interface FooterProps {
  currentView: PageType;
  setView: (view: PageType) => void;
}

export default function Footer({
  currentView,
  setView,
}: FooterProps) {
  const handleNavClick = (view: PageType) => {
    setView(view);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navLinks: { label: string; view: PageType }[] = [
    { label: "Home", view: "home" },
    { label: "About", view: "about" },
    { label: "Services", view: "services" },
    { label: "Solutions", view: "solutions" },
    { label: "Contact", view: "contact" },
  ];

  const servicesList = [
    "Market Research",
    "Data Collection",
    "Data Analytics",
    "Dashboard Development",
    "AI Solutions",
    "Software Development",
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: companyProfile.socials.linkedin,
      title: "LinkedIn",
    },
    {
      icon: Send,
      href: companyProfile.socials.telegram,
      title: "Telegram",
    },
    {
      icon: Instagram,
      href: companyProfile.socials.instagram,
      title: "Instagram",
    },
    {
      icon: Facebook,
      href: companyProfile.socials.facebook,
      title: "Facebook",
    },
  ];

  return (
   <footer className="bg-[#020914] text-white/90 border-t border-white/15 font-sans pt-16 pb-12 relative overflow-hidden">

  {/* Network Background */}
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
    viewBox="0 0 1600 900"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    {/* Network lines */}
    <g
      stroke="rgba(255,255,255,0.18)"
      strokeWidth="1"
      fill="none"
    >
      <line x1="30" y1="730" x2="180" y2="610" />
      <line x1="180" y1="610" x2="330" y2="680" />
      <line x1="180" y1="610" x2="270" y2="470" />
      <line x1="270" y1="470" x2="430" y2="520" />
      <line x1="270" y1="470" x2="350" y2="350" />
      <line x1="350" y1="350" x2="500" y2="390" />

      <line x1="1120" y1="500" x2="1240" y2="430" />
      <line x1="1240" y1="430" x2="1370" y2="500" />
      <line x1="1240" y1="430" x2="1310" y2="300" />
      <line x1="1310" y1="300" x2="1450" y2="350" />
      <line x1="1370" y1="500" x2="1480" y2="600" />
      <line x1="1450" y1="350" x2="1570" y2="280" />

      <line x1="1000" y1="760" x2="1110" y2="650" />
      <line x1="1110" y1="650" x2="1240" y2="700" />
      <line x1="1110" y1="650" x2="1180" y2="540" />
    </g>

    {/* Network nodes */}
    <g fill="rgba(255,255,255,0.65)">
      <circle cx="30" cy="730" r="3" />
      <circle cx="180" cy="610" r="4" />
      <circle cx="330" cy="680" r="3" />
      <circle cx="270" cy="470" r="4" />
      <circle cx="430" cy="520" r="3" />
      <circle cx="350" cy="350" r="3" />
      <circle cx="500" cy="390" r="3" />

      <circle cx="1120" cy="500" r="3" />
      <circle cx="1240" cy="430" r="4" />
      <circle cx="1370" cy="500" r="3" />
      <circle cx="1310" cy="300" r="4" />
      <circle cx="1450" cy="350" r="3" />
      <circle cx="1480" cy="600" r="3" />
      <circle cx="1570" cy="280" r="3" />

      <circle cx="1000" cy="760" r="3" />
      <circle cx="1110" cy="650" r="4" />
      <circle cx="1240" cy="700" r="3" />
      <circle cx="1180" cy="540" r="3" />
    </g>
  </svg>
  
      <div className="absolute top-0 right-0 w-[600px] h-[350px] bg-[#0B2545] rounded-full blur-xl opacity-20 pointer-events-none" />

      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-[#0B2545] rounded-full blur-xl opacity-20 pointer-events-none" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Company */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div
              className="inline-flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleNavClick("home")}
            >
              <div className="w-10 h-10 rounded-[12px] bg-white text-[#0B2442] p-2 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <LogoIcon className="w-full h-full" />
              </div>

              <span className="font-sans text-lg font-extrabold tracking-tight text-white">
                DNA <span className="font-extrabold text-white">TECH</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              DNA TECH helps organizations transform data into actionable
              insights through research, analytics, AI-powered solutions, and
              technology innovation.
            </p>

            {/* Social links */}
            <div className="flex items-center space-x-2.5 pt-1">
              {socialLinks.map((social, idx) => {
                const IconComponent = social.icon;

                return (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-[12px] bg-white/5 border border-white/15 hover:border-white text-white/70 hover:text-[#0B2442] hover:bg-white flex items-center justify-center transition-all shadow-sm"
                    title={social.title}
                  >
                    <IconComponent className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">
              Quick Links
            </h4>

            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navLinks.map((link) => {
                const isActive = currentView === link.view;

                return (
                  <li key={link.view}>
                    <button
                      onClick={() => handleNavClick(link.view)}
                      className={[
                        "transition-all duration-200 cursor-pointer text-left py-0.5 inline-flex items-center space-x-1.5",
                        isActive
                          ? "text-white font-bold underline decoration-white decoration-2 underline-offset-4"
                          : "text-white/70 hover:text-white hover:translate-x-1",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <span>{link.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">
              Our Services
            </h4>

            <ul className="space-y-2.5 text-xs sm:text-sm text-white/70">
              {servicesList.map((service, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNavClick("services")}
                    className="hover:text-white transition-colors cursor-pointer text-left py-0.5"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-4 text-left text-xs sm:text-sm">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">
              Contact Us
            </h4>

            <div className="space-y-3 text-white/70 leading-relaxed">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />

                <span className="text-xs">
                  {companyProfile.address}
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3 border-t border-white/5 pt-2">
                <Phone className="w-4 h-4 text-white flex-shrink-0" />

                <a
                  href={`tel:${companyProfile.phone}`}
                  className="font-mono text-xs text-white hover:underline transition-colors"
                >
                  {companyProfile.phone}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3 border-t border-white/5 pt-2">
                <Mail className="w-4 h-4 text-white flex-shrink-0" />

                <a
                  href={`mailto:${companyProfile.email}`}
                  className="font-mono text-xs lowercase text-white hover:underline"
                >
                  {companyProfile.email}
                </a>
              </div>

              {/* Website */}
              <div className="flex items-center space-x-3 border-t border-white/5 pt-2">
                <Globe className="w-4 h-4 text-white flex-shrink-0" />

                <a
                  href={
                    companyProfile.website.startsWith("http")
                      ? companyProfile.website
                      : `https://${companyProfile.website}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-white hover:underline"
                >
                  {companyProfile.website}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
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