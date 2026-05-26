import { CONTACT } from '@/data/content';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-white/[0.06] py-12 px-4 mt-0"
      style={{ background: '#06060f' }}
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
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
              <span className="font-semibold text-white text-sm">GrowTrades</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Growth systems for UK trades businesses. From local presence to scalable operations.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-white/30 mb-4">
              Navigate
            </p>
            <ul className="space-y-2" role="list">
              {['What We Do', 'How It Works', 'Platform', 'Results'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-white/30 mb-4">
              Contact
            </p>
            <ul className="space-y-2" role="list">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <span className="text-sm text-white/30">{CONTACT.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/[0.06] mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © {year} GrowTrades Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors cursor-pointer">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors cursor-pointer">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
