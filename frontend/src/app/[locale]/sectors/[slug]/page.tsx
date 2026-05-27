import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageTitle } from "@/components/PageTitle";
import { SectorIcon } from "@/components/SectorIcon";
import { fetchSectorBySlug, fetchSectorSlugs, fetchSiteConfig, getNavLabel } from "@/lib/cms";
import { getCategoryLabel } from "@/lib/cms/sector-categories";
import type { Locale } from "@/lib/i18n";

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
  const [sector, siteConfig] = await Promise.all([
    fetchSectorBySlug(locale, slug),
    fetchSiteConfig(locale)
  ]);

  if (!sector) return {};

  return {
    title: `${sector.title} | ${siteConfig.siteName}`,
    description: sector.summary
  };
}

export default async function SectorPage({
  params
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const [sector, siteConfig] = await Promise.all([
    fetchSectorBySlug(locale, slug),
    fetchSiteConfig(locale)
  ]);

  if (!sector) notFound();

  return (
    <>
      <PageTitle
        title={sector.title}
        intro={sector.summary}
        crumb={getNavLabel(siteConfig, "sectors")}
      />
      <section className="section sector-detail-section">
        <div className="container sector-detail-layout">
          <aside className="sector-profile panel reveal">
            <span className="sector-profile-icon">
              <SectorIcon name={sector.icon} size={32} />
            </span>
            <p className="sector-profile-label">
              {getCategoryLabel(sector.category, siteConfig.uiLabels)}
            </p>
            <h2>{sector.title}</h2>
            <p>{sector.summary}</p>
          </aside>
          <article className="sector-scope reveal delay-1">
            <span className="section-kicker">{siteConfig.uiLabels.sectorScopeKicker}</span>
            <h2>{siteConfig.uiLabels.sectorScopeTitle}</h2>
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
