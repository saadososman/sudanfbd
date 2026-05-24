import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";
import { PageTitle } from "@/components/PageTitle";
import { dictionary, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = dictionary[locale];
  return { title: `${t.adminTitle} | ${t.brand}`, description: t.adminIntro };
}

export default async function AdminPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = dictionary[locale];

  return (
    <>
      <PageTitle title={t.adminTitle} intro={t.adminIntro} crumb={t.nav.admin} />
      <section className="section">
        <div className="container">
          <AdminDashboard locale={locale} />
        </div>
      </section>
    </>
  );
}
