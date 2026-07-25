export default function ArticleContentStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          .article-content > div:not(.article-youtube),
          .article-content > p {
            margin-bottom: 24px;
            font-size: 17px;
            line-height: 1.8;
            color: #A3A3A3;
          }
          /* Retours à la ligne dans un paragraphe : pas le même écart qu’entre modules */
          .article-content > div:not(.article-youtube) > div,
          .article-content > div:not(.article-youtube) p,
          .article-content > p > div,
          .article-content > p p {
            margin: 0;
            font-size: inherit;
            line-height: inherit;
            color: inherit;
          }
          .article-content h2 {
            font-size: 32px;
            font-weight: 700;
            color: #fff;
            margin-top: 56px;
            margin-bottom: 40px;
            line-height: 1.25;
            letter-spacing: -0.01em;
          }
          .article-content h2:not(:first-child) {
            padding-top: 48px;
          }
          .article-content h3 {
            font-size: 20px;
            font-weight: 600;
            color: #E8E8E8;
            margin-top: 48px;
            margin-bottom: 40px;
            line-height: 1.45;
          }
          .article-content a {
            color: #fff;
            text-decoration: underline;
            text-underline-offset: 3px;
          }
          .article-content em,
          .article-content i {
            font-style: italic;
          }
          .article-content strong,
          .article-content b {
            font-weight: 700;
          }
          .article-content blockquote {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 24px;
            background: #111;
            border-radius: 16px;
            padding: 48px 40px 40px;
            margin: 48px 0;
            border: 1px solid rgba(255,255,255,0.08);
            overflow: hidden;
          }
          .article-content blockquote::before {
            content: '';
            position: absolute;
            top: 16px;
            left: 24px;
            width: 120px;
            height: 120px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M14.017 18v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: top left;
            background-size: contain;
            opacity: 0.06;
            pointer-events: none;
          }
          .article-content blockquote p {
            font-size: 24px;
            font-style: italic;
            font-weight: 600;
            line-height: 1.6;
            color: #fff;
            margin: 0;
          }
          .article-content blockquote footer {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .article-content blockquote footer img {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            object-fit: cover;
            flex-shrink: 0;
          }
          .article-content blockquote footer div {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .article-content blockquote footer strong {
            font-size: 16px;
            font-weight: 600;
            color: #fff;
          }
          .article-content blockquote footer span {
            font-size: 14px;
            font-weight: 500;
            color: #7F7F7F;
          }
          .article-content blockquote .blockquote-source,
          .article-content blockquote cite.blockquote-source {
            display: block;
            margin-top: -8px;
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: 1.5;
            color: #7F7F7F;
          }
          .article-content blockquote .blockquote-source a {
            color: #A3A3A3;
            text-decoration: underline;
            text-underline-offset: 3px;
          }
          .article-content blockquote .blockquote-source a:hover {
            color: #fff;
          }
          .article-content figure {
            width: 100%;
            display: flex;
            flex-direction: column;
            margin: 48px 0;
          }
          .article-content figure > div {
            width: 100%;
            aspect-ratio: 4/3;
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.08);
            cursor: pointer;
          }
          .article-content figure > div > img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          .article-content figure > div:hover > img {
            transform: scale(1.05);
          }
          .article-content figcaption {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            margin-top: 8px;
            padding: 0;
            gap: 4px;
            text-align: right;
          }
          .article-content figcaption span:first-child {
            font-size: 13px;
            color: #A3A3A3;
            width: 100%;
            text-align: right;
            line-height: 1.45;
          }
          .article-content figcaption span:first-child:empty {
            display: none;
          }
          .article-content figcaption span:last-child {
            font-size: 11px;
            color: #7F7F7F;
            font-weight: 300;
            text-transform: uppercase;
            letter-spacing: 0.025em;
            width: 100%;
            text-align: right;
            line-height: 1.4;
          }
          .article-content figcaption span:last-child:empty {
            display: none;
          }
          .article-content ul,
          .article-content ol {
            padding-left: 24px;
            margin-bottom: 24px;
            color: #A3A3A3;
          }
          .article-content img {
            max-width: 100%;
            height: auto;
          }
          .article-content .article-youtube {
            width: 100%;
            display: flex;
            justify-content: center;
            margin: 48px 0;
          }
          .article-content .article-youtube-inner {
            width: 100%;
            max-width: 800px;
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.08);
          }
          .article-content .article-youtube-inner iframe {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            border: none;
          }
          @media (max-width: 900px) {
            .article-content h2 {
              font-size: 26px;
              margin-top: 48px;
              margin-bottom: 36px;
            }
            .article-content h2:not(:first-child) {
              padding-top: 40px;
            }
            .article-content h3 {
              font-size: 18px;
              margin-top: 40px;
              margin-bottom: 36px;
            }
            .article-content blockquote {
              padding: 40px 24px 32px;
              margin: 40px 0;
            }
            .article-content blockquote::before {
              top: 12px;
              left: 16px;
              width: 80px;
              height: 80px;
            }
            .article-content blockquote p {
              font-size: 20px;
            }
          }
        `,
      }}
    />
  );
}
