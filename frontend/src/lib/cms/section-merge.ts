import type {
  CmsAboutSection,
  CmsContentTeaserSection,
  CmsCtaBannerSection,
  CmsFrameworkSection,
  CmsHeroSection,
  CmsMethodologySection,
  CmsMissionValuesSection,
  CmsObjectivesSectionBlock,
  CmsPageSection,
  CmsContentSection,
  CmsHomeSection,
  CmsStatsSection
} from "@/lib/cms/types";
import {
  isValidHeroSection,
  isValidStatsSection
} from "@/lib/cms/hero-stats-merge";

export function isValidAboutSection(
  section: CmsAboutSection | undefined
): section is CmsAboutSection {
  return Boolean(
    section?.title?.trim() &&
      (section.paragraphs?.length || section.bulletPoints?.length)
  );
}

export function isValidObjectivesSection(
  section: CmsObjectivesSectionBlock | undefined
): section is CmsObjectivesSectionBlock {
  return Boolean(
    section?.title?.trim() &&
      (section.cards?.length || section.paragraphs?.length)
  );
}

export function isValidMethodologySection(
  section: CmsMethodologySection | undefined
): section is CmsMethodologySection {
  return Boolean(section?.cards?.length || section?.phases?.length);
}

export function isValidFrameworkSection(
  section: CmsFrameworkSection | undefined
): section is CmsFrameworkSection {
  return Boolean(section?.items?.length);
}

export function isValidMissionValuesSection(
  section: CmsMissionValuesSection | undefined
): section is CmsMissionValuesSection {
  return Boolean(
    section?.missionTitle?.trim() &&
      section.missionText?.trim() &&
      section.values?.length
  );
}

export function isValidContentTeaserSection(
  section: CmsContentTeaserSection | undefined
): section is CmsContentTeaserSection {
  return Boolean(section?.title?.trim() && section.contentType);
}

export function isValidCtaBannerSection(
  section: CmsCtaBannerSection | undefined
): section is CmsCtaBannerSection {
  return Boolean(section?.title?.trim());
}

export function mergeAboutSection(
  cmsSection: CmsAboutSection | undefined,
  fallbackSection: CmsAboutSection
): CmsAboutSection {
  if (!isValidAboutSection(cmsSection)) return fallbackSection;

  return {
    ...fallbackSection,
    ...cmsSection,
    title: cmsSection.title,
    kicker: cmsSection.kicker ?? fallbackSection.kicker,
    paragraphs: cmsSection.paragraphs?.length
      ? cmsSection.paragraphs
      : fallbackSection.paragraphs,
    bulletPoints: cmsSection.bulletPoints?.length
      ? cmsSection.bulletPoints
      : fallbackSection.bulletPoints,
    compact: cmsSection.compact ?? fallbackSection.compact
  };
}

export function mergeObjectivesSection(
  cmsSection: CmsObjectivesSectionBlock | undefined,
  fallbackSection: CmsObjectivesSectionBlock
): CmsObjectivesSectionBlock {
  if (!isValidObjectivesSection(cmsSection)) return fallbackSection;

  return {
    ...fallbackSection,
    ...cmsSection,
    title: cmsSection.title,
    kicker: cmsSection.kicker ?? fallbackSection.kicker,
    paragraphs: cmsSection.paragraphs?.length
      ? cmsSection.paragraphs
      : fallbackSection.paragraphs,
    cards: cmsSection.cards?.length ? cmsSection.cards : fallbackSection.cards
  };
}

export function mergeMethodologySection(
  cmsSection: CmsMethodologySection | undefined,
  fallbackSection: CmsMethodologySection
): CmsMethodologySection {
  if (!isValidMethodologySection(cmsSection)) return fallbackSection;

  return {
    __component: "sections.methodology-section",
    cards: cmsSection.cards?.length ? cmsSection.cards : fallbackSection.cards,
    phasesTitle: cmsSection.phasesTitle ?? fallbackSection.phasesTitle,
    phases: cmsSection.phases?.length ? cmsSection.phases : fallbackSection.phases
  };
}

export function mergeFrameworkSection(
  cmsSection: CmsFrameworkSection | undefined,
  fallbackSection: CmsFrameworkSection
): CmsFrameworkSection {
  if (!isValidFrameworkSection(cmsSection)) return fallbackSection;

  return {
    __component: "sections.framework-section",
    title: cmsSection.title ?? fallbackSection.title,
    items: cmsSection.items
  };
}

export function mergeMissionValuesSection(
  cmsSection: CmsMissionValuesSection | undefined,
  fallbackSection: CmsMissionValuesSection
): CmsMissionValuesSection {
  if (!isValidMissionValuesSection(cmsSection)) return fallbackSection;

  return {
    ...fallbackSection,
    ...cmsSection,
    missionTitle: cmsSection.missionTitle,
    missionText: cmsSection.missionText,
    valuesTitle: cmsSection.valuesTitle ?? fallbackSection.valuesTitle,
    values: cmsSection.values
  };
}

