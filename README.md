# Plant Based Tribes

The plantbasedtribes.com site, rebuilt from scratch with **Next.js 15 (App Router)**, **Tailwind CSS v4**, **Neon Postgres** (via Drizzle ORM) and **Better Auth**.

It replaces the old WordPress site. The old site's backup was compromised with malware, so **no PHP, plugins or database from it were reused**. Only the following were recovered:

- the URL structure (all post slugs and category paths match the old site, so existing links and search rankings keep working)
- 91 post images (each checked to be a real image file) in `public/images/`
- the logo, brand colours (`#184906` green, `#F9C30C` yellow) and Poppins font

The original post text was not in the backup, so all 63 posts in `content/posts/` were **newly written**. Review them before launch, especially the nutrition articles.

## Features

- Recipe and article pages at the old URLs (`/lentil-soup`, `/category/recipe/diet/vegan`, …) with Recipe/Article JSON-LD for search engines
- Home page, recipe index, category pages with sub-categories, search, tips and about pages
- `sitemap.xml` and `robots.txt` generated from the database
- Email and password accounts (Better Auth)
- Admin area at `/admin` to create, edit, publish and delete posts (Markdown, sanitised on render)

## Getting started

1. Create a Neon project and copy the **pooled** connection string.
2. `cp .env.example .env` and fill in `DATABASE_URL` and `BETTER_AUTH_SECRET` (`openssl rand -base64 32`).
3. Install and set up the database:

   ```bash
   npm install
   npm run db:migrate   # creates the tables
   npm run db:seed      # loads categories and the 63 posts
   npm run dev
   ```

4. Sign up at `/sign-up`, then make yourself an admin:

   ```bash
   npm run make-admin -- you@example.com
   ```

5. Optionally set `DISABLE_SIGNUP=true` to close public registration.

## Deploying (Vercel)

Import the repo in Vercel, add the environment variables from `.env.example` (set `BETTER_AUTH_URL` and `NEXT_PUBLIC_SITE_URL` to `https://plantbasedtribes.com`), and deploy. Run `npm run db:migrate` and `npm run db:seed` once against the production database.

## Content

- `content/posts/*.md`: post bodies with frontmatter (`title`, `excerpt`, `kind`, `prep`, `cook`, `servings`, `categories`)
- `src/db/seed-data.json`: slugs, images and categories recovered from the old sitemaps

Re-running `npm run db:seed` overwrites posts with the Markdown files, so once you start editing in `/admin`, treat the database as the source of truth.
