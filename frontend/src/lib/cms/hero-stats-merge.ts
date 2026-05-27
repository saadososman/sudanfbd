import type { CmsHeroSection, CmsStatsSection } from "@/lib/cms/types";

export function isValidHeroSection(
  section: CmsHeroSection | undefined
): section is CmsHeroSection {
  return Boolean(section?.title?.trim());
}

export function isValidStatsSection(
  section: CmsStatsSection | undefined
): section is CmsStatsSection {
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
