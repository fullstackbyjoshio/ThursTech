import { Helmet } from "react-helmet-async";

const SITE_NAME = "THURSTECH Nigeria Limited";
const SITE_URL = "https://www.thurstech.com.ng";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Per-page SEO tags: unique title/description, canonical URL, Open Graph and
 * Twitter card. Pass `path` (e.g. "/services/ac-repair") so canonical and
 * og:url are correct for that page, never the homepage.
 */
export default function Seo({ title, description, path = "/", image, type = "website", schema }) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const imageUrl = image?.startsWith("http") ? image : new URL(image || DEFAULT_OG_IMAGE, SITE_URL).toString();
  const schemaJson = schema ? JSON.stringify(schema).replace(/</g, "\\u003c") : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {schemaJson && <script type="application/ld+json">{schemaJson}</script>}
    </Helmet>
  );
}
