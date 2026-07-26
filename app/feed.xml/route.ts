import { createClient } from '@supabase/supabase-js';
import { parseArticleMeta } from '@/lib/article-meta';
import { escapeXml, guessImageMimeType } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site-config';

export const revalidate = 300;

const EDITORIAL_EMAIL = 'redaction@theirmemory.org';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    const empty = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(SITE_NAME)}</title><link>${escapeXml(SITE_URL)}</link></channel></rss>`;
    return new Response(empty, {
      headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
    });
  }

  const supabase = createClient(url, key);
  const now = new Date().toISOString();

  const { data: rows } = await supabase
    .schema('redaction')
    .from('articles')
    .select(
      'title, slug, published_at, updated_at, html_content, module_content, display_author, cover_image_url, thumbnail_url'
    )
    .eq('status', 'published')
    .lte('published_at', now)
    .order('published_at', { ascending: false })
    .limit(50);

  const items = (rows ?? [])
    .map((row) => {
      const meta = parseArticleMeta(row.module_content);
      const image = row.cover_image_url || row.thumbnail_url;
      const plainText =
        row.html_content?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() ?? '';
      const description = meta.excerpt || plainText.slice(0, 300);
      const authorName = row.display_author?.trim() || 'Rédaction Their memory';
      const link = `${SITE_URL}/articles/${row.slug}`;
      const mime = image ? guessImageMimeType(image) : null;

      return `
    <item>
      <title><![CDATA[${row.title}]]></title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${new Date(row.published_at!).toUTCString()}</pubDate>
      ${row.updated_at ? `<dc:date>${escapeXml(row.updated_at)}</dc:date>` : ''}
      <description><![CDATA[${description}]]></description>
      <content:encoded><![CDATA[${plainText.slice(0, 4000)}]]></content:encoded>
      <category><![CDATA[${meta.category}]]></category>
      ${meta.tags.map((tag) => `<category><![CDATA[${tag}]]></category>`).join('\n      ')}
      <author>${escapeXml(`${EDITORIAL_EMAIL} (${authorName})`)}</author>
      <dc:creator><![CDATA[${authorName}]]></dc:creator>
      ${
        image
          ? `<enclosure url="${escapeXml(image)}" type="${mime}" length="0" />
      <media:content url="${escapeXml(image)}" medium="image" type="${mime}">
        <media:title><![CDATA[${row.title}]]></media:title>
      </media:content>
      <media:thumbnail url="${escapeXml(image)}" />`
          : ''
      }
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Articles</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>Les derniers articles publiés par ${escapeXml(SITE_NAME)} : histoire, mémoire, Résistance et actualités.</description>
    <language>fr-fr</language>
    <copyright>© ${new Date().getFullYear()} ${escapeXml(SITE_NAME)}</copyright>
    <managingEditor>${escapeXml(`${EDITORIAL_EMAIL} (Rédaction Their memory)`)}</managingEditor>
    <webMaster>${escapeXml('info@theirmemory.org (Their memory)')}</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>30</ttl>
    <image>
      <url>${escapeXml(`${SITE_URL}/images/avatar_noir.png`)}</url>
      <title>${escapeXml(SITE_NAME)}</title>
      <link>${escapeXml(SITE_URL)}</link>
    </image>
    <atom:link href="${escapeXml(`${SITE_URL}/feed.xml`)}" rel="self" type="application/rss+xml" />
    <atom:link href="${escapeXml(`${SITE_URL}/news-sitemap.xml`)}" rel="related" type="application/xml" />
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
