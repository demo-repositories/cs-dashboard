# Concourse

A pnpm and Turborepo workspace with two Sanity Dashboard apps:

- **Studio** (`apps/studio`) edits editorial articles.
- **Analytics app** (`apps/analytics-app`) shows mocked readership for those articles.

Both run inside the Sanity Dashboard. The analytics app reads the same project and dataset as the Studio.

## Requirements

- Node.js 22.12 or newer
- pnpm 10.22.0 (`packageManager` in the root `package.json`)

## Setup

Install dependencies from the repo root:

```sh
pnpm install
```

Copy the env examples and fill in your Sanity project, dataset, and organization:

```sh
cp apps/studio/.env.example apps/studio/.env
cp apps/analytics-app/.env.example apps/analytics-app/.env
```

| App | Project | Dataset | Organization |
| --- | --- | --- | --- |
| Studio | `SANITY_STUDIO_PROJECT_ID` | `SANITY_STUDIO_DATASET` | `SANITY_STUDIO_ORGANIZATION_ID` |
| Analytics app | `SANITY_APP_PROJECT_ID` | `SANITY_APP_DATASET` | `SANITY_APP_ORGANIZATION_ID` |

The prefixes differ because Sanity exposes `SANITY_STUDIO_` inside a Studio and `SANITY_APP_` inside a Dashboard app. Point both apps at the same project and dataset. `.env` files stay out of git.

Sign in with the Sanity CLI before starting the apps (`npx sanity login`). The local Dashboard still asks you to sign in in the browser.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Starts Studio and the analytics app |
| `pnpm dev:studio` | Starts Studio only |
| `pnpm dev:analytics` | Starts the analytics app only |
| `pnpm build` | Builds both apps |
| `pnpm lint` | Lints both apps |

`sanity dev` prints a local URL such as `http://localhost:<port>/local/<slug>`. One Dashboard shell runs per machine; a second `sanity dev` attaches to the shell that is already running. Restart a dev server after changing its `.env`.

## Apps

**Studio** stores `article` documents: title, slug, dek, body, image, section (`news`, `culture`, `opinion`, `features`), and `publishedAt`. Publish an article for it to show up in analytics.

**Analytics app** is a Dashboard window, tile, and panel:

- The window lists published articles. Open one to see a mocked 24-hour history, and the window publishes that document id on `applications.context`.
- The panel reads that context and follows the open article.
- The tile sums mocked views across published articles for the last 24 hours.

Readership is derived from the document id. It is not stored in the dataset.
