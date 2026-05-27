import { getFallbackHomepage } from "@/lib/cms/fallbacks-homepage";
import { mergeHomepageWithCms } from "@/lib/cms/homepage-merge";
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

const homepagePopulate =
  "populate[sections][on][sections.hero-section][populate][primaryCta]=*" +
  "&populate[sections][on][sections.hero-section][populate][secondaryCta]=*" +
  "&populate[sections][on][sections.hero-section][populate][image]=*" +
  "&populate[sections][on][sections.stats-section][populate][stats]=*" +
  "&populate[sections][on][sections.about-section][populate]=*" +
  "&populate[sections][on][sections.objectives-section][populate][cards]=*" +
  "&populate[sections][on][sections.content-teaser-section][populate]=*" +
  "&populate[sections][on][sections.cta-banner-section][populate][cta]=*" +
  "&populate[seo][populate][ogImage]=*";

export async function fetchHomepage(locale: Locale): Promise<CmsHomepage> {
  const fallback = getFallbackHomepage(locale);

  const payload = await strapiFetch<{ data?: Record<string, unknown> | null }>(
    `/api/homepage?${homepagePopulate}`,
    { locale, revalidate: 300, tags: [`homepage-${locale}`] }
  );

  const fields = unwrapSingleType<HomepagePayload>(payload);
  if (!fields) return fallback;

  const cmsSections = mapHomeSections(fields.sections);

  return {
    seo: mapSeo(fields) ?? fallback.seo,
    sections: mergeHomepageWithCms(fallback, cmsSections).sections
  };
}
