import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageTitle } from "@/components/PageTitle";
import { SectorIcon } from "@/components/SectorIcon";
import { dictionary, type Locale } from "@/lib/i18n";
import { categoryLabel, getSector, sectors, sectorText } from "@/lib/sectors";

export function generateStaticParams() {
  return sectors.flatMap((sector) => [
    { locale: "ar", slug: sector.slug },
    { locale: "en", slug: sector.slug }
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const sector = getSector(slug);
  if (!sector) return {};
  const text = sectorText(sector, locale);
  return { title: `${text.title} | ${dictionary[locale].brand}`, description: text.summary };
}

export default async function SectorPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();
  const text = sectorText(sector, locale);
  const t = dictionary[locale];

  return (
    <>
      <PageTitle title={text.title} intro={text.summary} crumb={t.nav.sectors} />
      <section className="section sector-detail-section">
        <div className="container sector-detail-layout">
          <aside className="sector-profile panel reveal">
            <span className="sector-profile-icon">
              <SectorIcon name={sector.icon} size={32} />
            </span>
            <p className="sector-profile-label">
              {categoryLabel(sector.category, locale)}
            </p>
            <h2>{text.title}</h2>
            <p>{text.summary}</p>
          </aside>
          <article className="sector-scope reveal delay-1">
            <span className="section-kicker">
              {locale === "ar" ? "اختصاصات ومجال عمل" : "Mandate and Scope"}
            </span>
            <h2>{locale === "ar" ? "نطاق العمل" : "Scope of Work"}</h2>
            <p>{text.body}</p>
            <div className="sector-output-grid">
              {text.outputs.map((output) => (
                <div className="sector-output" key={output}>
                  <CheckCircle2 size={19} />
                  <span>{output}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
