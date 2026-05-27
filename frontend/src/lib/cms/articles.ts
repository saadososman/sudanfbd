import {
  getMediaUrl,
  strapiFetch,
  unwrapCollectionItems
} from "@/lib/cms/client";
import type { Locale } from "@/lib/i18n";

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

function getArticleId(item: Record<string, unknown>) {
  const id = item.documentId ?? item.id;
  return id ? String(id) : "";
}

function getItemFields(item: Record<string, unknown>) {
  const attributes = item.attributes;
  if (attributes && typeof attributes === "object") {
    return attributes as Record<string, unknown>;
  }
  return item;
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

const articlesQuery =
  "sort=publishedAt:desc&populate[coverImage]=*";

export async function fetchArticles(locale: Locale): Promise<ArticleItem[]> {
  const payload = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    `/api/articles?${articlesQuery}&pagination[pageSize]=100`,
    { locale, revalidate: 120, tags: [`articles-${locale}`] }
  );

  if (!payload?.data?.length) return [];

  return payload.data
    .map((item) => mapArticleItem(item))
    .filter((item): item is ArticleItem => item !== null);
}

export async function fetchLatestArticles(
  locale: Locale,
  limit = 3
): Promise<ArticleItem[]> {
  const payload = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    `/api/articles?${articlesQuery}&pagination[pageSize]=${limit}`,
    { locale, revalidate: 120, tags: [`articles-${locale}`] }
  );

  if (!payload?.data?.length) return [];

  return payload.data
    .map((item) => mapArticleItem(item))
    .filter((item): item is ArticleItem => item !== null);
}

export async function fetchArticle(
  locale: Locale,
  id: string
): Promise<ArticleItem | null> {
  if (!id) return null;

  const payload = await strapiFetch<{ data?: Record<string, unknown> | null }>(
    `/api/articles/${encodeURIComponent(id)}?populate[coverImage]=*`,
    { locale, revalidate: 120, tags: [`article-${id}-${locale}`] }
  );

  if (!payload?.data) return null;
  return mapArticleItem(payload.data);
}

export function formatArticleDate(value: string | undefined, locale: Locale) {
  if (!value) return "";

  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SD" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(value));
}
