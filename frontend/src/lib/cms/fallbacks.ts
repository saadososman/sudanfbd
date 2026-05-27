import type { Locale } from "@/lib/i18n";
import { dictionary } from "@/lib/i18n";
import type { CmsSiteConfig } from "@/lib/cms/types";

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

export function getFallbackSiteConfig(locale: Locale): CmsSiteConfig {
  const t = dictionary[locale];
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

  return {
    siteName: t.brand,
    shortName: t.shortBrand,
    brandSubtitle: locale === "ar" ? "بناء وتنمية" : "Building & Development",
    footerTagline: t.hero.body,
    footerNote:
      locale === "ar"
        ? "ألوان مستوحاة من علم السودان وهوية البناء المؤسسي."
        : "Colors inspired by Sudan's flag and institutional development identity.",
    navigation: navKeys.map((key, index) => ({
      label: t.nav[key],
      path: defaultNavigation[index].path,
      icon: defaultNavigation[index].icon,
      order: index,
      isVisible: true,
      openInNewTab: false
    })),
    defaultSeo: {
      metaTitle: t.brand,
      metaDescription: t.manifesto.paragraphs[0]
    }
  };
}
