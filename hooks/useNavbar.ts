'use client';

import { useState, useEffect } from 'react';

export function useNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

  useEffect(() => {
    let prev = lastScrollY;

    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 40);
      setVisible(current < prev || current < 80);
      prev = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return { scrolled, visible };
}
