import {
  findBySlug,
  getDocumentId,
  publishIfSupported,
  SEED_LOCALES,
  type SeedLocale,
  type SeedStrapi
} from "./helpers";
import {
  getSectorEntryData,
  SECTOR_SEEDS
} from "./seed-data/sectors-content";

const SECTOR_UID = "api::sector.sector";

async function upsertSectorLocale(
  strapi: SeedStrapi,
  documentId: string,
  locale: SeedLocale,
  data: Record<string, unknown>
) {
  const documents = strapi.documents(SECTOR_UID);
  await documents.update({ documentId, locale, data });
  await publishIfSupported(documents, documentId, locale, true);
}

export async function seedSectors(strapi: SeedStrapi) {
  const documents = strapi.documents(SECTOR_UID);

  for (let index = 0; index < SECTOR_SEEDS.length; index++) {
    const sector = SECTOR_SEEDS[index];
    const existingAr = await findBySlug(documents, "ar", sector.slug);
    const existingEn = await findBySlug(documents, "en", sector.slug);

    if (existingAr && existingEn) {
      continue;
    }

    let documentId = getDocumentId(existingAr) || getDocumentId(existingEn);

    if (!documentId) {
      const created = await documents.create({
        locale: "ar",
        data: getSectorEntryData(sector, "ar", index)
      });
      documentId = getDocumentId(created);
      await publishIfSupported(documents, documentId, "ar", true);
    } else if (!existingAr) {
      await upsertSectorLocale(
        strapi,
        documentId,
        "ar",
        getSectorEntryData(sector, "ar", index)
      );
    }

    if (!existingEn) {
      await upsertSectorLocale(
        strapi,
        documentId,
        "en",
        getSectorEntryData(sector, "en", index)
      );
    }

    strapi.log.info(`Sector seeded: ${sector.slug}.`);
  }
}
