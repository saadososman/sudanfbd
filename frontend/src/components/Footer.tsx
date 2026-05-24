import type { Locale } from "@/lib/i18n";
import { dictionary } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = dictionary[locale];

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h2>{t.brand}</h2>
          <p>{t.hero.body}</p>
        </div>
        <div>
          <p>{locale === "ar" ? "ألوان مستوحاة من علم السودان وهوية البناء المؤسسي." : "Colors inspired by Sudan's flag and institutional development identity."}</p>
        </div>
      </div>
    </footer>
  );
}
