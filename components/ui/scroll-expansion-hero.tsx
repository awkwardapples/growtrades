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
  backgroundImageSrc?: string;
  headline: string;
  headlineAccent: string;
  eyebrow?: string;
  scrollPrompt?: string;
  children?: ReactNode;
}

const LERP_FACTOR = 0.1;
const MIN_DELTA = 0.0008;

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
  const targetRef = useRef(0);
  const displayRef = useRef(0);
  const isExpandedRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /**
   * ✅ MOBILE FIX: unlock video decoding without autoplay playback
   */
  useEffect(() => {
    if (!isMobile) return;

    const video = videoRef.current;
    if (!video) return;

    const unlock = async () => {
      try {
        // Kickstart decoder
        await video.play();
        video.pause();
        video.currentTime = 0;
      } catch (e) {
        // ignore autoplay restrictions
      }
    };

    video.addEventListener('loadedmetadata', unlock);
    return () => video.removeEventListener('loadedmetadata', unlock);
  }, [isMobile]);

  const runAnimationLoop = useCallback(() => {
    const target = targetRef.current;
    const current = displayRef.current;
    const diff = target - current;

    if (Math.abs(diff) < MIN_DELTA) {
      displayRef.current = target;
      setDisplayProgress(target);

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

  const handleProgress = useCallback((rawProgress: number) => {
    targetRef.current = rawProgress;

    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration)) {
      const targetTime = rawProgress * video.duration;

      if (Math.abs(video.currentTime - targetTime) > 0.016) {
        video.currentTime = targetTime;
      }
    }

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(runAnimationLoop);
  }, [runAnimationLoop]);

  const handleExpand = useCallback(() => {
    isExpandedRef.current = true;
    setIsExpanded(true);
    setTimeout(() => setContentVisible(true), 250);
  }, []);

  const handleCollapse = useCallback(() => {
    isExpandedRef.current = false;
    setIsExpanded(false);
    setContentVisible(false);

    targetRef.current = 0.98;
    displayRef.current = 0.98;
    setDisplayProgress(0.98);

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

  const p = displayProgress;
  const ease = easeOutCubic(p);
  const easeDeep = easeOutCubic(Math.min(p * 1.3, 1));

  const viewW = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const minW = isMobile ? 280 : 380;
  const minH = isMobile ? 320 : 460;

  const mediaWidth = lerp(minW, viewW, ease);
  const mediaHeight = lerp(minH, typeof window !== 'undefined' ? window.innerHeight : 900, ease);
  const borderRad = lerp(20, 0, easeDeep);

  const textOpacity = Math.max(0, 1 - p * 2.2);
  const textScale = 1 - p * 0.04;

  const bgOpacity = Math.max(0, 1 - ease * 1.6);
  const overlayOpacity = lerp(0.25, 0, easeOutCubic(Math.min(p * 1.4, 1)));

  return (
    <div className="relative overflow-x-hidden" style={{ zIndex: 10 }}>
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]" style={{ background: '#F7F6F4' }}>

        <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: bgOpacity }}>
          {backgroundImageSrc ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={backgroundImageSrc}
                alt=""
                className="w-full h-full object-cover"
                style={{ filter: `blur(${lerp(0, 8, ease)}px)` }}
              />
              <div className="absolute inset-0" style={{ background: `rgba(247,246,244,${lerp(0.42, 0.88, ease)})` }} />
            </>
          ) : (
            <div className="w-full h-full" style={{ background: '#F7F6F4' }} />
          )}
        </div>

        <div className="relative flex flex-col items-center w-full min-h-[100dvh]">

          <div
            className="absolute top-1/2 left-1/2 z-10"
            style={{
              width: `${mediaWidth}px`,
              height: `${mediaHeight}px`,
              transform: 'translate(-50%, -50%)',
              borderRadius: `${borderRad}px`,
              overflow: 'hidden',
            }}
          >
            {!videoReady && (
              <div className="absolute inset-0 bg-stone-100 animate-pulse" />
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
              style={{ opacity: videoReady ? 1 : 0 }}
              onLoadedMetadata={() => setVideoReady(true)}
              onCanPlay={() => setVideoReady(true)}
            />

            {overlayOpacity > 0.01 && (
              <div className="absolute inset-0 pointer-events-none"
                   style={{ background: `rgba(247,246,244,${overlayOpacity})` }} />
            )}
          </div>

          <div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none select-none"
            style={{
              opacity: textOpacity,
              transform: `scale(${textScale})`,
            }}
          >
            <div className="flex flex-col items-center text-center px-6">
              <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#111]">
                {headline}
              </span>
              {headlineAccent && (
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1D4ED8]">
                  {headlineAccent}
                </span>
              )}
            </div>
          </div>

        </div>
      </section>

      <AnimatePresence>
        {contentVisible && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default ScrollExpansionHero;