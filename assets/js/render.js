/* =========================================================================
   bootstrapfounders — shared render layer
   Pure, DOM-free template + metadata functions. Loaded in the browser (by
   app.js) AND in Node (by scripts/prerender.js) so the static pages and the
   live SPA render from one source of truth. No DOM, no deps.
   ========================================================================= */
(function (root) {
  "use strict";

  const DB = root.DB;
  const ORIGIN = "https://alastairrushworth.com";
  const BASE = "/bootstrapfounders";       // project-page path mounted under the apex
  const BASE_URL = ORIGIN + BASE;           // canonical site root (origin + base)

  /* ── helpers ─────────────────────────────────────────────────────── */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // must match fetch_images.py slug(): lowercase, non-alnum runs -> "-", trimmed
  const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  // strip tags + collapse whitespace — for meta descriptions built from guide bodies
  const stripTags = (s) => String(s).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  // these tags get the accent highlight on rows
  const FLAG_TAGS = new Set(["must-read", "must-listen", "must-watch", "must-do", "free"]);

  // categories whose rows get a local thumbnail at assets/img/<id>/<slug>.<ext>
  //  cover = full-bleed art/avatar (jpg) · fav = site icon on a tile (png)
  const THUMB = {
    podcasts:    { kind: "cover", ext: "jpg" },
    youtube:     { kind: "cover", ext: "jpg" },
    tools:       { kind: "fav",   ext: "png" },
    reading:     { kind: "fav",   ext: "png" },
    communities: { kind: "fav",   ext: "png" },
    launch:      { kind: "fav",   ext: "png" },
  };

  const totalResources = () =>
    DB.categories.reduce((n, c) => n + (DB[c.id]?.length || 0), 0);

  /* ── row / list templates ───────────────────────────────────────── */
  function rowHTML(item, catLabel, catId) {
    const tags = [];
    if (catLabel) tags.push(`<span class="tag">${esc(catLabel.toLowerCase())}</span>`);
    (item.tags || []).forEach((t) =>
      tags.push(`<span class="tag${FLAG_TAGS.has(t) ? " flag" : ""}">${esc(t)}</span>`));
    const t = THUMB[catId];
    // onerror removes the <img> so a missing file degrades to a plain row
    const thumb = t
      ? `<img class="row-thumb${t.kind === "fav" ? " fav" : ""}" src="${BASE}/assets/img/${catId}/${slugify(item.name)}.${t.ext}" alt="" loading="lazy" onerror="this.remove()" />`
      : "";
    return `
      <a class="row${t ? " has-thumb" : ""}" href="${esc(item.url)}" target="_blank" rel="noopener">
        ${thumb}
        <div class="row-main">
          <div class="row-head">
            <span class="row-name">${esc(item.name)}</span>
            ${item.by ? `<span class="row-by">${esc(item.by)}</span>` : ""}
            <span class="row-arrow" aria-hidden="true">&rarr;</span>
          </div>
          <p class="row-desc">${esc(item.desc)}</p>
          <div class="row-tags">${tags.join("")}</div>
        </div>
      </a>`;
  }

  // internal nav row — href is a real path (History API), not a hash
  function navRowHTML(href, name, by, desc) {
    return `
      <a class="row compact" href="${esc(href)}">
        <div class="row-head">
          <span class="row-name">${esc(name)}</span>
          ${by ? `<span class="row-by">${esc(by)}</span>` : ""}
          <span class="row-arrow" aria-hidden="true">&rarr;</span>
        </div>
        <p class="row-desc">${esc(desc)}</p>
      </a>`;
  }

  function footerHTML() {
    return `
      <footer class="site-foot">
        <span>bootstrapfounders &mdash; an open field guide. built static, no tracking.</span>
        <span><a href="https://github.com/alastairrushworth/bootstrapfounders" target="_blank" rel="noopener">contribute &rarr;</a></span>
      </footer>`;
  }

  /* ── views ───────────────────────────────────────────────────────── */
  function renderHome() {
    const cats = DB.categories.map((c) =>
      navRowHTML(`${BASE}/${c.id}/`, c.label, `${DB[c.id].length} entries`, c.blurb)).join("");

    const guides = DB.guides.map((g) =>
      navRowHTML(`${BASE}/guide/${g.slug}/`, g.title, "", g.summary)).join("");

    return `
      <div class="content-inner">
        <section class="lede">
          <p class="tag-line">// a field guide for technical founders</p>
          <h1>Bootstrap your idea into a <span class="accent">real business</span>.</h1>
          <p>A minimal directory and wiki of what a technically-minded founder needs to go from idea to paying customers &mdash; without raising a round. The podcasts, books, tools and playbooks that actually move the needle.</p>
          <p class="meta"><b>${totalResources()}</b> resources &middot; <b>${DB.categories.length}</b> categories &middot; <b>${DB.guides.length}</b> playbooks &middot; no tracking</p>
        </section>

        <section class="block">
          <h2 class="block-title">directory</h2>
          <p class="block-sub">Hand-picked resources, grouped by what you need.</p>
          <div class="list">${cats}</div>
        </section>

        <section class="block">
          <h2 class="block-title">playbooks</h2>
          <p class="block-sub">The wiki bit &mdash; opinionated, tactical guides on validation, traction, pricing and launching.</p>
          <div class="list">${guides}</div>
        </section>

        ${footerHTML()}
      </div>`;
  }

  function renderCategory(id, activeTag) {
    const cat = DB.categories.find((c) => c.id === id);
    if (!cat) return renderNotFound();
    const items = DB[id] || [];

    const tagCounts = {};
    items.forEach((it) => (it.tags || []).forEach((t) => (tagCounts[t] = (tagCounts[t] || 0) + 1)));
    const tags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);
    const filters = tags.length ? `
      <div class="filters">
        <span class="filter${!activeTag ? " active" : ""}" data-tag="">all</span>
        ${tags.map((t) => `<span class="filter${activeTag === t ? " active" : ""}" data-tag="${esc(t)}">${esc(t)}</span>`).join("")}
      </div>` : "";

    const shown = activeTag ? items.filter((it) => (it.tags || []).includes(activeTag)) : items;

    return `
      <div class="content-inner">
        <div class="page-head"><h2>${esc(cat.label)}</h2><p class="page-sub">${esc(cat.blurb)}</p></div>
        ${filters}
        <p class="results-meta">${shown.length} of ${items.length}${activeTag ? ` &middot; filtered by #${esc(activeTag)}` : ""}</p>
        <div class="list">${shown.map((it) => rowHTML(it, null, id)).join("")}</div>
        ${footerHTML()}
      </div>`;
  }

  function renderGuides() {
    const guides = DB.guides.map((g) =>
      navRowHTML(`${BASE}/guide/${g.slug}/`, g.title, "", g.summary)).join("");
    return `
      <div class="content-inner">
        <div class="page-head"><h2>guides</h2><p class="page-sub">Opinionated, tactical playbooks. Less directory, more wiki.</p></div>
        <div class="list">${guides}</div>
        ${footerHTML()}
      </div>`;
  }

  // guides that share at least one tag, nearest first
  function relatedGuides(g, limit) {
    const tags = new Set(g.tags || []);
    return DB.guides
      .filter((x) => x.slug !== g.slug)
      .map((x) => ({ g: x, overlap: (x.tags || []).filter((t) => tags.has(t)).length }))
      .filter((x) => x.overlap > 0)
      .sort((a, b) => b.overlap - a.overlap)
      .slice(0, limit)
      .map((x) => x.g);
  }

  function renderGuide(slug) {
    const g = DB.guides.find((x) => x.slug === slug);
    if (!g) return renderNotFound();
    const idx = DB.guides.findIndex((x) => x.slug === slug);
    const prev = DB.guides[(idx - 1 + DB.guides.length) % DB.guides.length];
    const next = DB.guides[(idx + 1) % DB.guides.length];

    const related = relatedGuides(g, 3);
    const relatedBlock = related.length ? `
      <section class="related">
        <h2 class="block-title">related playbooks</h2>
        <div class="list">${related.map((r) => navRowHTML(`${BASE}/guide/${r.slug}/`, r.title, "", r.summary)).join("")}</div>
      </section>` : "";

    return `
      <div class="content-inner">
        <article class="article">
          <div class="crumb"><a href="${BASE}/guides/">guides</a> / ${esc(g.title)}</div>
          <h1>${esc(g.title)}</h1>
          <p class="lede-text">${esc(g.summary)}</p>
          <hr class="rule" />
          <div class="article-body">${g.body}</div>
          <nav class="article-foot" aria-label="guide navigation">
            ${prev.slug !== g.slug ? `<a class="prev" href="${BASE}/guide/${prev.slug}/">&larr; ${esc(prev.title)}</a>` : `<a href="${BASE}/guides/">&larr; all guides</a>`}
            ${next.slug !== g.slug ? `<a class="next" href="${BASE}/guide/${next.slug}/">${esc(next.title)} &rarr;</a>` : ""}
          </nav>
        </article>
        ${relatedBlock}
        ${footerHTML()}
      </div>`;
  }

  function renderNotFound() {
    return `<div class="content-inner"><div class="empty">
      <div class="big">404</div><p>Nothing here. <a href="${BASE}/">Back home</a>.</p>
    </div></div>`;
  }

  /* ── dispatcher ──────────────────────────────────────────────────── */
  // route: { name, id?, slug? } · opts: { activeTag? }
  function pageContent(route, opts) {
    opts = opts || {};
    switch (route.name) {
      case "category": return renderCategory(route.id, opts.activeTag || null);
      case "guides":   return renderGuides();
      case "guide":    return renderGuide(route.slug);
      case "notfound": return renderNotFound();
      default:         return renderHome();
    }
  }

  /* ── per-route <head> metadata (title, description, canonical, JSON-LD) ─ */
  const TITLE_SUFFIX = " · bootstrapfounders";
  const HOME_TITLE = "bootstrapfounders — a field guide for technical founders";
  const HOME_DESC = "A minimal directory and wiki for technically-minded founders bootstrapping a startup: podcasts, video, books, newsletters, communities, tools, launch platforms and practical traction playbooks.";

  function jsonldWebsite() {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "bootstrapfounders",
      url: BASE_URL + "/",
      description: HOME_DESC,
    };
  }

  function headFor(route) {
    if (route.name === "category") {
      const cat = DB.categories.find((c) => c.id === route.id);
      if (cat) {
        const items = DB[route.id] || [];
        return {
          title: cat.label + TITLE_SUFFIX,
          description: cat.blurb,
          path: `/${cat.id}/`,
          jsonld: {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: cat.label,
            description: cat.blurb,
            itemListElement: items.map((it, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: it.url,
              name: it.name,
            })),
          },
        };
      }
    }
    if (route.name === "guides") {
      return {
        title: "Guides" + TITLE_SUFFIX,
        description: "Opinionated, tactical playbooks for bootstrappers: idea validation, first customers, traction channels, pricing, building in public, launching, SEO and cold outreach.",
        path: "/guides/",
        jsonld: null,
      };
    }
    if (route.name === "guide") {
      const g = DB.guides.find((x) => x.slug === route.slug);
      if (g) {
        return {
          title: g.title + TITLE_SUFFIX,
          description: g.summary,
          path: `/guide/${g.slug}/`,
          jsonld: {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: g.title,
            description: g.summary,
            url: `${BASE_URL}/guide/${g.slug}/`,
            articleBody: stripTags(g.body).slice(0, 600),
            author: { "@type": "Organization", name: "bootstrapfounders" },
          },
        };
      }
    }
    if (route.name === "notfound") {
      return { title: "Not found" + TITLE_SUFFIX, description: HOME_DESC, path: "/404", jsonld: null };
    }
    return { title: HOME_TITLE, description: HOME_DESC, path: "/", jsonld: jsonldWebsite() };
  }

  // every indexable route, for sitemap generation
  function allRoutes() {
    const routes = [{ name: "home" }, { name: "guides" }];
    DB.categories.forEach((c) => routes.push({ name: "category", id: c.id }));
    DB.guides.forEach((g) => routes.push({ name: "guide", slug: g.slug }));
    return routes;
  }

  root.BF = {
    BASE, BASE_URL, esc, slugify, stripTags,
    rowHTML, navRowHTML, footerHTML,
    pageContent, renderNotFound, headFor, allRoutes,
  };
})(typeof window !== "undefined" ? window : globalThis);
