import type { CmsContentTeaserSection, CmsHomeSection } from "@/lib/cms/types";

function isNewsTeaser(section: CmsHomeSection): section is CmsContentTeaserSection {
  return (
    section.__component === "sections.content-teaser-section" &&
    section.contentType === "news"
  );
}

function isPreambleSection(section: CmsHomeSection) {
  return section.__component === "sections.about-section";
}

function normalizeNewsTeaser(section: CmsContentTeaserSection): CmsContentTeaserSection {
  return {
    ...section,
    limit: Math.max(section.limit ?? 3, 3),
    viewAllPath: section.viewAllPath ?? "news"
  };
}

/**
 * Enforces homepage content order: Hero → News → Preamble → everything else.
 * Hero blocks stay first; news teaser is placed immediately after hero content.
 */
export function reorderHomepageSections(sections: CmsHomeSection[]): CmsHomeSection[] {
  const heroes = sections.filter(
    (section) => section.__component === "sections.hero-section"
  );
  const rest = sections.filter(
    (section) => section.__component !== "sections.hero-section"
  );

  const newsSections = rest.filter(isNewsTeaser).map(normalizeNewsTeaser);
  const preambleSections = rest.filter(isPreambleSection);
  const otherSections = rest.filter(
    (section) => !isNewsTeaser(section) && !isPreambleSection(section)
  );

  return [...heroes, ...newsSections, ...preambleSections, ...otherSections];
}
