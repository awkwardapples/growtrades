'use client';

/**
 * ScrollExpansionHero — scroll-synced cinematic video reveal.
 *
 * VIDEO SCRUBBING NOTE:
 * For smooth scrubbing, the source video should be exported at:
 * - High frame rate (30–60fps recommended)
 * - H.264 or VP9 codec
 * - Keyframe interval every 1–2 seconds (not just scene changes)
 * - Duration: 6–15 seconds is ideal for a full scroll journey
 * A very short video (<3s) will feel jumpy regardless of scrubbing logic.
 *
 * Architecture:
 * - targetRef: raw scroll progress (set immediately, no re-render)
 * - displayRef: lerped progress for smooth CSS transitions (drives React state)
 * - videoRef: currentTime is set from targetRef directly (no lerp — instant)
 * - One RAF loop runs while the user is actively scrolling
 *
 * Z-index layers (text always above video):
 * - z-0  : background (image or gradient)
 * - z-10 : video container (expands outward)
 * - z-30 : text overlay (always on top, fades out as video expands)
 */

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
  backgroundImageSrc?: string;
  headline: string;
  headlineAccent: string;
  eyebrow?: string;
  scrollPrompt?: string;
  children?: ReactNode;
}

const LERP_FACTOR = 0.1; // CSS animation damping (lower = smoother but slower)
const MIN_DELTA = 0.0008; // stop RAF loop below this threshold

