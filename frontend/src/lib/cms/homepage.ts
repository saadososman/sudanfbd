import { getFallbackHomepage } from "@/lib/cms/fallbacks-homepage";
import {
  mapHomeSections,
  mapSeo,
  strapiFetch,
  unwrapSingleType
} from "@/lib/cms/client";
import type { CmsHomepage } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

type HomepagePayload = {
  seo?: unknown;
  sections?: unknown;
};

export async function fetchHomepage(locale: Locale): Promise<CmsHomepage> {
  const fallback = getFallbackHomepage(locale);

  const payload = await strapiFetch<{ data?: Record<string, unknown> | null }>(
    "/api/homepage?populate[sections][populate]=*&populate[seo][populate][ogImage]=*",
    { locale, revalidate: 300, tags: [`homepage-${locale}`] }
  );

  const fields = unwrapSingleType<HomepagePayload>(payload);
  if (!fields) return fallback;

  const sections = mapHomeSections(fields.sections);

  if (!sections.length) {
    return fallback;
  }

  return {
    seo: mapSeo(fields) ?? fallback.seo,
    sections
  };
}
