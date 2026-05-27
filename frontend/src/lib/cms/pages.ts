import { getFallbackPage } from "@/lib/cms/fallbacks-pages";
import {
  mapPageSections,
  mapSeo,
  strapiFetch,
  unwrapCollectionItems
} from "@/lib/cms/client";
import {
  CONTENT_PAGE_SLUGS,
  PAGE_SLUGS,
  type ContentPageSlug,
  type PageSlug
} from "@/lib/cms/constants";
import { mergePageWithCms } from "@/lib/cms/page-merge";
import type { CmsPage } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

export {
  CONTENT_PAGE_SLUGS,
  LISTING_PAGE_SLUGS,
  PAGE_SLUGS,
  STATIC_PAGE_SLUGS,
  type ContentPageSlug,
  type ListingPageSlug,
  type PageSlug,
  type StaticPageSlug
} from "@/lib/cms/constants";

type PagePayload = {
  slug?: string;
  title?: string;
  intro?: string;
  seo?: unknown;
  sections?: unknown;
};

const pagePopulate =
  "populate[sections][on][sections.about-section][populate]=*" +
  "&populate[sections][on][sections.objectives-section][populate][cards]=*" +
  "&populate[sections][on][sections.methodology-section][populate][cards]=*" +
  "&populate[sections][on][sections.framework-section][populate]=*" +
  "&populate[sections][on][sections.mission-values-section][populate]=*" +
  "&populate[sections][on][sections.rich-content-section][populate][cards]=*" +
  "&populate[sections][on][sections.cta-banner-section][populate][cta]=*" +
  "&populate[seo][populate][ogImage]=*";

export function isStaticPageSlug(slug: string): slug is ContentPageSlug {
  return (CONTENT_PAGE_SLUGS as readonly string[]).includes(slug);
}

export function isPageSlug(slug: string): slug is PageSlug {
  return (PAGE_SLUGS as readonly string[]).includes(slug);
}

export async function fetchPageBySlug(
  locale: Locale,
  slug: PageSlug
): Promise<CmsPage> {
  const fallback = getFallbackPage(slug, locale);

  const payload = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    `/api/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&${pagePopulate}&pagination[pageSize]=1`,
    { locale, revalidate: 300, tags: [`page-${slug}-${locale}`] }
  );

  const items = unwrapCollectionItems(payload);
  if (!items.length) return fallback;

  const fields = items[0] as PagePayload;

  if (isStaticPageSlug(slug)) {
    const cmsSections = mapPageSections(fields.sections);
    const merged = mergePageWithCms(fallback, cmsSections);

    return {
      slug,
      title:
        typeof fields.title === "string" && fields.title.trim() ? fields.title : merged.title,
      intro:
        typeof fields.intro === "string" && fields.intro.trim() ? fields.intro : merged.intro,
      seo: mapSeo(fields as Record<string, unknown>) ?? merged.seo,
      sections: merged.sections
    };
  }

  return {
    slug,
    title:
      typeof fields.title === "string" && fields.title.trim() ? fields.title : fallback.title,
    intro:
      typeof fields.intro === "string" && fields.intro.trim() ? fields.intro : fallback.intro,
    seo: mapSeo(fields as Record<string, unknown>) ?? fallback.seo,
    sections: mapPageSections(fields.sections)
  };
}
