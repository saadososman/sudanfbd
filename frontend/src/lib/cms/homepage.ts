import { getFallbackHomepage } from "@/lib/cms/fallbacks-homepage";
import {
  logStrapiFetch,
  mapHomeSections,
  mapSeo,
  strapiFetch,
  unwrapSingleType
} from "@/lib/cms/client";
import type { CmsContentTeaserSection, CmsHomepage } from "@/lib/cms/types";
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

export function getSectorsListingFromHomepage(homepage: CmsHomepage) {
  const section = homepage.sections.find(
    (item): item is CmsContentTeaserSection =>
      item.__component === "sections.content-teaser-section" &&
      item.contentType === "sectors"
  );

  return {
    title: section?.title ?? "",
    intro: section?.intro ?? ""
  };
}

export function getNewsListingFromHomepage(homepage: CmsHomepage) {
  const section = homepage.sections.find(
    (item): item is CmsContentTeaserSection =>
      item.__component === "sections.content-teaser-section" &&
      item.contentType === "news"
  );

  return {
    title: section?.title ?? "",
    intro: section?.intro ?? ""
  };
}

export async function fetchHomepage(locale: Locale): Promise<CmsHomepage> {
  const fallback = getFallbackHomepage(locale);

  const { data: payload, meta } = await strapiFetch<{ data?: Record<string, unknown> | null }>(
    `/api/homepage?${homepagePopulate}`,
    { locale }
  );

  const fields = unwrapSingleType<HomepagePayload>(payload);
  if (!fields) {
    logStrapiFetch("homepage", locale, meta, true);
    return fallback;
  }

  const cmsSections = mapHomeSections(fields.sections);
  if (!cmsSections.length) {
    logStrapiFetch("homepage", locale, meta, true);
    return fallback;
  }

  logStrapiFetch("homepage", locale, meta, false);
  return {
    seo: mapSeo(fields) ?? fallback.seo,
    sections: cmsSections
  };
}
