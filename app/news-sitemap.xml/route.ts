import { createClient } from '@supabase/supabase-js';
import { SITE_NAME, SITE_URL } from '@/lib/site-config';

export const revalidate = 60;

/** Google News sitemap — articles des 2 derniers jours */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    const empty = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
    return new Response(empty, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
  }

  const supabase = createClient(url, key);

  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
  const now = new Date().toISOString();

  const { data: rows } = await supabase
    .schema('redaction')
    .from('articles')
    .select('title, slug, published_at')
    .eq('status', 'published')
    .gte('published_at', twoDaysAgo)
    .lte('published_at', now)
    .order('published_at', { ascending: false });

  const urls = (rows ?? [])
    .map(
      (row) => `
  <url>
    <loc>${SITE_URL}/articles/${row.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${SITE_NAME}</news:name>
        <news:language>fr</news:language>
      </news:publication>
      <news:publication_date>${row.published_at}</news:publication_date>
      <news:title><![CDATA[${row.title}]]></news:title>
    </news:news>
  </url>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  });
}
