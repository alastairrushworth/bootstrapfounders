/* =========================================================================
   bootstrapfounders — app
   Hash routing, live search, tag filtering, theme + mobile nav. No deps.
   ========================================================================= */
(function () {
  "use strict";

  const DB = window.DB;
  const $  = (s, r = document) => r.querySelector(s);

  const els = {
    content: $("#content"),
    nav:     $("#nav"),
    search:  $("#search"),
    theme:   $("#themeToggle"),
    navToggle: $("#navToggle"),
    scrim:   $("#scrim"),
    body:    document.body,
  };

  // "flag" tags get the accent highlight on cards
  const FLAG_TAGS = new Set(["must-read", "must-listen", "must-watch", "must-do", "free"]);

  let activeTag = null;          // current tag filter within a category view
  let searchQuery = "";

  /* ── helpers ─────────────────────────────────────────────────────── */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const totalResources = () =>
    DB.categories.reduce((n, c) => n + (DB[c.id]?.length || 0), 0);

  const allItemsFlat = () =>
    DB.categories.flatMap((c) =>
      (DB[c.id] || []).map((it) => ({ ...it, _cat: c })));

  function matches(item, q) {
    const hay = (item.name + " " + (item.by || "") + " " + item.desc + " " + (item.tags || []).join(" ")).toLowerCase();
    return q.split(/\s+/).filter(Boolean).every((t) => hay.includes(t));
  }

  /* ── card template ───────────────────────────────────────────────── */
  function cardHTML(item, catLabel) {
    const tags = (item.tags || []).map((t) =>
      `<span class="mini-tag${FLAG_TAGS.has(t) ? " flag" : ""}">${esc(t)}</span>`).join("");
    const catBadge = catLabel ? `<span class="mini-tag">${esc(catLabel)}</span>` : "";
    return `
      <a class="card" href="${esc(item.url)}" target="_blank" rel="noopener">
        <div class="card-top">
          <div>
            <h3>${esc(item.name)}</h3>
            ${item.by ? `<p class="by">${esc(item.by)}</p>` : ""}
          </div>
          <span class="arrow" aria-hidden="true">↗</span>
        </div>
        <p class="desc">${esc(item.desc)}</p>
        <div class="card-tags">${catBadge}${tags}</div>
      </a>`;
  }

  /* ── nav ─────────────────────────────────────────────────────────── */
  function buildNav() {
    const route = currentRoute();
    let html = `
      <div class="nav-section">Browse</div>
      <a class="nav-link${route.name === "home" ? " active" : ""}" href="#/">
        <span class="ico">⌂</span> Home
      </a>`;

    DB.categories.forEach((c) => {
      const active = route.name === "category" && route.id === c.id;
      html += `
        <a class="nav-link${active ? " active" : ""}" href="#/${c.id}">
          <span class="ico">${c.icon}</span> ${esc(c.label)}
          <span class="count">${DB[c.id].length}</span>
        </a>`;
    });

    const guidesActive = route.name === "guides" || route.name === "guide";
    html += `
      <div class="nav-section">Learn</div>
      <a class="nav-link${guidesActive ? " active" : ""}" href="#/guides">
        <span class="ico">📖</span> Guides
        <span class="count">${DB.guides.length}</span>
      </a>`;

    els.nav.innerHTML = html;
  }

  /* ── routing ─────────────────────────────────────────────────────── */
  function currentRoute() {
    const h = (location.hash || "#/").replace(/^#\/?/, "");
    const parts = h.split("/").filter(Boolean);
    if (parts.length === 0) return { name: "home" };
    if (parts[0] === "guides") return { name: "guides" };
    if (parts[0] === "guide") return { name: "guide", slug: parts[1] };
    if (DB.categories.some((c) => c.id === parts[0])) return { name: "category", id: parts[0] };
    return { name: "home" };
  }

  /* ── views ───────────────────────────────────────────────────────── */
  function renderHome() {
    const cats = DB.categories.map((c) => `
      <a class="cat-card" href="#/${c.id}">
        <span class="cat-ico">${c.icon}</span>
        <h3>${esc(c.label)} <span class="count">${DB[c.id].length}</span></h3>
        <p>${esc(c.blurb)}</p>
      </a>`).join("");

    const guides = DB.guides.map((g) => `
      <a class="guide-card" href="#/guide/${g.slug}">
        <span class="g-ico">${g.icon}</span>
        <h3>${esc(g.title)}</h3>
        <p>${esc(g.summary)}</p>
        <span class="g-read">Read →</span>
      </a>`).join("");

    return `
      <div class="content-inner">
        <section class="hero">
          <div class="eyebrow">A field guide for technical founders</div>
          <h1>Bootstrap your idea into a <span class="grad">real business</span>.</h1>
          <p>A curated directory and wiki of everything a technically-minded founder needs to go from idea to paying customers — without raising a round. The podcasts, books, tools and playbooks that actually move the needle.</p>
          <div class="hero-stats">
            <div class="hero-stat"><div class="n">${totalResources()}</div><div class="l">Resources</div></div>
            <div class="hero-stat"><div class="n">${DB.categories.length}</div><div class="l">Categories</div></div>
            <div class="hero-stat"><div class="n">${DB.guides.length}</div><div class="l">Playbooks</div></div>
          </div>
        </section>

        <h2 class="home-h2">Browse the directory</h2>
        <p class="home-h2-sub">Hand-picked resources, grouped by what you need.</p>
        <div class="cat-grid">${cats}</div>

        <h2 class="home-h2">📖 Practical playbooks</h2>
        <p class="home-h2-sub">The wiki bit — opinionated, tactical guides on validation, traction, pricing and launching.</p>
        <div class="guide-list">${guides}</div>

        ${footerHTML()}
      </div>`;
  }

  function renderCategory(id) {
    const cat = DB.categories.find((c) => c.id === id);
    const items = DB[id] || [];

    // tag bar
    const tagCounts = {};
    items.forEach((it) => (it.tags || []).forEach((t) => (tagCounts[t] = (tagCounts[t] || 0) + 1)));
    const tags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);
    const tagbar = tags.length ? `
      <div class="tagbar">
        <span class="tag-chip${!activeTag ? " active" : ""}" data-tag="">All</span>
        ${tags.map((t) => `<span class="tag-chip${activeTag === t ? " active" : ""}" data-tag="${esc(t)}">${esc(t)}</span>`).join("")}
      </div>` : "";

    const shown = activeTag ? items.filter((it) => (it.tags || []).includes(activeTag)) : items;
    const cards = shown.map((it) => cardHTML(it)).join("");

    return `
      <div class="content-inner">
        <div class="section-head"><span class="ico">${cat.icon}</span><h2>${esc(cat.label)}</h2></div>
        <p class="section-sub">${esc(cat.blurb)}</p>
        ${tagbar}
        <p class="results-meta">${shown.length} of ${items.length}${activeTag ? ` · filtered by “${esc(activeTag)}”` : ""}</p>
        <div class="grid">${cards}</div>
        ${footerHTML()}
      </div>`;
  }

  function renderGuides() {
    const guides = DB.guides.map((g) => `
      <a class="guide-card" href="#/guide/${g.slug}">
        <span class="g-ico">${g.icon}</span>
        <h3>${esc(g.title)}</h3>
        <p>${esc(g.summary)}</p>
        <span class="g-read">Read →</span>
      </a>`).join("");
    return `
      <div class="content-inner">
        <div class="section-head"><span class="ico">📖</span><h2>Guides</h2></div>
        <p class="section-sub">Opinionated, tactical playbooks. Less directory, more wiki.</p>
        <div class="guide-list">${guides}</div>
        ${footerHTML()}
      </div>`;
  }

  function renderGuide(slug) {
    const g = DB.guides.find((x) => x.slug === slug);
    if (!g) return renderNotFound();
    const idx = DB.guides.findIndex((x) => x.slug === slug);
    const next = DB.guides[(idx + 1) % DB.guides.length];
    return `
      <div class="content-inner">
        <article class="article">
          <div class="crumb"><a href="#/guides">📖 Guides</a> <span>/</span> ${esc(g.title)}</div>
          <h1>${g.icon} ${esc(g.title)}</h1>
          <p class="lede">${esc(g.summary)}</p>
          <div class="article-body">${g.body}</div>
          <div class="article-foot">
            <a class="btn-pill" href="#/guides">← All guides</a>
            <a class="btn-pill" href="#/guide/${next.slug}">Next: ${esc(next.title)} →</a>
          </div>
        </article>
        ${footerHTML()}
      </div>`;
  }

  function renderSearch(q) {
    const results = allItemsFlat().filter((it) => matches(it, q));
    const guideHits = DB.guides.filter((g) =>
      (g.title + " " + g.summary + " " + g.body + " " + (g.tags || []).join(" ")).toLowerCase().includes(q));

    if (!results.length && !guideHits.length) {
      return `<div class="content-inner"><div class="empty">
        <div class="big">🔭</div>
        <p>No matches for “<strong>${esc(q)}</strong>”.</p>
        <p>Try a broader term — or <a href="#/">browse the directory</a>.</p>
      </div></div>`;
    }

    const guideBlock = guideHits.length ? `
      <h2 class="home-h2">📖 Guides</h2>
      <div class="guide-list" style="margin-bottom:34px">
        ${guideHits.map((g) => `
          <a class="guide-card" href="#/guide/${g.slug}">
            <span class="g-ico">${g.icon}</span><h3>${esc(g.title)}</h3>
            <p>${esc(g.summary)}</p><span class="g-read">Read →</span>
          </a>`).join("")}
      </div>` : "";

    const cards = results.map((it) => cardHTML(it, it._cat.label)).join("");

    return `
      <div class="content-inner">
        <div class="section-head"><span class="ico">⌕</span><h2>Search</h2></div>
        <p class="results-meta">${results.length + guideHits.length} result${results.length + guideHits.length === 1 ? "" : "s"} for “${esc(q)}”</p>
        ${guideBlock}
        ${cards ? `<h2 class="home-h2">Resources</h2><div class="grid">${cards}</div>` : ""}
      </div>`;
  }

  function renderNotFound() {
    return `<div class="content-inner"><div class="empty">
      <div class="big">🤷</div><p>Nothing here.</p><p><a href="#/">Back home</a></p>
    </div></div>`;
  }

  function footerHTML() {
    return `
      <footer class="site-foot">
        <span>🥾 bootstrapfounders — an open field guide. Built static, no tracking.</span>
        <span><a href="https://github.com/" target="_blank" rel="noopener">Contribute on GitHub →</a></span>
      </footer>`;
  }

  /* ── main render ─────────────────────────────────────────────────── */
  function render() {
    const q = searchQuery.trim().toLowerCase();
    if (q.length >= 2) {
      els.content.innerHTML = renderSearch(q);
    } else {
      const r = currentRoute();
      let html;
      switch (r.name) {
        case "category": html = renderCategory(r.id); break;
        case "guides":   html = renderGuides(); break;
        case "guide":    html = renderGuide(r.slug); break;
        default:         html = renderHome();
      }
      els.content.innerHTML = html;
    }
    buildNav();
    bindViewEvents();
    window.scrollTo({ top: 0 });
  }

  function bindViewEvents() {
    els.content.querySelectorAll(".tag-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const t = chip.dataset.tag;
        activeTag = t || null;
        render();
      });
    });
  }

  /* ── theme ───────────────────────────────────────────────────────── */
  function initTheme() {
    const saved = localStorage.getItem("bf-theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
    els.theme.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = cur === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("bf-theme", next);
    });
  }

  /* ── mobile nav ──────────────────────────────────────────────────── */
  function initNavToggle() {
    const close = () => els.body.classList.remove("nav-open");
    els.navToggle.addEventListener("click", () => els.body.classList.toggle("nav-open"));
    els.scrim.addEventListener("click", close);
    els.nav.addEventListener("click", (e) => { if (e.target.closest(".nav-link")) close(); });
  }

  /* ── search wiring ───────────────────────────────────────────────── */
  function initSearch() {
    els.search.addEventListener("input", () => { searchQuery = els.search.value; render(); });
    // "/" focuses search, Esc clears
    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== els.search) { e.preventDefault(); els.search.focus(); }
      if (e.key === "Escape" && document.activeElement === els.search) { els.search.value = ""; searchQuery = ""; els.search.blur(); render(); }
    });
  }

  /* ── boot ────────────────────────────────────────────────────────── */
  window.addEventListener("hashchange", () => {
    activeTag = null;
    if (searchQuery) { searchQuery = ""; els.search.value = ""; }
    render();
  });

  initTheme();
  initNavToggle();
  initSearch();
  render();
})();
