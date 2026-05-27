import {
  getFallbackAboutSection,
  getFallbackFrameworkSection,
  getFallbackMethodologySection,
  getFallbackMissionValuesSection,
  getFallbackObjectivesSection
} from "@/lib/cms/fallbacks-content-sections";
import type { CmsPage, CmsPageSection } from "@/lib/cms/types";
import { dictionary, type Locale } from "@/lib/i18n";

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
  const t = dictionary[locale];

  switch (slug) {
    case "about":
      return {
        slug,
        title: t.about.title,
        intro: t.manifesto.paragraphs[0],
        seo: {
          metaTitle: `${t.about.title} | ${t.brand}`,
          metaDescription: t.manifesto.paragraphs[0]
        },
        sections: getAboutSections(locale)
      };
    case "objectives":
      return {
        slug,
        title: t.objectives.title,
        intro: t.objectives.paragraphs[0],
        seo: {
          metaTitle: `${t.objectives.title} | ${t.brand}`,
          metaDescription: t.objectives.paragraphs[0]
        },
        sections: [getFallbackObjectivesSection(locale)]
      };
    case "methodology":
      return {
        slug,
        title: t.methodology.title,
        intro: t.methodology.intro,
        seo: {
          metaTitle: `${t.methodology.title} | ${t.brand}`,
          metaDescription: t.methodology.intro
        },
        sections: getMethodologySections(locale)
      };
    case "framework":
      return {
        slug,
        title: t.framework.title,
        intro: t.framework.intro,
        seo: {
          metaTitle: `${t.framework.title} | ${t.brand}`,
          metaDescription: t.framework.intro
        },
        sections: getFrameworkSections(locale)
      };
  }
}
