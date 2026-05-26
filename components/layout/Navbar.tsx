'use client';

import { motion } from 'framer-motion';
import { useNavbar } from '@/hooks/useNavbar';
import { NAV_LINKS } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { scrolled, visible } = useNavbar();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        <nav
          className="w-full max-w-6xl flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300"
          style={{
            background: scrolled
              ? 'rgba(8, 8, 16, 0.85)'
              : 'rgba(8, 8, 16, 0.4)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: scrolled
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.4)'
              : 'none',
          }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="GrowTrades home"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 10L5 6L8 8L12 3"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-semibold text-white text-sm tracking-tight">
              GrowTrades
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white px-3 py-1.5 rounded-lg transition-colors duration-150 hover:bg-white/5 cursor-pointer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:block">
            <Button
              size="sm"
              className="bg-blue-500 hover:bg-blue-400 text-white border-0 text-sm font-medium px-4 py-2 rounded-xl cursor-pointer transition-colors duration-150"
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col pt-20 px-4 pb-8 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: 'rgba(8, 8, 16, 0.96)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <ul className="flex flex-col gap-1 mt-4" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-lg text-white/80 hover:text-white px-4 py-3 rounded-xl transition-colors hover:bg-white/5 cursor-pointer"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <Button
              className="w-full bg-blue-500 hover:bg-blue-400 text-white py-3 rounded-xl text-base font-medium cursor-pointer"
              onClick={() => setMobileOpen(false)}
            >
              Book a Free Consultation
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
}
