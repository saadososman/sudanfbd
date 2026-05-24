"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { SectorIcon } from "@/components/SectorIcon";
import { dictionary, type Locale } from "@/lib/i18n";
import { categoryLabel, sectorCategories, sectors, sectorText, type SectorCategory } from "@/lib/sectors";

export function SectorDirectory({ locale }: { locale: Locale }) {
  const t = dictionary[locale];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | SectorCategory>("all");

  const filteredSectors = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return sectors.filter((sector) => {
      const text = sectorText(sector, locale);
      const matchesCategory = category === "all" || sector.category === category;
      const matchesQuery = !normalized || `${text.title} ${text.summary}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, locale, query]);

  const filters: Array<{ label: string; value: "all" | SectorCategory }> = [
    { label: t.allSectors, value: "all" },
    ...sectorCategories.map((item) => ({ label: item.label[locale], value: item.value }))
  ];

  return (
    <div className="sector-directory">
      <div className="sector-tools reveal">
        <label className="sector-search">
          <Search size={19} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.sectorsSearch} />
        </label>
        <div className="sector-filters" aria-label={t.sectorsTitle}>
          {filters.map((filter) => (
            <button
              className={category === filter.value ? "active" : ""}
              key={filter.value}
              onClick={() => setCategory(filter.value)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <div className="sector-grid directory-grid">
        {filteredSectors.map((sector, index) => {
          const text = sectorText(sector, locale);
          return (
            <Link
              className={`sector-card directory-card ${sector.category === "governance" ? "governance-card" : ""}`}
              href={`/${locale}/sectors/${sector.slug}`}
              key={sector.slug}
              style={{ animationDelay: `${index * 35}ms` }}
            >
              <span className="sector-icon">
                <SectorIcon name={sector.icon} />
              </span>
              <span>
                <small>{categoryLabel(sector.category, locale)}</small>
                <h3>{text.title}</h3>
                <p>{text.summary}</p>
              </span>
              <span className="sector-meta">
                {t.readMore}
                <ArrowUpRight size={17} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
