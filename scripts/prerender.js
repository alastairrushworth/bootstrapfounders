#!/usr/bin/env node
/* =========================================================================
   bootstrapfounders — static prerender
   Builds a fully crawlable site into ./dist by baking each route's content
   and <head> metadata into a real HTML file, using the SAME templates the
   browser uses (assets/js/render.js). Also emits sitemap.xml and copies the
   static assets. Run by the deploy workflow; safe to run locally.

   No dependencies. Node 16.7+ (uses fs.cpSync).
   ========================================================================= */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

/* Load the content DB + shared render layer in a browser-ish global. */
global.window = global;
// build date (UTC, YYYY-MM-DD) — render.js bakes it into JSON-LD dateModified
// and we reuse it for sitemap <lastmod>. Set BEFORE render.js loads.
const BUILD_DATE = new Date().toISOString().slice(0, 10);
global.BF_BUILD_DATE = BUILD_DATE;
require(path.join(ROOT, "assets/js/data.js"));   // sets window.DB
require(path.join(ROOT, "assets/js/render.js"));  // sets window.BF
const { BF } = global;
const DB = global.DB;

const shell = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

/* ── per-route output path (directory-style URLs) ───────────────────── */
function outPath(route) {
  switch (route.name) {
    case "home":     return "index.html";
    case "guides":   return "guides/index.html";
    case "category": return `${route.id}/index.html`;
    case "guide":    return `guide/${route.slug}/index.html`;
    case "notfound": return "404.html";
    default:         return "index.html";
  }
}

/* ── bake one page from the shell ───────────────────────────────────── */
function buildPage(route) {
  const head = BF.headFor(route);
  const content = BF.pageContent(route, {});
  const canonical = BF.BASE_URL + head.path;

  const headLines = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:title" content="${BF.esc(head.title)}" />`,
    `<meta property="og:description" content="${BF.esc(head.description)}" />`,
  ];
  if (head.jsonld) {
    headLines.push(`<script type="application/ld+json">${JSON.stringify(head.jsonld)}</script>`);
  }

  let html = shell;
  // bake the routed content
  html = html.replace(/<main\b[^>]*id="content"[^>]*>[\s\S]*?<\/main>/,
    () => `<main class="content" id="content" tabindex="-1">${content}</main>`);
  // per-route title + description
  html = html.replace(/<title>[\s\S]*?<\/title>/,
    () => `<title>${BF.esc(head.title)}</title>`);
  html = html.replace(/<meta name="description"[^>]*>/,
    () => `<meta name="description" content="${BF.esc(head.description)}" />`);
  // canonical / og / json-ld
  html = html.replace("<!--PRERENDER:HEAD-->", () => headLines.join("\n  "));
  // shell uses relative asset paths so it opens locally; the deployed site is
  // mounted under BASE, so rewrite them to absolute /<base>/assets/...
  html = html.replace(/\b(href|src)="assets\//g, `$1="${BF.BASE}/assets/`);

  return html;
}

function writeFile(rel, body) {
  const dest = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, body);
}

/* ── sitemap ────────────────────────────────────────────────────────── */
function buildSitemap(routes) {
  const urls = routes
    .map((r) => `  <url><loc>${BF.BASE_URL}${BF.headFor(r).path}</loc><lastmod>${BUILD_DATE}</lastmod></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

/* ── conservative CSS minify (dist only) ────────────────────────────────
   Strips comments and collapses whitespace. JS is left as-is: data.js holds
   guide bodies in multi-line template literals, so collapsing its whitespace
   would alter the rendered HTML. */
function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")          // block comments
    .replace(/\s+/g, " ")                       // collapse runs of whitespace
    .replace(/\s*([{}:;,>])\s*/g, "$1")        // trim around punctuation
    .replace(/;}/g, "}")                         // drop last semicolon in a block
    .trim();
}

/* ── build ──────────────────────────────────────────────────────────── */
function main() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  const routes = BF.allRoutes();
  routes.forEach((r) => writeFile(outPath(r), buildPage(r)));
  writeFile(outPath({ name: "notfound" }), buildPage({ name: "notfound" }));
  writeFile("sitemap.xml", buildSitemap(routes));

  // copy static files needed at the site root.
  // NB: no CNAME — this is a project page served under the apex at /bootstrapfounders/,
  // so it must not claim a custom domain of its own.
  fs.cpSync(path.join(ROOT, "assets"), path.join(DIST, "assets"), { recursive: true });
  // minify the (already-copied) stylesheet in place
  const cssPath = path.join(DIST, "assets/css/styles.css");
  fs.writeFileSync(cssPath, minifyCSS(fs.readFileSync(cssPath, "utf8")));
  [".nojekyll", "robots.txt", "site.webmanifest"].forEach((f) => {
    const src = path.join(ROOT, f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DIST, f));
  });

  console.log(`prerendered ${routes.length} pages + 404 → ${path.relative(ROOT, DIST)}/`);
  routes.forEach((r) => console.log(`  ${BF.headFor(r).path}  ->  ${outPath(r)}`));
}

main();
