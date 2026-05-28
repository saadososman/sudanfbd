import type { CmsNavItem, CmsSiteConfig, CmsSocialLink, CmsUiLabels } from "@/lib/cms/types";
import { isValidSocialLink } from "@/lib/cms/social-links-defaults";

type SiteConfigFields = {
  siteName?: string;
  shortName?: string;
  brandSubtitle?: string;
  footerTagline?: string;
  footerNote?: string;
  logoUrl?: string;
  navigation?: CmsNavItem[];
  socialLinks?: CmsSocialLink[];
  defaultSeo?: CmsSiteConfig["defaultSeo"];
  uiLabels?: CmsUiLabels;
};

function mergeUiLabels(cmsLabels: CmsUiLabels, fallbackLabels: CmsUiLabels): CmsUiLabels {
  const merged = { ...fallbackLabels };

  for (const key of Object.keys(fallbackLabels) as (keyof CmsUiLabels)[]) {
    const value = cmsLabels[key];
    if (typeof value === "string" && value.trim()) {
      merged[key] = value;
    }
  }

  return merged;
}

function resolveNavLabel(cmsItem: CmsNavItem, fallbackNavigation: CmsNavItem[]) {
  if (cmsItem.label?.trim()) return cmsItem.label;
  return fallbackNavigation.find((item) => item.path === cmsItem.path)?.label ?? cmsItem.label;
}

export function mergeNavigation(
  cmsNavigation: CmsNavItem[],
  fallbackNavigation: CmsNavItem[]
): CmsNavItem[] {
  if (!cmsNavigation.length) return fallbackNavigation;

  return cmsNavigation
    .map((cmsItem) => ({
      ...cmsItem,
      label: resolveNavLabel(cmsItem, fallbackNavigation),
      path: cmsItem.path?.trim()
        ? cmsItem.path
        : fallbackNavigation.find((item) => item.path === cmsItem.path)?.path ?? cmsItem.path,
      isVisible: cmsItem.isVisible !== false
    }))
    .sort((a, b) => a.order - b.order);
}

function resolveSocialLabel(
  cmsItem: CmsSocialLink,
  fallbackLinks: CmsSocialLink[]
) {
  if (cmsItem.label?.trim()) return cmsItem.label;
  return (
    fallbackLinks.find((item) => item.platform === cmsItem.platform)?.label ??
    cmsItem.label
  );
}

export function mergeSocialLinks(
  cmsLinks: CmsSocialLink[],
  fallbackLinks: CmsSocialLink[]
): CmsSocialLink[] {
  const source = cmsLinks.length ? cmsLinks : fallbackLinks;

  return source
    .map((cmsItem) => ({
      ...cmsItem,
      label: resolveSocialLabel(cmsItem, fallbackLinks),
      url: cmsItem.url?.trim() ?? "",
      isVisible: cmsItem.isVisible !== false,
      openInNewTab: cmsItem.openInNewTab !== false
    }))
    .filter(isValidSocialLink)
    .sort((a, b) => a.order - b.order);
}

export function buildSiteConfigFromCms(
  fallback: CmsSiteConfig,
  fields: SiteConfigFields
): CmsSiteConfig {
  const siteName =
    typeof fields.siteName === "string" && fields.siteName.trim()
      ? fields.siteName
      : fallback.siteName;

  return {
    siteName,
    shortName:
      typeof fields.shortName === "string" && fields.shortName.trim()
        ? fields.shortName
        : fallback.shortName || siteName,
    brandSubtitle:
      typeof fields.brandSubtitle === "string" && fields.brandSubtitle.trim()
        ? fields.brandSubtitle
        : fallback.brandSubtitle,
    footerTagline:
      typeof fields.footerTagline === "string" && fields.footerTagline.trim()
        ? fields.footerTagline
        : fallback.footerTagline,
    footerNote:
      typeof fields.footerNote === "string" && fields.footerNote.trim()
        ? fields.footerNote
        : fallback.footerNote,
    logoUrl: fields.logoUrl || fallback.logoUrl,
    navigation: mergeNavigation(fields.navigation ?? [], fallback.navigation),
    socialLinks: mergeSocialLinks(fields.socialLinks ?? [], fallback.socialLinks),
    defaultSeo: fields.defaultSeo ?? fallback.defaultSeo,
    uiLabels: mergeUiLabels(fields.uiLabels ?? fallback.uiLabels, fallback.uiLabels)
  };
}

/** @deprecated Use buildSiteConfigFromCms */
export function mergeSiteConfigWithCms(
  fallback: CmsSiteConfig,
  fields: SiteConfigFields | null
): CmsSiteConfig {
  if (!fields) return fallback;
  return buildSiteConfigFromCms(fallback, fields);
}
