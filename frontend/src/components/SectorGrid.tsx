import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectorIcon } from "@/components/SectorIcon";
import type { Locale } from "@/lib/i18n";
import { dictionary } from "@/lib/i18n";
import { sectors, sectorText } from "@/lib/sectors";

export function SectorGrid({ locale, limit }: { locale: Locale; limit?: number }) {
  const t = dictionary[locale];
  const visibleSectors = typeof limit === "number" ? sectors.slice(0, limit) : sectors;

  return (
    <div className="sector-grid">
      {visibleSectors.map((sector) => {
        const text = sectorText(sector, locale);
        return (
          <Link className="sector-card" href={`/${locale}/sectors/${sector.slug}`} key={sector.slug}>
            <span className="sector-icon">
              <SectorIcon name={sector.icon} />
            </span>
            <span>
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
  );
}
