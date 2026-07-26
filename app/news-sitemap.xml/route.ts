import { createClient } from '@supabase/supabase-js';
import { parseArticleMeta } from '@/lib/article-meta';
import { SITE_NAME, SITE_URL } from '@/lib/site-config';
import { escapeXml } from '@/lib/seo';

export const revalidate = 60;

/** Google News sitemap — articles des 48 dernières heures (exigence Google) */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const empty = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
</urlset>`;

  if (!url || !key) {
    return new Response(empty, {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    });
  }

  const supabase = createClient(url, key);
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
  const now = new Date().toISOString();

  const { data: rows } = await supabase
    .schema('redaction')
    .from('articles')
    .select(
      'title, slug, published_at, updated_at, cover_image_url, thumbnail_url, module_content, display_author'
    )
    .eq('status', 'published')
    .gte('published_at', twoDaysAgo)
    .lte('published_at', now)
    .order('published_at', { ascending: false })
    .limit(1000);

  const urls = (rows ?? [])
    .map((row) => {
      const meta = parseArticleMeta(row.module_content);
      const image = row.cover_image_url || row.thumbnail_url;
      const keywords = [meta.category, ...meta.tags]
        .filter(Boolean)
        .slice(0, 10)
        .join(', ');
      const lastmod = row.updated_at || row.published_at;

      return `
  <url>
    <loc>${escapeXml(`${SITE_URL}/articles/${row.slug}`)}</loc>
    ${lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : ''}
    <news:news>
      <news:publication>
        <news:name>${escapeXml(SITE_NAME)}</news:name>
        <news:language>fr</news:language>
      </news:publication>
      <news:publication_date>${escapeXml(row.published_at)}</news:publication_date>
      <news:title><![CDATA[${row.title}]]></news:title>
      ${keywords ? `<news:keywords><![CDATA[${keywords}]]></news:keywords>` : ''}
    </news:news>
    ${
      image
        ? `<image:image>
      <image:loc>${escapeXml(image)}</image:loc>
      <image:title><![CDATA[${row.title}]]></image:title>
    </image:image>`
        : ''
    }
  </url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  });
}
