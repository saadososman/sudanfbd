import type { Metadata } from "next";
import { ArrowUpRight, CheckCircle2, ClipboardCheck, Network, TimerReset } from "lucide-react";
import { PageTitle } from "@/components/PageTitle";
import { dictionary, type Locale } from "@/lib/i18n";

const icons = [TimerReset, ClipboardCheck, Network, CheckCircle2];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = dictionary[locale];
  return { title: `${t.methodology.title} | ${t.brand}`, description: t.methodology.intro };
}

export default async function MethodologyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = dictionary[locale];

  return (
    <>
      <PageTitle title={t.methodology.title} intro={t.methodology.intro} crumb={t.nav.methodology} />
      <section className="section charter-section">
        <div className="container method-grid">
          {t.methodology.cards.map((card, index) => {
            const Icon = icons[index] || CheckCircle2;
            return (
              <article className="method-card reveal" style={{ animationDelay: `${index * 90}ms` }} key={card.title}>
                <span className="method-icon"><Icon size={26} /></span>
                <h2>{card.title}</h2>
                <p>{card.text}</p>
                <ArrowUpRight className="method-arrow" size={18} />
              </article>
            );
          })}
        </div>
      </section>
      <section className="section alt">
        <div className="container timeline-panel">
          <span className="section-kicker">{t.methodology.phasesTitle}</span>
          <div className="timeline-list">
            {t.methodology.phases.map((phase, index) => (
              <div className="timeline-item" key={phase}>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                <span>{phase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
