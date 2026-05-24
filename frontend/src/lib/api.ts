const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

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

export async function fetchDocuments(): Promise<DocumentItem[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/reports?populate=pdf&sort=publishedAt:desc`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) return fallbackDocuments;

    const payload = await res.json();
    return payload.data.map((item: any) => {
      const fileUrl = item.attributes?.pdf?.data?.attributes?.url || "";
      return {
        id: String(item.id),
        title: item.attributes?.title || "Untitled",
        sector: item.attributes?.sector || "",
        locale: item.attributes?.language || item.attributes?.locale || "en",
        url: fileUrl.startsWith("http") ? fileUrl : `${STRAPI_URL}${fileUrl}`,
        publishedAt: item.attributes?.publishedAt
      };
    });
  } catch {
    return fallbackDocuments;
  }
}

export async function uploadDocument(formData: FormData) {
  const file = formData.get("file");
  const title = String(formData.get("title") || "");
  const sector = String(formData.get("sector") || "");
  const locale = String(formData.get("locale") || "en");

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

  const createRes = await fetch(`${STRAPI_URL}/api/reports`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        title,
        sector,
        language: locale,
        pdf: uploaded[0]?.id
      }
    })
  });

  if (!createRes.ok) throw new Error("Document create failed");
  return createRes.json();
}
