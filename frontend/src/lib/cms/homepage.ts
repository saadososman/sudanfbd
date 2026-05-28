import { cache } from "react";
import { getFallbackHomepage } from "@/lib/cms/fallbacks-homepage";
import { mergeHomepageWithCms } from "@/lib/cms/homepage-merge";
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

export type CmsContentSource = "strapi" | "fallback";

export type HomepageResult = {
  homepage: CmsHomepage;
  source: CmsContentSource;
};

// Do not add populate[seo] here — Strapi 5 drops the sections array when SEO is deep-populated.
const homepagePopulate =
  "populate[sections][on][sections.hero-section][populate][primaryCta]=*" +
  "&populate[sections][on][sections.hero-section][populate][secondaryCta]=*" +
  "&populate[sections][on][sections.hero-section][populate][image]=*" +
  "&populate[sections][on][sections.stats-section][populate][stats]=*" +
  "&populate[sections][on][sections.about-section][populate]=*" +
  "&populate[sections][on][sections.objectives-section][populate][cards]=*" +
  "&populate[sections][on][sections.content-teaser-section][populate]=*" +
  "&populate[sections][on][sections.cta-banner-section][populate][cta]=*";

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

export const fetchHomepageWithSource = cache(async (locale: Locale): Promise<HomepageResult> => {
  const fallback = getFallbackHomepage(locale);

  const { data: payload, meta } = await strapiFetch<{ data?: Record<string, unknown> | null }>(
    `/api/homepage?${homepagePopulate}`,
    { locale }
  );

  const fields = unwrapSingleType<HomepagePayload>(payload);
  if (!fields) {
    logStrapiFetch("homepage", locale, meta, true);
    return { homepage: fallback, source: "fallback" };
  }

  const rawSectionCount = Array.isArray(fields.sections) ? fields.sections.length : 0;
  const cmsSections = mapHomeSections(fields.sections);

  if (!cmsSections.length) {
    console.warn(
      `[CMS] homepage locale=${locale} rawSections=${rawSectionCount} mappedSections=0 — using fallback`
    );
    logStrapiFetch("homepage", locale, meta, true);
    return { homepage: fallback, source: "fallback" };
  }

  const merged = mergeHomepageWithCms(fallback, cmsSections);
  const sections = merged.sections.length > 0 ? merged.sections : fallback.sections;

  logStrapiFetch("homepage", locale, meta, false);
  return {
    homepage: {
      seo: mapSeo(fields) ?? fallback.seo,
      sections
    },
    source: "strapi"
  };
});

export async function fetchHomepage(locale: Locale): Promise<CmsHomepage> {
  const { homepage } = await fetchHomepageWithSource(locale);
  return homepage;
}
