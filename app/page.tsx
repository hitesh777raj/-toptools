
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { 
  Search, ExternalLink, Sparkles, PlusCircle, CheckCircle2, 
  Rocket, Flame, Loader2, ArrowUpRight, ShieldCheck, ThumbsUp, 
  Copy, Check, Star, TrendingUp, Layers, Bookmark, 
  BookmarkCheck, Globe, X, Scale, AlertCircle, Zap, Clock, 
  ChevronDown, ChevronUp, Bot, Sparkle, Workflow, ArrowRight,
  BookOpen, Lightbulb, QrCode, FileText, Type, Users,
  Calculator, Cpu, Code2, Sliders, CornerDownRight, ArrowDown
} from 'lucide-react';

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
  is_community?: boolean;
}

const CATEGORIES = ['All', 'AI Chat', 'Developer', 'Design', 'Productivity', 'Marketing'];

const AI_PROMPTS = [
  'Build website without code',
  'Generate realistic AI voice',
  'Write and debug code fast',
  'Video editing from text',
  'Create digital graphics',
];

const ALTERNATIVE_TAGS = [
  { name: 'Canva Alternatives', query: 'Canva' },
  { name: 'ChatGPT Alternatives', query: 'AI Chat' },
  { name: 'Midjourney Alternatives', query: 'Design' },
  { name: 'Notion Alternatives', query: 'Productivity' },
];

