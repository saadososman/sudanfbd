import type { CmsPage, CmsPageSection } from "@/lib/cms/types";
import {
  findSectionByComponent,
  hasCompleteSections,
  mergeAboutSection,
  mergeContentSection,
  mergeFrameworkSection,
  mergeMethodologySection,
  mergeMissionValuesSection,
  mergeObjectivesSection
} from "@/lib/cms/section-merge";

export function mergePageWithCms(fallback: CmsPage, cmsSections: CmsPageSection[]): CmsPage {
  if (!cmsSections.length) return fallback;

  if (hasCompleteSections(fallback.sections, cmsSections)) {
    return {
      ...fallback,
      sections: cmsSections
    };
  }

  const sections = fallback.sections.map((section) => {
    switch (section.__component) {
      case "sections.about-section":
        return mergeAboutSection(
          findSectionByComponent(cmsSections, "sections.about-section"),
          section
        );
      case "sections.objectives-section":
        return mergeObjectivesSection(
          findSectionByComponent(cmsSections, "sections.objectives-section"),
          section
        );
      case "sections.methodology-section":
        return mergeMethodologySection(
          findSectionByComponent(cmsSections, "sections.methodology-section"),
          section
        );
      case "sections.framework-section":
        return mergeFrameworkSection(
          findSectionByComponent(cmsSections, "sections.framework-section"),
          section
        );
      case "sections.mission-values-section":
        return mergeMissionValuesSection(
          findSectionByComponent(cmsSections, "sections.mission-values-section"),
          section
        );
      default: {
        const cmsMatch = findSectionByComponent(cmsSections, section.__component);
        return cmsMatch ? mergeContentSection(cmsMatch, section) : section;
      }
    }
  });

  return {
    ...fallback,
    sections
  };
}
