# Eggpress

A premium futuristic egg delivery ecommerce website for a Nigerian business in Benin City.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + Framer Motion (artifacts/eggpress)
- API: Express 5 (artifacts/api-server)
- DB: PostgreSQL + Drizzle ORM (lib/db)
- Validation: Zod (zod/v4), drizzle-zod
- API codegen: Orval (from OpenAPI spec in lib/api-spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/eggpress/` — React frontend (full-screen dark site, Bebas Neue + Outfit fonts)
- `artifacts/api-server/` — Express API server
- `artifacts/api-server/src/services/notify.ts` — WhatsApp/SMS notification service
- `lib/db/src/schema/eggpress.ts` — DB schema (orders, subscriptions, prices, testimonials)
- `lib/api-spec/` — OpenAPI contract (source of truth)

## Architecture decisions

- Contract-first API design: OpenAPI spec → Orval codegen → React Query hooks + Zod schemas
- Dark-mode only with unified `:root, .dark` CSS variables
- Bebas Neue for the EGGPRESS brand wordmark, Outfit for headings, Space Grotesk for body
- Notifications fire async after API response (don't block user-facing response)
- Admin PIN auth hardcoded at "1234" — simple enough for single owner use

## Product

- Guest ordering with 5-step wizard (size → quantity → delivery type → details → bank transfer payment to Opay 9013698449)
- Real-time order tracking by Order ID
- Recurring delivery subscriptions (weekly/bi-weekly/monthly)
- Admin dashboard at /admin (PIN: 1234) with order management, price updates, subscriptions
- WhatsApp notifications to business owner and customers on every order/status change

## WhatsApp Notification Setup

The notification system is built and wired up. To enable it, set these environment variables:

### Option A — CallMeBot (free, for owner WhatsApp):
1. Send "I allow callmebot to send me messages" to +34 644 82 95 38 on WhatsApp
2. You'll receive your API key
3. Set `CALLMEBOT_APIKEY` = your key
4. Set `OWNER_PHONE` = 2349013698449 (default)

### Option B — Africa's Talking SMS (for customer SMS, works in Nigeria):
1. Sign up at africastalking.com
2. Set `AFRICASTALKING_API_KEY` = your API key
3. Set `AFRICASTALKING_USERNAME` = your username

Both can be used together. The system tries WhatsApp first, falls back to SMS.

## User preferences

- Premium dark futuristic aesthetic: #F5B800 gold, dark charcoal background, glassmorphism cards
- Business phone: 09013698449 (Opay account for payments)
- Delivers in Benin City, Nigeria

## Gotchas

- Admin PIN is "1234" (hardcoded in admin.tsx)
- Notifications fail silently if env vars not set — no errors thrown
- The hero lady image is at `artifacts/eggpress/src/assets/hero-lady-nobg.png`
- Always run `pnpm --filter @workspace/api-spec run codegen` after changing the OpenAPI spec

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
