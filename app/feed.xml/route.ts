import { createClient } from '@supabase/supabase-js';
import { parseArticleMeta } from '@/lib/article-meta';
import { SITE_NAME, SITE_URL } from '@/lib/site-config';

export const revalidate = 300;

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    const empty = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${SITE_NAME}</title><link>${SITE_URL}</link></channel></rss>`;
    return new Response(empty, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
  }

  const supabase = createClient(url, key);

  const now = new Date().toISOString();

  const { data: rows } = await supabase
    .schema('redaction')
    .from('articles')
    .select('title, slug, published_at, html_content, module_content, display_author, cover_image_url, thumbnail_url')
    .eq('status', 'published')
    .lte('published_at', now)
    .order('published_at', { ascending: false })
    .limit(50);

  const items = (rows ?? []).map((row) => {
    const meta = parseArticleMeta(row.module_content);
    const image = row.cover_image_url || row.thumbnail_url;
    const plainText = row.html_content?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() ?? '';
    const description = meta.excerpt || plainText.slice(0, 300);

    return `
    <item>
      <title><![CDATA[${row.title}]]></title>
      <link>${SITE_URL}/articles/${row.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/articles/${row.slug}</guid>
      <pubDate>${new Date(row.published_at!).toUTCString()}</pubDate>
      <description><![CDATA[${description}]]></description>
      ${image ? `<enclosure url="${image}" type="image/jpeg" />` : ''}
      <category><![CDATA[${meta.category}]]></category>
      ${row.display_author ? `<author>${row.display_author}</author>` : ''}
    </item>`;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${SITE_NAME} — Articles</title>
    <link>${SITE_URL}</link>
    <description>Les derniers articles publiés par ${SITE_NAME}.</description>
    <language>fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
