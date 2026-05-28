import {
  getDocumentId,
  publishIfSupported,
  SEED_LOCALES,
  type SeedStrapi
} from "./helpers";
import { getSiteConfigSeed } from "./seed-data/website-content";

const SITE_CONFIG_UID = "api::site-config.site-config";

function hasValidSocialLinks(value: unknown) {
  if (!Array.isArray(value) || !value.length) return false;

  return value.some((item) => {
    if (!item || typeof item !== "object") return false;
    const link = item as { url?: unknown; isVisible?: unknown };
    if (link.isVisible === false) return false;
    return typeof link.url === "string" && /^https?:\/\//i.test(link.url.trim());
  });
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
    const hasSocialLinks = hasValidSocialLinks(existing?.socialLinks);

    if (typeof siteName === "string" && siteName.trim() && hasUiLabels && hasSocialLinks) {
      strapi.log.info(`Site config seed skipped for ${locale}: already populated.`);
      continue;
    }

    let documentId = getDocumentId(existing);
    const data =
      typeof siteName === "string" && siteName.trim() && hasUiLabels && !hasSocialLinks
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
