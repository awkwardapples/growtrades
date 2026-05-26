'use client';

import { motion } from 'framer-motion';
import { useNavbar } from '@/hooks/useNavbar';

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
          background: scrolled ? 'rgba(247,246,244,0.9)' : 'rgba(247,246,244,0.6)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: scrolled
            ? '1px solid rgba(0,0,0,0.1)'
            : '1px solid rgba(0,0,0,0.06)',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <a
          href="#"
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="GrowTrades home"
        >
          {/* Logo mark */}
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: '#1D4ED8' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M2 10L5 6L8 8L12 3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Wordmark */}
          <span className="font-semibold text-[#111] text-sm tracking-tight">
            GrowTrades
          </span>
        </a>
      </div>
    </motion.header>
  );
}
