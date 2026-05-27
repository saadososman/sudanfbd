export type Locale = "ar" | "en";

export type Sector = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  category: string;
  order: number;
};

import { getStrapiUrl } from "./env";

const STRAPI_URL = getStrapiUrl();

function getField(item: any, key: string) {
  const source = item.attributes || item;
  return source?.[key] ?? "";
}

export async function getSectors(locale: Locale): Promise<Sector[]> {
  if (!STRAPI_URL) {
    return [];
  }

  try {
    const url = `${STRAPI_URL}/api/sectors?populate=*&sort=order:asc`;

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const json = await res.json();

    return (json.data || []).map((item: any) => {
      const title =
        locale === "ar"
          ? getField(item, "title_ar") || getField(item, "title")
          : getField(item, "title_en") || getField(item, "title");

      const summary =
        locale === "ar"
          ? getField(item, "summary_ar") ||
            getField(item, "description_ar") ||
            getField(item, "summary")
          : getField(item, "summary_en") ||
            getField(item, "description_en") ||
            getField(item, "summary");

      return {
        id: item.id,
        title,
        slug: getField(item, "slug") || String(item.id),
        summary,
        category: getField(item, "category") || "general",
        order: Number(getField(item, "order") || 0),
      };
    });
  } catch (error) {
    console.log("Strapi fetch failed:", error);
    return [];
  }
}