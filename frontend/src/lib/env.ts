const LOCAL_STRAPI_URL = "http://localhost:1337";
const LOCAL_SITE_URL = "http://localhost:3000";

function trimUrl(value: string | undefined) {
  return value?.trim().replace(/\/$/, "") ?? "";
}

export function getStrapiUrl() {
  const configured = trimUrl(process.env.NEXT_PUBLIC_STRAPI_URL);

  if (configured) {
    return configured;
  }

  if (process.env.NODE_ENV === "development") {
    return LOCAL_STRAPI_URL;
  }

  return "";
}

export function logStrapiUrl(context = "runtime") {
  const url = getStrapiUrl();
  console.log(`[CMS] NEXT_PUBLIC_STRAPI_URL (${context}):`, url || "(not configured)");
  return url;
}

export function logCmsEnv(context = "runtime") {
  const url = getStrapiUrl();
  const tokenConfigured = Boolean(getStrapiApiToken());
  console.log(
    `[CMS] env (${context}): url=${url || "(not configured)"} token=${tokenConfigured ? "set" : "missing"}`
  );
}

export function getSiteUrl() {
  const configured = trimUrl(process.env.NEXT_PUBLIC_SITE_URL);
  if (configured) {
    return configured;
  }

  const vercelUrl = trimUrl(
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined
  );
  if (vercelUrl) {
    return vercelUrl;
  }

  return LOCAL_SITE_URL;
}

export function getStrapiApiToken() {
  return process.env.STRAPI_API_TOKEN?.trim() ?? "";
}

export function isAdminUploadEnabled() {
  return Boolean(getStrapiApiToken() && getStrapiUrl());
}
