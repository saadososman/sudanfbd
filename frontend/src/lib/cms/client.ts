import { getStrapiUrl } from "@/lib/env";
import type { CmsHomeSection } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

const STRAPI_URL = getStrapiUrl();

type StrapiFetchOptions = {
  locale: Locale;
  revalidate?: number | false;
  tags?: string[];
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

export function getMediaUrl(media: unknown) {
  if (!media || typeof media !== "object") return "";

  const mediaRecord = media as Record<string, unknown>;
  const entity = getRelatedEntity(mediaRecord) ?? mediaRecord;
  const fields = getItemFields(entity);
  const url = fields.url;

  if (typeof url !== "string" || !url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

export function parseJsonArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export async function strapiFetch<T>(
  path: string,
  { locale, revalidate = 60, tags = [] }: StrapiFetchOptions
): Promise<T | null> {
  if (!STRAPI_URL) return null;

  const separator = path.includes("?") ? "&" : "?";
  const url = `${STRAPI_URL}${path}${separator}locale=${locale}`;

  try {
    const res = await fetch(url, {
      next: {
        revalidate: revalidate === false ? 0 : revalidate,
        tags: tags.length ? tags : undefined
      }
    });

    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function unwrapSingleType<T>(payload: { data?: Record<string, unknown> | null } | null) {
  if (!payload?.data) return null;
  return getItemFields(payload.data) as T;
}

export function unwrapCollectionItem(payload: { data?: Record<string, unknown> | null } | null) {
  if (!payload?.data) return null;
  return getItemFields(payload.data as Record<string, unknown>);
}

export function unwrapCollectionItems(payload: { data?: Record<string, unknown>[] | null } | null) {
  if (!payload?.data?.length) return [];
  return payload.data.map((item) => getItemFields(item));
}

export function mapSeo(fields: Record<string, unknown> | null | undefined) {
  if (!fields) return undefined;

  const seo = fields.defaultSeo ?? fields.seo;
  if (!seo || typeof seo !== "object") return undefined;

  const seoFields = getItemFields(seo as Record<string, unknown>);

  return {
    metaTitle: typeof seoFields.metaTitle === "string" ? seoFields.metaTitle : undefined,
    metaDescription:
      typeof seoFields.metaDescription === "string" ? seoFields.metaDescription : undefined,
    ogImageUrl: getMediaUrl(seoFields.ogImage) || undefined
  };
}

export function mapNavItems(items: unknown) {
  if (!Array.isArray(items)) return [];

  return items
    .map((item, index) => {
      const fields = getItemFields(item as Record<string, unknown>);
      const label = fields.label;
      const path = fields.path;

      if (typeof label !== "string" || typeof path !== "string") return null;

      return {
        label,
        path,
        icon: typeof fields.icon === "string" ? fields.icon : undefined,
        order: typeof fields.order === "number" ? fields.order : index,
        isVisible: fields.isVisible !== false,
        openInNewTab: fields.openInNewTab === true
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => a.order - b.order);
}

export function mapCtaLink(value: unknown) {
  if (!value || typeof value !== "object") return undefined;

  const fields = getItemFields(value as Record<string, unknown>);
  const label = fields.label;
  const path = fields.path;

  if (typeof label !== "string" || typeof path !== "string") return undefined;

  return {
    label,
    path,
    variant:
      fields.variant === "secondary" || fields.variant === "light"
        ? fields.variant
        : "primary",
    icon: typeof fields.icon === "string" ? fields.icon : undefined
  } as const;
}

export function mapTextCards(items: unknown) {
  if (!Array.isArray(items)) return [];

  return items
    .map((item, index) => {
      const fields = getItemFields(item as Record<string, unknown>);
      const title = fields.title;

      if (typeof title !== "string") return null;

      return {
        title,
        text: typeof fields.text === "string" ? fields.text : undefined,
        icon: typeof fields.icon === "string" ? fields.icon : undefined,
        order: typeof fields.order === "number" ? fields.order : index
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function mapStatItems(items: unknown) {
  if (!Array.isArray(items)) return [];

  return items
    .map((item, index) => {
      const fields = getItemFields(item as Record<string, unknown>);
      const value = fields.value;
      const label = fields.label;

      if (typeof value !== "string" || typeof label !== "string") return null;

      return {
        value,
        label,
        order: typeof fields.order === "number" ? fields.order : index
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function mapHomeSections(sections: unknown): CmsHomeSection[] {
  if (!Array.isArray(sections)) return [];

  return sections
    .map((section) => {
      if (!section || typeof section !== "object") return null;

      const fields = getItemFields(section as Record<string, unknown>);
      const component = fields.__component;

      if (component === "sections.hero-section") {
        return {
          __component: "sections.hero-section" as const,
          eyebrow: typeof fields.eyebrow === "string" ? fields.eyebrow : undefined,
          title: typeof fields.title === "string" ? fields.title : "",
          body: typeof fields.body === "string" ? fields.body : undefined,
          primaryCta: mapCtaLink(fields.primaryCta),
          secondaryCta: mapCtaLink(fields.secondaryCta),
          imageUrl: getMediaUrl(fields.image) || undefined,
          insightOne: typeof fields.insightOne === "string" ? fields.insightOne : undefined,
          insightTwo: typeof fields.insightTwo === "string" ? fields.insightTwo : undefined
        };
      }

      if (component === "sections.rich-content-section") {
        return {
          __component: "sections.rich-content-section" as const,
          kicker: typeof fields.kicker === "string" ? fields.kicker : undefined,
          title: typeof fields.title === "string" ? fields.title : "",
          intro: typeof fields.intro === "string" ? fields.intro : undefined,
          paragraphs: parseJsonArray<string>(fields.paragraphs),
          bulletPoints: parseJsonArray<string>(fields.bulletPoints),
          cards: mapTextCards(fields.cards),
          items: parseJsonArray<string>(fields.items),
          phases: parseJsonArray<string>(fields.phases)
        };
      }

      if (component === "sections.stats-section") {
        return {
          __component: "sections.stats-section" as const,
          stats: mapStatItems(fields.stats)
        };
      }

      if (component === "sections.content-teaser-section") {
        const contentType = fields.contentType;
        if (contentType !== "news" && contentType !== "sectors" && contentType !== "documents") {
          return null;
        }

        const typedContentType = contentType as "news" | "sectors" | "documents";

        return {
          __component: "sections.content-teaser-section" as const,
          kicker: typeof fields.kicker === "string" ? fields.kicker : undefined,
          title: typeof fields.title === "string" ? fields.title : "",
          intro: typeof fields.intro === "string" ? fields.intro : undefined,
          contentType: typedContentType,
          limit: typeof fields.limit === "number" ? fields.limit : 3,
          viewAllLabel: typeof fields.viewAllLabel === "string" ? fields.viewAllLabel : undefined,
          viewAllPath: typeof fields.viewAllPath === "string" ? fields.viewAllPath : undefined
        };
      }

      if (component === "sections.cta-banner-section") {
        return {
          __component: "sections.cta-banner-section" as const,
          title: typeof fields.title === "string" ? fields.title : "",
          body: typeof fields.body === "string" ? fields.body : undefined,
          cta: mapCtaLink(fields.cta)
        };
      }

      return null;
    })
    .filter((section): section is NonNullable<typeof section> => section !== null);
}
