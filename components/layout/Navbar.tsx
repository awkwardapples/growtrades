'use client';

import { motion } from 'framer-motion';
import { useNavbar } from '@/hooks/useNavbar';
import { HERO_CONTENT } from '@/data/content';

export default function Navbar() {
  const { scrolled, visible } = useNavbar();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.22, ease: 'easeInOut' }}
    >
      <div
        className="flex items-center px-5 py-3 rounded-2xl transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(247,246,244,0.92)' : 'rgba(247,246,244,0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: scrolled
            ? '1px solid rgba(0,0,0,0.1)'
            : '1px solid rgba(0,0,0,0.06)',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <a href="#" aria-label="GrowTrades home" className="cursor-pointer block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_CONTENT.companyLogo}
            alt="GrowTrades"
            className="h-11 w-auto"
            style={{ display: 'block' }}
          />
        </a>
      </div>
    </motion.header>
  );
}
