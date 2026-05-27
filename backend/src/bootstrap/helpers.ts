export type SeedLocale = "ar" | "en";

export const SEED_LOCALES: SeedLocale[] = ["ar", "en"];

export type SeedDocuments = {
  findFirst: (params: Record<string, unknown>) => Promise<Record<string, unknown> | null>;
  findMany: (params: Record<string, unknown>) => Promise<
    { results?: Record<string, unknown>[] } | Record<string, unknown>[]
  >;
  create: (params: Record<string, unknown>) => Promise<unknown>;
  update: (params: Record<string, unknown>) => Promise<unknown>;
  publish: (params: Record<string, unknown>) => Promise<unknown>;
};

export type SeedStrapi = {
  documents: (uid: string) => SeedDocuments;
  log: {
    info: (message: string) => void;
    warn: (message: string) => void;
  };
};

export function asSeedStrapi(strapi: {
  documents: (uid: string) => unknown;
  log: SeedStrapi["log"];
}): SeedStrapi {
  return strapi as SeedStrapi;
}

export function getDocumentId(record: unknown) {
  if (!record || typeof record !== "object") return "";
  const value = record as { documentId?: string; id?: string | number };
  if (value.documentId) return String(value.documentId);
  if (value.id !== undefined) return String(value.id);
  return "";
}

export async function publishIfSupported(
  documents: SeedDocuments,
  documentId: string,
  locale: SeedLocale,
  draftAndPublish: boolean
) {
  if (!draftAndPublish || !documentId) return;

  try {
    await documents.publish({ documentId, locale });
  } catch {
    // Single types like site-config may not support publish.
  }
}

export async function findBySlug(
  documents: SeedDocuments,
  locale: SeedLocale,
  slug: string
) {
  const published = await documents.findMany({
    locale,
    filters: { slug: { $eq: slug } },
    status: "published",
    pagination: { pageSize: 1 }
  });

  const publishedItem = Array.isArray(published)
    ? published[0]
    : published?.results?.[0];
  if (publishedItem) return publishedItem;

  const draft = await documents.findMany({
    locale,
    filters: { slug: { $eq: slug } },
    pagination: { pageSize: 1 }
  });

  return Array.isArray(draft) ? draft[0] ?? null : draft?.results?.[0] ?? null;
}
