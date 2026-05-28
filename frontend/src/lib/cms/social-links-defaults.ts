import type { CmsSocialLink } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

export const OFFICIAL_SOCIAL_URLS = {
  x: "https://x.com/home",
  facebook: "https://www.facebook.com/profile.php?id=61590061457504"
} as const;

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
    {
      platform: "x",
      url: OFFICIAL_SOCIAL_URLS.x,
      label: labels[locale].x,
      order: 0,
      isVisible: true,
      openInNewTab: true
    },
    {
      platform: "facebook",
      url: OFFICIAL_SOCIAL_URLS.facebook,
      label: labels[locale].facebook,
      order: 1,
      isVisible: true,
      openInNewTab: true
    }
  ];
}
