import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { fetchSiteConfig } from "@/lib/cms";
import { dictionary, isLocale, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const t = dictionary[locale];
  const siteConfig = await fetchSiteConfig(locale);

  return (
    <html lang={locale} dir={t.dir}>
      <body>
        <div className="site-shell">
          <Header locale={locale} siteConfig={siteConfig} />
          <main className="main">{children}</main>
          <Footer siteConfig={siteConfig} />
        </div>
      </body>
    </html>
  );
}
