import { CheckCircle2 } from "lucide-react";
import { dictionary, type Locale } from "@/lib/i18n";

export function ManifestoSection({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const manifesto = dictionary[locale].manifesto;

  return (
    <section className={`section manifesto-section ${compact ? "manifesto-compact" : ""}`}>
      <div className="container manifesto-layout">
        <div className="manifesto-heading reveal">
          <span className="section-kicker">{manifesto.kicker}</span>
          <h2>{manifesto.title}</h2>
          <div className="manifesto-rule" aria-hidden="true" />
        </div>
        <article className="manifesto-card reveal delay-1">
          <div className="manifesto-text">
            {manifesto.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="manifesto-points">
            {manifesto.points.map((point) => (
              <li key={point}>
                <CheckCircle2 size={19} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
