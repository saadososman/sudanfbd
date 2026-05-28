import { Facebook } from "lucide-react";
import type { CmsSocialLink, CmsSocialPlatform } from "@/lib/cms/types";
import { isValidSocialLink } from "@/lib/cms/social-links-defaults";

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SocialIcon({ platform }: { platform: CmsSocialPlatform }) {
  switch (platform) {
    case "facebook":
      return <Facebook size={18} aria-hidden="true" />;
    case "x":
      return <XIcon />;
    default:
      return null;
  }
}

export function SocialLinks({
  links,
  className
}: {
  links: CmsSocialLink[];
  className?: string;
}) {
  const visibleLinks = links.filter(isValidSocialLink);

  if (!visibleLinks.length) return null;

  return (
    <div className={className ? `social-links ${className}` : "social-links"}>
      {visibleLinks.map((link) => (
        <a
          key={`${link.platform}-${link.url}`}
          className="social-link"
          href={link.url.trim()}
          target={link.openInNewTab ? "_blank" : undefined}
          rel={link.openInNewTab ? "noopener noreferrer" : undefined}
          aria-label={link.label || link.platform}
        >
          <SocialIcon platform={link.platform} />
          <span className="social-link-label">{link.label || link.platform}</span>
        </a>
      ))}
    </div>
  );
}
