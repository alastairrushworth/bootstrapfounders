/* =========================================================================
   bootstrapfounders — app
   History-API routing, live search, tag filtering, theme + mobile nav.
   Templates live in render.js (window.BF) so static pages and the SPA agree.
   No deps.
   ========================================================================= */
(function () {
  "use strict";

  const DB = window.DB;
  const BF = window.BF;
  const $  = (s, r = document) => r.querySelector(s);

  const els = {
    content:    $("#content"),
    nav:        $("#nav"),
    search:     $("#search"),
    searchClear:$("#searchClear"),
    searchKbd:  $(".search-kbd"),
    theme:      $("#themeToggle"),
    navToggle:  $("#navToggle"),
    scrim:      $("#scrim"),
    body:       document.body,
  };

  let searchQuery = "";

  const esc = BF.esc;
  const BASE = BF.BASE;   // path prefix the site is mounted under (e.g. /bootstrapfounders)

  function matches(item, q) {
    const hay = (item.name + " " + (item.by || "") + " " + item.desc + " " + (item.tags || []).join(" ")).toLowerCase();
    return q.split(/\s+/).filter(Boolean).every((t) => hay.includes(t));
  }

  // same token-AND logic as resources, over the guide's full text
  function guideMatches(g, q) {
    const hay = (g.title + " " + g.summary + " " + BF.stripTags(g.body) + " " + (g.tags || []).join(" ")).toLowerCase();
    return q.split(/\s+/).filter(Boolean).every((t) => hay.includes(t));
  }

  const allItemsFlat = () =>
    DB.categories.flatMap((c) => (DB[c.id] || []).map((it) => ({ ...it, _cat: c })));

  /* ── routing (History API, real paths under BASE) ────────────────── */
  function currentRoute() {
    let p = location.pathname;
    if (p.startsWith(BASE)) p = p.slice(BASE.length);   // strip the mount prefix
    const parts = p.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
    if (parts.length === 0) return { name: "home" };
    if (parts[0] === "guides") return { name: "guides" };
    if (parts[0] === "guide")  return parts[1] ? { name: "guide", slug: parts[1] } : { name: "guides" };
    if (DB.categories.some((c) => c.id === parts[0])) return { name: "category", id: parts[0] };
    return { name: "notfound" };
  }

  function navigate(path) {
    if (path !== location.pathname) history.pushState({}, "", path);
    if (searchQuery) { searchQuery = ""; els.search.value = ""; syncClear(); }
    render({ focus: true });
  }

  /* ── nav ─────────────────────────────────────────────────────────── */
  function buildNav() {
    const route = currentRoute();
    const homeActive = route.name === "home";
    let html = `<div class="nav-section">browse</div>
      <a class="nav-link${homeActive ? " active" : ""}"${homeActive ? ' aria-current="page"' : ""} href="${BASE}/">home</a>`;

    DB.categories.forEach((c) => {
      const active = route.name === "category" && route.id === c.id;
      html += `<a class="nav-link${active ? " active" : ""}"${active ? ' aria-current="page"' : ""} href="${BASE}/${c.id}/">${esc(c.label)}<span class="count">${DB[c.id].length}</span></a>`;
    });

    const guidesActive = route.name === "guides" || route.name === "guide";
    html += `<div class="nav-section">learn</div>
      <a class="nav-link${guidesActive ? " active" : ""}"${guidesActive ? ' aria-current="page"' : ""} href="${BASE}/guides/">guides<span class="count">${DB.guides.length}</span></a>`;

    els.nav.innerHTML = html;
  }

  /* ── search view (client-side only; not a crawlable route) ────────── */
  function renderSearch(q) {
    const results = allItemsFlat().filter((it) => matches(it, q));
    const guideHits = DB.guides.filter((g) => guideMatches(g, q));

    if (!results.length && !guideHits.length) {
      return `<div class="content-inner"><div class="empty">
        <div class="big">no matches</div>
        <p>Nothing for &ldquo;${esc(q)}&rdquo;. Try a broader term, or <a href="${BASE}/">browse the directory</a>.</p>
      </div></div>` + BF.footerHTML();
    }

    const guideBlock = guideHits.length ? `
      <section class="block">
        <h2 class="block-title">guides</h2>
        <div class="list">${guideHits.map((g) => BF.navRowHTML(`${BASE}/guide/${g.slug}/`, g.title, "", g.summary)).join("")}</div>
      </section>` : "";

    const resBlock = results.length ? `
      <section class="block">
        <h2 class="block-title">resources</h2>
        <div class="list">${results.map((it) => BF.rowHTML(it, it._cat.label, it._cat.id)).join("")}</div>
      </section>` : "";

    return `
      <div class="content-inner">
        <div class="page-head"><h2>search</h2>
        <p class="page-sub" role="status">${results.length + guideHits.length} result${results.length + guideHits.length === 1 ? "" : "s"} for &ldquo;${esc(q)}&rdquo;</p></div>
        ${guideBlock}${resBlock}
      </div>` + BF.footerHTML();
  }

  /* ── per-route <head> (title, description, canonical, og:url) ─────── */
  // ensure a <meta name|property> exists and set its content
  function setMetaTag(kind, key, content) {
    let el = document.head.querySelector(`meta[${kind}="${key}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(kind, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function updateHead(route) {
    const h = BF.headFor(route);
    const canonical = BF.BASE_URL + h.path;
    document.title = h.title;
    setMetaTag("name", "description", h.description);
    setMetaTag("property", "og:url", canonical);
    setMetaTag("property", "og:title", h.title);
    setMetaTag("property", "og:description", h.description);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);
  }

  /* ── main render ─────────────────────────────────────────────────── */
  // opts.focus — true for real navigation (link click / popstate): move focus
  // to the routed <main> and reset scroll, so keyboard/SR users land on the new
  // page. Omitted for in-place updates (typing in search, toggling a filter).
  function render(opts) {
    opts = opts || {};
    const q = searchQuery.trim().toLowerCase();
    if (q.length >= 2) {
      els.content.innerHTML = renderSearch(q);
    } else {
      const r = currentRoute();
      els.content.innerHTML = BF.pageContent(r);
      updateHead(r);
    }
    buildNav();
    bindViewEvents();
    if (opts.focus) {
      els.content.focus();
      window.scrollTo({ top: 0 });
    }
  }

  function bindViewEvents() {}

  /* ── internal link interception (delegated) ──────────────────────── */
  function initLinks() {
    document.addEventListener("click", (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      // only intercept internal, same-tab links within our mount (BASE)
      if (!href || !href.startsWith(BASE) || a.target === "_blank") return;
      e.preventDefault();
      navigate(href);
    });
    window.addEventListener("popstate", () => {
      if (searchQuery) { searchQuery = ""; els.search.value = ""; syncClear(); }
      render({ focus: true });
    });
  }

  /* ── theme (respects OS preference on first visit) ───────────────── */
  function initTheme() {
    const saved = localStorage.getItem("bf-theme");
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial = saved || (prefersLight ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", initial);
    els.theme.setAttribute("aria-pressed", String(initial === "light"));

    els.theme.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = cur === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      els.theme.setAttribute("aria-pressed", String(next === "light"));
      localStorage.setItem("bf-theme", next);
    });
  }

  /* ── mobile nav ──────────────────────────────────────────────────── */
  function initNavToggle() {
    const set = (open) => {
      els.body.classList.toggle("nav-open", open);
      els.navToggle.setAttribute("aria-expanded", String(open));
    };
    els.navToggle.setAttribute("aria-expanded", "false");
    els.navToggle.addEventListener("click", () => set(!els.body.classList.contains("nav-open")));
    els.scrim.addEventListener("click", () => set(false));
    els.nav.addEventListener("click", (e) => { if (e.target.closest(".nav-link")) set(false); });
  }

  /* ── search ──────────────────────────────────────────────────────── */
  // show the clear (✕) button only when the field has text; swap it for the
  // "/" shortcut hint, which is only useful when the field is empty
  function syncClear() {
    const hasText = !!els.search.value;
    if (els.searchClear) els.searchClear.hidden = !hasText;
    if (els.searchKbd) els.searchKbd.hidden = hasText;
  }
  function clearSearch(refocus) {
    els.search.value = "";
    searchQuery = "";
    syncClear();
    if (refocus) els.search.focus(); else els.search.blur();
    render();
  }
  function initSearch() {
    els.search.addEventListener("input", () => { searchQuery = els.search.value; syncClear(); render(); });
    if (els.searchClear) els.searchClear.addEventListener("click", () => clearSearch(true));
    syncClear();
    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== els.search) { e.preventDefault(); els.search.focus(); }
      if (e.key === "Escape" && document.activeElement === els.search) { clearSearch(false); }
    });
  }

  /* ── boot ────────────────────────────────────────────────────────── */
  initTheme();
  initNavToggle();
  initSearch();
  initLinks();
  render();
})();
