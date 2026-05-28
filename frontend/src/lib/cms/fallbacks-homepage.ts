import { getContentFallback } from "@/lib/cms/fallbacks-content";
import {
  getFallbackAboutSection,
  getFallbackObjectivesSection
} from "@/lib/cms/fallbacks-content-sections";
import { getFallbackHeroSection, getFallbackStatsSection } from "@/lib/cms/fallbacks-hero-stats";
import { reorderHomepageSections } from "@/lib/cms/homepage-sections";
import type { CmsHomepage, CmsHomeSection } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

export function getFallbackHomepage(locale: Locale): CmsHomepage {
  const content = getContentFallback(locale);

  return {
    seo: {
      metaTitle: `${content.brand} | ${content.nav.home}`,
      metaDescription: content.manifesto.paragraphs[0]
    },
    sections: reorderHomepageSections([
      getFallbackHeroSection(locale),
      {
        __component: "sections.content-teaser-section",
        kicker: content.homeNewsKicker,
        title: content.newsTitle,
        intro: content.newsIntro,
        contentType: "news",
        limit: 3,
        viewAllLabel: content.viewAllNews,
        viewAllPath: "news"
      },
      getFallbackStatsSection(locale),
      getFallbackAboutSection(locale),
      getFallbackObjectivesSection(locale),
      {
        __component: "sections.content-teaser-section",
        kicker: content.sectorsTeaserKicker,
        title: content.sectorsTitle,
        intro: content.sectorsIntro,
        contentType: "sectors",
        limit: 6,
        viewAllLabel: content.viewAllSectors,
        viewAllPath: "sectors"
      },
      {
        __component: "sections.cta-banner-section",
        title: content.ctaBannerTitle,
        body: content.ctaBannerBody
      }
    ] satisfies CmsHomeSection[])
  };
}
