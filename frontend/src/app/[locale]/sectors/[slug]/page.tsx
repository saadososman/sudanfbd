import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { connection } from "next/server";
import { CheckCircle2 } from "lucide-react";
import { CmsFetchError } from "@/components/CmsFetchError";
import { PageTitle } from "@/components/PageTitle";
import { SectorIcon } from "@/components/SectorIcon";
import { fetchSectorBySlug, fetchSiteConfig, getNavLabel } from "@/lib/cms";
import { isStrapiFetchError } from "@/lib/cms/errors";
import { getCategoryLabel } from "@/lib/cms/sector-categories";
import type { Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  noStore();
  const { locale, slug } = await params;

  try {
    const [sector, siteConfig] = await Promise.all([
      fetchSectorBySlug(locale, slug),
      fetchSiteConfig(locale)
    ]);

    return {
      title: `${sector.title} | ${siteConfig.siteName}`,
      description: sector.summary
    };
  } catch {
    return {};
  }
}

export default async function SectorPage({
  params
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  await connection();
  noStore();

  const { locale, slug } = await params;

  try {
    const [sector, siteConfig] = await Promise.all([
      fetchSectorBySlug(locale, slug),
      fetchSiteConfig(locale)
    ]);

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
        <footer className="cms-source-debug" data-cms-source="strapi" aria-live="polite">
          <p>STRAPI title: {sector.title}</p>
          <p>STRAPI summary: {sector.summary}</p>
          <p>STRAPI updatedAt: {sector.updatedAt ?? "unknown"}</p>
          <p>API URL: {sector.fetchedFromUrl ?? "unknown"}</p>
          <p>CMS locale: {locale}</p>
        </footer>
      </>
    );
  } catch (error) {
    if (isStrapiFetchError(error)) {
      return (
        <CmsFetchError
          title="Unable to load sector from Strapi"
          message={error.message}
          url={error.url}
          status={error.status}
        />
      );
    }

    throw error;
  }
}
