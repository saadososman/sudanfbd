import type { Metadata } from "next";
import { ObjectivesSection } from "@/components/ObjectivesSection";
import { PageTitle } from "@/components/PageTitle";
import { dictionary, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = dictionary[locale];
  return { title: `${t.objectives.title} | ${t.brand}`, description: t.objectives.paragraphs[0] };
}

export default async function ObjectivesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = dictionary[locale];

  return (
    <>
      <PageTitle title={t.objectives.title} intro={t.objectives.paragraphs[0]} crumb={t.nav.objectives} />
      <ObjectivesSection locale={locale} />
    </>
  );
}
