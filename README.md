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

Create a `.env.local` in `frontend` when Strapi is running:

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

The frontend works without Strapi by showing local starter content, then switches to Strapi data when the API is available.
