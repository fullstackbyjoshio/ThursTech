import { Helmet } from "react-helmet-async";
import { business } from "../data/business";

const SITE_URL = "https://www.thurstech.com.ng";
const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon.svg`;
const DEFAULT_TITLE = "THURSTECH Nigeria Limited";

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.legalName,
  url: SITE_URL,
  telephone: business.phonesIntl,
  email: business.email,
  areaServed: {
    "@type": "Country",
    name: "Nigeria",
  },
};

function resolveCanonical(canonical) {
  if (!canonical) return undefined;
  return new URL(canonical, SITE_URL).toString();
}

export default function SEO({
  title = DEFAULT_TITLE,
  description,
  canonical,
  type = "website",
  jsonLd,
  image = DEFAULT_OG_IMAGE,
}) {
  const pageTitle = title.includes(business.legalName) ? title : `${title} | ${business.legalName}`;
  const canonicalUrl = resolveCanonical(canonical);
  const structuredData = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={pageTitle} />
      {description && <meta property="og:description" content={description} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={image.startsWith("http") ? image : new URL(image, SITE_URL).toString()} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={business.legalName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image.startsWith("http") ? image : new URL(image, SITE_URL).toString()} />
      {structuredData.map((schema, index) => (
        <script key={`${schema["@type"] || "schema"}-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}