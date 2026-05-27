import {
  findBySlug,
  getDocumentId,
  publishIfSupported,
  SEED_LOCALES,
  type SeedStrapi
} from "./helpers";
import {
  getPageSeed,
  type PageSlug
} from "./seed-data/website-content";

const PAGE_UID = "api::page.page";
const PAGE_SLUGS: PageSlug[] = ["about", "objectives", "methodology", "framework"];

export async function seedPages(strapi: SeedStrapi) {
  const documents = strapi.documents(PAGE_UID);

  for (const slug of PAGE_SLUGS) {
    for (const locale of SEED_LOCALES) {
      const existing = await findBySlug(documents, locale, slug);
      if (existing) {
        strapi.log.info(`Page seed skipped for ${slug} (${locale}): entry already exists.`);
        continue;
      }

      const seed = getPageSeed(slug, locale);
      const created = await documents.create({
        locale,
        data: { slug, ...seed }
      });
      const documentId = getDocumentId(created);
      await publishIfSupported(documents, documentId, locale, true);
      strapi.log.info(`Page seeded: ${slug} (${locale}).`);
    }
  }
}
