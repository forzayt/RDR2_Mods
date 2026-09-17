export interface SeoOptions {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

const SITE_NAME = "RDR2 Mods";
const SITE_DOMAIN = "rdr2mods.com";
const DEFAULT_ORIGIN = `https://${SITE_DOMAIN}`;
const DEFAULT_OG_IMAGE = "/banner.png";
const DEFAULT_OG_WIDTH = 1983;
const DEFAULT_OG_HEIGHT = 793;

/**
 * Ensures an image path or URL is returned as a fully qualified absolute URL
 * required for WhatsApp, Twitter/X, Discord, and Open Graph link previews.
 */
function toAbsoluteUrl(pathOrUrl?: string): string {
  if (!pathOrUrl) {
    return `${DEFAULT_ORIGIN}${DEFAULT_OG_IMAGE}`;
  }
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const cleanPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${DEFAULT_ORIGIN}${cleanPath}`;
}

/**
 * Formats canonical route path into a clean absolute URL.
 */
function getCanonicalUrl(path?: string): string {
  if (!path || path === "/") {
    return `${DEFAULT_ORIGIN}/`;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${DEFAULT_ORIGIN}${cleanPath}`;
}

/**
 * Generates 2026 standardized meta tags, Open Graph (WhatsApp/Discord/Social),
 * Twitter Cards, AI crawler directives (AEO/GEO), and Schema.org JSON-LD scripts.
 */
export function generateSeoMeta(options: SeoOptions) {
  const {
    title,
    description,
    keywords = [],
    path = "/",
    image = DEFAULT_OG_IMAGE,
    imageWidth = DEFAULT_OG_WIDTH,
    imageHeight = DEFAULT_OG_HEIGHT,
    imageAlt = "RDR2 Mods - Red Dead Redemption 2 Modding Hub",
    type = "website",
    publishedTime,
    modifiedTime,
    noindex = false,
    jsonLd,
  } = options;

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const absoluteImageUrl = toAbsoluteUrl(image);
  const canonicalUrl = getCanonicalUrl(path);

  // Default 2026 keywords for search engines & AI discovery
  const defaultKeywords = [
    "RDR2 Mods",
    "Red Dead Redemption 2 Mods",
    "RDR2 Script Hook",
    "Lenny Mod Loader",
    "LML Mods",
    "RedM Scripts",
    "RDR2 PC Mods",
    "RDR2 Trainers",
    "ASI Mods",
    "ReShade Presets RDR2",
  ];

  const mergedKeywords = Array.from(new Set([...keywords, ...defaultKeywords])).join(", ");

  const robotsDirective = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const meta: Array<{ name?: string; property?: string; content: string }> = [
    // Standard SEO Tags
    { name: "title", content: fullTitle },
    { name: "description", content: description },
    { name: "keywords", content: mergedKeywords },
    { name: "author", content: SITE_NAME },
    { name: "publisher", content: SITE_NAME },
    { name: "robots", content: robotsDirective },
    { name: "googlebot", content: robotsDirective },
    { name: "bingbot", content: robotsDirective },
    { name: "rating", content: "General" },
    { name: "revisit-after", content: "1 days" },

    // Open Graph Tags (WhatsApp, Facebook, Discord, LinkedIn, Slack, Telegram)
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:type", content: type },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: absoluteImageUrl },
    { property: "og:image:secure_url", content: absoluteImageUrl },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: String(imageWidth) },
    { property: "og:image:height", content: String(imageHeight) },
    { property: "og:image:alt", content: imageAlt },
    { property: "og:locale", content: "en_US" },

    // Twitter / X Card Tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@rdr2mods" },
    { name: "twitter:creator", content: "@rdr2mods" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: absoluteImageUrl },
    { name: "twitter:image:alt", content: imageAlt },

    // Mobile & PWA Theme Metadata
    { name: "theme-color", content: "#0f0f11" },
    { name: "color-scheme", content: "dark light" },
    { name: "application-name", content: SITE_NAME },
    { name: "apple-mobile-web-app-title", content: SITE_NAME },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
  ];

  if (publishedTime) {
    meta.push({ property: "article:published_time", content: publishedTime });
  }
  if (modifiedTime) {
    meta.push({ property: "article:modified_time", content: modifiedTime });
  }

  const links: Array<{ rel: string; href: string; type?: string; sizes?: string; crossOrigin?: string }> = [
    { rel: "canonical", href: canonicalUrl },
  ];

  const scripts: Array<{ type: string; children: string }> = [];

  if (jsonLd) {
    const rawJsonLd = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    rawJsonLd.forEach((item) => {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify(item),
      });
    });
  }

  return {
    meta,
    links,
    scripts,
  };
}

/**
 * Pre-configured JSON-LD structured data generators for AEO and GEO AI crawlers.
 */
export const SchemaOrg = {
  website: () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RDR2 Mods",
    url: DEFAULT_ORIGIN,
    description: "The primary hub for Red Dead Redemption 2 single player mods, Script Hook scripts, LML packages, and RedM server resources.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${DEFAULT_ORIGIN}/catalog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }),

  organization: () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RDR2 Mods Hub",
    url: DEFAULT_ORIGIN,
    logo: `${DEFAULT_ORIGIN}/rdr2modslg.png`,
    sameAs: [
      "https://github.com/forzayt/RDR2_Mods",
    ],
    description: "Open community repository and knowledge base for Red Dead Redemption 2 modding.",
  }),

  dataCatalog: () => ({
    "@context": "https://schema.org",
    "@type": "DataCatalog",
    name: "RDR2 Mod Catalog",
    description: "Collection of open source and community mods for Red Dead Redemption 2.",
    url: `${DEFAULT_ORIGIN}/catalog`,
    provider: {
      "@type": "Organization",
      name: "RDR2 Mods",
    },
  }),

  faqPage: (faqs: Array<{ question: string; answer: string }>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }),

  breadcrumb: (items: Array<{ name: string; item: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: crumb.item.startsWith("http") ? crumb.item : `${DEFAULT_ORIGIN}${crumb.item}`,
    })),
  }),

  techArticle: (article: { title: string; description: string; path: string }) => ({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    url: `${DEFAULT_ORIGIN}${article.path}`,
    inLanguage: "en-US",
    author: {
      "@type": "Organization",
      name: "RDR2 Mods",
    },
    publisher: {
      "@type": "Organization",
      name: "RDR2 Mods",
      logo: {
        "@type": "ImageObject",
        url: `${DEFAULT_ORIGIN}/rdr2modslg.png`,
      },
    },
  }),
};
