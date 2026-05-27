import {
  mapPageSections,
  mapSeo,
  strapiFetch,
  unwrapCollectionItems
} from "@/lib/cms/client";
import {
  STATIC_PAGE_SLUGS,
  type StaticPageSlug
} from "@/lib/cms/constants";
import type { CmsPage } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

export { STATIC_PAGE_SLUGS, type StaticPageSlug } from "@/lib/cms/constants";

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

export async function fetchPageBySlug(
  locale: Locale,
  slug: StaticPageSlug
): Promise<CmsPage | null> {
  const payload = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    `/api/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&${pagePopulate}&pagination[pageSize]=1`,
    { locale, revalidate: 300, tags: [`page-${slug}-${locale}`] }
  );

  const items = unwrapCollectionItems(payload);
  if (!items.length) return null;

  const fields = items[0] as PagePayload;

  return {
    slug,
    title: typeof fields.title === "string" ? fields.title : "",
    intro: typeof fields.intro === "string" ? fields.intro : undefined,
    seo: mapSeo(fields as Record<string, unknown>),
    sections: mapPageSections(fields.sections)
  };
}
