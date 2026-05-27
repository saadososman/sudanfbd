import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminDashboard } from "@/components/AdminDashboard";
import { PageTitle } from "@/components/PageTitle";
import {
  fetchPageBySlug,
  fetchSectors,
  fetchSiteConfig,
  getNavLabel
} from "@/lib/cms";
import { isAdminUploadEnabled } from "@/lib/env";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [page, siteConfig] = await Promise.all([
    fetchPageBySlug(locale, "admin"),
    fetchSiteConfig(locale)
  ]);

  if (!page) {
    return {};
  }

  return {
    title: page.seo?.metaTitle ?? `${page.title} | ${siteConfig.siteName}`,
    description: page.seo?.metaDescription ?? page.intro
  };
}

export default async function AdminPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const [page, siteConfig, sectors] = await Promise.all([
    fetchPageBySlug(locale, "admin"),
    fetchSiteConfig(locale),
    fetchSectors(locale)
  ]);

  if (!page) notFound();

  return (
    <>
      <PageTitle
        title={page.title}
        intro={page.intro}
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
