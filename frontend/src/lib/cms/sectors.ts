import { unstable_noStore as noStore } from "next/cache";
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

function readTimestamp(value: unknown) {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function mapSectorItem(item: Record<string, unknown>, fetchedFromUrl?: string): CmsSector | null {
  const fields =
    item.attributes && typeof item.attributes === "object"
      ? (item.attributes as Record<string, unknown>)
      : item;

  const idValue = item.documentId ?? item.id ?? fields.documentId ?? fields.id;
  const slug = fields.slug;
  const title = fields.title ?? fields.name;
  const category = fields.category;

  if (!idValue || typeof slug !== "string" || typeof title !== "string") {
    return null;
  }

  const resolvedCategory = isSectorCategory(category) ? category : "economic";
  const outputs = parseJsonArray<string>(fields.outputs);
  const summary =
    typeof fields.summary === "string" && fields.summary.trim()
      ? fields.summary.trim()
      : stripRichText(fields.description);

  const body =
    typeof fields.body === "string" && fields.body.trim()
      ? fields.body.trim()
      : stripRichText(fields.description) || summary;

  return {
    id: String(idValue),
    slug,
    title: title.trim(),
    summary,
    body,
    outputs,
    category: resolvedCategory,
    icon: typeof fields.icon === "string" ? fields.icon : "clipboard",
    coverImageUrl: getMediaUrl(fields.coverImage ?? fields.coverimage) || undefined,
    order: typeof fields.order === "number" ? fields.order : 0,
    updatedAt: readTimestamp(item.updatedAt ?? fields.updatedAt),
    publishedAt: readTimestamp(item.publishedAt ?? fields.publishedAt),
    fetchedFromUrl
  };
}

function logFinalStrapiUrl(label: string, locale: Locale, meta: StrapiFetchMeta) {
  console.log(
    `[CMS] ${label} final url=${meta.url ?? "(unknown)"} locale=${locale} status=${meta.status ?? "n/a"} hasData=${meta.hasData ?? false}`
  );
}

function logSectorPayload(
  slug: string,
  locale: Locale,
  rawItem: Record<string, unknown>,
  sector: CmsSector
) {
  console.log(
    `[CMS] sector payload slug=${slug} locale=${locale} ${JSON.stringify({
      documentId: rawItem.documentId ?? rawItem.id,
      updatedAt: sector.updatedAt,
      publishedAt: sector.publishedAt,
      title: sector.title,
      summary: sector.summary,
      body: sector.body,
      icon: sector.icon,
      order: sector.order,
      fetchedFromUrl: sector.fetchedFromUrl
    })}`
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

function sectorBySlugPath(slug: string) {
  return `/api/sectors?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
}

const liveSectorFetch = { cacheBust: true } as const;

export async function fetchSectors(locale: Locale): Promise<CmsSector[]> {
  noStore();

  const { data: payload, meta } = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    "/api/sectors?sort=order:asc&populate=*",
    { locale, ...liveSectorFetch }
  );

  assertStrapiFetch("sectors", locale, meta, payload);

  const items = unwrapCollectionItems(payload)
    .map((item) => mapSectorItem(item as Record<string, unknown>, meta.url))
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

  console.log(
    `[CMS] sectors payload locale=${locale} count=${items.length} titles=${items.map((s) => `${s.slug}:${s.title}`).join("|")}`
  );
  logStrapiFetch("sectors", locale, meta, false);
  return items;
}

export async function fetchSectorBySlug(locale: Locale, slug: string): Promise<CmsSector> {
  noStore();

  const { data: payload, meta } = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    sectorBySlugPath(slug),
    { locale, ...liveSectorFetch }
  );

  assertStrapiFetch(`sector:${slug}`, locale, meta, payload);

  const rawItems = unwrapCollectionItems(payload);
  console.log(
    `[CMS] sector raw response slug=${slug} locale=${locale} count=${rawItems.length} rawTitles=${rawItems
      .map((item) => String((item as Record<string, unknown>).title ?? ""))
      .join("|")}`
  );

  const item = rawItems[0] as Record<string, unknown> | undefined;
  const cmsSector = item ? mapSectorItem(item, meta.url) : null;

  if (!cmsSector || !item) {
    logStrapiFetch(`sector:${slug}`, locale, meta, true);
    throw new StrapiFetchError(
      `No sector found in Strapi for slug "${slug}" and locale "${locale}".`,
      meta.url ?? "",
      meta.status
    );
  }

  logSectorPayload(slug, locale, item, cmsSector);
  logStrapiFetch(`sector:${slug}`, locale, meta, false);
  return cmsSector;
}

export async function fetchSectorSlugs(): Promise<string[]> {
  noStore();

  const { data: payload, meta } = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    "/api/sectors?fields[0]=slug&pagination[pageSize]=100",
    { locale: "en", ...liveSectorFetch }
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
  noStore();

  const { data: payload, meta } = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    `/api/sectors?filters[slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1`,
    { locale, ...liveSectorFetch }
  );

  logFinalStrapiUrl(`sector-id:${slug}`, locale, meta);

  const item = unwrapCollectionItems(payload)[0] as Record<string, unknown> | undefined;
  if (!item) return null;

  return item.documentId ?? item.id ?? null;
}
