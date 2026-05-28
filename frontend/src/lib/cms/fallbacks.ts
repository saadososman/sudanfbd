import { getContentFallback } from "@/lib/cms/fallbacks-content";
import { getDefaultSocialLinks } from "@/lib/cms/social-links-defaults";
import type { CmsSiteConfig } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

const defaultNavigation = [
  { path: "", icon: undefined },
  { path: "about", icon: undefined },
  { path: "objectives", icon: undefined },
  { path: "sectors", icon: undefined },
  { path: "methodology", icon: undefined },
  { path: "framework", icon: undefined },
  { path: "news", icon: "Newspaper" },
  { path: "documents", icon: "FileText" },
  { path: "admin", icon: "LayoutDashboard" }
] as const;

const navKeys = [
  "home",
  "about",
  "objectives",
  "sectors",
  "methodology",
  "framework",
  "news",
  "documents",
  "admin"
] as const;

export function getFallbackSiteConfig(locale: Locale): CmsSiteConfig {
  const content = getContentFallback(locale);

  return {
    siteName: content.brand,
    shortName: content.shortBrand,
    brandSubtitle: content.brandSubtitle,
    footerTagline: content.hero.body,
    footerNote: content.footerNote,
    navigation: navKeys.map((key, index) => ({
      label: content.nav[key],
      path: defaultNavigation[index].path,
      icon: defaultNavigation[index].icon,
      order: index,
      isVisible: true,
      openInNewTab: false
    })),
    socialLinks: getDefaultSocialLinks(locale),
    defaultSeo: {
      metaTitle: content.brand,
      metaDescription: content.manifesto.paragraphs[0]
    },
    uiLabels: content.ui
  };
}
