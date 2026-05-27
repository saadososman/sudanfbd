# Sudanese Forum for Building and Development

Bilingual Arabic and English website starter built with Next.js and Strapi.

## Apps

- `frontend`: Next.js public site, sector pages, document library, admin upload dashboard.
- `backend`: Strapi content API skeleton for sectors and PDF documents.

## Local Development

```bash
npm install --prefix frontend
npm run dev:frontend
```

Frontend URL: `http://localhost:3000`

For Strapi:

```bash
npm install --prefix backend
npm run dev:backend
```

Backend URL: `http://localhost:1337`

Copy the example env files before running locally:

```bash
copy frontend\.env.example frontend\.env.local
copy backend\.env.example backend\.env
```

The frontend works without Strapi by showing local starter content, then switches to Strapi data when the API is available.

## Deployment environment variables

### Vercel (frontend)

Set **Root Directory** to `frontend` in the Vercel project settings.

| Variable | Required | Example | Purpose |
|----------|----------|---------|---------|
| `NEXT_PUBLIC_STRAPI_URL` | Yes | `https://your-backend.up.railway.app` | Strapi API base URL |
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://your-frontend.vercel.app` | Canonical site URL for metadata |

See `frontend/.env.example`.

### Railway (backend)

Add a Postgres plugin and set these service variables:

| Variable | Required | Example | Purpose |
|----------|----------|---------|---------|
| `HOST` | Yes | `0.0.0.0` | Bind address |
| `PORT` | Auto | Railway injects this | HTTP port |
| `NODE_ENV` | Yes | `production` | Runtime mode |
| `URL` | Yes | `https://your-backend.up.railway.app` | Public Strapi URL |
| `FRONTEND_URL` | Yes | `https://your-frontend.vercel.app,https://www.your-domain.com,http://localhost:3000` | CORS allowed origins (comma-separated, no trailing slashes) |
| `VERCEL_PRODUCTION_URL` | Optional | `https://your-frontend.vercel.app` | Explicit Vercel production origin if kept separate from `FRONTEND_URL` |
| `APP_KEYS` | Yes | `key1,key2` | Session/crypto keys |
| `API_TOKEN_SALT` | Yes | random string | API token salt |
| `ADMIN_JWT_SECRET` | Yes | random string | Admin JWT secret |
| `TRANSFER_TOKEN_SALT` | Yes | random string | Transfer token salt |
| `JWT_SECRET` | Yes | random string | Users-permissions JWT |
| `ENCRYPTION_KEY` | Yes | random string | Encryption key |
| `DATABASE_CLIENT` | Yes | `postgres` | Database driver |
| `DATABASE_URL` | Yes | from Railway Postgres | Connection string |
| `DATABASE_SSL` | Yes | `true` | Enable SSL for Postgres |
| `DATABASE_SSL_REJECT_UNAUTHORIZED` | Yes | `false` | Railway Postgres SSL |

Generate secrets with:

```bash
openssl rand -base64 32
```

See `backend/.env.example`.

### Cross-service wiring

1. Deploy Railway backend first and copy its public URL.
2. Set Vercel `NEXT_PUBLIC_STRAPI_URL` to that Railway URL.
3. Set Railway `FRONTEND_URL` to every public frontend origin (Vercel `.vercel.app` URL, custom domain, and `http://localhost:3000` for local dev).
4. Redeploy both services after env changes.

Never commit `.env`, `.env.local`, or real secrets. Only `.env.example` files belong in git.
