import type { CmsPage, CmsPageSection } from "@/lib/cms/types";
import { dictionary, type Locale } from "@/lib/i18n";

export const STATIC_PAGE_SLUGS = ["about", "objectives", "methodology", "framework"] as const;
export type StaticPageSlug = (typeof STATIC_PAGE_SLUGS)[number];

function getObjectivesSection(locale: Locale): CmsPageSection {
  const objectives = dictionary[locale].objectives;

  return {
    __component: "sections.rich-content-section",
    kicker: objectives.kicker,
    title: objectives.title,
    paragraphs: [...objectives.paragraphs],
    cards: objectives.cards.map((card, index) => ({
      title: card.title,
      text: card.text,
      order: index
    }))
  };
}

function getAboutSections(locale: Locale): CmsPageSection[] {
  const t = dictionary[locale];
  const isArabic = locale === "ar";

  return [
    {
      __component: "sections.rich-content-section",
      kicker: t.manifesto.kicker,
      title: t.manifesto.title,
      paragraphs: [...t.manifesto.paragraphs],
      bulletPoints: [...t.manifesto.points]
    },
    getObjectivesSection(locale),
    {
      __component: "sections.rich-content-section",
      kicker: isArabic ? "مبادئ العمل" : "Operating Principles",
      title: t.about.mission,
      paragraphs: [t.about.missionText],
      bulletPoints: [...t.about.values]
    }
  ];
}

function getMethodologySections(locale: Locale): CmsPageSection[] {
  const methodology = dictionary[locale].methodology;

  return [
    {
      __component: "sections.rich-content-section",
      title: methodology.title,
      cards: methodology.cards.map((card, index) => ({
        title: card.title,
        text: card.text,
        order: index
      }))
    },
    {
      __component: "sections.rich-content-section",
      kicker: methodology.phasesTitle,
      title: methodology.phasesTitle,
      phases: [...methodology.phases]
    }
  ];
}

function getFrameworkSections(locale: Locale): CmsPageSection[] {
  const framework = dictionary[locale].framework;

  return [
    {
      __component: "sections.rich-content-section",
      title: framework.title,
      items: [...framework.items]
    }
  ];
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
        sections: [getObjectivesSection(locale)]
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
