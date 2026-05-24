import type { Metadata } from "next";
import { BarChart3, Clock3, FileText, Flag, HandCoins, ListChecks, ShieldAlert, Target, Users, Wrench } from "lucide-react";
import { PageTitle } from "@/components/PageTitle";
import { dictionary, type Locale } from "@/lib/i18n";

const icons = [FileText, Target, Wrench, Users, Clock3, BarChart3, ShieldAlert, ListChecks, Flag, HandCoins];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = dictionary[locale];
  return { title: `${t.framework.title} | ${t.brand}`, description: t.framework.intro };
}

export default async function FrameworkPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = dictionary[locale];

  return (
    <>
      <PageTitle title={t.framework.title} intro={t.framework.intro} crumb={t.nav.framework} />
      <section className="section framework-section">
        <div className="container framework-grid">
          {t.framework.items.map((item, index) => {
            const Icon = icons[index] || FileText;
            return (
              <article className="framework-card reveal" style={{ animationDelay: `${index * 55}ms` }} key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon size={24} />
                <h2>{item}</h2>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
