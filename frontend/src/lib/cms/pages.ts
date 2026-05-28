import { getFallbackPage } from "@/lib/cms/fallbacks-pages";
import {
  logStrapiFetch,
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

const pagePopulate = "populate=*";

function mapCmsPage(fields: PagePayload, slug: PageSlug, fallback: CmsPage): CmsPage {
  const cmsSections = mapPageSections(fields.sections);

  return {
    slug,
    title:
      typeof fields.title === "string" && fields.title.trim() ? fields.title : fallback.title,
    intro:
      typeof fields.intro === "string" && fields.intro.trim() ? fields.intro : fallback.intro,
    seo: mapSeo(fields as Record<string, unknown>) ?? fallback.seo,
    sections: cmsSections.length > 0 ? cmsSections : fallback.sections
  };
}

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

  const { data: payload, meta } = await strapiFetch<{
    data?: Record<string, unknown>[] | null;
  }>(
    `/api/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&${pagePopulate}&pagination[pageSize]=1`,
    { locale }
  );

  const items = unwrapCollectionItems(payload);
  if (!items.length) {
    logStrapiFetch(`page:${slug}`, locale, meta, true);
    return fallback;
  }

  const page = mapCmsPage(items[0] as PagePayload, slug, fallback);
  logStrapiFetch(`page:${slug}`, locale, meta, false);
  return page;
}
