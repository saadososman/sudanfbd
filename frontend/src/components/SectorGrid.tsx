import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectorIcon } from "@/components/SectorIcon";
import type { CmsSector } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";
import { dictionary } from "@/lib/i18n";

export function SectorGrid({
  locale,
  sectors,
  limit
}: {
  locale: Locale;
  sectors: CmsSector[];
  limit?: number;
}) {
  const t = dictionary[locale];
  const visibleSectors =
    typeof limit === "number" ? sectors.slice(0, limit) : sectors;

  return (
    <div className="sector-grid">
      {visibleSectors.map((sector) => (
        <Link
          className="sector-card"
          href={`/${locale}/sectors/${sector.slug}`}
          key={sector.slug}
        >
          <span className="sector-icon">
            <SectorIcon name={sector.icon} />
          </span>
          <span>
            <h3>{sector.title}</h3>
            <p>{sector.summary}</p>
          </span>
          <span className="sector-meta">
            {t.readMore}
            <ArrowUpRight size={17} />
          </span>
        </Link>
      ))}
    </div>
  );
}
