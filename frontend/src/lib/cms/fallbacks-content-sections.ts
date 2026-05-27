import type { Locale } from "@/lib/i18n";
import { dictionary } from "@/lib/i18n";
import type {
  CmsAboutSection,
  CmsFrameworkSection,
  CmsMethodologySection,
  CmsMissionValuesSection,
  CmsObjectivesSectionBlock
} from "@/lib/cms/types";

export function getFallbackAboutSection(
  locale: Locale,
  compact = false
): CmsAboutSection {
  const manifesto = dictionary[locale].manifesto;

  return {
    __component: "sections.about-section",
    kicker: manifesto.kicker,
    title: manifesto.title,
    paragraphs: [...manifesto.paragraphs],
    bulletPoints: [...manifesto.points],
    compact
  };
}

export function getFallbackObjectivesSection(locale: Locale): CmsObjectivesSectionBlock {
  const objectives = dictionary[locale].objectives;

  return {
    __component: "sections.objectives-section",
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

export function getFallbackMethodologySection(locale: Locale): CmsMethodologySection {
  const methodology = dictionary[locale].methodology;

  return {
    __component: "sections.methodology-section",
    cards: methodology.cards.map((card, index) => ({
      title: card.title,
      text: card.text,
      order: index
    })),
    phasesTitle: methodology.phasesTitle,
    phases: [...methodology.phases]
  };
}

export function getFallbackFrameworkSection(locale: Locale): CmsFrameworkSection {
  const framework = dictionary[locale].framework;

  return {
    __component: "sections.framework-section",
    title: framework.title,
    items: [...framework.items]
  };
}

export function getFallbackMissionValuesSection(locale: Locale): CmsMissionValuesSection {
  const t = dictionary[locale];
  const isArabic = locale === "ar";

  return {
    __component: "sections.mission-values-section",
    missionTitle: t.about.mission,
    missionText: t.about.missionText,
    valuesTitle: isArabic ? "مبادئ العمل" : "Operating Principles",
    values: [...t.about.values]
  };
}
