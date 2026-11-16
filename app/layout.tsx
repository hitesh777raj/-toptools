import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TopTools | StackBlueprint — Best AI Tools, Software & Workflow Blueprints (2027)',
  description:
    'Discover 100% verified AI software, developer tools, and automated multi-tool workflow blueprints. Curated by Hitesh Chaturvedi for global tech founders across USA, UK, and worldwide.',
  
  // 🌍 100+ GLOBAL HIGH-INTENT KEYWORDS FOR US / UK / WORLDWIDE TRAFFIC
  keywords: [
    // Brand & Platform
    'TopTools',
    'TopTools.io',
    'StackBlueprint',
    'StackBlueprint.io',
    'Hitesh Chaturvedi',
    'AI directory 2027',
    'Best AI tools 2027',
    
    // Core US/UK Search Queries
    'AI workflow blueprints',
    'AI tools directory USA',
    'Best AI software UK',
    'Automated AI workflows',
    'AI tool aggregator',
    'Curated software index',
    'Indie hacker tools',
    'Micro SaaS tools 2027',
    
    // Video & Audio Tools (High US Demand)
    'Faceless YouTube AI tools',
    'AI voice generator text to speech',
    'Cinematic AI video generator',
    'Runway alternatives',
    'ElevenLabs alternatives',
    'Descript video editing AI',
    'Luma Dream Machine review',
    'Suno AI song generator',
    'Krea AI canvas review',
    'Opus clip alternative for reels',
    
    // Developer & Coding Tools
    'Best developer tools 2027',
    'Free developer APIs',
    'Cursor AI alternative',
    'v0 Vercel alternative',
    'Supabase vs Firebase 2027',
    'Groq LPU speed review',
    'Replit Agent AI coding',
    'Bolt.new web builder',
    'Next.js developer utilities',
    'Fullstack SaaS boilerplate tools',
    
    // Design & Productivity Alternatives
    'Free Canva alternatives',
    'Midjourney alternatives',
    'ChatGPT alternatives 2027',
    'Claude 3.5 Sonnet use cases',
    'Perplexity AI search review',
    'Notion AI alternatives',
    'Gamma AI slide generator',
    'Taskade AI agents workflow',
    'DeepL translation review',
    'Raycast AI extensions',
    
    // Built-in Utility Keywords
    'Free QR code generator online',
    'Word counter online free',
    'Case converter upper to lower',
    'URL slug generator tool',
    'Web utilities online',
    
    // Business & Marketing
    'AI digital agency tools',
    'Automated inbound SEO engine',
    'SaaS launch in 48 hours',
    'B2B software marketplace',
    'Submit AI startup',
    'Do-follow SEO backlink directory'
  ],

  authors: [{ name: 'Hitesh Chaturvedi', url: 'https://toptools-seven.vercel.app' }],
  creator: 'Hitesh Chaturvedi',
  publisher: 'Hitesh Chaturvedi',
  metadataBase: new URL('https://toptools-seven.vercel.app'),
  applicationName: 'TopTools',

  // 🌐 Global OpenGraph for US / UK Social Previews
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://toptools-seven.vercel.app',
    title: 'TopTools | StackBlueprint — Best AI Tools, Software & Workflow Blueprints (2027)',
    description:
      'Curated global index of 50+ high-growth AI utilities, SaaS platforms, and automated workflow blueprints by Hitesh Chaturvedi.',
    siteName: 'TopTools',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'TopTools | StackBlueprint — Best AI Tools & Workflow Blueprints',
    description: 'Discover curated next-generation AI software and automated multi-tool blueprints for 2027.',
    creator: '@KrishnaCha60537',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },

  verification: {
    google: 'ZBraPnd6jTc0iw5w6iS4-WJpXhPXt4DBc2Ufn1gS9wg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 💎 SCHEMA.ORG GLOBAL KNOWLEDGE GRAPH DATA (VERIFIED ENTITY FOR GOOGLE AI)
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TopTools',
    alternateName: 'StackBlueprint',
    url: 'https://toptools-seven.vercel.app',
    description:
      'Curated index of next-generation AI tools, developer software, and automated multi-tool workflow blueprints by Hitesh Chaturvedi.',
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: 'Hitesh Chaturvedi',
      jobTitle: 'Founder & CEO',
      worksFor: {
        '@type': 'Organization',
        name: 'Hitesh Innovation IT Pvt Ltd',
      },
      url: 'https://toptools-seven.vercel.app',
      sameAs: [
        'https://www.linkedin.com/in/hitesh-chaturvedi-15bb2b449/',
        'https://x.com/KrishnaCha60537',
      ],
    },
    creator: {
      '@type': 'Person',
      name: 'Hitesh Chaturvedi',
      url: 'https://www.linkedin.com/in/hitesh-chaturvedi-15bb2b449/',
    },
    copyrightHolder: {
      '@type': 'Person',
      name: 'Hitesh Chaturvedi',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://toptools-seven.vercel.app/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className={`${inter.className} bg-[#07090e] text-slate-100 min-h-screen`}>
        {children}
        {/* 📊 Vercel Live Web Analytics Active */}
        <Analytics />
      </body>
    </html>
  );
}