import { getStrapiUrl } from "./env";

const STRAPI_URL = getStrapiUrl();

export type DocumentItem = {
  id: string;
  title: string;
  sector?: string;
  locale?: string;
  url: string;
  publishedAt?: string;
};

export const fallbackDocuments: DocumentItem[] = [
  {
    id: "sample-policy",
    title: "Sudan Development Priorities Brief",
    sector: "research",
    locale: "en",
    url: "/sample-development-brief.pdf",
    publishedAt: "2026-01-01"
  }
];

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

function getMediaUrl(media: unknown) {
  if (!media || typeof media !== "object") return "";

  const mediaRecord = media as Record<string, unknown>;
  const entity = getRelatedEntity(mediaRecord) ?? mediaRecord;
  const fields = getItemFields(entity);
  const url = fields.url;

  return typeof url === "string" ? url : "";
}

function getRelationLabel(relation: unknown) {
  const entity = getRelatedEntity(relation);
  if (!entity) return "";

  const fields = getItemFields(entity);
  const name = fields.name;
  const slug = fields.slug;

  if (typeof name === "string" && name) return name;
  if (typeof slug === "string" && slug) return slug;
  return "";
}

function mapDocumentItem(item: Record<string, unknown>): DocumentItem | null {
  const fields = getItemFields(item);
  const fileUrl = getMediaUrl(fields.file);

  if (!fileUrl) return null;

  const id = item.documentId ?? item.id;
  const title = fields.title;

  return {
    id: String(id ?? ""),
    title: typeof title === "string" && title ? title : "Untitled",
    sector: getRelationLabel(fields.sector),
    url: fileUrl.startsWith("http") ? fileUrl : `${STRAPI_URL}${fileUrl}`,
    publishedAt:
      typeof fields.publishedAt === "string" ? fields.publishedAt : undefined
  };
}

import { fetchSectorIdBySlug } from "@/lib/cms/sectors";

export async function fetchDocuments(): Promise<DocumentItem[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/forum-documents?populate[file]=*&populate[sector]=*&sort=publishedAt:desc`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return fallbackDocuments;

    const payload = await res.json();
    const documents = (payload.data ?? [])
      .map((item: Record<string, unknown>) => mapDocumentItem(item))
      .filter((item: DocumentItem | null): item is DocumentItem => item !== null);

    return documents.length > 0 ? documents : fallbackDocuments;
  } catch {
    return fallbackDocuments;
  }
}

export async function uploadDocument(formData: FormData) {
  const file = formData.get("file");
  const title = String(formData.get("title") || "");
  const sectorSlug = String(formData.get("sector") || "");

  if (!file || !title) {
    throw new Error("Missing required fields");
  }

  const uploadData = new FormData();
  uploadData.append("files", file);

  const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
    method: "POST",
    body: uploadData
  });

  if (!uploadRes.ok) throw new Error("Upload failed");

  const uploaded = await uploadRes.json();
  const uploadedFile = Array.isArray(uploaded) ? uploaded[0] : uploaded;
  const fileId = uploadedFile?.id ?? uploadedFile?.documentId;

  if (!fileId) throw new Error("Upload failed");

  const sectorId = await fetchSectorIdBySlug(sectorSlug);
  const data: Record<string, unknown> = {
    title,
    file: fileId
  };

  if (sectorId) {
    data.sector = sectorId;
  }

  const createRes = await fetch(`${STRAPI_URL}/api/forum-documents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data })
  });

  if (!createRes.ok) throw new Error("Document create failed");
  return createRes.json();
}
