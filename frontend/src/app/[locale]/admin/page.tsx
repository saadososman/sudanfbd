import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";
import { PageTitle } from "@/components/PageTitle";
import { fetchSectors, fetchSiteConfig, getNavLabel } from "@/lib/cms";
import { isAdminUploadEnabled } from "@/lib/env";
import { dictionary, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [siteConfig, t] = [await fetchSiteConfig(locale), dictionary[locale]];

  return {
    title: `${t.adminTitle} | ${siteConfig.siteName}`,
    description: t.adminIntro
  };
}

export default async function AdminPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = dictionary[locale];
  const [siteConfig, sectors] = await Promise.all([
    fetchSiteConfig(locale),
    fetchSectors(locale)
  ]);

  return (
    <>
      <PageTitle
        title={t.adminTitle}
        intro={t.adminIntro}
        crumb={getNavLabel(siteConfig, "admin")}
      />
      <section className="section">
        <div className="container">
          <AdminDashboard
            locale={locale}
            sectors={sectors}
            uploadEnabled={isAdminUploadEnabled()}
          />
        </div>
      </section>
    </>
  );
}
