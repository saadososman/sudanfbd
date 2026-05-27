import {
  getMediaUrl,
  mapNavItems,
  mapSeo,
  strapiFetch,
  unwrapSingleType
} from "@/lib/cms/client";
import { getFallbackSiteConfig } from "@/lib/cms/fallbacks";
import { mergeSiteConfigWithCms } from "@/lib/cms/site-config-merge";
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
  defaultSeo?: unknown;
  uiLabels?: unknown;
};

export function getNavLabel(config: CmsSiteConfig, path: string) {
  return config.navigation.find((item) => item.path === path)?.label ?? "";
}

export async function fetchSiteConfig(locale: Locale): Promise<CmsSiteConfig> {
  const fallback = getFallbackSiteConfig(locale);

  const payload = await strapiFetch<{ data?: Record<string, unknown> | null }>(
    "/api/site-config?populate[logo]=*&populate[navigation]=*&populate[defaultSeo][populate][ogImage]=*&populate[uiLabels]=*",
    { locale, revalidate: 300, tags: [`site-config-${locale}`] }
  );

  const fields = unwrapSingleType<SiteConfigPayload>(payload);
  if (!fields) return fallback;

  return mergeSiteConfigWithCms(fallback, {
    siteName: typeof fields.siteName === "string" ? fields.siteName : undefined,
    shortName: typeof fields.shortName === "string" ? fields.shortName : undefined,
    brandSubtitle:
      typeof fields.brandSubtitle === "string" ? fields.brandSubtitle : undefined,
    footerTagline:
      typeof fields.footerTagline === "string" ? fields.footerTagline : undefined,
    footerNote: typeof fields.footerNote === "string" ? fields.footerNote : undefined,
    logoUrl: getMediaUrl(fields.logo) || undefined,
    navigation: mapNavItems(fields.navigation),
    defaultSeo: mapSeo(fields),
    uiLabels: mapUiLabels(fields.uiLabels)
  });
}
