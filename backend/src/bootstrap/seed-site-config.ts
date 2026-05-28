import {
  getDocumentId,
  publishIfSupported,
  SEED_LOCALES,
  type SeedStrapi
} from "./helpers";
import { getSiteConfigSeed } from "./seed-data/website-content";

const SITE_CONFIG_UID = "api::site-config.site-config";

function hasOfficialSocialLinks(value: unknown) {
  if (!Array.isArray(value) || !value.length) return false;

  const links = value.filter(
    (item): item is { platform?: unknown; url?: unknown; isVisible?: unknown } =>
      Boolean(item) && typeof item === "object"
  );

  const xLink = links.find((item) => item.platform === "x" && item.isVisible !== false);
  const facebookLink = links.find(
    (item) => item.platform === "facebook" && item.isVisible !== false
  );

  const xUrl = typeof xLink?.url === "string" ? xLink.url.trim().toLowerCase() : "";
  const facebookUrl =
    typeof facebookLink?.url === "string" ? facebookLink.url.trim() : "";

  return (
    xUrl.includes("x.com/sudanfbd") &&
    facebookUrl === "https://www.facebook.com/profile.php?id=61590093586555"
  );
}

export async function seedSiteConfig(strapi: SeedStrapi) {
  const documents = strapi.documents(SITE_CONFIG_UID);

  for (const locale of SEED_LOCALES) {
    const existing =
      (await documents.findFirst({ locale, status: "published" })) ??
      (await documents.findFirst({ locale }));

    const seed = getSiteConfigSeed(locale);
    const siteName = existing?.siteName;
    const hasUiLabels =
      existing?.uiLabels &&
      typeof existing.uiLabels === "object" &&
      typeof (existing.uiLabels as { search?: unknown }).search === "string" &&
      Boolean((existing.uiLabels as { search: string }).search.trim());
    const hasOfficialLinks = hasOfficialSocialLinks(existing?.socialLinks);

    if (typeof siteName === "string" && siteName.trim() && hasUiLabels && hasOfficialLinks) {
      strapi.log.info(`Site config seed skipped for ${locale}: already populated.`);
      continue;
    }

    let documentId = getDocumentId(existing);
    const data =
      typeof siteName === "string" && siteName.trim() && hasUiLabels && !hasOfficialLinks
        ? { socialLinks: seed.socialLinks }
        : seed;

    if (documentId) {
      await documents.update({ documentId, locale, data });
    } else {
      const created = await documents.create({ locale, data: seed });
      documentId = getDocumentId(created);
    }

    await publishIfSupported(documents, documentId, locale, false);
    strapi.log.info(`Site config seeded for ${locale}.`);
  }
}
