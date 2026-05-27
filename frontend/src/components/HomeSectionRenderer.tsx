import { HeroSection } from "@/components/HeroSection";
import { ContentSectionRenderer } from "@/components/ContentSectionRenderer";
import type { CmsContentSection, CmsHomeSection } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

export async function HomeSectionRenderer({
  locale,
  sections,
  compactManifesto = false
}: {
  locale: Locale;
  sections: CmsHomeSection[];
  compactManifesto?: boolean;
}) {
  const heroSections = sections.filter(
    (section): section is Extract<CmsHomeSection, { __component: "sections.hero-section" }> =>
      section.__component === "sections.hero-section"
  );
  const contentSections = sections.filter(
    (section) => section.__component !== "sections.hero-section"
  ) as CmsContentSection[];

  return (
    <>
      {heroSections.map((section, index) => (
        <HeroSection locale={locale} section={section} key={`hero-${index}`} />
      ))}
      <ContentSectionRenderer
        locale={locale}
        sections={contentSections}
        compactAbout={compactManifesto}
      />
    </>
  );
}
