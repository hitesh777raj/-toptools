import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://toptools-seven.vercel.app';

  // 1. Supabase se saare approved tools nikalo
  const { data: tools } = await supabase
    .from('tools')
    .select('id, created_at')
    .eq('payment_status', 'paid');

  // 🌍 Global Countries Targeting (USA, UK, Global Default)
  const getGlobalAlternates = (url: string) => ({
    languages: {
      'x-default': url, // ✅ Universal: Har country ke Google ke liye!
      'en-US': url,     // ✅ United States (America)
      'en-GB': url,     // ✅ United Kingdom (London / UK)
      'en-CA': url,     // ✅ Canada
      'en-AU': url,     // ✅ Australia
    },
  });

  // 2. Har tool ka dedicated Global International URL
  const toolUrls = (tools || []).map((tool) => {
    const url = `${baseUrl}/tool/${tool.id}`;
    return {
      url,
      lastModified: new Date(tool.created_at || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: getGlobalAlternates(url),
    };
  });

  // 3. Core Pages with Worldwide Targeting
  const corePages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
      alternates: getGlobalAlternates(baseUrl),
    },
    {
      url: `${baseUrl}/proofs.html`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: getGlobalAlternates(`${baseUrl}/proofs.html`),
    },
  ];

  return [...corePages, ...toolUrls];
}