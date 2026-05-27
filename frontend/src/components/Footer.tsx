import type { CmsSiteConfig } from "@/lib/cms/types";

export function Footer({ siteConfig }: { siteConfig: CmsSiteConfig }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h2>{siteConfig.siteName}</h2>
          <p>{siteConfig.footerTagline}</p>
        </div>
        <div>
          <p>{siteConfig.footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
