import {
  getMediaUrl,
  parseJsonArray,
  strapiFetch
} from "@/lib/cms/client";
import { categoryLabel } from "@/lib/cms/sector-categories";
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

function mapSectorItem(
  item: Record<string, unknown>,
  locale: Locale
): CmsSector | null {
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
    categoryLabel: categoryLabel(resolvedCategory, locale),
    icon: typeof fields.icon === "string" ? fields.icon : "clipboard",
    coverImageUrl: getMediaUrl(fields.coverImage ?? fields.coverimage) || undefined,
    order: typeof fields.order === "number" ? fields.order : 0
  };
}

export async function fetchSectors(locale: Locale): Promise<CmsSector[]> {
  const payload = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    "/api/sectors?sort=order:asc&populate[coverImage]=*",
    { locale, revalidate: 300, tags: [`sectors-${locale}`] }
  );

  return (payload?.data ?? [])
    .map((item) => mapSectorItem(item as Record<string, unknown>, locale))
    .filter((item): item is CmsSector => item !== null)
    .sort((a, b) => a.order - b.order);
}

export async function fetchSectorBySlug(
  locale: Locale,
  slug: string
): Promise<CmsSector | null> {
  const payload = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    `/api/sectors?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[coverImage]=*`,
    { locale, revalidate: 300, tags: [`sector-${slug}-${locale}`] }
  );

  const item = (payload?.data ?? [])[0] as Record<string, unknown> | undefined;
  return item ? mapSectorItem(item, locale) : null;
}

export async function fetchSectorSlugs(): Promise<string[]> {
  const payload = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    "/api/sectors?fields[0]=slug&pagination[pageSize]=100",
    { locale: "en", revalidate: 300, tags: ["sector-slugs"] }
  );

  return (payload?.data ?? [])
    .map((item) => {
      const fields =
        (item as Record<string, unknown>).attributes &&
        typeof (item as Record<string, unknown>).attributes === "object"
          ? ((item as Record<string, unknown>).attributes as Record<string, unknown>)
          : (item as Record<string, unknown>);
      return fields.slug;
    })
    .filter((slug): slug is string => typeof slug === "string");
}

export async function fetchSectorIdBySlug(slug: string, locale: Locale = "en") {
  const payload = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    `/api/sectors?filters[slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1`,
    { locale, revalidate: 60 }
  );

  const item = (payload?.data ?? [])[0] as Record<string, unknown> | undefined;
  if (!item) return null;

  return item.documentId ?? item.id ?? null;
}
