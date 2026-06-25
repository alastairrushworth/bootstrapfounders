# bootstrapfounders

A **field guide for technically-minded founders** bootstrapping a startup idea — somewhere between a wiki and a directory.

It curates the best **podcasts, YouTube channels, books, newsletters & blogs, communities, tools and launch platforms**, plus a set of opinionated, tactical **playbooks** (idea validation, getting your first 10 customers, the Bullseye traction framework, pricing, building in public, Product Hunt launches, SEO and cold outreach).

## Features

- **Zero runtime dependencies.** Pure HTML / CSS / vanilla JS. The only build step is a dependency-free Node prerender.
- **Real, crawlable URLs.** History-API routing (`/podcasts/`, `/guide/pricing/`) — every page is prerendered to static HTML with its own `<title>`, meta description, canonical, Open Graph tags and JSON-LD, plus a generated `sitemap.xml`.
- **Live search** across every resource and guide (press `/` to focus).
- **Category browsing** with per-category **tag filters**.
- **Wiki-style guides** rendered from a single content file, with prev / next and related-playbook links.
- **Dark / light mode** that respects your OS preference on first visit and is remembered after.
- **Accessible:** skip link, keyboard-focus styles, ARIA state on the controls, AA-contrast text.
- **Fully responsive** with a collapsible mobile sidebar.

## Run it locally

The home page works straight from the file:

```bash
open index.html
```

For the full multi-page experience (deep links, real URLs), build and serve the prerendered site:

```bash
node scripts/prerender.js          # builds ./dist
cd dist && python3 -m http.server 8000   # visit http://localhost:8000
```

> History-API routing means deep links (e.g. `/guide/pricing/`) need a server that serves the matching file — `open index.html` only renders the home route.

## Deploy

A GitHub Actions workflow (`.github/workflows/deploy.yml`) runs the prerender and publishes **`dist/`** to **GitHub Pages** on every push to `main`. Just enable Pages → *GitHub Actions* as the source.

To deploy elsewhere (**Netlify**, **Vercel**, **Cloudflare Pages**, S3, …), run `node scripts/prerender.js` and upload the resulting `dist/` folder. A second workflow (`links.yml`) sweeps every external URL weekly and opens an issue if any rot.

## Adding or editing content

Everything lives in **`assets/js/data.js`** — no templates to touch.

**Add a resource** to any category array:

```js
{
  name: "Resource name",
  url:  "https://example.com",
  by:   "Author / host / maker",
  desc: "One or two sentences on why it's worth a bootstrapper's time.",
  tags: ["growth", "free"],
}
```

Tags `must-read`, `must-listen`, `must-watch`, `must-do` and `free` get a highlighted accent on their card.

**Add a guide** to the `guides` array (`body` is HTML):

```js
{
  slug: "url-slug",
  title: "Guide title",
  summary: "One line shown on cards.",
  tags: ["traction"],
  body: `<p>…HTML content…</p>`,
}
```

Inside a guide `body`, link to another guide with a real path —
`<a href="/guide/<slug>/">…</a>` — not a `#` fragment.

**Add a whole category** by appending to the `categories` array and adding a matching array keyed by its `id`. New categories and guides are picked up by the prerenderer and sitemap automatically.

## Thumbnails

Several categories show a small local image per row at
`assets/img/<category>/<slug>.<ext>`, where `<slug>` is the resource's `name`
lowercased with every run of non-alphanumeric characters turned into `-`
(e.g. `"Lenny's Podcast"` → `lenny-s-podcast`). This must match `slugify()` in
`app.js`. A missing image degrades gracefully to a plain row.

Two kinds, configured in the `THUMB` map in `app.js`:

- **cover** (`.jpg`, full-bleed) — `podcasts`, `youtube`
- **fav** (`.png`, site icon on a light tile) — `tools`, `reading`, `communities`, `launch`

Images are bundled locally (no external requests, nothing to break). To
(re)generate them — macOS, needs `curl` + `sips`:

```bash
python3 scripts/fetch_images.py     # podcast cover art (iTunes) + YouTube avatars (og:image)
python3 scripts/fetch_favicons.py   # site icons (apple-touch-icon, falling back to Google s2)
```

## Structure

```
index.html               # shell: top bar, sidebar, content mount + the prerender marker
CNAME                     # custom domain for GitHub Pages
robots.txt               # points crawlers at the sitemap
site.webmanifest         # PWA manifest (installable, app icons)
assets/
  css/styles.css         # all styling + theming
  js/data.js             # ← all content lives here
  js/render.js           # shared, DOM-free templates + per-route <head> metadata
  js/app.js              # History routing, search, filtering, theme, mobile nav
  img/<category>/        # bundled row thumbnails
  icons/                 # app icons (apple-touch, 192/512, maskable)
  og.png                 # 1200×630 social card
scripts/
  prerender.js           # builds ./dist (static pages + sitemap.xml) using render.js
  fetch_images.py        # cover art + avatars
  fetch_favicons.py      # site icons
dist/                    # prerender output (gitignored) — this is what gets deployed
```

`render.js` is the single source of truth for markup: both the browser SPA
(`app.js`) and the Node prerenderer (`prerender.js`) import it, so static
pages and client navigation can't drift.

## License

Content and code are free to use and adapt. Contributions welcome — this is meant to be a living, community-maintained guide.