const BLUEPRINTS = [
  {
    id: 'bp-1',
    title: 'The Faceless Media Studio',
    subtitle: 'Generate viral YouTube Shorts & TikToks from text prompts with zero face recording.',
    badge: '15 hrs/wk saved',
    category: 'Video & Content',
    outcome: 'Produces 30 viral video shorts per month on complete autopilot.',
    steps: [
      {
        step: '01',
        role: 'Viral Script Writing',
        tool: 'Claude 3.5 Sonnet',
        url: 'https://claude.ai',
        action: 'Write a high-retention 60-second video script with an irresistible 3-second hook.',
        prompt: 'Act as a viral YouTube Shorts scriptwriter. Write a 55-second fast-paced script about [Topic]. Begin with a shocking 3-second hook, deliver 3 actionable points, and end with a compelling follow-up question. Format as visual cues and voiceover lines.',
        output_artifact: 'VO: "Did you know AI can now code an entire fullstack SaaS in 30 seconds? Step 1 is using v0..."',
        handoff_bridge: 'Copy the voiceover text lines directly from this script artifact and paste them into Step 2 for voice generation. Use the visual cue lines for Step 3.',
      },
      {
        step: '02',
        role: 'Human Voiceover',
        tool: 'ElevenLabs',
        url: 'https://elevenlabs.io',
        action: 'Convert the script into natural, human-sounding studio voice audio.',
        prompt: 'Select Voice: "Adam" or "Marcus". Set Stability to 45% and Clarity to 75% for dramatic storytelling emotion.',
        output_artifact: 'Exported file: "voiceover_studio.mp3" (320kbps crystal-clear narration).',
        handoff_bridge: 'Download the MP3 voiceover. Take the first 5-second hook sentence to derive the cinematic video prompt for Runway in Step 3.',
      },
      {
        step: '03',
        role: 'AI Video Generation',
        tool: 'Runway Gen-3',
        url: 'https://runwayml.com',
        action: 'Generate cinematic 5-second b-roll video clips corresponding to each scene.',
        prompt: 'Cinematic hyper-realistic 8k drone shot of glowing neon code matrix on futuristic glass, moody blue lighting, dramatic slow camera push-in, 35mm film lens, photorealistic.',
        output_artifact: 'Exported files: 4x 5-second vertical (9:16) MP4 video b-roll clips.',
        handoff_bridge: 'Drag both the ElevenLabs MP3 audio and the Runway MP4 clips onto the Descript timeline in Step 4.',
      },
      {
        step: '04',
        role: 'Captions & Assembly',
        tool: 'Descript',
        url: 'https://descript.com',
        action: 'Sync voice, b-roll, and generate dynamic bouncing colored subtitles.',
        prompt: 'Use "Karaoke Style" bouncing subtitle preset, add subtle whoosh sound effects on transitions, and export in vertical 9:16 format.',
        output_artifact: 'Final Master: 1080x1920 high-retention ready-to-post short video.',
        handoff_bridge: 'Ready to publish directly to YouTube Shorts, TikTok, and Instagram Reels.',
      },
    ],
  },
  {
    id: 'bp-2',
    title: 'Podcast to Viral Shorts Multiplier',
    subtitle: 'Extract 5 high-converting viral video shorts from any PDF, research paper, or document.',
    badge: '2026 Trending Stack',
    category: 'Content & Research',
    outcome: 'Turns 1 boring PDF document into 5 engaging viral shorts weekly.',
    steps: [
      {
        step: '01',
        role: 'Deep Document Research & Audio',
        tool: 'Google NotebookLM',
        url: 'https://notebooklm.google.com',
        action: 'Upload PDF and generate an automated conversational 2-host audio podcast discussion.',
        prompt: 'Upload your document or notes. Click "Generate Audio Overview" to produce an interactive discussion between two AI hosts analyzing the key takeaways.',
        output_artifact: 'Audio file: 12-minute natural conversation with human-sounding banter and humor.',
        handoff_bridge: 'Download the audio overview WAV file and import it into Descript in Step 2 to snip the best 45-second golden nugget.',
      },
      {
        step: '02',
        role: 'Highlight Extraction',
        tool: 'Descript',
        url: 'https://descript.com',
        action: 'Cut the most controversial or mind-blowing 45-second segment from the audio wave.',
        prompt: 'Highlight the key 40-second audio sentence, apply "Studio Sound" at 85% to remove any room reverb, and export as audio/video snippet.',
        output_artifact: 'Clean 45-second audio snippet highlighting the core paradox.',
        handoff_bridge: 'Upload the exported video/audio snippet to Submagic in Step 3 for animated kinetic captions and auto-broll.',
      },
      {
        step: '03',
        role: 'Auto-B-Roll & Viral Captions',
        tool: 'Submagic',
        url: 'https://submagic.co',
        action: 'Automatically generate animated bouncing captions, sound effects, and dynamic b-roll.',
        prompt: 'Select "Hormozi" bold green/yellow caption style, enable Auto B-roll inserts every 4 seconds, and export in 9:16 vertical 4K resolution.',
        output_artifact: 'Fully assembled short with sound effects, auto-zooms, and b-roll.',
        handoff_bridge: 'Post directly to YouTube Shorts and Instagram Reels with trending audio.',
      },
    ],
  },
  {
    id: 'bp-3',
    title: 'Solo Founder 48-Hour SaaS Launch',
    subtitle: 'Build, deploy, and monetize a micro-SaaS web app with zero engineers.',
    badge: 'Zero to Launch in 2 Days',
    category: 'Engineering & Startups',
    outcome: 'Launches fullstack subscription software globally with database & payment gateway.',
    steps: [
      {
        step: '01',
        role: 'Frontend UI Generation',
        tool: 'v0 by Vercel',
        url: 'https://v0.dev',
        action: 'Generate accessible, responsive React & Tailwind components from plain text.',
        prompt: 'Build a modern dark-mode SaaS dashboard with a sidebar, user profile card, analytics chart with glowing gradients, and subscription tier toggle using Tailwind CSS and shadcn/ui.',
        output_artifact: 'React code bundle with clean modular components ready for Next.js App Router.',
        handoff_bridge: 'Copy the generated React component code and paste it into your local Next.js project opened in Cursor in Step 2.',
      },
      {
        step: '02',
        role: 'AI Engineering & Logic',
        tool: 'Cursor AI',
        url: 'https://cursor.com',
        action: 'Wire frontend components with state management, API routes, and logic 10x faster.',
        prompt: 'Generate full Next.js App Router API endpoints to handle user creation, secure session authentication, and data mutations using TypeScript.',
        output_artifact: 'Production-ready Next.js routes with server actions and TypeScript types.',
        handoff_bridge: 'Connect the database connection string and Supabase schema in Step 3.',
      },
      {
        step: '03',
        role: 'Database & Auth',
        tool: 'Supabase',
        url: 'https://supabase.com',
        action: 'Spin up instant PostgreSQL database tables, Row Level Security, and user auth.',
        prompt: 'Create a PostgreSQL table with UUID primary keys, user relationships, row level security policies for authenticated users, and timestamp tracking.',
        output_artifact: 'Live PostgreSQL schema with Row Level Security and API keys.',
        handoff_bridge: 'Set up Lemon Squeezy webhook handler to update user payment_status in Supabase in Step 4.',
      },
      {
        step: '04',
        role: 'Global Payments',
        tool: 'Lemon Squeezy',
        url: 'https://lemonsqueezy.com',
        action: 'Accept international payments, manage subscriptions, and automate sales tax.',
        prompt: 'Configure a hosted checkout link with custom webhook signatures (HMAC-SHA256) to grant instant user permissions upon successful card or Apple Pay checkout.',
        output_artifact: 'Live Lemon Squeezy checkout link handling 135+ currencies.',
        handoff_bridge: 'Deploy repository to Vercel for worldwide edge distribution.',
      },
    ],
  },
  {
    id: 'bp-4',
    title: 'Autonomous Inbound SEO Engine',
    subtitle: 'Research trending topics, write long-form blogs, and rank on Google with zero manual writing.',
    badge: '10x Content Output',
    category: 'Marketing & SEO',
    outcome: 'Ranks on Google for 50+ high-buyer-intent keywords monthly on autopilot.',
    steps: [
      {
        step: '01',
        role: 'Live Web Research',
        tool: 'Perplexity AI',
        url: 'https://perplexity.ai',
        action: 'Discover trending competitor questions and extract real-time web citations.',
        prompt: 'Find the top 10 unanswered questions users are asking about [Niche] on Reddit and forums in 2026/2027. Provide exact source links and user pain points.',
        output_artifact: 'Structured research sheet with 10 validated search queries & citations.',
        handoff_bridge: 'Feed the extracted user pain points and questions into Claude 3.5 in Step 2 as context.',
      },
      {
        step: '02',
        role: 'In-Depth SEO Writing',
        tool: 'Claude 3.5',
        url: 'https://claude.ai',
        action: 'Write a comprehensive 2,500-word guide optimized for Google Search ranking.',
        prompt: 'Write an authoritative, highly practical 2,000-word guide on [Topic]. Include structured H2 and H3 headings, actionable step-by-step instructions, comparison tables, and an FAQ section. Write in a clear, conversational tone without fluff.',
        output_artifact: 'Full authoritative 2,500-word Markdown article ready for CMS publishing.',
        handoff_bridge: 'Take the article H1 title to generate conceptual header visuals in Midjourney in Step 3.',
      },
      {
        step: '03',
        role: 'Header Visuals',
        tool: 'Midjourney',
        url: 'https://midjourney.com',
        action: 'Generate custom 4K editorial header imagery that stands out on Google.',
        prompt: 'Minimalist 3D isometric conceptual illustration representing [Topic], subtle futuristic glassmorphism, soft studio lighting, clean background, 16:9 aspect ratio --ar 16:9 --v 6.1',
        output_artifact: 'High-res 4K webp editorial banner graphic.',
        handoff_bridge: 'Export key article bullet points to Canva AI in Step 4 for social distribution.',
      },
      {
        step: '04',
        role: 'Social Repurposing',
        tool: 'Canva AI',
        url: 'https://canva.com',
        action: 'Turn the blog post into LinkedIn carousels and Twitter/X infographics in 60 seconds.',
        prompt: 'Use Magic Switch to convert the key bullet points into a clean 5-slide dark mode carousel.',
        output_artifact: 'Ready-to-post PDF carousel for LinkedIn & Twitter.',
        handoff_bridge: 'Publish across social media driving referral traffic back to the blog post.',
      },
    ],
  },
  {
    id: 'bp-5',
    title: 'AI Podcaster & Audio Show',
    subtitle: 'Create conversational 2-host audio podcasts without buying microphones or studio equipment.',
    badge: 'Full Audio Production',
    category: 'Audio & Media',
    outcome: 'Publishes weekly 15-minute multi-host podcasts to Spotify and Apple Podcasts.',
    steps: [
      {
        step: '01',
        role: 'Dialogue Scripting',
        tool: 'ChatGPT',
        url: 'https://chat.openai.com',
        action: 'Write realistic natural dialogue between Host A (skeptic) and Host B (expert).',
        prompt: 'Write an engaging 10-minute conversational podcast script between two hosts: Alex (curious interviewer) and Jordan (tech specialist). Topic: [Topic]. Include casual interruptions, conversational fillers, and humor.',
        output_artifact: 'Two-host script tagged with [ALEX] and [JORDAN] dialogue cues.',
        handoff_bridge: 'Copy Host A dialogue into Voice 1 and Host B into Voice 2 in ElevenLabs in Step 2.',
      },
      {
        step: '02',
        role: 'Dual-Voice Generation',
        tool: 'ElevenLabs',
        url: 'https://elevenlabs.io',
        action: 'Generate two distinct human voice actors with emotional pacing.',
        prompt: 'Assign Voice "Marcus" for Alex and Voice "Sarah" for Jordan using Conversational Speech Mode.',
        output_artifact: 'Two distinct WAV audio tracks with expressive human pacing.',
        handoff_bridge: 'Import both audio stems into Descript for mastering and music integration in Step 3.',
      },
      {
        step: '03',
        role: 'Audio Mastering & Cleanup',
        tool: 'Descript',
        url: 'https://descript.com',
        action: 'Add intro music, eliminate background hum, and apply Studio Sound mastering.',
        prompt: 'Apply "Studio Sound" effect at 80% strength, insert ambient lofi intro/outro music track, and export as 320kbps MP3.',
        output_artifact: 'Mastered 320kbps MP3 ready for Spotify & Apple Podcasts RSS feed.',
        handoff_bridge: 'Broadcast to podcast hosting networks.',
      },
    ],
  },
  {
    id: 'bp-6',
    title: 'AI Digital Agency in a Box',
    subtitle: 'Deliver client branding, copywriting, and automated transactional emails in 24 hours.',
    badge: 'Turnkey Agency Stack',
    category: 'Agency & Services',
    outcome: 'Fulfills $2,000+ client branding & marketing retainers with 90% profit margins.',
    steps: [
      {
        step: '01',
        role: 'Brand Copy & Angles',
        tool: 'Jasper AI',
        url: 'https://jasper.ai',
        action: 'Generate client brand voice guidelines, tagline variations, and sales pitches.',
        prompt: 'Create brand positioning guidelines for [Client Business]. Provide 5 headline options, brand tone rules, target audience avatar, and unique value proposition.',
        output_artifact: 'Brand guideline deck with tone of voice, USP, and value props.',
        handoff_bridge: 'Use the brand color palette and keywords to prompt Midjourney in Step 2.',
      },
      {
        step: '02',
        role: 'Visual Identity',
        tool: 'Midjourney',
        url: 'https://midjourney.com',
        action: 'Create modern brand icons, landing page assets, and mockups.',
        prompt: 'Vector geometric brand logo icon for [Company], clean lines, modern typography, minimalist dark background, Behance award-winning style.',
        output_artifact: 'Vector-ready logo assets and visual graphic identity.',
        handoff_bridge: 'Deploy transactional email onboarding sequence using Resend in Step 3.',
      },
      {
        step: '03',
        role: 'Transactional Email Pipeline',
        tool: 'Resend',
        url: 'https://resend.com',
        action: 'Deploy automated onboarding and welcome email sequences via modern React Email.',
        prompt: 'Set up automated transactional email delivery with custom domain DNS authentication and 99.9% inbox deliverability.',
        output_artifact: 'Fully authenticated email pipeline delivering high-inbox onboarding emails.',
        handoff_bridge: 'Hand over completed turnkey client asset package.',
      },
    ],
  },
];

