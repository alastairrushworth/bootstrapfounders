# bootstrapfounders

A **field guide for technically-minded founders** bootstrapping a startup idea — somewhere between a wiki and a directory.

It curates the best **podcasts, YouTube channels, books, newsletters & blogs, communities, tools and launch platforms**, plus a set of opinionated, tactical **playbooks** (idea validation, getting your first 10 customers, the Bullseye traction framework, pricing, building in public, Product Hunt launches, SEO and cold outreach).

## Features

- **Zero dependencies, zero build step.** Pure HTML / CSS / vanilla JS — open `index.html` and it works.
- **Live search** across every resource and guide (press `/` to focus).
- **Category browsing** with per-category **tag filters**.
- **Wiki-style guides** rendered from a single content file.
- **Dark / light mode** (remembered between visits).
- **Fully responsive** with a collapsible mobile sidebar.

## Run it locally

It's a static site, so just open the file:

```bash
open index.html
```

…or serve it (nicer for hash routing & caching):

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy

Drop the folder onto any static host — **GitHub Pages**, **Netlify**, **Vercel**, **Cloudflare Pages**, S3, etc. No configuration needed.

For **GitHub Pages**: push to `main`, then enable Pages → *Deploy from branch* → `main` / root.

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

**Add a whole category** by appending to the `categories` array and adding a matching array keyed by its `id`.

## Thumbnails

Rows in the `podcasts` and `youtube` categories show a small local image at
`assets/img/<category>/<slug>.jpg`, where `<slug>` is the resource's `name`
lowercased with every run of non-alphanumeric characters turned into `-`
(e.g. `"Lenny's Podcast"` → `lenny-s-podcast.jpg`). This must match the
`slugify()` in `app.js`. A missing image degrades gracefully to a plain row.

Images are bundled locally (no external requests, nothing to break). To
(re)generate them, run — on macOS, needs `curl` + `sips`:

```bash
python3 scripts/fetch_images.py
```

It pulls podcast cover art from the free iTunes Search API and YouTube
channel avatars from each channel page's `og:image`, then resizes to 160px.

## Structure

```
index.html               # shell: top bar, sidebar, content mount
assets/
  css/styles.css         # all styling + theming
  js/data.js             # ← all content lives here
  js/app.js              # routing, search, filtering, rendering
  img/podcasts|youtube/  # bundled row thumbnails
scripts/
  fetch_images.py        # regenerate thumbnails
```

## License

Content and code are free to use and adapt. Contributions welcome — this is meant to be a living, community-maintained guide.
