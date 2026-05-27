import { getStrapiApiToken, getStrapiUrl } from "@/lib/env";
import { fetchSectorIdBySlug } from "@/lib/cms/sectors";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

const UPLOAD_TIMEOUT_MS = 15000;

function getAdminHeaders(contentType?: string) {
  const token = getStrapiApiToken();
  if (!token) {
    throw new Error("STRAPI_API_TOKEN is not configured");
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`
  };

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  return headers;
}

function getDocumentId(payload: Record<string, unknown>) {
  const data = payload.data;
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    if (record.documentId) return String(record.documentId);
    if (record.id) return String(record.id);
  }

  if (payload.documentId) return String(payload.documentId);
  if (payload.id) return String(payload.id);
  return "";
}

export async function uploadDocumentWithToken(formData: FormData) {
  const strapiUrl = getStrapiUrl();
  if (!strapiUrl) {
    throw new Error("Strapi URL is not configured");
  }

  const file = formData.get("file");
  const title = String(formData.get("title") || "").trim();
  const sectorSlug = String(formData.get("sector") || "").trim();
  const localeValue = String(formData.get("locale") || "en");

  if (!file || !(file instanceof File)) {
    throw new Error("Missing PDF file");
  }

  if (!title) {
    throw new Error("Missing document title");
  }

  if (!isLocale(localeValue)) {
    throw new Error("Invalid locale");
  }

  const locale = localeValue as Locale;

  if (file.type && file.type !== "application/pdf") {
    throw new Error("Only PDF files are allowed");
  }

  const uploadData = new FormData();
  uploadData.append("files", file);

  const uploadRes = await fetch(`${strapiUrl}/api/upload`, {
    method: "POST",
    headers: getAdminHeaders(),
    body: uploadData,
    signal: AbortSignal.timeout(UPLOAD_TIMEOUT_MS)
  });

  if (!uploadRes.ok) {
    throw new Error("Upload failed");
  }

  const uploaded = await uploadRes.json();
  const uploadedFile = Array.isArray(uploaded) ? uploaded[0] : uploaded;
  const fileId = uploadedFile?.id ?? uploadedFile?.documentId;

  if (!fileId) {
    throw new Error("Upload failed");
  }

  const sectorId = sectorSlug ? await fetchSectorIdBySlug(sectorSlug, locale) : null;
  const data: Record<string, unknown> = {
    title,
    file: fileId
  };

  if (sectorId) {
    data.sector = sectorId;
  }

  const createRes = await fetch(`${strapiUrl}/api/forum-documents?locale=${locale}`, {
    method: "POST",
    headers: getAdminHeaders("application/json"),
    body: JSON.stringify({ data }),
    signal: AbortSignal.timeout(UPLOAD_TIMEOUT_MS)
  });

  if (!createRes.ok) {
    throw new Error("Document create failed");
  }

  const created = (await createRes.json()) as Record<string, unknown>;
  const documentId = getDocumentId(created);

  if (documentId) {
    await fetch(
      `${strapiUrl}/api/forum-documents/${encodeURIComponent(documentId)}/actions/publish?locale=${locale}`,
      {
        method: "POST",
        headers: getAdminHeaders(),
        signal: AbortSignal.timeout(UPLOAD_TIMEOUT_MS)
      }
    );
  }

  return created;
}
