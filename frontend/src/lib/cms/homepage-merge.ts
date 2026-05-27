import type { CmsHeroSection, CmsHomepage, CmsHomeSection, CmsStatsSection } from "@/lib/cms/types";
import {
  isValidHeroSection,
  mergeHeroSection,
  mergeStatsSection
} from "@/lib/cms/hero-stats-merge";
import {
  findContentTeaserSection,
  findSectionByComponent,
  hasCompleteSections,
  mergeAboutSection,
  mergeContentSection,
  mergeObjectivesSection
} from "@/lib/cms/section-merge";

export { mergeHeroSection, mergeStatsSection } from "@/lib/cms/hero-stats-merge";

function isValidStatsSectionLocal(section: CmsStatsSection | undefined): section is CmsStatsSection {
  return Boolean(
    section?.stats.length &&
      section.stats.every((stat) => stat.value.trim() && stat.label.trim())
  );
}

export function mergeHomepageWithCms(
  fallback: CmsHomepage,
  cmsSections: CmsHomeSection[]
): CmsHomepage {
  if (!cmsSections.length) return fallback;

  if (hasCompleteSections(fallback.sections, cmsSections)) {
    return {
      ...fallback,
      sections: cmsSections as CmsHomeSection[]
    };
  }

  const cmsHero = findSectionByComponent(cmsSections, "sections.hero-section");
  const cmsStats = findSectionByComponent(cmsSections, "sections.stats-section");
  const fallbackHero = findSectionByComponent(fallback.sections, "sections.hero-section");
  const fallbackStats = findSectionByComponent(fallback.sections, "sections.stats-section");

  const sections = fallback.sections.map((section) => {
    if (section.__component === "sections.hero-section") {
      return fallbackHero
        ? mergeHeroSection(cmsHero, fallbackHero)
        : section;
    }

    if (section.__component === "sections.stats-section") {
      return fallbackStats ? mergeStatsSection(cmsStats, fallbackStats) : section;
    }

    if (section.__component === "sections.about-section") {
      return mergeAboutSection(
        findSectionByComponent(cmsSections, "sections.about-section"),
        section
      );
    }

    if (section.__component === "sections.objectives-section") {
      return mergeObjectivesSection(
        findSectionByComponent(cmsSections, "sections.objectives-section"),
        section
      );
    }

    if (section.__component === "sections.content-teaser-section") {
      return mergeContentSection(
        findContentTeaserSection(cmsSections, section.contentType),
        section
      );
    }

    if (section.__component === "sections.cta-banner-section") {
      return mergeContentSection(
        findSectionByComponent(cmsSections, "sections.cta-banner-section"),
        section
      );
    }

    const cmsMatch = findSectionByComponent(cmsSections, section.__component);
    return cmsMatch ? mergeContentSection(cmsMatch, section) : section;
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
  const cmsHero = findSectionByComponent(cmsSections, "sections.hero-section");
  return isValidHeroSection(cmsHero) && mergedHero === cmsHero;
}

export function isStatsFromCms(
  cmsSections: CmsHomeSection[],
  mergedStats: CmsStatsSection | undefined
) {
  const cmsStats = findSectionByComponent(cmsSections, "sections.stats-section");
  return isValidStatsSectionLocal(cmsStats) && mergedStats === cmsStats;
}
