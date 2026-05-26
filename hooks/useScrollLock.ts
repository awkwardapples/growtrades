'use client';

import { useEffect, useCallback, useRef } from 'react';

interface UseScrollLockOptions {
  onProgress: (progress: number) => void;
  onExpand: () => void;
  onCollapse: () => void;
  isExpanded: boolean;
}

export function useScrollLock({
  onProgress,
  onExpand,
  onCollapse,
  isExpanded,
}: UseScrollLockOptions) {
  const progressRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isExpandedRef = useRef(isExpanded);

  useEffect(() => {
    isExpandedRef.current = isExpanded;
  }, [isExpanded]);

  const applyDelta = useCallback(
    (delta: number) => {
      if (isExpandedRef.current) {
        if (delta < 0 && window.scrollY <= 5) {
          onCollapse();
          isExpandedRef.current = false;
          progressRef.current = 1;
        }
        return;
      }

      const next = Math.min(1, Math.max(0, progressRef.current + delta));
      progressRef.current = next;
      onProgress(next);

      if (next >= 1) {
        onExpand();
        isExpandedRef.current = true;
      }
    },
    [onProgress, onExpand, onCollapse]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isExpandedRef.current && window.scrollY > 5) return;
      if (isExpandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        e.preventDefault();
        applyDelta(e.deltaY * 0.001);
        return;
      }
      if (!isExpandedRef.current) {
        e.preventDefault();
        applyDelta(e.deltaY * 0.0012);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isExpandedRef.current && window.scrollY > 5) return;
      const dy = touchStartYRef.current - e.touches[0].clientY;
      if (!isExpandedRef.current || (dy < -15 && window.scrollY <= 5)) {
        e.preventDefault();
        applyDelta(dy * 0.006);
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleScroll = () => {
      if (!isExpandedRef.current) window.scrollTo(0, 0);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [applyDelta]);
}
