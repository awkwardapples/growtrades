import {
  Globe,
  Zap,
  BarChart3,
  MessageSquare,
  Star,
  Settings,
  MapPin,
  Clock,
  TrendingUp,
  Shield,
  Wrench,
  CheckCircle,
} from 'lucide-react';

export const HERO_CONTENT = {
  eyebrow: 'Growth Systems for UK Trades',
  headline: 'Your Trades Business.',
  headlineAccent: 'Systemised.',
  subheadline:
    'From manual quoting and missed leads to a complete automated growth operation. GrowTrades builds the systems that turn a local trade into a scalable business.',
  cta: 'Book a Free Consultation',
  ctaSecondary: 'See How It Works',
  scrollPrompt: 'Scroll to explore',
  videoSrc:
    'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1',
  videoPoster:
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80',
};

export const SERVICES = [
  {
    icon: Globe,
    title: 'Lead Generation Websites',
    description:
      'WordPress-based sites built for one purpose: converting local search traffic into qualified leads. Fast, mobile-first, and designed around your trade.',
    tag: 'Foundation',
  },
  {
    icon: Zap,
    title: 'Instant Quote Wizard',
    description:
      'An embedded React quote wizard that qualifies leads before you speak to them. Customers get instant price guides — you get complete job briefs.',
    tag: 'Automation',
  },
  {
    icon: MapPin,
    title: 'Local SEO Systems',
    description:
      'Structured local SEO that gets you ranking for the searches that matter. Google Business Profile optimisation, citations, and review velocity.',
    tag: 'Visibility',
  },
  {
    icon: MessageSquare,
    title: 'AI Review Automation',
    description:
      'AI-generated responses to every Google review, automated posting workflows, and reputation monitoring — all without lifting a finger.',
    tag: 'AI-Powered',
  },
  {
    icon: BarChart3,
    title: 'Growth Analytics',
    description:
      'A live dashboard showing lead volume, conversion rates, SEO rankings, and ROI. Know exactly what is working and what to do next.',
    tag: 'Intelligence',
  },
  {
    icon: Settings,
    title: 'Automated Lead Flow',
    description:
      'Every lead is instantly captured, qualified, and routed. Automated follow-up sequences keep you front-of-mind without manual effort.',
    tag: 'Systems',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    title: 'Customer Finds You',
    description:
      'A homeowner in your area searches for a plumber, electrician, or builder. Your GrowTrades-optimised site appears prominently in local results.',
    detail: 'Google Business Profile · Local SEO · Paid presence',
  },
  {
    number: '02',
    title: 'They Self-Qualify',
    description:
      'Instead of calling to ask price, they complete your embedded quote wizard. Job type, scope, location, and urgency — all captured instantly.',
    detail: 'Quote Wizard · Lead Qualification · Instant estimates',
  },
  {
    number: '03',
    title: 'You Get the Brief',
    description:
      'Within seconds, you receive a complete, structured lead brief — everything you need to quote accurately before setting foot on site.',
    detail: 'Instant notification · Complete job data · No wasted visits',
  },
  {
    number: '04',
    title: 'The System Follows Up',
    description:
      'Automated sequences nurture the lead, collect a review after completion, and keep your pipeline healthy — entirely without manual work.',
    detail: 'CRM automation · Review generation · Pipeline management',
  },
];

export const PLATFORM_FEATURES = [
  {
    icon: TrendingUp,
    title: 'Lead Pipeline',
    description: 'Every lead tracked from first click to completed job.',
    metric: '3.4× more leads',
  },
  {
    icon: BarChart3,
    title: 'SEO Performance',
    description: 'Live rankings for your most valuable local search terms.',
    metric: 'Top 3 positions',
  },
  {
    icon: Star,
    title: 'Review Engine',
    description: 'Automated review requests and AI-drafted responses.',
    metric: '4.9★ average',
  },
  {
    icon: Clock,
    title: 'Response Time',
    description: 'Instant lead alerts and automated first-contact sequences.',
    metric: '<90 sec response',
  },
];

export const RESULTS = {
  stats: [
    { value: '3.4×', label: 'Average increase in qualified leads', suffix: '' },
    { value: '67%', label: 'Reduction in wasted site visits', suffix: '' },
    { value: '£18k', label: 'Additional monthly revenue, avg client', suffix: '+' },
  ],
  testimonials: [
    {
      quote:
        "Before GrowTrades I was spending half my day driving to quote jobs that went nowhere. Now I get a full brief before I leave the van. My conversion rate has doubled.",
      author: 'Mike Thornton',
      role: 'Plumbing & Heating Engineer',
      location: 'Birmingham',
      stars: 5,
    },
    {
      quote:
        "We went from page 3 on Google to ranking top 3 for every major term in our area within four months. The leads are consistent now — it's changed how we plan work.",
      author: 'Sarah Kavanagh',
      role: 'Director, SK Electrical',
      location: 'Manchester',
      stars: 5,
    },
    {
      quote:
        "The quote wizard alone is worth it. Customers love getting an instant guide price. I stopped chasing no-show quote appointments within the first month.",
      author: 'Dan Rushworth',
      role: 'Rushworth Roofing',
      location: 'Leeds',
      stars: 5,
    },
  ],
};

export const WHY_US_POINTS = [
  {
    icon: Wrench,
    title: 'Built for Trades, Not Corporate',
    description:
      'Every system we build is designed around how trades businesses actually operate — not adapted from generic agency templates.',
  },
  {
    icon: Settings,
    title: 'Automation-First Operations',
    description:
      'We replace manual processes with reliable automated systems. Less time on admin, more time on the tools — or running the business.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Partner, Not Agency',
    description:
      'We operate on ongoing monthly retainers. Our success is tied to yours. We grow when you grow.',
  },
  {
    icon: Shield,
    title: 'No Lock-In Tactics',
    description:
      'Transparent pricing, clear deliverables, and no long fixed-term contracts. We keep clients by producing results.',
  },
  {
    icon: CheckCircle,
    title: 'Measurable ROI',
    description:
      'Every engagement is tracked against clear KPIs. Lead volume, conversion rate, revenue impact — all reported monthly.',
  },
  {
    icon: BarChart3,
    title: 'Compounding Systems',
    description:
      'Each system we build compounds on the last. Your SEO feeds your pipeline. Your reviews feed your SEO. Everything works together.',
  },
];

export const NAV_LINKS = [
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Platform', href: '#platform' },
  { label: 'Results', href: '#results' },
];

export const CONTACT = {
  email: 'hello@growtrades.co.uk',
  phone: '0800 000 0000',
  location: 'Serving trades businesses across the UK',
};