const CHECKOUT_URL = 'https://toptoolshub.lemonsqueezy.com/checkout/buy/f15c1c90-e2b8-45b9-af9c-5d87abeefba4';

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'popular' | 'newest'>('featured');
  
  // 🌟 Stream Toggle: Curated Essentials vs Community Startups
  const [toolStream, setToolStream] = useState<'curated' | 'community' | 'all'>('curated');

  // 3-Way Active View: Tools vs Blueprints vs Utilities
  const [activeView, setActiveView] = useState<'tools' | 'blueprints' | 'utilities'>('tools');

  // Selected Blueprint Modal
  const [selectedBlueprint, setSelectedBlueprint] = useState<any | null>(null);

  // Bookmarks, Upvotes & Compare State
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [upvotes, setUpvotes] = useState<Record<number, number>>({});
  const [hasVoted, setHasVoted] = useState<Record<number, boolean>>({});
  const [compareList, setCompareList] = useState<Tool[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Modals & UI States
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copiedBadge, setCopiedBadge] = useState(false);
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);

  // Submission Plan Choice
  const [submissionPlan, setSubmissionPlan] = useState<'priority' | 'free'>('priority');

  // 🧰 Free Utilities Interactive States
  // 1. AI Token & Cost Estimator
  const [tokenInputText, setTokenInputText] = useState(
    'You are an expert AI system engineer. Analyze this codebase for performance bottlenecks and suggest 3 high-impact optimizations.'
  );
  // 2. Prompt to XML Structurer
  const [rawPromptInput, setRawPromptInput] = useState('Write an email to a client asking for feedback on our new SaaS tool');
  const [roleInput, setRoleInput] = useState('Senior Customer Success Manager');
  // 3. Aspect Ratio Scaler
  const [selectedAspect, setSelectedAspect] = useState<'16:9' | '9:16' | '1:1' | '4:5' | '21:9'>('9:16');
  // 4. QR Code Generator
  const [qrText, setQrText] = useState('https://stackblueprint-io.vercel.app');

  // Toast
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  });

  const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 4000);
  };

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    founder_email: '',
    image_url: '',
    category: 'AI Chat',
    pricing: 'Freemium',
    description: '',
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('toptools_bookmarks');
      if (saved) setBookmarks(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('payment_status', 'paid')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setTools(data as Tool[]);
        const initialVotes: Record<number, number> = {};
        data.forEach((t: Tool) => {
          initialVotes[t.id] = Math.floor(Math.random() * 85) + 20;
        });
        setUpvotes(initialVotes);
      }
    } catch (err) {
      console.error('Error fetching tools:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const toggleBookmark = (id: number) => {
    let updated: number[];
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter((bId) => bId !== id);
      triggerToast('Removed from My Stack');
    } else {
      updated = [...bookmarks, id];
      triggerToast('Saved to My Stack ❤️');
    }
    setBookmarks(updated);
    try {
      localStorage.setItem('toptools_bookmarks', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleCompare = (tool: Tool) => {
    if (compareList.some((t) => t.id === tool.id)) {
      setCompareList(compareList.filter((t) => t.id !== tool.id));
    } else {
      if (compareList.length >= 2) {
        triggerToast('Maximum 2 tools compare kar sakte hain!', 'error');
        return;
      }
      setCompareList([...compareList, tool]);
      triggerToast(`Added ${tool.name} to Comparison ⚖️`);
    }
  };

  const handleVote = (id: number) => {
    if (hasVoted[id]) return;
    setUpvotes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setHasVoted((prev) => ({ ...prev, [id]: true }));
    triggerToast('Upvoted! Thank you 👍');
  };

  // 📋 Copy Full Blueprint with Handoff Bridges
  const handleCopyBlueprint = (bp: any) => {
    let text = `🚀 ${bp.title.toUpperCase()} (Curated on TopTools.io / StackBlueprint)\n`;
    text += `Goal: ${bp.subtitle}\n`;
    text += `Expected Result: ${bp.outcome}\n\n`;
    text += `====================================================\n`;
    text += `STEP-BY-STEP WORKFLOW INSTRUCTIONS & HANDOFF BRIDGES:\n`;
    text += `====================================================\n\n`;

    bp.steps.forEach((st: any, i: number) => {
      text += `[STEP ${st.step}: ${st.role.toUpperCase()}]\n`;
      text += `Tool: ${st.tool} -> ${st.url}\n`;
      text += `Action: ${st.action}\n`;
      text += `Exact Prompt to use:\n"${st.prompt}"\n`;
      if (st.output_artifact) {
        text += `Sample Output Produced:\n"${st.output_artifact}"\n`;
      }
      if (st.handoff_bridge) {
        text += `🔗 The Handoff Bridge to Next Step:\n"${st.handoff_bridge}"\n`;
      }
      text += `\n----------------------------------------------------\n\n`;
    });

    text += `Verified 2026-2027 Workflow Recipe. Discover more on https://stackblueprint-io.vercel.app`;

    navigator.clipboard.writeText(text);
    triggerToast(`📋 Copied Full Step-by-Step Blueprint with Handoff Bridges!`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.founder_email.includes('@') || !formData.founder_email.includes('.')) {
      triggerToast('Please enter a valid email address!', 'error');
      return;
    }
    if (formData.description.trim().length < 20) {
      triggerToast('Description should be at least 20 characters long!', 'error');
      return;
    }

    setSubmitting(true);

    try {
      const cleanUrl = formData.url.startsWith('http') ? formData.url : `https://${formData.url}`;
      
      // 🚀 AUTOMATIC: Visitor submissions are explicitly tagged as community tools!
      const { error } = await supabase.from('tools').insert([
        {
          name: formData.name.trim(),
          url: cleanUrl,
          founder_email: formData.founder_email.trim(),
          image_url: formData.image_url.trim() || null,
          category: formData.category,
          pricing: formData.pricing,
          description: formData.description.trim(),
          featured: false,
          payment_status: 'pending',
          is_community: true, 
        },
      ]);

      if (error) throw error;

      if (submissionPlan === 'priority') {
        triggerToast('Redirecting to Secure Lemon Squeezy Checkout... 💳');
        setTimeout(() => {
          const checkoutRedirect = `${CHECKOUT_URL}?checkout[email]=${encodeURIComponent(formData.founder_email)}&checkout[name]=${encodeURIComponent(formData.name)}`;
          window.location.href = checkoutRedirect;
        }, 1200);
      } else {
        triggerToast('🎉 Tool submitted to Free Queue (45–60 days review).');
        setFormData({
          name: '',
          url: '',
          founder_email: '',
          image_url: '',
          category: 'AI Chat',
          pricing: 'Freemium',
          description: '',
        });
        setTimeout(() => {
          setShowSubmitModal(false);
          setSubmitting(false);
        }, 1500);
      }

    } catch (err: any) {
      console.error(err);
      triggerToast(err.message || 'Error submitting tool', 'error');
      setSubmitting(false);
    }
  };

  // Counts for Dynamic Social Proof
  const curatedCount = tools.filter((t) => !t.is_community).length;
  const communityCount = tools.filter((t) => !!t.is_community).length;

  const filteredTools = tools
    .filter((tool) => {
      // 1. Stream Filter (Curated vs Community vs All)
      if (toolStream === 'curated' && tool.is_community) return false;
      if (toolStream === 'community' && !tool.is_community) return false;

      // 2. Bookmarks Filter
      if (showBookmarksOnly && !bookmarks.includes(tool.id)) return false;

      // 3. Search Term Matching
      const q = searchTerm.toLowerCase();
      const isVoiceSearch = q.includes('voice') || q.includes('audio') || q.includes('speech');
      const isWebsiteSearch = q.includes('website') || q.includes('build') || q.includes('landing');
      const isCodeSearch = q.includes('code') || q.includes('debug') || q.includes('developer');
      const isVideoSearch = q.includes('video') || q.includes('edit') || q.includes('reels');
      const isDesignSearch = q.includes('design') || q.includes('graphic') || q.includes('image');

      const matchesSmartPrompt = 
        (isVoiceSearch && (tool.name.toLowerCase().includes('eleven') || tool.category === 'Marketing')) ||
        (isWebsiteSearch && (tool.name.toLowerCase().includes('v0') || tool.name.toLowerCase().includes('bolt') || tool.category === 'Developer')) ||
        (isCodeSearch && (tool.name.toLowerCase().includes('cursor') || tool.category === 'Developer')) ||
        (isVideoSearch && (tool.name.toLowerCase().includes('runway') || tool.name.toLowerCase().includes('descript'))) ||
        (isDesignSearch && (tool.name.toLowerCase().includes('canva') || tool.name.toLowerCase().includes('midjourney')));

      const matchesStandard =
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q);

      const matchesSearch = searchTerm === '' || matchesStandard || matchesSmartPrompt;
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return (upvotes[b.id] || 0) - (upvotes[a.id] || 0);
      if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      return b.id - a.id;
    });

  const badgeCode = `<a href="https://stackblueprint-io.vercel.app" target="_blank">\n  <img src="https://img.shields.io/badge/Featured_on-TopTools.io-6366f1?style=for-the-badge&logo=rocket" alt="Featured on TopTools" />\n</a>`;

  // Daily Handpicked Discovery Tool
  const dailyTool = tools.find((t) => t.featured && !t.is_community) || tools[0];

  // 🧮 Token Estimator Math (approx ~4 chars = 1 token)
  const estimatedTokens = Math.max(1, Math.ceil(tokenInputText.trim().length / 3.8));
  const costGpt4o = ((estimatedTokens / 1000000) * 2.5).toFixed(6);
  const costClaudeSonnet = ((estimatedTokens / 1000000) * 3.0).toFixed(6);
  const costDeepSeek = ((estimatedTokens / 1000000) * 0.14).toFixed(6);
  const costGroqLlama = ((estimatedTokens / 1000000) * 0.05).toFixed(6);

  // ⚡ XML Prompt Generator Output
  const generatedXmlPrompt = `<system_role>\n${roleInput.trim() || 'AI Specialist'}\n</system_role>\n\n<task_directive>\n${rawPromptInput.trim() || 'Complete the following task accurately.'}\n</task_directive>\n\n<operating_rules>\n1. Provide direct, high-impact responses with zero unnecessary preamble.\n2. Structure output using clear headings and actionable bullet points.\n3. Verify all logic before finalizing output.\n</operating_rules>\n\n<output_format>\nMarkdown with clear actionable steps.\n</output_format>`;

  // 🖼️ Aspect Ratio Dimensions Map
  const aspectConfig = {
    '16:9': { res: '1920 × 1080', label: 'YouTube / Landscape', param: '--ar 16:9' },
    '9:16': { res: '1080 × 1920', label: 'Reels / Shorts / TikTok', param: '--ar 9:16' },
    '1:1': { res: '1080 × 1080', label: 'Square Post / Profile', param: '--ar 1:1' },
    '4:5': { res: '1080 × 1350', label: 'Instagram Portrait Feed', param: '--ar 4:5' },
    '21:9': { res: '2560 × 1080', label: 'Ultra-wide Cinematic', param: '--ar 21:9' },
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white relative flex flex-col justify-between overflow-x-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[850px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-transparent blur-[120px] pointer-events-none" />

      {toast.show && (
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center space-x-2.5 px-4 py-3 rounded-2xl bg-slate-900/95 border border-slate-700 text-white shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300 max-w-[90vw]">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-medium">{toast.message}</span>
        </div>
      )}

      <div>
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-900/40 text-[11px] sm:text-xs py-2 px-3 text-center text-slate-300">
          <span className="font-semibold text-indigo-300">⚡ Verified 2026-2027 Index:</span> Hand-picked AI tools, workflow blueprints, and visitor startups.
          <button 
            onClick={() => setShowBadgeModal(true)} 
            className="ml-2 underline text-indigo-400 hover:text-indigo-300 inline-flex items-center space-x-1"
          >
            <span>Get Badge</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Navbar */}
        <nav className="border-b border-slate-800/80 bg-[#07090e]/85 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 sm:p-2 rounded-xl shadow-lg shadow-indigo-500/20">
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="font-black text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                TopTools<span className="text-indigo-400">.io</span>
              </span>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link
                href="/company"
                className="hidden sm:inline-flex text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-xl border border-slate-800/80 hover:border-slate-700 transition"
              >
                Hitesh Innovation
              </Link>

              <button
                onClick={() => { setShowBookmarksOnly(!showBookmarksOnly); setActiveView('tools'); }}
                className={`flex items-center space-x-1 text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border transition ${
                  showBookmarksOnly
                    ? 'bg-rose-950/80 border-rose-600 text-rose-300 font-bold shadow-lg shadow-rose-900/30'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-rose-400 text-rose-400' : 'text-slate-400'}`} />
                <span className="hidden xs:inline">My Stack</span>
                <span className="bg-slate-800 text-slate-200 text-[10px] px-1.5 py-0.2 rounded-full">
                  {bookmarks.length}
                </span>
              </button>

              <button
                onClick={() => setShowSubmitModal(true)}
                className="flex items-center space-x-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-semibold text-xs sm:text-sm transition shadow-lg shadow-indigo-600/25 active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Tool</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="max-w-4xl mx-auto px-4 pt-10 sm:pt-14 pb-8 text-center relative z-10">
          
          {/* 🟢 DYNAMIC SOCIAL PROOF BADGE */}
          <div className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-full text-indigo-300 text-[11px] sm:text-xs font-semibold mb-4 sm:mb-6 shadow-inner flex-wrap justify-center gap-1">
            <span className="flex items-center space-x-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{curatedCount}+ Curated Giants</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-purple-300">{communityCount} Community Startups Live</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">480+ in Review Queue</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4 sm:mb-5 leading-tight">
            Discover the Best Software <br className="hidden xs:block" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              & Next-Gen AI Blueprints
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            Explore single tools, full multi-tool AI automation recipes with live handoff bridges, and 2026 developer utilities.
          </p>

          {/* 3-WAY VIEW SWITCHER */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6 shadow-2xl flex-wrap justify-center gap-1">
            <button
              onClick={() => { setActiveView('tools'); setShowBookmarksOnly(false); }}
              className={`flex items-center space-x-1.5 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeView === 'tools'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Browse Tools ({tools.length})</span>
            </button>

            <button
              onClick={() => setActiveView('blueprints')}
              className={`flex items-center space-x-1.5 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeView === 'blueprints'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Workflow className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>⚡ AI Blueprints & Handoffs</span>
            </button>

            <button
              onClick={() => setActiveView('utilities')}
              className={`flex items-center space-x-1.5 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeView === 'utilities'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>🧰 2026 Developer Utilities</span>
              <span className="bg-emerald-400 text-slate-950 text-[10px] uppercase font-black px-1.5 py-0.2 rounded-md ml-1">
                New
              </span>
            </button>
          </div>

          {/* Search bar & Prompts (Only in 'tools' mode) */}
          {activeView === 'tools' && (
            <>
              <div className="relative max-w-xl mx-auto group mb-4">
                <Bot className="w-5 h-5 text-indigo-400 absolute left-4 top-3.5 transition group-focus-within:scale-110" />
                <input
                  type="text"
                  placeholder="Ask AI or search by keyword, use-case (e.g. Canva, Video, Website)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-12 pr-10 py-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition shadow-xl"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')} 
                    className="absolute right-4 top-4 text-slate-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Alternatives Quick Click Filters */}
              <div className="flex items-center justify-center flex-wrap gap-1.5 text-xs text-slate-400 mb-3">
                <span className="text-[11px] text-slate-500 flex items-center space-x-1 mr-1">
                  <span>⚡ Quick Alternatives:</span>
                </span>
                {ALTERNATIVE_TAGS.map((alt) => (
                  <button
                    key={alt.name}
                    onClick={() => setSearchTerm(alt.query)}
                    className="text-[10px] sm:text-[11px] bg-indigo-950/40 border border-indigo-900/50 text-indigo-300 hover:bg-indigo-900/50 px-2.5 py-1 rounded-lg transition font-medium"
                  >
                    {alt.name}
                  </button>
                ))}
              </div>

              {/* AI Quick Prompts */}
              <div className="flex items-center justify-center flex-wrap gap-1.5 text-xs text-slate-400 mb-6">
                <span className="text-[11px] text-slate-500 flex items-center space-x-1 mr-1">
                  <Sparkle className="w-3 h-3 text-amber-400" />
                  <span>Try:</span>
                </span>
                {AI_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setSearchTerm(prompt)}
                    className="text-[10px] sm:text-[11px] bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 hover:text-indigo-300 px-2.5 py-1 rounded-lg transition"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Category Pills */}
              <div className="flex overflow-x-auto no-scrollbar gap-2 py-1 justify-start sm:justify-center px-2 mb-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setShowBookmarksOnly(false); }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition tracking-wide ${
                      selectedCategory === cat && !showBookmarksOnly
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </>
          )}
        </header>

        {/* 🌟 TODAY'S DAILY HANDPICKED DISCOVERY (SPOTLIGHT CARD) */}
        {activeView === 'tools' && dailyTool && !showBookmarksOnly && searchTerm === '' && selectedCategory === 'All' && toolStream !== 'community' && (
          <section className="max-w-5xl mx-auto px-4 mb-10 relative z-10">
            <div className="bg-gradient-to-r from-indigo-950/80 via-purple-950/50 to-slate-900 border border-indigo-500/50 rounded-3xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center space-x-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-amber-300" />
                      <span>Today Handpicked Discovery</span>
                    </span>
                    <span className="text-[11px] text-slate-400">Featured Software #{dailyTool.id}</span>
                  </div>

                  <h3 className="text-2xl font-black text-white">{dailyTool.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    {dailyTool.description}
                  </p>
                </div>

                <div className="flex items-center space-x-2.5 self-start sm:self-auto shrink-0">
                  <Link
                    href={`/tool/${dailyTool.id}`}
                    className="text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold px-4 py-2.5 rounded-xl transition"
                  >
                    View Review & Alternatives
                  </Link>
                  <a
                    href={dailyTool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center space-x-1"
                  >
                    <span>Launch Tool</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 🧰 VIEW 3: NEXT-GEN 2026 DEVELOPER & AI UTILITIES (SUPER UNIQUE) */}
        {activeView === 'utilities' && (
          <main className="max-w-5xl mx-auto px-4 pb-28 relative z-10 space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 font-bold uppercase tracking-widest bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Sign-Up Required • 100% In-Browser Private</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white mb-2">2026 Developer & AI Utilities</h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                Next-generation client-side tools designed for modern prompt engineers, indie hackers, and SaaS builders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* UTILITY 1: AI TOKEN COUNTER & LIVE API COST ESTIMATOR */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2.5 mb-3">
                    <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">AI Token & API Cost Estimator</h3>
                      <p className="text-xs text-slate-400">Calculate tokens and compare exact API costs across frontier models.</p>
                    </div>
                  </div>

                  <textarea
                    rows={4}
                    value={tokenInputText}
                    onChange={(e) => setTokenInputText(e.target.value)}
                    placeholder="Paste your prompt or code here..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono"
                  />

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-center">
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <span className="block text-slate-500 text-[10px] uppercase font-bold">Tokens</span>
                      <strong className="text-lg text-indigo-400 font-black">{estimatedTokens.toLocaleString()}</strong>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <span className="block text-slate-500 text-[10px] uppercase font-bold">Claude 3.5</span>
                      <strong className="text-xs text-emerald-400 font-mono block mt-1">${costClaudeSonnet}</strong>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <span className="block text-slate-500 text-[10px] uppercase font-bold">GPT-4o</span>
                      <strong className="text-xs text-slate-200 font-mono block mt-1">${costGpt4o}</strong>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <span className="block text-slate-500 text-[10px] uppercase font-bold">DeepSeek / Groq</span>
                      <strong className="text-xs text-cyan-300 font-mono block mt-1">${costDeepSeek}</strong>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-800">
                  <span>Characters: {tokenInputText.length}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`Tokens: ${estimatedTokens} | Claude Cost: $${costClaudeSonnet}`);
                      triggerToast('Token calculation copied!');
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold"
                  >
                    Copy Token Stats ↗
                  </button>
                </div>
              </div>

              {/* UTILITY 2: FRONTIER XML PROMPT ARCHITECT */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2.5 mb-3">
                    <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">Frontier XML Prompt Architect</h3>
                      <p className="text-xs text-slate-400">Convert raw thoughts into elite XML-structured frontier prompts.</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <input
                      type="text"
                      value={roleInput}
                      onChange={(e) => setRoleInput(e.target.value)}
                      placeholder="Role (e.g. Senior SaaS Architect)..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      value={rawPromptInput}
                      onChange={(e) => setRawPromptInput(e.target.value)}
                      placeholder="Core task..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="bg-slate-950 rounded-xl border border-slate-800 p-3 mb-4 max-h-32 overflow-y-auto font-mono text-[11px] text-purple-200 whitespace-pre-wrap leading-relaxed">
                    {generatedXmlPrompt}
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedXmlPrompt);
                    triggerToast('XML Structured Prompt Copied! 📋');
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Formatted XML Prompt</span>
                </button>
              </div>

              {/* UTILITY 3: AI IMAGE & VIDEO ASPECT RATIO SCALER */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2.5 mb-3">
                    <div className="p-2.5 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">AI Image Aspect Ratio Scaler</h3>
                      <p className="text-xs text-slate-400">Generate exact pixel resolutions and parameters for Midjourney & Runway.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {(Object.keys(aspectConfig) as Array<keyof typeof aspectConfig>).map((key) => (
                      <button
                        key={key}
                        onClick={() => setSelectedAspect(key)}
                        className={`p-2.5 rounded-xl border text-left transition ${
                          selectedAspect === key
                            ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="block text-xs font-mono font-bold">{key}</span>
                        <span className="text-[10px] text-slate-400 block">{aspectConfig[key].label.split('/')[0]}</span>
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5 mb-4 font-mono text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Exact Resolution:</span>
                      <strong className="text-white">{aspectConfig[selectedAspect].res}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Midjourney / Flux Param:</span>
                      <strong className="text-cyan-300">{aspectConfig[selectedAspect].param}</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${aspectConfig[selectedAspect].param} --v 6.1 --stylize 250`);
                    triggerToast(`Copied: ${aspectConfig[selectedAspect].param}`);
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 rounded-xl transition"
                >
                  Copy AI Image Parameters
                </button>
              </div>

              {/* UTILITY 4: INSTANT QR CODE GENERATOR */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2.5 mb-3">
                    <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">Instant QR Code Generator</h3>
                      <p className="text-xs text-slate-400">Generate high-res downloadable QR codes for any startup link.</p>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={qrText}
                    onChange={(e) => setQrText(e.target.value)}
                    placeholder="Enter website link..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  <div className="flex justify-center p-3 bg-slate-950 rounded-2xl border border-slate-800 mb-3">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(qrText || 'https://stackblueprint-io.vercel.app')}&bgcolor=0b0e14&color=ffffff`}
                      alt="Generated QR Code"
                      className="w-28 h-28 rounded-lg"
                    />
                  </div>
                </div>

                <a
                  href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qrText || 'https://stackblueprint-io.vercel.app')}`}
                  target="_blank"
                  download="qrcode.png"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 rounded-xl transition text-center block"
                >
                  Download Full-Res QR Code
                </a>
              </div>

            </div>
          </main>
        )}

        {/* VIEW 1: AI WORKFLOW BLUEPRINTS ROADMAPS (WITH HANDOFF BRIDGES) */}
        {activeView === 'blueprints' && (
          <main className="max-w-5xl mx-auto px-4 pb-28 relative z-10 space-y-8">
            <div className="bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-800/40 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
              <div className="flex items-start space-x-3 mb-4">
                <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white">What is a Chained AI Workflow Blueprint?</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    Single tools solve only 10% of a task. A <strong>Chained Blueprint</strong> shows how Step 1's output directly fuels Step 2's prompt via <strong>Handoff Bridges</strong>, so you don't waste hours improvising.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-indigo-900/40 text-xs text-slate-300">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Output ➡️ Input Handoffs:</strong> Clear data flow instructions between tools.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Pre-Tested Prompts:</strong> Zero wasted credits on trial-and-error.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Real Assembly Lines:</strong> Complete business outcomes in 15 minutes.</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {BLUEPRINTS.map((bp) => (
                <div
                  key={bp.id}
                  className="bg-slate-900/70 border border-indigo-900/40 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-indigo-500/50 transition duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl sm:text-2xl font-black text-white">{bp.title}</h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-950 text-indigo-300 border border-indigo-800/60 px-2.5 py-0.5 rounded-full">
                          {bp.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">{bp.subtitle}</p>
                    </div>

                    <div className="flex items-center space-x-2 self-start sm:self-auto">
                      <button
                        onClick={() => setSelectedBlueprint(bp)}
                        className="inline-flex items-center space-x-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-3.5 py-2 rounded-xl transition"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                        <span>View Handoff Guide</span>
                      </button>

                      <button
                        onClick={() => handleCopyBlueprint(bp)}
                        className="inline-flex items-center space-x-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3.5 py-2 rounded-xl transition shadow-lg shadow-indigo-600/20"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Roadmap</span>
                      </button>
                    </div>
                  </div>

                  {/* Visual Step Handoff Preview */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                    {bp.steps.map((st, i) => (
                      <div key={st.step} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 relative">
                        <span className="text-[10px] font-bold text-indigo-400 block mb-1">STEP {st.step}</span>
                        <h4 className="text-sm font-black text-white mb-0.5">{st.tool}</h4>
                        <span className="text-[11px] text-slate-500 line-clamp-1">{st.role}</span>
                        {i < bp.steps.length - 1 && (
                          <ArrowRight className="hidden sm:block w-4 h-4 text-slate-700 absolute -right-2.5 top-1/2 -translate-y-1/2 z-10" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
                    <span><strong>Expected Result:</strong> {bp.outcome}</span>
                    <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Handoff Pipeline</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* VIEW 2: STANDARD DIRECTORY TOOLS GRID */}
        {activeView === 'tools' && (
          <>
            <section className="max-w-6xl mx-auto px-4 mb-6 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-5">
              
              {/* 🌟 STREAM CONTROLLER (Curated vs Community Tabs) */}
              <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 w-full sm:w-auto">
                <button
                  onClick={() => setToolStream('curated')}
                  className={`flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition flex-1 sm:flex-none justify-center ${
                    toolStream === 'curated'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  <span>⭐ Curated Essentials ({curatedCount})</span>
                </button>

                <button
                  onClick={() => setToolStream('community')}
                  className={`flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition flex-1 sm:flex-none justify-center ${
                    toolStream === 'community'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  <span>🚀 Community Startups ({communityCount})</span>
                </button>

                <button
                  onClick={() => setToolStream('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition hidden md:block ${
                    toolStream === 'all' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  All ({tools.length})
                </button>
              </div>

              {/* Sort Controllers */}
              <div className="flex items-center space-x-1.5 text-xs overflow-x-auto no-scrollbar self-end sm:self-auto">
                <span className="text-slate-500 text-[11px] mr-1">Sort:</span>
                <button
                  onClick={() => setSortBy('featured')}
                  className={`px-2.5 py-1 rounded-lg transition flex items-center space-x-1 whitespace-nowrap ${
                    sortBy === 'featured' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Star className="w-3 h-3 text-amber-400" />
                  <span>Featured</span>
                </button>
                <button
                  onClick={() => setSortBy('popular')}
                  className={`px-2.5 py-1 rounded-lg transition flex items-center space-x-1 whitespace-nowrap ${
                    sortBy === 'popular' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <TrendingUp className="w-3 h-3 text-indigo-400" />
                  <span>Popular</span>
                </button>
                <button
                  onClick={() => setSortBy('newest')}
                  className={`px-2.5 py-1 rounded-lg transition flex items-center space-x-1 whitespace-nowrap ${
                    sortBy === 'newest' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3 h-3 text-purple-400" />
                  <span>Newest</span>
                </button>
              </div>
            </section>

            <main className="max-w-6xl mx-auto px-4 pb-28 relative z-10">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-3">
                  <Loader2 className="w-7 h-7 animate-spin text-indigo-400" />
                  <p className="text-sm">Fetching verified software directory...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {filteredTools.map((tool) => (
                    <div
                      key={tool.id}
                      className={`group relative bg-slate-900/50 border rounded-2xl overflow-hidden flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-sm shadow-xl ${
                        tool.is_community 
                          ? 'border-purple-500/40 bg-gradient-to-b from-purple-950/20 via-slate-900/70 to-slate-900/90 shadow-purple-950/30'
                          : tool.featured
                          ? 'border-indigo-500/40 shadow-indigo-950/40 bg-gradient-to-b from-indigo-950/15 via-slate-900/60 to-slate-900/90'
                          : 'border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      {/* Clickable Image */}
                      <Link href={`/tool/${tool.id}`} className="relative w-full h-44 bg-slate-950/80 border-b border-slate-800/70 overflow-hidden group/img block">
                        <img
                          src={tool.image_url || `https://v1.screenshot.11ty.dev/${encodeURIComponent(tool.url)}/opengraph/`}
                          alt={tool.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleBookmark(tool.id);
                          }}
                          title={bookmarks.includes(tool.id) ? 'Remove from My Stack' : 'Save to My Stack'}
                          className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/70 hover:bg-slate-900 backdrop-blur-md border border-slate-700/80 text-white transition active:scale-90 z-20"
                        >
                          {bookmarks.includes(tool.id) ? (
                            <BookmarkCheck className="w-4 h-4 text-rose-400 fill-rose-400" />
                          ) : (
                            <Bookmark className="w-4 h-4 text-slate-300 hover:text-white" />
                          )}
                        </button>

                        <div className="absolute bottom-3 left-3 flex items-center space-x-1.5">
                          <span className="text-[11px] font-semibold text-white bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/60 flex items-center space-x-1">
                            <Globe className="w-3 h-3 text-indigo-400" />
                            <span>{tool.category}</span>
                          </span>

                          {tool.is_community && (
                            <span className="text-[10px] font-bold text-purple-300 bg-purple-950/90 backdrop-blur-md px-2 py-1 rounded-lg border border-purple-800 flex items-center space-x-1">
                              <Rocket className="w-3 h-3 text-purple-400" />
                              <span>Community Launch</span>
                            </span>
                          )}
                        </div>
                      </Link>

                      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center space-x-2">
                                <Link href={`/tool/${tool.id}`} className="font-bold text-base sm:text-lg text-white group-hover:text-indigo-300 transition">
                                  {tool.name}
                                </Link>
                                {tool.featured && (
                                  <span className="flex items-center space-x-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md">
                                    <Flame className="w-3 h-3 fill-amber-400" />
                                    <span>Featured</span>
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] font-medium text-slate-500 mt-0.5 block">
                                {tool.is_community ? '🌐 Visitor Website' : `Verified Core #${tool.id}`}
                              </span>
                            </div>

                            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${
                              tool.pricing === 'Free'
                                ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-400'
                                : tool.pricing === 'Paid'
                                ? 'bg-purple-950/40 border-purple-800/40 text-purple-400'
                                : 'bg-slate-800/80 border-slate-700/50 text-slate-300'
                            }`}>
                              {tool.pricing}
                            </span>
                          </div>

                          <p className="text-slate-400 text-xs sm:text-sm mb-5 leading-relaxed line-clamp-2">
                            {tool.description}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-4 text-xs">
                            <button
                              onClick={() => toggleCompare(tool)}
                              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg border text-[11px] transition ${
                                compareList.some((t) => t.id === tool.id)
                                ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300 font-bold'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              <Scale className="w-3 h-3" />
                              <span>{compareList.some((t) => t.id === tool.id) ? 'Comparing' : 'Compare'}</span>
                            </button>

                            <button
                              onClick={() => handleVote(tool.id)}
                              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg border transition ${
                                hasVoted[tool.id]
                                  ? 'bg-indigo-600 border-indigo-500 text-white'
                                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                              }`}
                            >
                              <ThumbsUp className="w-3 h-3" />
                              <span className="font-semibold">{upvotes[tool.id] || 24}</span>
                            </button>
                          </div>

                          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                            <Link href={`/tool/${tool.id}`} className="text-[11px] text-indigo-400 hover:underline">
                              Full Review ↗
                            </Link>
                            <a
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1 text-sm font-semibold text-slate-300 hover:text-white transition group/link"
                            >
                              <span>Visit Tool</span>
                              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && filteredTools.length === 0 && (
                <div className="text-center py-20 text-slate-500 space-y-3">
                  <p className="text-lg">No tools found matching your search.</p>
                  <button
                    onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setShowBookmarksOnly(false); setToolStream('all'); }}
                    className="text-xs text-indigo-400 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </main>
          </>
        )}
      </div>

      {/* 🌟 DETAILED BLUEPRINT MODAL WITH REDDIT HANDOFF BRIDGES */}
      {selectedBlueprint && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#0b0e14] border border-slate-800 rounded-3xl max-w-3xl w-full p-5 sm:p-8 relative shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-900/60">
                  {selectedBlueprint.badge}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">{selectedBlueprint.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedBlueprint(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
              {selectedBlueprint.subtitle}
            </p>

            <div className="space-y-6 mb-6">
              {selectedBlueprint.steps.map((st: any, idx: number) => (
                <div key={st.step} className="space-y-3">
                  <div className="bg-slate-950/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-black text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-md border border-indigo-900/60">
                          STEP {st.step}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-white">{st.tool} — {st.role}</h4>
                      </div>
                      <a
                        href={st.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-indigo-400 hover:underline inline-flex items-center space-x-1"
                      >
                        <span>Open Tool</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{st.action}</p>

                    {/* Step Prompt */}
                    <div className="relative mt-2">
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                        Exact Prompt to Input:
                      </div>
                      <pre className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-[11px] text-indigo-200 font-mono whitespace-pre-wrap leading-relaxed">
                        {st.prompt}
                      </pre>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(st.prompt);
                          setCopiedPromptIndex(idx);
                          triggerToast('Prompt copied to clipboard! 📋');
                          setTimeout(() => setCopiedPromptIndex(null), 2000);
                        }}
                        className="absolute right-2 top-6 bg-slate-800 hover:bg-slate-700 text-white p-1.5 rounded-lg text-xs transition"
                        title="Copy Prompt"
                      >
                        {copiedPromptIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
                      </button>
                    </div>

                    {/* 📦 SAMPLE OUTPUT ARTIFACT (What this tool produces) */}
                    {st.output_artifact && (
                      <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-3 text-xs">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                          📦 Output Artifact Produced:
                        </span>
                        <p className="text-[11px] font-mono text-slate-300">{st.output_artifact}</p>
                      </div>
                    )}
                  </div>

                  {/* 🔗 THE HANDOFF BRIDGE (How this step feeds the next step) */}
                  {st.handoff_bridge && idx < selectedBlueprint.steps.length - 1 && (
                    <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-transparent border border-indigo-900/50 rounded-xl text-xs text-indigo-300">
                      <ArrowDown className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" />
                      <div>
                        <strong className="text-[10px] uppercase tracking-wider text-amber-400 block">
                          The Handoff Bridge ➡️ Feeding into Step {selectedBlueprint.steps[idx + 1].step}:
                        </strong>
                        <span className="text-[11px] text-slate-300">{st.handoff_bridge}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={() => handleCopyBlueprint(selectedBlueprint)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition flex items-center justify-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Full Roadmap with Handoff Bridges</span>
              </button>
              <button
                onClick={() => setSelectedBlueprint(null)}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 px-6 rounded-xl text-xs sm:text-sm transition text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Compare Action Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0d1117] border border-indigo-500/50 shadow-2xl rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 flex items-center space-x-3 sm:space-x-4 backdrop-blur-xl animate-in slide-in-from-bottom-5 w-[92%] sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-xs text-slate-300">
              Selected <strong>{compareList.length}/2</strong> tools
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              disabled={compareList.length < 2}
              onClick={() => setShowCompareModal(true)}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold text-xs px-3 py-1.5 rounded-xl transition"
            >
              Compare
            </button>
            <button
              onClick={() => setCompareList([])}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompareModal && compareList.length === 2 && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b0e14] border border-slate-800 rounded-3xl max-w-2xl w-full p-5 sm:p-8 relative shadow-2xl">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center space-x-2">
                <Scale className="w-5 h-5 text-indigo-400" />
                <span>Side-by-Side Comparison</span>
              </h2>
              <button onClick={() => setShowCompareModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
              {compareList.map((tool) => (
                <div key={tool.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 sm:space-y-4">
                  <h3 className="font-bold text-base sm:text-lg text-white">{tool.name}</h3>
                  <span className="inline-block text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-950/60 border border-indigo-900/50 text-indigo-300">
                    {tool.category}
                  </span>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed min-h-[50px] line-clamp-3">{tool.description}</p>
                  <div className="pt-3 border-t border-slate-800 flex justify-around text-xs">
                    <div>
                      <span className="block text-slate-500 text-[10px]">Pricing</span>
                      <strong className="text-white text-xs">{tool.pricing}</strong>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-[10px]">Votes</span>
                      <strong className="text-indigo-400 text-xs">{upvotes[tool.id] || 25} 👍</strong>
                    </div>
                  </div>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs py-2 rounded-xl transition"
                  >
                    Visit {tool.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Submit Tool Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#0b0e14] border border-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-7 relative shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">Submit Your Tool</h2>
              <button 
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-rose-950/40 border border-rose-800/50 text-rose-300 p-2.5 rounded-xl text-[11px] mb-4 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong>High Demand:</strong> Free review queue is at 98% capacity (480+ startups waiting).
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <button
                type="button"
                onClick={() => setSubmissionPlan('priority')}
                className={`p-3 rounded-2xl border text-left transition relative ${
                  submissionPlan === 'priority'
                    ? 'bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border-indigo-500 ring-2 ring-indigo-500/40'
                    : 'bg-slate-900/60 border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white flex items-center space-x-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>Priority</span>
                  </span>
                  <span className="text-xs font-extrabold text-indigo-400">$29</span>
                </div>
                <p className="text-[10px] text-indigo-200">Live in 24h + Homepage Featured Slot 🔥</p>
              </button>

              <button
                type="button"
                onClick={() => setSubmissionPlan('free')}
                className={`p-3 rounded-2xl border text-left transition ${
                  submissionPlan === 'free'
                    ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/40'
                    : 'bg-slate-900/60 border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-300 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Free Queue</span>
                  </span>
                  <span className="text-xs font-bold text-slate-400">$0</span>
                </div>
                <p className="text-[10px] text-slate-400">Standard Queue (Takes 45–60 days wait)</p>
              </button>
            </div>

            <div className="mb-4">
              <button
                type="button"
                onClick={() => setShowPlanDetails(!showPlanDetails)}
                className="w-full flex items-center justify-between text-[11px] text-indigo-400 hover:text-indigo-300 py-1 font-medium"
              >
                <span>Compare Free vs $29 Plan (What is included?)</span>
                {showPlanDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showPlanDetails && (
                <div className="mt-2 bg-slate-950 border border-slate-800/90 rounded-xl p-3 text-[11px] space-y-2 text-slate-300">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Review Speed</span>
                    <span><strong>Free:</strong> 45-60 Days | <strong className="text-indigo-400">Paid:</strong> 24 Hours</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Placement</span>
                    <span><strong>Free:</strong> Category end | <strong className="text-indigo-400">Paid:</strong> Homepage Featured</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Google SEO Backlink</span>
                    <span><strong>Free:</strong> No-follow | <strong className="text-indigo-400">Paid:</strong> High Authority Do-Follow</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Listing Guarantee</span>
                    <span><strong>Free:</strong> Not guaranteed | <strong className="text-indigo-400">Paid:</strong> 100% Guaranteed</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Tool Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MyAwesomeAI"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Website URL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://myawesomeai.com"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Founder Contact Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="founder@yourcompany.com"
                  value={formData.founder_email}
                  onChange={(e) => setFormData({ ...formData, founder_email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Custom Image URL (Optional)</span>
                  <span className="text-[10px] text-slate-500 lowercase font-normal">Auto-generates if blank</span>
                </label>
                <input
                  type="url"
                  placeholder="https://mysite.com/banner.png"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Pricing Model
                  </label>
                  <select
                    value={formData.pricing}
                    onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Free">Free</option>
                    <option value="Freemium">Freemium</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Short Description (Min 20 chars) *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Explain what your software does in 2 sentences..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Submission...</span>
                  </>
                ) : (
                  <span>
                    {submissionPlan === 'priority' ? 'Skip The Backlog — Launch Now ($29)' : 'Submit to Free Queue (Wait 45–60 Days)'}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="w-full text-slate-500 hover:text-white text-xs py-1 transition text-center"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Advanced 4-Column Footer */}
      <footer className="border-t border-slate-800/80 bg-[#05070a] text-slate-400 text-sm relative z-10 pt-12 pb-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 rounded-lg">
                  <Rocket className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-base sm:text-lg text-white">TopTools.io</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                The world leading index of curated software, modern AI models, and productive SaaS tools for 2026-2027 and beyond.
              </p>
              <div className="flex items-center space-x-2 text-xs text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All systems operational</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Categories</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => { setSelectedCategory('AI Chat'); setActiveView('tools'); }} className="hover:text-white transition">AI Chatbots</button></li>
                <li><button onClick={() => { setSelectedCategory('Developer'); setActiveView('tools'); }} className="hover:text-white transition">Developer APIs</button></li>
                <li><button onClick={() => { setSelectedCategory('Design'); setActiveView('tools'); }} className="hover:text-white transition">Image & Video AI</button></li>
                <li><button onClick={() => { setSelectedCategory('Productivity'); setActiveView('tools'); }} className="hover:text-white transition">Workflow & Notes</button></li>
                <li><button onClick={() => { setSelectedCategory('Marketing'); setActiveView('tools'); }} className="hover:text-white transition">SEO & Growth</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">For Founders</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setShowSubmitModal(true)} className="hover:text-white transition">Submit Your Tool</button></li>
                <li><button onClick={() => setShowBadgeModal(true)} className="hover:text-white transition">Get Featured Badge</button></li>
                <li><Link href="/company" className="hover:text-white transition">Hitesh Innovation Studio</Link></li>
                <li><span className="text-slate-600">API Access (Coming Soon)</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Platform</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="/sitemap.xml" target="_blank" className="hover:text-white transition">Live Sitemap</a></li>
                <li><a href="/robots.txt" target="_blank" className="hover:text-white transition">Robots.txt</a></li>
                <li><span className="text-slate-500">Privacy Policy</span></li>
                <li><span className="text-slate-500">Terms of Service</span></li>
                <li><span className="text-slate-500">DMCA Guidelines</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-3">
            <p>© 2026 TopTools.io — Built & Curated by Hitesh Chaturvedi 🚀</p>
            <div className="flex items-center space-x-3">
              <Link href="/company" className="hover:text-slate-300 transition">Hitesh Innovation IT</Link>
              <span>•</span>
              <span>Built with your support ❤️</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Founder Badge Modal */}
      {showBadgeModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b0e14] border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
            <h2 className="text-2xl font-black text-white mb-2">Embed Founder Badge</h2>
            <p className="text-slate-400 text-sm mb-6">
              Showcase that your software is verified on TopTools.io to gain buyer trust.
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 mb-4 text-center">
              <p className="text-xs text-slate-500 mb-3">Live Badge Preview:</p>
              <div className="inline-block bg-indigo-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-lg">
                🚀 Featured on TopTools.io
              </div>
            </div>

            <div className="relative mb-6">
              <pre className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-indigo-300 font-mono overflow-x-auto">
                {badgeCode}
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(badgeCode);
                  setCopiedBadge(true);
                  setTimeout(() => setCopiedBadge(false), 2000);
                }}
                className="absolute right-2 top-2 bg-slate-800 hover:bg-slate-700 text-white p-1.5 rounded-lg transition"
              >
                {copiedBadge ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={() => setShowBadgeModal(false)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 rounded-xl text-sm transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}