import {
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

function getSectionIndex(sections: unknown[], matcher: (section: Record<string, unknown>) => boolean) {
  return sections.findIndex(
    (section) => section && typeof section === "object" && matcher(section as Record<string, unknown>)
  );
}

function isNewsBeforePreamble(sections: unknown) {
  if (!Array.isArray(sections)) return false;

  const newsIndex = getSectionIndex(
    sections,
    (section) =>
      section.__component === "sections.content-teaser-section" && section.contentType === "news"
  );
  const preambleIndex = getSectionIndex(
    sections,
    (section) => section.__component === "sections.about-section"
  );

  return newsIndex >= 0 && preambleIndex >= 0 && newsIndex < preambleIndex;
}

export async function seedHomepage(strapi: SeedStrapi) {
  const documents = strapi.documents(HOMEPAGE_UID);

  for (const locale of SEED_LOCALES) {
    const existing =
      (await documents.findFirst({ locale, status: "published" })) ??
      (await documents.findFirst({ locale }));

    const seed = getHomepageSeed(locale);
    const hasFullSections = hasFullHomepageSections(existing?.sections);
    const hasCorrectOrder = isNewsBeforePreamble(existing?.sections);

    if (hasFullSections && hasCorrectOrder) {
      strapi.log.info(`Homepage seed skipped for ${locale}: sections already ordered.`);
      continue;
    }

    let documentId = getDocumentId(existing);
    const data = hasFullSections && !hasCorrectOrder ? { sections: seed.sections } : seed;

    if (documentId) {
      await documents.update({ documentId, locale, data });
    } else {
      const created = await documents.create({ locale, data: seed });
      documentId = getDocumentId(created);
    }

    await publishIfSupported(documents, documentId, locale, true);
    strapi.log.info(`Homepage seeded for ${locale}.`);
  }
}
