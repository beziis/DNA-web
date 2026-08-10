import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageType } from '../types';

interface PageTransitionOverlayProps {
  currentPage: PageType;
  children: React.ReactNode;
}

const pageTitles: Record<PageType, string> = {
  home: 'DATA NEUTRAL ANALYSIS',
  about: 'ABOUT DNA TECH',
  services: 'SERVICES & CAPABILITIES',
  solutions: 'SECTOR SOLUTIONS',
  traction: 'IMPACT & TRACTION',
  contact: 'START A CONVERSATION',
};

export default function PageTransitionOverlay({
  currentPage,
  children,
}: PageTransitionOverlayProps) {
  const [displayPage, setDisplayPage] = useState<PageType>(currentPage);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const timersRef = useRef<{ mid?: NodeJS.Timeout; end?: NodeJS.Timeout }>({});

  useEffect(() => {
    if (currentPage !== displayPage) {
      setIsTransitioning(true);

      if (timersRef.current.mid) clearTimeout(timersRef.current.mid);
      if (timersRef.current.end) clearTimeout(timersRef.current.end);

      timersRef.current.mid = setTimeout(() => {
        setDisplayPage(currentPage);
        window.scrollTo(0, 0);
      }, 350);

      timersRef.current.end = setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    }
  }, [currentPage]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timersRef.current.mid) clearTimeout(timersRef.current.mid);
      if (timersRef.current.end) clearTimeout(timersRef.current.end);
    };
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Full Page Curtain Wipe Overlay */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="page-curtain"
            initial={{ translateY: '100%' }}
            animate={{ translateY: '0%' }}
            exit={{ translateY: '-100%' }}
            transition={{
              duration: 0.65,
              ease: [0.76, 0, 0.24, 1], // Smooth cubic-bezier transition
            }}
            className="fixed inset-0 z-50 bg-[#0B2442] flex flex-col items-center justify-center pointer-events-none shadow-2xl border-t border-b border-white/20"
          >
            {/* Background grid accent */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
            
            {/* Split Column Accent Bars */}
            <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20">
              <div className="w-1/3 border-r border-white/10 h-full" />
              <div className="w-1/3 border-r border-white/10 h-full" />
              <div className="w-1/3 h-full" />
            </div>

            {/* Transition Brand Badge and Animated Page Label */}
            <div className="relative z-10 text-center space-y-3 px-4 pointer-events-none">
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="font-sans font-extrabold text-2xl sm:text-4xl text-white tracking-tight uppercase"
              >
                {pageTitles[currentPage] || 'DNA TECH'}
              </motion.h2>

              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.35, delay: 0.12 }}
                className="w-16 h-0.5 bg-white/60 mx-auto rounded-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={displayPage}
          initial={{ opacity: 0, y: 15, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.99 }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
