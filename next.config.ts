import type { NextConfig } from 'next';

// NOTE: output: 'export' (GitHub Pages static mode) has been removed.
// The contact form API route requires a Node.js server runtime (Resend calls happen server-side).
// Deploy to Vercel (free): connect your GitHub repo at vercel.com — it auto-detects Next.js.
// If you must keep GitHub Pages, replace the API route with a Formspree endpoint instead.
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
