import { getStrapiUrl } from "./env";

const STRAPI_URL = getStrapiUrl();

export type StrapiBlock = {
  type?: string;
  level?: number;
  format?: string;
  children?: StrapiBlock[];
  text?: string;
};

export type ArticleItem = {
  id: string;
  title: string;
  excerpt: string;
  content: StrapiBlock[];
  coverImageUrl?: string;
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

function getMediaUrl(media: unknown) {
  if (!media || typeof media !== "object") return "";

  const mediaRecord = media as Record<string, unknown>;
  const entity = getRelatedEntity(mediaRecord) ?? mediaRecord;
  const fields = getItemFields(entity);
  const url = fields.url;

  if (typeof url !== "string" || !url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

function getArticleId(item: Record<string, unknown>) {
  const id = item.documentId ?? item.id;
  return id ? String(id) : "";
}

function blocksToText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return "";

  const parts: string[] = [];

  function walk(nodes: unknown[]) {
    for (const node of nodes) {
      if (!node || typeof node !== "object") continue;

      const block = node as StrapiBlock;
      if (typeof block.text === "string" && block.text.trim()) {
        parts.push(block.text.trim());
      }

      if (Array.isArray(block.children)) {
        walk(block.children);
      }
    }
  }

  walk(blocks);
  return parts.join(" ");
}

function mapArticleItem(item: Record<string, unknown>): ArticleItem | null {
  const fields = getItemFields(item);
  const id = getArticleId(item);
  const title = fields.title;
  const content = Array.isArray(fields.content) ? (fields.content as StrapiBlock[]) : [];
  const excerpt = blocksToText(content);

  if (!id) return null;

  return {
    id,
    title: typeof title === "string" && title ? title : "Untitled",
    excerpt: excerpt.length > 180 ? `${excerpt.slice(0, 177)}...` : excerpt,
    content,
    coverImageUrl: getMediaUrl(fields.coverImage) || undefined,
    publishedAt:
      typeof fields.publishedAt === "string" ? fields.publishedAt : undefined
  };
}

const articlesQuery = "sort=publishedAt:desc&populate[coverImage]=*";

export async function fetchArticles(): Promise<ArticleItem[]> {
  if (!STRAPI_URL) return [];

  try {
    const res = await fetch(`${STRAPI_URL}/api/articles?${articlesQuery}`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) return [];

    const payload = await res.json();

    return (payload.data ?? [])
      .map((item: Record<string, unknown>) => mapArticleItem(item))
      .filter((item: ArticleItem | null): item is ArticleItem => item !== null);
  } catch {
    return [];
  }
}

export async function fetchLatestArticles(limit = 3): Promise<ArticleItem[]> {
  if (!STRAPI_URL) return [];

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles?${articlesQuery}&pagination[pageSize]=${limit}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return [];

    const payload = await res.json();

    return (payload.data ?? [])
      .map((item: Record<string, unknown>) => mapArticleItem(item))
      .filter((item: ArticleItem | null): item is ArticleItem => item !== null);
  } catch {
    return [];
  }
}

export async function fetchArticle(id: string): Promise<ArticleItem | null> {
  if (!STRAPI_URL || !id) return null;

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles/${encodeURIComponent(id)}?populate[coverImage]=*`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;

    const payload = await res.json();
    const item = (payload.data ?? payload) as Record<string, unknown>;
    return mapArticleItem(item);
  } catch {
    return null;
  }
}

export function formatArticleDate(value: string | undefined, locale: "ar" | "en") {
  if (!value) return "";

  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SD" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(value));
}
