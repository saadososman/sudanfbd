import type { Core } from '@strapi/strapi';

type CorsContext = {
  request: {
    header: {
      origin?: string;
    };
  };
};

function parseOrigins(...values: Array<string | undefined>) {
  const origins = values
    .flatMap((value) => (value ? value.split(',') : []))
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);

  return [...new Set(origins)];
}

function originHost(origin: string) {
  try {
    return new URL(origin).host;
  } catch {
    return '';
  }
}

function isAllowedOrigin(requestOrigin: string, allowedOrigins: string[]) {
  const normalized = requestOrigin.replace(/\/$/, '');

  if (allowedOrigins.includes(normalized)) {
    return true;
  }

  const requestHost = originHost(normalized);

  return allowedOrigins.some((allowed) => originHost(allowed) === requestHost);
}

export function buildCorsConfig({ env }: Core.Config.Shared.ConfigParams) {
  const isProduction = env('NODE_ENV') === 'production';

  const allowedOrigins = parseOrigins(
    env('FRONTEND_URL'),
    env('FRONTEND_URLS'),
    env('VERCEL_PRODUCTION_URL')
  );

  if (!isProduction) {
    allowedOrigins.push('http://localhost:3000', 'http://127.0.0.1:3000');
  }

  const uniqueOrigins = [...new Set(allowedOrigins)];

  return {
    origin: (ctx: CorsContext) => {
      const requestOrigin = ctx.request.header.origin;

      if (!requestOrigin) {
        return uniqueOrigins[0] ?? '';
      }

      return isAllowedOrigin(requestOrigin, uniqueOrigins) ? requestOrigin : '';
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    keepHeaderOnError: true,
  };
}
