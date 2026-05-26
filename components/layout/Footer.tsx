import { CONTACT } from '@/data/content';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-12 px-4 mt-0"
      style={{ background: '#FFFFFF', borderTop: '1px solid rgba(0,0,0,0.07)' }}
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
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
              <span className="font-semibold text-[#111] text-sm">GrowTrades</span>
            </div>
            <p className="text-sm text-[#888] leading-relaxed max-w-xs">
              Growth systems for UK trades businesses. From scattered jobs to scalable operations.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#bbb] mb-4">
              Navigate
            </p>
            <ul className="space-y-2" role="list">
              {['What We Do', 'How It Works', 'Results', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-[#777] hover:text-[#111] transition-colors cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#bbb] mb-4">
              Contact
            </p>
            <ul className="space-y-2" role="list">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm text-[#777] hover:text-[#111] transition-colors cursor-pointer"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <span className="text-sm text-[#aaa]">{CONTACT.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-black/[0.06] mb-6" />

        <div className="flex items-center justify-center">
          <p className="text-xs text-[#bbb]">
            © {year} GrowTrades Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