export function mergeContentTeaserSection(
  cmsSection: CmsContentTeaserSection | undefined,
  fallbackSection: CmsContentTeaserSection
): CmsContentTeaserSection {
  if (!isValidContentTeaserSection(cmsSection)) return fallbackSection;
  if (cmsSection.contentType !== fallbackSection.contentType) return fallbackSection;

  return {
    ...fallbackSection,
    ...cmsSection,
    title: cmsSection.title,
    kicker: cmsSection.kicker ?? fallbackSection.kicker,
    intro: cmsSection.intro ?? fallbackSection.intro,
    limit: cmsSection.limit ?? fallbackSection.limit,
    viewAllLabel: cmsSection.viewAllLabel ?? fallbackSection.viewAllLabel,
    viewAllPath: cmsSection.viewAllPath ?? fallbackSection.viewAllPath
  };
}

export function mergeCtaBannerSection(
  cmsSection: CmsCtaBannerSection | undefined,
  fallbackSection: CmsCtaBannerSection
): CmsCtaBannerSection {
  if (!isValidCtaBannerSection(cmsSection)) return fallbackSection;

  return {
    ...fallbackSection,
    ...cmsSection,
    title: cmsSection.title,
    body: cmsSection.body ?? fallbackSection.body,
    cta: cmsSection.cta ?? fallbackSection.cta
  };
}

export function findSectionByComponent<
  T extends { __component: string },
  C extends T["__component"]
>(sections: T[], component: C) {
  return sections.find(
    (section): section is Extract<T, { __component: C }> => section.__component === component
  );
}

export function findContentTeaserSection<
  T extends { __component: string; contentType?: string }
>(sections: T[], contentType: CmsContentTeaserSection["contentType"]) {
  return sections.find(
    (section): section is Extract<T, CmsContentTeaserSection> =>
      section.__component === "sections.content-teaser-section" &&
      section.contentType === contentType
  );
}

export function hasCompleteSections<
  T extends { __component: string; contentType?: string }
>(fallbackSections: T[], cmsSections: T[]) {
  if (cmsSections.length < fallbackSections.length) return false;

  const usedIndexes = new Set<number>();

  return fallbackSections.every((fallbackSection) => {
    const matchIndex = cmsSections.findIndex((cmsSection, index) => {
      if (usedIndexes.has(index)) return false;
      if (cmsSection.__component !== fallbackSection.__component) return false;

      if (
        fallbackSection.__component === "sections.content-teaser-section" &&
        "contentType" in fallbackSection &&
        "contentType" in cmsSection
      ) {
        return fallbackSection.contentType === cmsSection.contentType;
      }

      return isSectionValid(
        cmsSection as unknown as CmsContentSection | CmsPageSection | CmsHomeSection
      );
    });

    if (matchIndex === -1) return false;
    usedIndexes.add(matchIndex);
    return true;
  });
}

function isSectionValid(section: CmsContentSection | CmsPageSection | CmsHomeSection) {
  switch (section.__component) {
    case "sections.hero-section":
      return isValidHeroSection(section as CmsHeroSection);
    case "sections.stats-section":
      return isValidStatsSection(section as CmsStatsSection);
    case "sections.about-section":
      return isValidAboutSection(section);
    case "sections.objectives-section":
      return isValidObjectivesSection(section);
    case "sections.methodology-section":
      return isValidMethodologySection(section);
    case "sections.framework-section":
      return isValidFrameworkSection(section);
    case "sections.mission-values-section":
      return isValidMissionValuesSection(section);
    case "sections.content-teaser-section":
      return isValidContentTeaserSection(section);
    case "sections.cta-banner-section":
      return isValidCtaBannerSection(section);
    case "sections.rich-content-section":
      return Boolean(section.title?.trim());
    default:
      return true;
  }
}

export function mergeContentSection<
  T extends CmsContentSection | CmsPageSection
>(cmsSection: T | undefined, fallbackSection: T): T {
  if (!cmsSection || cmsSection.__component !== fallbackSection.__component) {
    return fallbackSection;
  }

  switch (fallbackSection.__component) {
    case "sections.about-section":
      return mergeAboutSection(
        cmsSection as CmsAboutSection,
        fallbackSection as CmsAboutSection
      ) as T;
    case "sections.objectives-section":
      return mergeObjectivesSection(
        cmsSection as CmsObjectivesSectionBlock,
        fallbackSection as CmsObjectivesSectionBlock
      ) as T;
    case "sections.methodology-section":
      return mergeMethodologySection(
        cmsSection as CmsMethodologySection,
        fallbackSection as CmsMethodologySection
      ) as T;
    case "sections.framework-section":
      return mergeFrameworkSection(
        cmsSection as CmsFrameworkSection,
        fallbackSection as CmsFrameworkSection
      ) as T;
    case "sections.mission-values-section":
      return mergeMissionValuesSection(
        cmsSection as CmsMissionValuesSection,
        fallbackSection as CmsMissionValuesSection
      ) as T;
    case "sections.content-teaser-section":
      return mergeContentTeaserSection(
        cmsSection as CmsContentTeaserSection,
        fallbackSection as CmsContentTeaserSection
      ) as T;
    case "sections.cta-banner-section":
      return mergeCtaBannerSection(
        cmsSection as CmsCtaBannerSection,
        fallbackSection as CmsCtaBannerSection
      ) as T;
    default:
      return cmsSection;
  }
}
