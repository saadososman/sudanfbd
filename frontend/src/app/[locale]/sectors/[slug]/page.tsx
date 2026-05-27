import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageTitle } from "@/components/PageTitle";
import { SectorIcon } from "@/components/SectorIcon";
import { fetchSectorBySlug, fetchSectorSlugs } from "@/lib/cms";
import { dictionary, type Locale } from "@/lib/i18n";

export async function generateStaticParams() {
  const slugs = await fetchSectorSlugs();

  return slugs.flatMap((slug) => [
    { locale: "ar", slug },
    { locale: "en", slug }
  ]);
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const sector = await fetchSectorBySlug(locale, slug);

  if (!sector) return {};

  return {
    title: `${sector.title} | ${dictionary[locale].brand}`,
    description: sector.summary
  };
}

export default async function SectorPage({
  params
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const sector = await fetchSectorBySlug(locale, slug);

  if (!sector) notFound();

  const t = dictionary[locale];

  return (
    <>
      <PageTitle
        title={sector.title}
        intro={sector.summary}
        crumb={t.nav.sectors}
      />
      <section className="section sector-detail-section">
        <div className="container sector-detail-layout">
          <aside className="sector-profile panel reveal">
            <span className="sector-profile-icon">
              <SectorIcon name={sector.icon} size={32} />
            </span>
            <p className="sector-profile-label">{sector.categoryLabel}</p>
            <h2>{sector.title}</h2>
            <p>{sector.summary}</p>
          </aside>
          <article className="sector-scope reveal delay-1">
            <span className="section-kicker">
              {locale === "ar" ? "اختصاصات ومجال عمل" : "Mandate and Scope"}
            </span>
            <h2>{locale === "ar" ? "نطاق العمل" : "Scope of Work"}</h2>
            {sector.body.includes("<") ? (
              <div
                className="sector-body"
                dangerouslySetInnerHTML={{ __html: sector.body }}
              />
            ) : (
              <p>{sector.body}</p>
            )}
            <div className="sector-output-grid">
              {sector.outputs.map((output) => (
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
