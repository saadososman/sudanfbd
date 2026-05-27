import {
  getMediaUrl,
  logStrapiFetch,
  strapiFetch,
  unwrapCollectionItems
} from "@/lib/cms/client";
import { getFallbackDocuments } from "@/lib/cms/fallbacks-documents";
import type { Locale } from "@/lib/i18n";

export type DocumentItem = {
  id: string;
  title: string;
  sector?: string;
  locale?: string;
  url: string;
  publishedAt?: string;
};

function getItemFields(item: Record<string, unknown>) {
  const attributes = item.attributes;
  if (attributes && typeof attributes === "object") {
    return attributes as Record<string, unknown>;
  }
  return item;
}

function getRelatedEntity(relation: unknown) {
  if (!relation || typeof relation !== "object") return null;

  const relationRecord = relation as Record<string, unknown>;
  const data = relationRecord.data ?? relation;

  if (Array.isArray(data)) {
    return (data[0] as Record<string, unknown> | undefined) ?? null;
  }

  return data as Record<string, unknown>;
}

function getRelationLabel(relation: unknown) {
  const entity = getRelatedEntity(relation);
  if (!entity) return "";

  const fields = getItemFields(entity);
  const title = fields.title;
  const name = fields.name;
  const slug = fields.slug;

  if (typeof title === "string" && title) return title;
  if (typeof name === "string" && name) return name;
  if (typeof slug === "string" && slug) return slug;
  return "";
}

function mapDocumentItem(
  item: Record<string, unknown>,
  locale: Locale
): DocumentItem | null {
  const fields = getItemFields(item);
  const fileUrl = getMediaUrl(fields.file);

  if (!fileUrl) return null;

  const id = item.documentId ?? item.id;
  const title = fields.title;

  return {
    id: String(id ?? ""),
    title: typeof title === "string" && title ? title : "Untitled",
    sector: getRelationLabel(fields.sector),
    locale,
    url: fileUrl,
    publishedAt:
      typeof fields.publishedAt === "string" ? fields.publishedAt : undefined
  };
}

export async function fetchDocuments(locale: Locale): Promise<DocumentItem[]> {
  const { data: payload, meta } = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    "/api/forum-documents?populate[file]=*&populate[sector]=*&sort=publishedAt:desc&pagination[pageSize]=100",
    { locale, timeoutMs: 8000 }
  );

  const items = unwrapCollectionItems(payload)
    .map((item) => mapDocumentItem(item as Record<string, unknown>, locale))
    .filter((item): item is DocumentItem => item !== null);

  if (!items.length) {
    logStrapiFetch("documents", locale, meta, true);
    return getFallbackDocuments(locale);
  }

  logStrapiFetch("documents", locale, meta, false);
  return items;
}
