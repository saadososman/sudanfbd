import type { CmsHeroSection, CmsHomepage, CmsHomeSection, CmsStatsSection } from "@/lib/cms/types";

function findSection<T extends CmsHomeSection["__component"]>(
  sections: CmsHomeSection[],
  component: T
) {
  return sections.find(
    (section): section is Extract<CmsHomeSection, { __component: T }> =>
      section.__component === component
  );
}

function isValidHeroSection(section: CmsHeroSection | undefined): section is CmsHeroSection {
  return Boolean(section?.title?.trim());
}

function isValidStatsSection(section: CmsStatsSection | undefined): section is CmsStatsSection {
  return Boolean(
    section?.stats.length &&
      section.stats.every((stat) => stat.value.trim() && stat.label.trim())
  );
}

export function mergeHeroSection(
  cmsHero: CmsHeroSection | undefined,
  fallbackHero: CmsHeroSection
): CmsHeroSection {
  if (!isValidHeroSection(cmsHero)) return fallbackHero;

  return {
    ...fallbackHero,
    ...cmsHero,
    title: cmsHero.title,
    eyebrow: cmsHero.eyebrow ?? fallbackHero.eyebrow,
    body: cmsHero.body ?? fallbackHero.body,
    primaryCta: cmsHero.primaryCta ?? fallbackHero.primaryCta,
    secondaryCta: cmsHero.secondaryCta ?? fallbackHero.secondaryCta,
    insightOne: cmsHero.insightOne ?? fallbackHero.insightOne,
    insightTwo: cmsHero.insightTwo ?? fallbackHero.insightTwo,
    imageUrl: cmsHero.imageUrl ?? fallbackHero.imageUrl
  };
}

export function mergeStatsSection(
  cmsStats: CmsStatsSection | undefined,
  fallbackStats: CmsStatsSection
): CmsStatsSection {
  if (!isValidStatsSection(cmsStats)) return fallbackStats;

  return {
    __component: "sections.stats-section",
    stats: cmsStats.stats
  };
}

function hasCompleteCmsHomepage(cmsSections: CmsHomeSection[], expectedCount: number) {
  if (cmsSections.length < expectedCount) return false;

  const required: CmsHomeSection["__component"][] = [
    "sections.hero-section",
    "sections.stats-section",
    "sections.about-section",
    "sections.objectives-section",
    "sections.content-teaser-section",
    "sections.cta-banner-section"
  ];

  return required.every((component) =>
    cmsSections.some((section) => section.__component === component)
  );
}

export function mergeHomepageWithCms(
  fallback: CmsHomepage,
  cmsSections: CmsHomeSection[]
): CmsHomepage {
  if (!cmsSections.length) return fallback;

  if (hasCompleteCmsHomepage(cmsSections, fallback.sections.length)) {
    return {
      ...fallback,
      sections: cmsSections
    };
  }

  const fallbackHero = findSection(fallback.sections, "sections.hero-section");
  const fallbackStats = findSection(fallback.sections, "sections.stats-section");
  const cmsHero = findSection(cmsSections, "sections.hero-section");
  const cmsStats = findSection(cmsSections, "sections.stats-section");

  const mergedHero = fallbackHero
    ? mergeHeroSection(cmsHero, fallbackHero)
    : cmsHero;
  const mergedStats = fallbackStats
    ? mergeStatsSection(cmsStats, fallbackStats)
    : cmsStats;

  const sections = fallback.sections.map((section) => {
    if (section.__component === "sections.hero-section" && mergedHero) {
      return mergedHero;
    }

    if (section.__component === "sections.stats-section" && mergedStats) {
      return mergedStats;
    }

    const cmsMatch = cmsSections.find(
      (candidate) => candidate.__component === section.__component
    );

    return cmsMatch ?? section;
  });

  return {
    ...fallback,
    sections
  };
}

export function isHeroFromCms(
  cmsSections: CmsHomeSection[],
  mergedHero: CmsHeroSection | undefined
) {
  const cmsHero = findSection(cmsSections, "sections.hero-section");
  return isValidHeroSection(cmsHero) && mergedHero === cmsHero;
}

export function isStatsFromCms(
  cmsSections: CmsHomeSection[],
  mergedStats: CmsStatsSection | undefined
) {
  const cmsStats = findSection(cmsSections, "sections.stats-section");
  return isValidStatsSection(cmsStats) && mergedStats === cmsStats;
}
