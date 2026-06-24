/* =========================================================================
   bootstrapfounders — app
   Hash routing, live search, tag filtering, theme + mobile nav. No deps.
   ========================================================================= */
(function () {
  "use strict";

  const DB = window.DB;
  const $  = (s, r = document) => r.querySelector(s);

  const els = {
    content:   $("#content"),
    nav:       $("#nav"),
    search:    $("#search"),
    theme:     $("#themeToggle"),
    navToggle: $("#navToggle"),
    scrim:     $("#scrim"),
    body:      document.body,
  };

  // these tags get the accent highlight on rows
  const FLAG_TAGS = new Set(["must-read", "must-listen", "must-watch", "must-do", "free"]);

  let activeTag = null;     // tag filter within a category view
  let searchQuery = "";

  /* ── helpers ─────────────────────────────────────────────────────── */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const totalResources = () =>
    DB.categories.reduce((n, c) => n + (DB[c.id]?.length || 0), 0);

  const allItemsFlat = () =>
    DB.categories.flatMap((c) => (DB[c.id] || []).map((it) => ({ ...it, _cat: c })));

  function matches(item, q) {
    const hay = (item.name + " " + (item.by || "") + " " + item.desc + " " + (item.tags || []).join(" ")).toLowerCase();
    return q.split(/\s+/).filter(Boolean).every((t) => hay.includes(t));
  }

  /* ── templates ───────────────────────────────────────────────────── */
  function rowHTML(item, catLabel) {
    const tags = [];
    if (catLabel) tags.push(`<span class="tag">${esc(catLabel.toLowerCase())}</span>`);
    (item.tags || []).forEach((t) =>
      tags.push(`<span class="tag${FLAG_TAGS.has(t) ? " flag" : ""}">${esc(t)}</span>`));
    return `
      <a class="row" href="${esc(item.url)}" target="_blank" rel="noopener">
        <div class="row-head">
          <span class="row-name">${esc(item.name)}</span>
          ${item.by ? `<span class="row-by">${esc(item.by)}</span>` : ""}
          <span class="row-arrow" aria-hidden="true">&rarr;</span>
        </div>
        <p class="row-desc">${esc(item.desc)}</p>
        <div class="row-tags">${tags.join("")}</div>
      </a>`;
  }

  function navRowHTML(href, name, by, desc) {
    return `
      <a class="row compact" href="${href}">
        <div class="row-head">
          <span class="row-name">${esc(name)}</span>
          ${by ? `<span class="row-by">${esc(by)}</span>` : ""}
          <span class="row-arrow" aria-hidden="true">&rarr;</span>
        </div>
        <p class="row-desc">${esc(desc)}</p>
      </a>`;
  }

  /* ── nav ─────────────────────────────────────────────────────────── */
  function buildNav() {
    const route = currentRoute();
    let html = `<div class="nav-section">browse</div>
      <a class="nav-link${route.name === "home" ? " active" : ""}" href="#/">home</a>`;

    DB.categories.forEach((c) => {
      const active = route.name === "category" && route.id === c.id;
      html += `<a class="nav-link${active ? " active" : ""}" href="#/${c.id}">${esc(c.label)}<span class="count">${DB[c.id].length}</span></a>`;
    });

    const guidesActive = route.name === "guides" || route.name === "guide";
    html += `<div class="nav-section">learn</div>
      <a class="nav-link${guidesActive ? " active" : ""}" href="#/guides">guides<span class="count">${DB.guides.length}</span></a>`;

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
    const cats = DB.categories.map((c) =>
      navRowHTML(`#/${c.id}`, c.label, `${DB[c.id].length} entries`, c.blurb)).join("");

    const guides = DB.guides.map((g) =>
      navRowHTML(`#/guide/${g.slug}`, g.title, "", g.summary)).join("");

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

  function renderCategory(id) {
    const cat = DB.categories.find((c) => c.id === id);
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
        <div class="list">${shown.map((it) => rowHTML(it)).join("")}</div>
        ${footerHTML()}
      </div>`;
  }

  function renderGuides() {
    const guides = DB.guides.map((g) =>
      navRowHTML(`#/guide/${g.slug}`, g.title, "", g.summary)).join("");
    return `
      <div class="content-inner">
        <div class="page-head"><h2>guides</h2><p class="page-sub">Opinionated, tactical playbooks. Less directory, more wiki.</p></div>
        <div class="list">${guides}</div>
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
          <div class="crumb"><a href="#/guides">guides</a> / ${esc(g.title)}</div>
          <h1>${esc(g.title)}</h1>
          <p class="lede-text">${esc(g.summary)}</p>
          <hr class="rule" />
          <div class="article-body">${g.body}</div>
          <div class="article-foot">
            <a href="#/guides">&larr; all guides</a>
            <a href="#/guide/${next.slug}">next: ${esc(next.title)} &rarr;</a>
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
        <div class="big">no matches</div>
        <p>Nothing for &ldquo;${esc(q)}&rdquo;. Try a broader term, or <a href="#/">browse the directory</a>.</p>
      </div></div>`;
    }

    const guideBlock = guideHits.length ? `
      <section class="block">
        <h2 class="block-title">guides</h2>
        <div class="list">${guideHits.map((g) => navRowHTML(`#/guide/${g.slug}`, g.title, "", g.summary)).join("")}</div>
      </section>` : "";

    const resBlock = results.length ? `
      <section class="block">
        <h2 class="block-title">resources</h2>
        <div class="list">${results.map((it) => rowHTML(it, it._cat.label)).join("")}</div>
      </section>` : "";

    return `
      <div class="content-inner">
        <div class="page-head"><h2>search</h2>
        <p class="page-sub">${results.length + guideHits.length} result${results.length + guideHits.length === 1 ? "" : "s"} for &ldquo;${esc(q)}&rdquo;</p></div>
        ${guideBlock}${resBlock}
      </div>`;
  }

  function renderNotFound() {
    return `<div class="content-inner"><div class="empty">
      <div class="big">404</div><p>Nothing here. <a href="#/">Back home</a>.</p>
    </div></div>`;
  }

  function footerHTML() {
    return `
      <footer class="site-foot">
        <span>bootstrapfounders &mdash; an open field guide. built static, no tracking.</span>
        <span><a href="https://github.com/alastairrushworth/bootstrapfounders" target="_blank" rel="noopener">contribute &rarr;</a></span>
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
    els.content.querySelectorAll(".filter").forEach((f) => {
      f.addEventListener("click", () => { activeTag = f.dataset.tag || null; render(); });
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

  /* ── search ──────────────────────────────────────────────────────── */
  function initSearch() {
    els.search.addEventListener("input", () => { searchQuery = els.search.value; render(); });
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
