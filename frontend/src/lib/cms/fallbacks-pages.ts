import {
  getFallbackAboutSection,
  getFallbackFrameworkSection,
  getFallbackMethodologySection,
  getFallbackMissionValuesSection,
  getFallbackObjectivesSection
} from "@/lib/cms/fallbacks-content-sections";
import { getContentFallback } from "@/lib/cms/fallbacks-content";
import type { CmsPage, CmsPageSection } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

export const STATIC_PAGE_SLUGS = ["about", "objectives", "methodology", "framework"] as const;
export type StaticPageSlug = (typeof STATIC_PAGE_SLUGS)[number];

function getAboutSections(locale: Locale): CmsPageSection[] {
  return [
    getFallbackAboutSection(locale, true),
    getFallbackObjectivesSection(locale),
    getFallbackMissionValuesSection(locale)
  ];
}

function getMethodologySections(locale: Locale): CmsPageSection[] {
  return [getFallbackMethodologySection(locale)];
}

function getFrameworkSections(locale: Locale): CmsPageSection[] {
  return [getFallbackFrameworkSection(locale)];
}

export function getFallbackPage(slug: StaticPageSlug, locale: Locale): CmsPage {
  const content = getContentFallback(locale);

  switch (slug) {
    case "about":
      return {
        slug,
        title: content.about.title,
        intro: content.manifesto.paragraphs[0],
        seo: {
          metaTitle: `${content.about.title} | ${content.brand}`,
          metaDescription: content.manifesto.paragraphs[0]
        },
        sections: getAboutSections(locale)
      };
    case "objectives":
      return {
        slug,
        title: content.objectives.title,
        intro: content.objectives.paragraphs[0],
        seo: {
          metaTitle: `${content.objectives.title} | ${content.brand}`,
          metaDescription: content.objectives.paragraphs[0]
        },
        sections: [getFallbackObjectivesSection(locale)]
      };
    case "methodology":
      return {
        slug,
        title: content.methodology.title,
        intro: content.methodology.intro,
        seo: {
          metaTitle: `${content.methodology.title} | ${content.brand}`,
          metaDescription: content.methodology.intro
        },
        sections: getMethodologySections(locale)
      };
    case "framework":
      return {
        slug,
        title: content.framework.title,
        intro: content.framework.intro,
        seo: {
          metaTitle: `${content.framework.title} | ${content.brand}`,
          metaDescription: content.framework.intro
        },
        sections: getFrameworkSections(locale)
      };
  }
}
