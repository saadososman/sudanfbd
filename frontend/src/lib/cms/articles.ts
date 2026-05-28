import {
  getMediaUrl,
  logStrapiFetch,
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

function mapForumNewsItem(item: Record<string, unknown>): ArticleItem | null {
  const fields = getItemFields(item);
  const id = getArticleId(item);
  const title = fields.title;
  const content = Array.isArray(fields.content) ? (fields.content as StrapiBlock[]) : [];
  const excerpt = blocksToText(content);

  if (!id) return null;

  const publishedAt =
    typeof fields.publishedAt === "string"
      ? fields.publishedAt
      : typeof fields.publishedat === "string"
        ? fields.publishedat
        : undefined;

  return {
    id,
    title: typeof title === "string" && title ? title : "Untitled",
    excerpt: excerpt.length > 180 ? `${excerpt.slice(0, 177)}...` : excerpt,
    content,
    coverImageUrl:
      getMediaUrl(fields.coverImage) ||
      getMediaUrl(fields.coverimage) ||
      getMediaUrl(fields.file) ||
      undefined,
    publishedAt
  };
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
const forumNewsQuery = "sort=publishedAt:desc&populate[coverimage]=*&populate[file]=*";

function mapArticlesFromPayload(
  payload: { data?: Record<string, unknown>[] | null } | null
) {
  return unwrapCollectionItems(payload)
    .map((item) => mapArticleItem(item as Record<string, unknown>))
    .filter((item): item is ArticleItem => item !== null);
}

function mapForumNewsFromPayload(
  payload: { data?: Record<string, unknown>[] | null } | null
) {
  return unwrapCollectionItems(payload)
    .map((item) => mapForumNewsItem(item as Record<string, unknown>))
    .filter((item): item is ArticleItem => item !== null);
}

async function fetchForumNewsItems(locale: Locale, limit: number) {
  const { data: payload, meta } = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    `/api/news-items?${forumNewsQuery}&pagination[pageSize]=${limit}`,
    { locale }
  );

  return {
    items: mapForumNewsFromPayload(payload),
    meta
  };
}

async function fetchLegacyArticles(locale: Locale, limit: number) {
  const { data: payload, meta } = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    `/api/articles?${articlesQuery}&pagination[pageSize]=${limit}`,
    { locale }
  );

  return {
    items: mapArticlesFromPayload(payload),
    meta
  };
}

export async function fetchArticles(locale: Locale): Promise<ArticleItem[]> {
  const forumNews = await fetchForumNewsItems(locale, 100);
  if (forumNews.items.length) {
    logStrapiFetch("news-items", locale, forumNews.meta, false);
    return forumNews.items;
  }

  const legacy = await fetchLegacyArticles(locale, 100);
  logStrapiFetch("articles", locale, legacy.meta, legacy.items.length === 0);
  return legacy.items;
}

export async function fetchLatestArticles(
  locale: Locale,
  limit = 3
): Promise<ArticleItem[]> {
  const forumNews = await fetchForumNewsItems(locale, limit);
  if (forumNews.items.length) {
    logStrapiFetch(`news-items:latest:${limit}`, locale, forumNews.meta, false);
    return forumNews.items;
  }

  const legacy = await fetchLegacyArticles(locale, limit);
  logStrapiFetch(`articles:latest:${limit}`, locale, legacy.meta, legacy.items.length === 0);
  return legacy.items;
}

export async function fetchArticle(
  locale: Locale,
  id: string
): Promise<ArticleItem | null> {
  if (!id) return null;

  const { data: forumPayload, meta: forumMeta } = await strapiFetch<{
    data?: Record<string, unknown> | null;
  }>(`/api/news-items/${encodeURIComponent(id)}?${forumNewsQuery}`, { locale });

  if (forumPayload?.data) {
    const article = mapForumNewsItem(forumPayload.data as Record<string, unknown>);
    logStrapiFetch(`news-item:${id}`, locale, forumMeta, !article);
    if (article) return article;
  }

  const { data: payload, meta } = await strapiFetch<{ data?: Record<string, unknown> | null }>(
    `/api/articles/${encodeURIComponent(id)}?populate[coverImage]=*`,
    { locale }
  );

  if (!payload?.data) {
    logStrapiFetch(`article:${id}`, locale, meta, true);
    return null;
  }

  const article = mapArticleItem(payload.data as Record<string, unknown>);
  logStrapiFetch(`article:${id}`, locale, meta, !article);
  return article;
}

export function formatArticleDate(value: string | undefined, locale: Locale) {
  if (!value) return "";

  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SD" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(value));
}
