'use client';

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
  memo,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '@/hooks/useScrollLock';
import { easeOutCubic, lerp } from '@/lib/motion';

interface ScrollExpansionHeroProps {
  videoSrc: string;
  posterSrc?: string;
  headline: string;
  headlineAccent: string;
  eyebrow?: string;
  scrollPrompt?: string;
  children?: ReactNode;
  onExpandComplete?: () => void;
}

const ScrollExpansionHero = memo(function ScrollExpansionHero({
  videoSrc,
  posterSrc,
  headline,
  headlineAccent,
  eyebrow,
  scrollPrompt = 'Scroll to explore',
  children,
  onExpandComplete,
}: ScrollExpansionHeroProps) {
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const syncVideoToProgress = useCallback((p: number) => {
    const video = videoRef.current;
    if (!video) return;
    const duration = video.duration;
    if (!duration || isNaN(duration)) return;
    video.currentTime = p * duration;
  }, []);

  const handleProgress = useCallback(
    (p: number) => {
      progressRef.current = p;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setProgress(progressRef.current);
        syncVideoToProgress(progressRef.current);
      });
    },
    [syncVideoToProgress]
  );

  const handleExpand = useCallback(() => {
    setIsExpanded(true);
    setTimeout(() => {
      setContentVisible(true);
      onExpandComplete?.();
    }, 300);
  }, [onExpandComplete]);

  const handleCollapse = useCallback(() => {
    setIsExpanded(false);
    setContentVisible(false);
    setProgress(1);
    progressRef.current = 1;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setProgress(0.99);
      setTimeout(() => setProgress(0), 50);
    });
  }, []);

  useScrollLock({
    onProgress: handleProgress,
    onExpand: handleExpand,
    onCollapse: handleCollapse,
    isExpanded,
  });

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const ease = easeOutCubic(progress);
  const easefast = easeOutCubic(Math.min(progress * 1.4, 1));

  const minW = isMobile ? 300 : 400;
  const maxW = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const minH = isMobile ? 360 : 480;
  const maxH = typeof window !== 'undefined' ? window.innerHeight : 900;

  const mediaWidth = lerp(minW, maxW, ease);
  const mediaHeight = lerp(minH, maxH, ease);
  const borderRadius = lerp(16, 0, easefast);
  const overlayOpacity = lerp(0.55, 0, easeOutCubic(Math.min(progress * 1.2, 1)));

  const textSplitX = progress * (isMobile ? 120 : 180);
  const textOpacity = 1 - easeOutCubic(Math.min(progress * 2, 1));

  return (
    <div className="relative overflow-x-hidden">
      <section
        className="relative flex flex-col items-center justify-start min-h-[100dvh]"
        aria-label="GrowTrades hero section"
      >
        {/* Dark grid background that fades with progress */}
        <motion.div
          className="absolute inset-0 z-0 gt-grid-bg"
          style={{
            opacity: 1 - ease,
            background: `
              radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.18) 0%, transparent 70%),
              #080810
            `,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative flex flex-col items-center w-full min-h-[100dvh]">
          {/* Eyebrow + headline text - splits apart on scroll */}
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none"
            style={{ opacity: textOpacity }}
            aria-hidden={progress > 0.3}
          >
            {eyebrow && (
              <motion.p
                className="text-xs font-medium tracking-[0.2em] uppercase text-blue-400 mb-6"
                style={{
                  transform: `translateX(-${textSplitX * 0.4}vw)`,
                  opacity: textOpacity,
                }}
              >
                {eyebrow}
              </motion.p>
            )}

            <div className="flex flex-col items-center gap-1 text-center px-4">
              <span
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
                style={{
                  transform: `translateX(-${textSplitX}vw)`,
                  opacity: textOpacity,
                  display: 'block',
                }}
              >
                {headline}
              </span>
              <span
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
                style={{
                  transform: `translateX(${textSplitX}vw)`,
                  opacity: textOpacity,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'block',
                }}
              >
                {headlineAccent}
              </span>
            </div>

            {/* Scroll indicator */}
            <div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              style={{ opacity: Math.max(0, 1 - progress * 4) }}
            >
              <span className="text-xs tracking-[0.15em] uppercase text-white/40 font-medium">
                {scrollPrompt}
              </span>
              <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
            </div>
          </div>

          {/* Video container — expands with scroll */}
          <div
            className="absolute top-1/2 left-1/2 z-20"
            style={{
              width: `${mediaWidth}px`,
              height: `${mediaHeight}px`,
              maxWidth: '100vw',
              maxHeight: '100dvh',
              transform: 'translate(-50%, -50%)',
              borderRadius: `${borderRadius}px`,
              overflow: 'hidden',
              boxShadow: progress < 0.95
                ? `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)`
                : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            {/* Skeleton while video loads */}
            {!videoReady && (
              <div className="absolute inset-0 bg-[#0d0d1c] animate-pulse" />
            )}

            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterSrc}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              className="w-full h-full object-cover"
              style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 0.4s ease' }}
              onLoadedMetadata={() => setVideoReady(true)}
              onCanPlay={() => setVideoReady(true)}
              aria-label="GrowTrades growth system demonstration"
            />

            {/* Video overlay — fades out as video expands */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to bottom, rgba(8,8,16,${overlayOpacity * 0.5}) 0%, rgba(8,8,16,${overlayOpacity}) 100%)`,
              }}
            />

            {/* Border glow at partial expansion */}
            {progress < 0.95 && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: `${borderRadius}px`,
                  border: '1px solid rgba(59,130,246,0.2)',
                }}
              />
            )}
          </div>
        </div>
      </section>

      {/* Page content revealed after expansion */}
      <AnimatePresence>
        {contentVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default ScrollExpansionHero;
