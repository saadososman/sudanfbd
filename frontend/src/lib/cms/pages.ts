import {
  getFallbackPage,
  STATIC_PAGE_SLUGS,
  type StaticPageSlug
} from "@/lib/cms/fallbacks-pages";
import {
  mapPageSections,
  mapSeo,
  strapiFetch,
  unwrapCollectionItems
} from "@/lib/cms/client";
import { mergePageWithCms } from "@/lib/cms/page-merge";
import type { CmsPage } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

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

export function isStaticPageSlug(slug: string): slug is StaticPageSlug {
  return (STATIC_PAGE_SLUGS as readonly string[]).includes(slug);
}

export async function fetchPageBySlug(locale: Locale, slug: StaticPageSlug): Promise<CmsPage> {
  const fallback = getFallbackPage(slug, locale);

  const payload = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    `/api/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&${pagePopulate}&pagination[pageSize]=1`,
    { locale, revalidate: 300, tags: [`page-${slug}-${locale}`] }
  );

  const items = unwrapCollectionItems(payload);
  if (!items.length) return fallback;

  const fields = items[0] as PagePayload;
  const cmsSections = mapPageSections(fields.sections);
  const merged = mergePageWithCms(fallback, cmsSections);

  return {
    slug,
    title: typeof fields.title === "string" && fields.title.trim() ? fields.title : merged.title,
    intro: typeof fields.intro === "string" && fields.intro.trim() ? fields.intro : merged.intro,
    seo: mapSeo(fields as Record<string, unknown>) ?? merged.seo,
    sections: merged.sections
  };
}
