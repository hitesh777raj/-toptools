import React, { cache } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  ArrowLeft, ExternalLink, ShieldCheck, Flame, Star, 
  Globe, Sparkles, CheckCircle2, Heart, Layers
} from 'lucide-react';
import FeedbackBox from './FeedbackBox';

// ✅ Next.js 16: Dynamic route ko build-time prerender error se bachane ke liye:
export const instant = false;

interface Tool {
  id: number;
  name: string;
  category: string;
  description: string;
  url: string;
  pricing: string;
  featured: boolean;
  image_url?: string;
  founder_email?: string;
  created_at: string;
  is_community?: boolean;
}

// 🌐 Static Global SEO Metadata (Next.js 16 100% Build-Safe)
export const metadata = {
  title: 'AI Tool Review, Pricing & Workflows (2027) — StackBlueprint',
  description: 'Explore verified AI software profiles, pricing models, alternatives, and workflow blueprints on StackBlueprint.io.',
};

// ⚡ React Cache taaki data fast fetch ho
const getToolData = cache(async (id: string) => {
  const { data: tool } = await supabase
    .from('tools')
    .select('*')
    .eq('id', id)
    .single();
  return tool as Tool | null;
});

export default async function ToolDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tool = await getToolData(id);

  if (!tool) {
    notFound();
  }

  // Similar tools in same category (Alternatives)
  const { data: similarTools } = await supabase
    .from('tools')
    .select('id, name, pricing, category')
    .eq('category', tool.category)
    .neq('id', tool.id)
    .limit(3);

  const screenshotUrl = tool.image_url || `https://v1.screenshot.11ty.dev/${encodeURIComponent(tool.url)}/opengraph/`;

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
      
      {/* 🚀 React 19 Native Dynamic Document Title */}
      <title>{`${tool.name} Review, Pricing & Alternatives (2027) — StackBlueprint`}</title>

      <div>
        {/* Top Navbar */}
        <nav className="border-b border-slate-800/80 bg-[#07090e]/85 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="inline-flex items-center space-x-2 text-xs text-slate-400 hover:text-white transition">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Directory</span>
            </Link>

            <Link href="/" className="font-black text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              StackBlueprint<span className="text-indigo-400">.io</span>
            </Link>

            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-xl font-semibold text-xs transition shadow-lg shadow-indigo-600/20"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </nav>

        {/* Main Tool Content Container */}
        <main className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
          
          {/* Header Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
            <Link href="/" className="hover:text-slate-300">Home</Link>
            <span>/</span>
            <span className="text-indigo-400">{tool.category}</span>
            <span>/</span>
            <span className="text-slate-300 font-medium">{tool.name}</span>
          </div>

          {/* Title & Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-2 flex-wrap gap-2">
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">{tool.name}</h1>
                
                {tool.featured && (
                  <span className="flex items-center space-x-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-md">
                    <Flame className="w-3.5 h-3.5 fill-amber-400" />
                    <span>Featured</span>
                  </span>
                )}

                {tool.is_community && (
                  <span className="text-[11px] font-bold text-purple-300 bg-purple-950/80 border border-purple-800/80 px-2.5 py-0.5 rounded-md">
                    🚀 Community Launch
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                Verified Software Profile #{tool.id} on StackBlueprint.io (TopTools)
              </p>
            </div>

            <div className="flex items-center space-x-2 self-start sm:self-auto">
              <span className={`text-xs font-semibold px-3 py-1 rounded-xl border ${
                tool.pricing === 'Free'
                  ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-400'
                  : tool.pricing === 'Paid'
                  ? 'bg-purple-950/40 border-purple-800/40 text-purple-400'
                  : 'bg-slate-900 border-slate-700 text-slate-200'
              }`}>
                Pricing: {tool.pricing}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-xl border bg-indigo-950/60 border-indigo-900 text-indigo-300">
                {tool.category}
              </span>
            </div>
          </div>

          {/* High-Res Preview Screenshot */}
          <div className="relative w-full h-64 sm:h-96 bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl mb-10 group">
            <img
              src={screenshotUrl}
              alt={`${tool.name} live preview screenshot`}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-60" />
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xl transition inline-flex items-center space-x-1.5 active:scale-95"
            >
              <span>Launch {tool.name}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Detailed Overview Box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-10 backdrop-blur-xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span>About {tool.name}</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {tool.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs">
              <div className="flex items-center space-x-2 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Verified Software</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Global 2026-2027 Discovery</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Direct Official Portal</span>
              </div>
            </div>
          </div>

          {/* Similar Tools (Alternatives) */}
          {similarTools && similarTools.length > 0 && (
            <div className="mb-12">
              <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Similar {tool.category} Software to Explore:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {similarTools.map((st) => (
                  <Link
                    key={st.id}
                    href={`/tool/${st.id}`}
                    className="bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 p-4 rounded-2xl transition block group"
                  >
                    <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition mb-1">{st.name}</h4>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{st.category}</span>
                      <span className="text-indigo-400 font-semibold">{st.pricing}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 💬 COMMUNITY FEEDBACK BOX */}
          <FeedbackBox toolId={tool.id} toolName={tool.name} />

          {/* CTA Launch Banner */}
          <div className="bg-gradient-to-r from-indigo-950/70 to-purple-950/70 border border-indigo-800/50 rounded-3xl p-6 sm:p-8 text-center shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">Ready to explore {tool.name}?</h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-5 max-w-md mx-auto">
              Visit the official portal to create an account and integrate it directly into your daily workflow.
            </p>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-lg transition active:scale-95"
            >
              <span>Launch {tool.name}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </main>
      </div>

      {/* 🚀 CLEAN BUILDER FOOTER (Pvt Ltd Removed) */}
      <footer className="border-t border-slate-800/80 bg-[#05070a] text-slate-500 text-xs py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
            <p className="text-slate-400 font-medium">
              Building the future of software with your support.
            </p>
          </div>

          <div className="text-slate-500 text-[11px]">
            Curated with care by <strong className="text-slate-300 font-bold">Hitesh Chaturvedi</strong> • StackBlueprint.io
          </div>
        </div>
      </footer>
    </div>
  );
}