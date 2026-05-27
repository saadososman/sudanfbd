import {
  findBySlug,
  getDocumentId,
  publishIfSupported,
  SEED_LOCALES,
  type SeedStrapi
} from "./helpers";
import { getHomepageSeed } from "./seed-data/website-content";

const HOMEPAGE_UID = "api::homepage.homepage";
const FULL_HOMEPAGE_SECTION_COUNT = 7;

function hasFullHomepageSections(sections: unknown) {
  return Array.isArray(sections) && sections.length >= FULL_HOMEPAGE_SECTION_COUNT;
}

export async function seedHomepage(strapi: SeedStrapi) {
  const documents = strapi.documents(HOMEPAGE_UID);

  for (const locale of SEED_LOCALES) {
    const existing =
      (await documents.findFirst({ locale, status: "published" })) ??
      (await documents.findFirst({ locale }));

    if (hasFullHomepageSections(existing?.sections)) {
      strapi.log.info(`Homepage seed skipped for ${locale}: full sections already present.`);
      continue;
    }

    const seed = getHomepageSeed(locale);
    let documentId = getDocumentId(existing);

    if (documentId) {
      await documents.update({ documentId, locale, data: seed });
    } else {
      const created = await documents.create({ locale, data: seed });
      documentId = getDocumentId(created);
    }

    await publishIfSupported(documents, documentId, locale, true);
    strapi.log.info(`Homepage seeded for ${locale}.`);
  }
}
