"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { getCategoryLabel } from "@/lib/cms/sector-categories";
import { useUiLabels } from "@/components/UiLabelsProvider";
import type { CmsSector } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  sectors: CmsSector[];
};

export function SectorDirectory({ locale, sectors }: Props) {
  const labels = useUiLabels();
  const [query, setQuery] = useState("");

  const filteredSectors = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) return sectors;

    return sectors.filter((sector) => {
      const categoryLabel = getCategoryLabel(sector.category, labels);
      return (
        sector.title.toLowerCase().includes(normalized) ||
        sector.summary.toLowerCase().includes(normalized) ||
        categoryLabel.toLowerCase().includes(normalized)
      );
    });
  }, [labels, query, sectors]);

  return (
    <div className="sector-directory">
      <div className="sector-tools reveal">
        <label className="sector-search">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.sectorsSearch}
          />
        </label>
      </div>

      {filteredSectors.length === 0 ? (
        <p className="sector-empty">{labels.sectorsEmpty}</p>
      ) : (
        <div className="sector-grid">
          {filteredSectors.map((sector) => (
            <article className="sector-card reveal" key={sector.id}>
              <span className="sector-category">
                {getCategoryLabel(sector.category, labels)}
              </span>

              <h2>{sector.title}</h2>

              <p>{sector.summary}</p>

              <Link href={`/${locale}/sectors/${sector.slug}`}>
                {labels.viewSector}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
