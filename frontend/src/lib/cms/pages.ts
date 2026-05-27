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
import type { CmsPage } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

type PagePayload = {
  slug?: string;
  title?: string;
  intro?: string;
  seo?: unknown;
  sections?: unknown;
};

export function isStaticPageSlug(slug: string): slug is StaticPageSlug {
  return (STATIC_PAGE_SLUGS as readonly string[]).includes(slug);
}

export async function fetchPageBySlug(locale: Locale, slug: StaticPageSlug): Promise<CmsPage> {
  const fallback = getFallbackPage(slug, locale);

  const payload = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    `/api/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[sections][populate]=*&populate[seo][populate][ogImage]=*&pagination[pageSize]=1`,
    { locale, revalidate: 300, tags: [`page-${slug}-${locale}`] }
  );

  const items = unwrapCollectionItems(payload);
  if (!items.length) return fallback;

  const fields = items[0] as PagePayload;
  const sections = mapPageSections(fields.sections);

  if (!sections.length) return fallback;

  return {
    slug,
    title: typeof fields.title === "string" && fields.title ? fields.title : fallback.title,
    intro: typeof fields.intro === "string" && fields.intro ? fields.intro : fallback.intro,
    seo: mapSeo(fields as Record<string, unknown>) ?? fallback.seo,
    sections
  };
}
