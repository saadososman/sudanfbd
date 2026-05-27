import {
  getDocumentId,
  publishIfSupported,
  SEED_LOCALES,
  type SeedStrapi
} from "./helpers";
import { getSiteConfigSeed } from "./seed-data/website-content";

const SITE_CONFIG_UID = "api::site-config.site-config";

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

    if (typeof siteName === "string" && siteName.trim() && hasUiLabels) {
      strapi.log.info(`Site config seed skipped for ${locale}: already populated.`);
      continue;
    }

    let documentId = getDocumentId(existing);

    if (documentId) {
      await documents.update({ documentId, locale, data: seed });
    } else {
      const created = await documents.create({ locale, data: seed });
      documentId = getDocumentId(created);
    }

    await publishIfSupported(documents, documentId, locale, false);
    strapi.log.info(`Site config seeded for ${locale}.`);
  }
}
