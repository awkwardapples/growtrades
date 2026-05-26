'use client';

import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { TRADES_LIST } from '@/data/content';

export default function TradesSliderSection() {
  return (
    <section
      className="relative py-14 overflow-hidden border-t border-b"
      style={{
        background: '#FFFFFF',
        borderColor: 'rgba(0,0,0,0.07)',
      }}
      aria-label="Trades we serve"
    >
      <div className="relative h-[48px]">
        <InfiniteSlider
          className="flex h-full w-full items-center"
          duration={40}
          gap={64}
        >
          {TRADES_LIST.map((trade) => (
            <div
              key={trade}
              className="flex items-center gap-5 select-none"
              aria-hidden="true"
            >
              {/* Dot separator */}
              <span
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: '#D1D5DB' }}
              />
              <span
                className="text-base font-medium whitespace-nowrap"
                style={{
                  color: '#555555',
                  letterSpacing: '0.01em',
                }}
              >
                {trade}
              </span>
            </div>
          ))}
        </InfiniteSlider>

        {/* Progressive blur fades at both edges */}
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 left-0 h-full w-32"
          direction="left"
          blurIntensity={0.6}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 right-0 h-full w-32"
          direction="right"
          blurIntensity={0.6}
        />
      </div>

      {/* Accessible label for screen readers */}
      <p className="sr-only">
        GrowTrades serves: {TRADES_LIST.join(', ')}
      </p>
    </section>
  );
}
