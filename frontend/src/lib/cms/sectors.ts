import {
  getMediaUrl,
  logStrapiFetch,
  parseJsonArray,
  strapiFetch,
  unwrapCollectionItems
} from "@/lib/cms/client";
import { StrapiFetchError } from "@/lib/cms/errors";
import type { StrapiFetchMeta } from "@/lib/cms/fetch-log";
import type { CmsSector, SectorCategory } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

const sectorCategories: SectorCategory[] = [
  "economic",
  "services",
  "governance",
  "infrastructure",
  "social"
];

function isSectorCategory(value: unknown): value is SectorCategory {
  return typeof value === "string" && sectorCategories.includes(value as SectorCategory);
}

function stripRichText(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function mapSectorItem(item: Record<string, unknown>): CmsSector | null {
  const fields =
    item.attributes && typeof item.attributes === "object"
      ? (item.attributes as Record<string, unknown>)
      : item;

  const idValue = item.documentId ?? item.id;
  const slug = fields.slug;
  const title = fields.title ?? fields.name;
  const category = fields.category;

  if (!idValue || typeof slug !== "string" || typeof title !== "string") {
    return null;
  }

  const resolvedCategory = isSectorCategory(category) ? category : "economic";
  const outputs = parseJsonArray<string>(fields.outputs);
  const summary =
    (typeof fields.summary === "string" && fields.summary) ||
    stripRichText(fields.description) ||
    "";

  return {
    id: String(idValue),
    slug,
    title,
    summary,
    body:
      (typeof fields.body === "string" && fields.body) ||
      stripRichText(fields.description) ||
      summary,
    outputs,
    category: resolvedCategory,
    icon: typeof fields.icon === "string" ? fields.icon : "clipboard",
    coverImageUrl: getMediaUrl(fields.coverImage ?? fields.coverimage) || undefined,
    order: typeof fields.order === "number" ? fields.order : 0
  };
}

function logFinalStrapiUrl(label: string, locale: Locale, meta: StrapiFetchMeta) {
  console.log(
    `[CMS] ${label} final url=${meta.url ?? "(unknown)"} locale=${locale} status=${meta.status ?? "n/a"} hasData=${meta.hasData ?? false}`
  );
}

function assertStrapiFetch(
  label: string,
  locale: Locale,
  meta: StrapiFetchMeta,
  payload: unknown
): void {
  logFinalStrapiUrl(label, locale, meta);

  if (!meta.url || meta.url === "(not configured)") {
    throw new StrapiFetchError(
      "NEXT_PUBLIC_STRAPI_URL is not configured.",
      meta.url ?? "(not configured)",
      null
    );
  }

  if (meta.status === null) {
    throw new StrapiFetchError(
      "Strapi request failed (network error or timeout).",
      meta.url,
      null
    );
  }

  if (meta.status >= 400) {
    throw new StrapiFetchError(
      `Strapi returned HTTP ${meta.status}.`,
      meta.url,
      meta.status
    );
  }

  if (payload === null) {
    throw new StrapiFetchError("Strapi returned an empty response.", meta.url, meta.status);
  }
}

export async function fetchSectors(locale: Locale): Promise<CmsSector[]> {
  const { data: payload, meta } = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    "/api/sectors?sort=order:asc&populate=*",
    { locale }
  );

  assertStrapiFetch("sectors", locale, meta, payload);

  const items = unwrapCollectionItems(payload)
    .map((item) => mapSectorItem(item as Record<string, unknown>))
    .filter((item): item is CmsSector => item !== null)
    .sort((a, b) => a.order - b.order);

  if (!items.length) {
    logStrapiFetch("sectors", locale, meta, true);
    throw new StrapiFetchError(
      "Strapi returned no published sectors for this locale.",
      meta.url ?? "",
      meta.status
    );
  }

  logStrapiFetch("sectors", locale, meta, false);
  return items;
}

export async function fetchSectorBySlug(locale: Locale, slug: string): Promise<CmsSector> {
  const { data: payload, meta } = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    `/api/sectors?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    { locale }
  );

  assertStrapiFetch(`sector:${slug}`, locale, meta, payload);

  const item = unwrapCollectionItems(payload)[0] as Record<string, unknown> | undefined;
  const cmsSector = item ? mapSectorItem(item) : null;

  if (!cmsSector) {
    logStrapiFetch(`sector:${slug}`, locale, meta, true);
    throw new StrapiFetchError(
      `No sector found in Strapi for slug "${slug}" and locale "${locale}".`,
      meta.url ?? "",
      meta.status
    );
  }

  logStrapiFetch(`sector:${slug}`, locale, meta, false);
  return cmsSector;
}

export async function fetchSectorSlugs(): Promise<string[]> {
  const { data: payload, meta } = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    "/api/sectors?fields[0]=slug&pagination[pageSize]=100",
    { locale: "en" }
  );

  assertStrapiFetch("sector-slugs", "en", meta, payload);

  const slugs = unwrapCollectionItems(payload)
    .map((item) => item.slug)
    .filter((slug): slug is string => typeof slug === "string");

  if (!slugs.length) {
    logStrapiFetch("sector-slugs", "en", meta, true);
    throw new StrapiFetchError(
      "Strapi returned no sector slugs.",
      meta.url ?? "",
      meta.status
    );
  }

  logStrapiFetch("sector-slugs", "en", meta, false);
  return slugs;
}

export async function fetchSectorIdBySlug(slug: string, locale: Locale = "en") {
  const { data: payload, meta } = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    `/api/sectors?filters[slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1`,
    { locale }
  );

  logFinalStrapiUrl(`sector-id:${slug}`, locale, meta);

  const item = unwrapCollectionItems(payload)[0] as Record<string, unknown> | undefined;
  if (!item) return null;

  return item.documentId ?? item.id ?? null;
}
