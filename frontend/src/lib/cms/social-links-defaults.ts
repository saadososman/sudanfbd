import type { CmsSocialLink } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

export const OFFICIAL_SOCIAL_URLS = {
  x: "https://x.com/sudanfbd",
  facebook: "https://www.facebook.com/profile.php?id=61590061457504"
} as const;

const STALE_X_URLS = new Set([
  "https://x.com/home",
  "http://x.com/home",
  "https://twitter.com/home",
  "http://twitter.com/home"
]);

export function normalizeSocialLink(link: CmsSocialLink): CmsSocialLink {
  const url = link.url?.trim() ?? "";

  if (link.platform === "x") {
    const lowerUrl = url.toLowerCase();
    if (!url || STALE_X_URLS.has(lowerUrl) || !lowerUrl.includes("sudanfbd")) {
      return { ...link, url: OFFICIAL_SOCIAL_URLS.x, openInNewTab: true };
    }
  }

  if (link.platform === "facebook") {
    return { ...link, url: OFFICIAL_SOCIAL_URLS.facebook, openInNewTab: true };
  }

  return link;
}

const labels: Record<Locale, Record<"x" | "facebook", string>> = {
  ar: { x: "X", facebook: "فيسبوك" },
  en: { x: "X", facebook: "Facebook" }
};

export function isValidSocialLink(link: CmsSocialLink) {
  if (link.isVisible === false) return false;
  const url = link.url?.trim();
  if (!url || url === "#") return false;
  return /^https?:\/\//i.test(url);
}

export function getDefaultSocialLinks(locale: Locale): CmsSocialLink[] {
  return [
    normalizeSocialLink({
      platform: "x",
      url: OFFICIAL_SOCIAL_URLS.x,
      label: labels[locale].x,
      order: 0,
      isVisible: true,
      openInNewTab: true
    }),
    normalizeSocialLink({
      platform: "facebook",
      url: OFFICIAL_SOCIAL_URLS.facebook,
      label: labels[locale].facebook,
      order: 1,
      isVisible: true,
      openInNewTab: true
    })
  ];
}
