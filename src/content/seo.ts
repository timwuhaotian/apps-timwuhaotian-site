import type { Metadata, MetadataRoute } from "next";
import {
  AppContent,
  PolicyKind,
  apps,
  getAppBySlug,
  getAppRoutes,
} from "@/content/apps";

type JsonLdNode = Record<string, unknown>;

export type JsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
};

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://apps-timwuhaotian-site.vercel.app"
).replace(/\/$/, "");

export const siteName = "Apps by Tim Wu Haotian";

export const siteDescription =
  "Official app directory for Tim Wu Haotian's iOS and web apps, with product introductions, support links, privacy policies, and terms.";

export const aiCrawlerUserAgents = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "anthropic-ai",
] as const;

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: `${siteName} | Indie iOS & Web App Directory`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: "/",
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/apps/duetshot/screenshot-1.png",
        width: 540,
        height: 1170,
        alt: "DuetShot product screenshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/apps/duetshot/screenshot-1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export function getAppMetadata(
  app: AppContent,
  page: "intro" | PolicyKind,
): Metadata {
  const routes = getAppRoutes(app);
  const path = page === "intro" ? routes.intro : routes[page];
  const title = getPageTitle(app, page);
  const description = getPageDescription(app, page);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      type: "website",
      images: [
        {
          url: app.icon,
          alt: `${app.name} app icon`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [app.icon],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function buildSitemap(): MetadataRoute.Sitemap {
  const homeDate = latestDate(apps.flatMap((app) => getAppDates(app)));
  const homeEntry = {
    url: siteUrl,
    lastModified: new Date(homeDate),
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  return [
    homeEntry,
    ...apps.flatMap((app) => buildAppSitemapEntries(app)),
  ];
}

export function buildRobots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: aiCrawlerUserAgents.map((bot) => bot),
        disallow: ["/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

export function buildHomeJsonLd(): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Tim Wu Haotian",
        url: siteUrl,
        email: "timmy.wu@hotmail.com",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        description: siteDescription,
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
      {
        "@type": "ItemList",
        name: siteName,
        description: siteDescription,
        numberOfItems: apps.length,
        itemListElement: apps.map((app, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(getAppRoutes(app).intro),
          item: buildSoftwareApplication(app),
        })),
      },
    ],
  };
}

export function buildAppJsonLd(slug: string): JsonLdGraph {
  const app = getAppBySlug(slug);

  if (!app) {
    return {
      "@context": "https://schema.org",
      "@graph": [],
    };
  }

  const routes = getAppRoutes(app);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Apps",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: app.name,
            item: absoluteUrl(routes.intro),
          },
        ],
      },
      buildSoftwareApplication(app),
      {
        "@type": "FAQPage",
        mainEntity: getAppFaqs(app).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export function getAppFaqs(app: AppContent) {
  return [
    {
      question: `What is ${app.name}?`,
      answer: `${app.summary} Core workflow: ${summarizeFeature(app.features[0])}.`,
    },
    {
      question: `Which platforms does ${app.name} support?`,
      answer: `${app.name} supports ${app.platforms.join(", ")}.`,
    },
    {
      question: `How does ${app.name} handle data?`,
      answer: `${app.policyProfile.storage} ${app.policyProfile.sharing}`,
    },
  ];
}

export function serializeJsonLd(data: JsonLdGraph) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function buildAppSitemapEntries(app: AppContent): MetadataRoute.Sitemap {
  const routes = getAppRoutes(app);
  const introDate = latestDate(getAppDates(app));

  return [
    {
      url: absoluteUrl(routes.intro),
      lastModified: new Date(introDate),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [app.icon, ...app.screenshots].map(absoluteUrl),
    },
    {
      url: absoluteUrl(routes.privacy),
      lastModified: new Date(app.privacyUpdatedAt),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: absoluteUrl(routes.terms),
      lastModified: new Date(app.termsUpdatedAt),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}

function buildSoftwareApplication(app: AppContent): JsonLdNode {
  const routes = getAppRoutes(app);
  const externalLinks = [app.websiteUrl, app.appStoreUrl].filter(
    (url): url is string => Boolean(url),
  );

  const schema: JsonLdNode = {
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl(routes.intro)}#software`,
    name: app.name,
    description: app.summary,
    applicationCategory: getApplicationCategory(app),
    operatingSystem: app.platforms.join(", "),
    image: absoluteUrl(app.icon),
    url: absoluteUrl(routes.intro),
    sameAs: externalLinks,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };

  if (externalLinks.length > 0) {
    schema.sameAs = externalLinks;
  }

  return schema;
}

function getPageTitle(app: AppContent, page: "intro" | PolicyKind) {
  if (page === "privacy") {
    return `${app.name} Privacy Policy`;
  }

  if (page === "terms") {
    return `${app.name} Terms of Use`;
  }

  return app.name;
}

function getPageDescription(app: AppContent, page: "intro" | PolicyKind) {
  if (page === "privacy") {
    return `Privacy policy for ${app.name}, including data use, storage, sharing, permissions, and support contacts.`;
  }

  if (page === "terms") {
    return `Terms of use for ${app.name}, including accepted use, paid features, availability, and support contacts.`;
  }

  return app.summary;
}

function getAppDates(app: AppContent) {
  return [app.privacyUpdatedAt, app.termsUpdatedAt];
}

function latestDate(dates: string[]) {
  return dates.reduce((latest, date) => (date > latest ? date : latest));
}

function summarizeFeature(feature: string) {
  return feature.replace(/^Simultaneous\s+/i, "").replace(/\.$/, "");
}

function getApplicationCategory(app: AppContent) {
  if (app.slug === "duetshot") {
    return "MultimediaApplication";
  }

  if (app.slug === "scholar-daily") {
    return "EducationalApplication";
  }

  if (app.slug === "kodda") {
    return "BusinessApplication";
  }

  return "ProductivityApplication";
}

function absoluteUrl(urlOrPath: string) {
  if (urlOrPath.startsWith("http")) {
    return urlOrPath;
  }

  return `${siteUrl}${urlOrPath.startsWith("/") ? "" : "/"}${urlOrPath}`;
}
