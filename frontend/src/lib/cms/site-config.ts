import {
  getMediaUrl,
  logStrapiFetch,
  mapNavItems,
  mapSeo,
  mapSocialLinks,
  strapiFetch,
  unwrapSingleType
} from "@/lib/cms/client";
import { getFallbackSiteConfig } from "@/lib/cms/fallbacks";
import { buildSiteConfigFromCms } from "@/lib/cms/site-config-merge";
import type { CmsSiteConfig } from "@/lib/cms/types";
import { mapUiLabels } from "@/lib/cms/ui-labels";
import type { Locale } from "@/lib/i18n";

type SiteConfigPayload = {
  siteName?: string;
  shortName?: string;
  brandSubtitle?: string;
  footerTagline?: string;
  footerNote?: string;
  logo?: unknown;
  navigation?: unknown;
  socialLinks?: unknown;
  defaultSeo?: unknown;
  uiLabels?: unknown;
};

export function getNavLabel(config: CmsSiteConfig, path: string) {
  return config.navigation.find((item) => item.path === path)?.label ?? "";
}

export async function fetchSiteConfig(locale: Locale): Promise<CmsSiteConfig> {
  const fallback = getFallbackSiteConfig(locale);

  const { data: payload, meta } = await strapiFetch<{ data?: Record<string, unknown> | null }>(
    "/api/site-config?populate[logo]=*&populate[navigation]=*&populate[socialLinks]=*&populate[uiLabels]=*",
    { locale }
  );

  const fields = unwrapSingleType<SiteConfigPayload>(payload);
  if (!fields) {
    logStrapiFetch("site-config", locale, meta, true);
    return fallback;
  }

  const navigation = mapNavItems(fields.navigation);
  const socialLinks = mapSocialLinks(fields.socialLinks);
  const uiLabels = mapUiLabels(fields.uiLabels);
  const hasCmsContent = Boolean(
    (typeof fields.siteName === "string" && fields.siteName.trim()) || navigation.length
  );

  if (!hasCmsContent) {
    logStrapiFetch("site-config", locale, meta, true);
    return fallback;
  }

  logStrapiFetch("site-config", locale, meta, false);
  return buildSiteConfigFromCms(fallback, {
    siteName: typeof fields.siteName === "string" ? fields.siteName : undefined,
    shortName: typeof fields.shortName === "string" ? fields.shortName : undefined,
    brandSubtitle:
      typeof fields.brandSubtitle === "string" ? fields.brandSubtitle : undefined,
    footerTagline:
      typeof fields.footerTagline === "string" ? fields.footerTagline : undefined,
    footerNote: typeof fields.footerNote === "string" ? fields.footerNote : undefined,
    logoUrl: getMediaUrl(fields.logo) || undefined,
    navigation,
    socialLinks,
    defaultSeo: mapSeo(fields),
    uiLabels
  });
}