const ScrollExpansionHero = memo(function ScrollExpansionHero({
  videoSrc,
  posterSrc,
  backgroundImageSrc,
  headline,
  headlineAccent,
  eyebrow,
  scrollPrompt = 'Scroll to explore',
  children,
}: ScrollExpansionHeroProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const targetRef = useRef(0);    // raw from user input — set immediately
  const displayRef = useRef(0);   // lerped — drives CSS transitions
  const isExpandedRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // The animation loop: lerps displayRef toward targetRef each frame,
  // updates React state (for CSS transitions), leaves video alone.
  const runAnimationLoop = useCallback(() => {
    const target = targetRef.current;
    const current = displayRef.current;
    const diff = target - current;

    if (Math.abs(diff) < MIN_DELTA) {
      displayRef.current = target;
      setDisplayProgress(target);
      // Trigger expand state when progress reaches 1
      if (target >= 1 && !isExpandedRef.current) {
        isExpandedRef.current = true;
        setIsExpanded(true);
        setTimeout(() => setContentVisible(true), 250);
      }
      return;
    }

    const next = current + diff * LERP_FACTOR;
    displayRef.current = next;
    setDisplayProgress(next);

    rafRef.current = requestAnimationFrame(runAnimationLoop);
  }, []);

  const handleProgress = useCallback(
    (rawProgress: number) => {
      targetRef.current = rawProgress;

      // Sync video to raw progress IMMEDIATELY (no lerp — prevents lag)
      const video = videoRef.current;
      if (video && video.duration && !isNaN(video.duration)) {
        const targetTime = rawProgress * video.duration;
        // Only seek if meaningfully different to avoid unnecessary decoding
        if (Math.abs(video.currentTime - targetTime) > 0.016) {
          video.currentTime = targetTime;
        }
      }

      // Start the smooth CSS animation loop
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(runAnimationLoop);
    },
    [runAnimationLoop]
  );

  const handleExpand = useCallback(() => {
    isExpandedRef.current = true;
    setIsExpanded(true);
    setTimeout(() => setContentVisible(true), 250);
  }, []);

  const handleCollapse = useCallback(() => {
    isExpandedRef.current = false;
    setIsExpanded(false);
    setContentVisible(false);
    // Reset to just below 1 so collapse animation plays
    targetRef.current = 0.98;
    displayRef.current = 0.98;
    setDisplayProgress(0.98);
    // Then animate back to 0 smoothly
    setTimeout(() => {
      targetRef.current = 0;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(runAnimationLoop);
    }, 16);
  }, [runAnimationLoop]);

  useScrollLock({
    onProgress: handleProgress,
    onExpand: handleExpand,
    onCollapse: handleCollapse,
    isExpanded,
  });

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Derived visual values from displayProgress (smooth)
  const p = displayProgress;
  const ease = easeOutCubic(p);
  const easeDeep = easeOutCubic(Math.min(p * 1.3, 1));

  const viewW = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const viewH = typeof window !== 'undefined' ? window.innerHeight : 900;
  const minW = isMobile ? 280 : 380;
  const minH = isMobile ? 320 : 460;

  const mediaWidth = lerp(minW, viewW, ease);
  const mediaHeight = lerp(minH, viewH, ease);
  const borderRad = lerp(20, 0, easeDeep);

  // Text: fades to 0 by the time progress reaches ~0.45
  const textOpacity = Math.max(0, 1 - p * 2.2);
  const textScale = 1 - p * 0.04;

  // Background: fades behind the expanding video
  const bgOpacity = Math.max(0, 1 - ease * 1.6);

  // Video overlay: starts subtle, disappears as video fills screen
  const overlayOpacity = lerp(0.25, 0, easeOutCubic(Math.min(p * 1.4, 1)));

  return (
    // z-index: 10 ensures the hero stacking context sits above all subsequent page sections,
    // preventing the trades slider and other sections from bleeding through during expansion.
    <div className="relative overflow-x-hidden" style={{ position: 'relative', zIndex: 10 }}>
      <section
        className="relative flex flex-col items-center justify-start min-h-[100dvh]"
        style={{ background: '#F7F6F4' }}
        aria-label="GrowTrades hero section"
      >
        {/* ── LAYER 0: Background ────────────────────────────────── */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ opacity: bgOpacity }}
          aria-hidden="true"
        >
          {backgroundImageSrc ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={backgroundImageSrc}
                alt=""
                className="w-full h-full object-cover"
                style={{ filter: `blur(${lerp(0, 8, ease)}px)` }}
              />
              {/* Overlay starts light so the cinematic image shows through,
                  then brightens as the video expands to merge into the white page */}
              <div
                className="absolute inset-0"
                style={{ background: `rgba(247,246,244,${lerp(0.42, 0.88, ease)})` }}
              />
            </>
          ) : (
            /* Clean grid on plain background */
            <div
              className="w-full h-full gt-grid-bg"
              style={{
                background: `
                  radial-gradient(ellipse 70% 50% at 50% -5%, rgba(29,78,216,0.06) 0%, transparent 70%),
                  #F7F6F4
                `,
              }}
            />
          )}
        </div>

        <div className="relative flex flex-col items-center w-full min-h-[100dvh]">
          {/* ── LAYER 10: Video container ──────────────────────────── */}
          <div
            className="absolute top-1/2 left-1/2 z-10"
            style={{
              width: `${mediaWidth}px`,
              height: `${mediaHeight}px`,
              maxWidth: '100vw',
              maxHeight: '100dvh',
              transform: 'translate(-50%, -50%)',
              borderRadius: `${borderRad}px`,
              overflow: 'hidden',
              willChange: 'width, height, border-radius',
              boxShadow:
                p < 0.9
                  ? '0 24px 64px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.05)'
                  : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
            aria-label="GrowTrades brand video"
          >
            {/* Skeleton */}
            {!videoReady && (
              <div className="absolute inset-0 bg-stone-100 animate-pulse" aria-hidden="true" />
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
              style={{
                opacity: videoReady ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
              onLoadedMetadata={() => setVideoReady(true)}
              onCanPlay={() => setVideoReady(true)}
            />

            {/* Subtle overlay — thins as video expands */}
            {overlayOpacity > 0.01 && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `rgba(247,246,244,${overlayOpacity})`,
                }}
                aria-hidden="true"
              />
            )}
          </div>

          {/* ── LAYER 30: Text — ALWAYS above video ───────────────── */}
          <div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none select-none"
            style={{
              opacity: textOpacity,
              transform: `scale(${textScale})`,
              willChange: 'opacity, transform',
            }}
          >
            {/* Single headline — no eyebrow, no accent split */}
            {textOpacity > 0.01 && (
              <div className="flex flex-col items-center text-center px-6">
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#111111] leading-tight tracking-tight">
                  {headline}
                </span>
                {headlineAccent && (
                  <span
                    className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight"
                    style={{ color: '#1D4ED8' }}
                  >
                    {headlineAccent}
                  </span>
                )}
              </div>
            )}

            {/* Scroll cue */}
            {textOpacity > 0.5 && (
              <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                style={{ opacity: Math.min(1, textOpacity * 2) }}
                aria-label={scrollPrompt}
              >
                <span className="text-[11px] tracking-[0.18em] uppercase text-[#999] font-medium">
                  {scrollPrompt}
                </span>
                <div className="w-px h-7 bg-gradient-to-b from-[#ccc] to-transparent" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Page content: fades in after video fully expands ─────── */}
      <AnimatePresence>
        {contentVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default ScrollExpansionHero;
