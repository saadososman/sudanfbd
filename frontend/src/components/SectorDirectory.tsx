"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Sector } from "@/lib/strapi";

type Props = {
  locale: Locale;
  sectors: Sector[];
};

export function SectorDirectory({ locale, sectors }: Props) {
  const [query, setQuery] = useState("");

  const isArabic = locale === "ar";

  const filteredSectors = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) return sectors;

    return sectors.filter((sector) => {
      return (
        sector.title.toLowerCase().includes(normalized) ||
        sector.summary.toLowerCase().includes(normalized) ||
        sector.category.toLowerCase().includes(normalized)
      );
    });
  }, [query, sectors]);

  return (
    <div className="sector-directory">
      <div className="sector-tools reveal">
        <label className="sector-search">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={isArabic ? "ابحث في القطاعات" : "Search sectors"}
          />
        </label>
      </div>

      {filteredSectors.length === 0 ? (
        <p className="sector-empty">
          {isArabic
            ? "لا توجد قطاعات منشورة حالياً من لوحة Strapi."
            : "No published sectors are available from Strapi yet."}
        </p>
      ) : (
        <div className="sector-grid">
          {filteredSectors.map((sector) => (
            <article className="sector-card reveal" key={sector.id}>
              <span className="sector-category">{sector.category}</span>

              <h2>{sector.title}</h2>

              <p>{sector.summary}</p>

              <Link href={`/${locale}/sectors/${sector.slug}`}>
                {isArabic ? "عرض القطاع" : "View sector"}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}