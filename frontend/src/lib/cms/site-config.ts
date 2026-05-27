import {
  getMediaUrl,
  mapNavItems,
  mapSeo,
  strapiFetch,
  unwrapSingleType
} from "@/lib/cms/client";
import type { CmsSiteConfig } from "@/lib/cms/types";
import { emptyUiLabels, mapUiLabels } from "@/lib/cms/ui-labels";
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

function emptySiteConfig(): CmsSiteConfig {
  return {
    siteName: "",
    shortName: "",
    brandSubtitle: "",
    footerTagline: "",
    footerNote: "",
    navigation: [],
    uiLabels: emptyUiLabels()
  };
}

function mapSiteConfigFields(fields: SiteConfigPayload): CmsSiteConfig {
  return {
    siteName: typeof fields.siteName === "string" ? fields.siteName : "",
    shortName:
      typeof fields.shortName === "string" && fields.shortName.trim()
        ? fields.shortName
        : typeof fields.siteName === "string"
          ? fields.siteName
          : "",
    brandSubtitle: typeof fields.brandSubtitle === "string" ? fields.brandSubtitle : "",
    footerTagline: typeof fields.footerTagline === "string" ? fields.footerTagline : "",
    footerNote: typeof fields.footerNote === "string" ? fields.footerNote : "",
    logoUrl: getMediaUrl(fields.logo) || undefined,
    navigation: mapNavItems(fields.navigation),
    defaultSeo: mapSeo(fields),
    uiLabels: mapUiLabels(fields.uiLabels)
  };
}

export function getNavLabel(config: CmsSiteConfig, path: string) {
  return config.navigation.find((item) => item.path === path)?.label ?? "";
}

export async function fetchSiteConfig(locale: Locale): Promise<CmsSiteConfig> {
  const payload = await strapiFetch<{ data?: Record<string, unknown> | null }>(
    "/api/site-config?populate[logo]=*&populate[navigation]=*&populate[defaultSeo][populate][ogImage]=*&populate[uiLabels]=*",
    { locale, revalidate: 300, tags: [`site-config-${locale}`] }
  );

  const fields = unwrapSingleType<SiteConfigPayload>(payload);
  if (!fields) return emptySiteConfig();

  return mapSiteConfigFields(fields);
}
