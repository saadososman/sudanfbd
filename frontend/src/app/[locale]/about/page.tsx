import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { ManifestoSection } from "@/components/ManifestoSection";
import { ObjectivesSection } from "@/components/ObjectivesSection";
import { PageTitle } from "@/components/PageTitle";
import { dictionary, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = dictionary[locale];
  return { title: `${t.about.title} | ${t.brand}`, description: t.manifesto.paragraphs[0] };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = dictionary[locale];

  return (
    <>
      <PageTitle title={t.about.title} intro={t.manifesto.paragraphs[0]} crumb={t.nav.about} />
      <ManifestoSection locale={locale} compact />
      <ObjectivesSection locale={locale} />
      <section className="section">
        <div className="container split">
          <div>
            <h2>{t.about.mission}</h2>
            <p>{t.about.missionText}</p>
          </div>
          <div className="panel">
            <h2>{locale === "ar" ? "مبادئ العمل" : "Operating Principles"}</h2>
            <ul className="feature-list">
              {t.about.values.map((value) => (
                <li key={value}><CheckCircle2 size={20} /> <span>{value}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
