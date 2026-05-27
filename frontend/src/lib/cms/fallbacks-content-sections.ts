import { getContentFallback } from "@/lib/cms/fallbacks-content";
import type {
  CmsAboutSection,
  CmsFrameworkSection,
  CmsMethodologySection,
  CmsMissionValuesSection,
  CmsObjectivesSectionBlock
} from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

export function getFallbackAboutSection(
  locale: Locale,
  compact = false
): CmsAboutSection {
  const manifesto = getContentFallback(locale).manifesto;

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
  const objectives = getContentFallback(locale).objectives;

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
  const methodology = getContentFallback(locale).methodology;

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
  const framework = getContentFallback(locale).framework;

  return {
    __component: "sections.framework-section",
    title: framework.title,
    items: [...framework.items]
  };
}

export function getFallbackMissionValuesSection(locale: Locale): CmsMissionValuesSection {
  const content = getContentFallback(locale);

  return {
    __component: "sections.mission-values-section",
    missionTitle: content.about.mission,
    missionText: content.about.missionText,
    valuesTitle: content.valuesTitle,
    values: [...content.about.values]
  };
}
