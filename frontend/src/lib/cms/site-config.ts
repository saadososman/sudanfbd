import {
  getMediaUrl,
  mapNavItems,
  mapSeo,
  strapiFetch,
  unwrapSingleType
} from "@/lib/cms/client";
import { getFallbackSiteConfig } from "@/lib/cms/fallbacks";
import type { CmsSiteConfig } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

type SiteConfigPayload = {
  siteName?: string;
  shortName?: string;
  brandSubtitle?: string;
  footerTagline?: string;
  footerNote?: string;
  logo?: unknown;
  navigation?: unknown;
  defaultSeo?: unknown;
};

export async function fetchSiteConfig(locale: Locale): Promise<CmsSiteConfig> {
  const fallback = getFallbackSiteConfig(locale);
  const payload = await strapiFetch<{ data?: Record<string, unknown> | null }>(
    "/api/site-config?populate[logo]=*&populate[navigation]=*&populate[defaultSeo][populate][ogImage]=*",
    { locale, revalidate: 300, tags: [`site-config-${locale}`] }
  );

  const fields = unwrapSingleType<SiteConfigPayload>(payload);
  if (!fields) return fallback;

  const siteName = typeof fields.siteName === "string" ? fields.siteName : fallback.siteName;
  const navigation = mapNavItems(fields.navigation);

  return {
    siteName,
    shortName:
      typeof fields.shortName === "string" && fields.shortName
        ? fields.shortName
        : siteName,
    brandSubtitle:
      typeof fields.brandSubtitle === "string" && fields.brandSubtitle
        ? fields.brandSubtitle
        : fallback.brandSubtitle,
    footerTagline:
      typeof fields.footerTagline === "string" && fields.footerTagline
        ? fields.footerTagline
        : fallback.footerTagline,
    footerNote:
      typeof fields.footerNote === "string" && fields.footerNote
        ? fields.footerNote
        : fallback.footerNote,
    logoUrl: getMediaUrl(fields.logo) || undefined,
    navigation: navigation.length ? navigation : fallback.navigation,
    defaultSeo: mapSeo(fields) ?? fallback.defaultSeo
  };
}
