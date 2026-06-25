#!/usr/bin/env python3
"""Fetch site icons for website-based categories (reading, communities,
launch) and bundle them locally as assets/img/<cat>/<slug>.png.

Quality cascade per site:
  1. <host>/apple-touch-icon.png        (de-facto 180px standard)
  2. apple-touch-icon <link> in the HTML
  3. Google s2 favicon service (sz=128) -- reliable fallback

Slug logic MUST match app.js slugify(). Requires macOS `sips` + `curl`.
"""
import json, os, re, subprocess, tempfile, time, urllib.parse

ROOT = "/Users/alastairrushworth/Documents/GitHub/bootstrapfounders"
CATS = ["reading", "communities", "launch"]
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

def curl(url):
    p = subprocess.run(["curl", "-sL", "--max-time", "30", "-A", UA, url],
                       capture_output=True)
    return p.stdout if p.returncode == 0 else b""

def px_width(path):
    r = subprocess.run(["sips", "-g", "pixelWidth", path], capture_output=True, text=True)
    m = re.search(r'pixelWidth:\s*(\d+)', r.stdout)
    return int(m.group(1)) if m else 0

def as_image(raw):
    """Write bytes to a temp file; return (path, width) if it's a valid image."""
    if not raw or len(raw) < 100:
        return None, 0
    t = tempfile.NamedTemporaryFile(suffix=".img", delete=False)
    t.write(raw); t.close()
    return t.name, px_width(t.name)

def load_items():
    snippet = (
        f"global.window={{}};require('{ROOT}/assets/js/data.js');"
        "const d=global.window.DB;const cats=" + json.dumps(CATS) + ";"
        "const out=[];for(const c of cats)for(const it of d[c])"
        "out.push({cat:c,name:it.name,url:it.url});"
        "console.log(JSON.stringify(out));"
    )
    r = subprocess.run(["node", "-e", snippet], capture_output=True, text=True)
    if r.returncode != 0:
        raise SystemExit("node dump failed:\n" + r.stderr)
    return json.loads(r.stdout)

ICON_RE = re.compile(
    r'<link[^>]+rel="[^"]*apple-touch-icon[^"]*"[^>]*>', re.I)
HREF_RE = re.compile(r'href="([^"]+)"', re.I)

def candidates(url):
    p = urllib.parse.urlparse(url)
    host = p.netloc
    origin = f"{p.scheme}://{host}"
    yield f"{origin}/apple-touch-icon.png"
    yield f"{origin}/apple-touch-icon-precomposed.png"
    html = curl(url).decode("utf-8", "replace")
    for tag in ICON_RE.findall(html):
        m = HREF_RE.search(tag)
        if m:
            yield urllib.parse.urljoin(url, m.group(1))
    yield f"https://www.google.com/s2/favicons?domain={host}&sz=128"

def best_icon(url):
    best_path, best_w, best_src = None, 0, ""
    for cand in candidates(url):
        path, w = as_image(curl(cand))
        if path and w > best_w:
            if best_path:
                os.unlink(best_path)
            best_path, best_w, best_src = path, w, cand
        elif path:
            os.unlink(path)
        # an apple-touch-icon at >=120px is plenty; stop early
        if best_w >= 120 and "apple-touch-icon" in best_src:
            break
    return best_path, best_w, best_src

def main():
    items = load_items()
    print(f"{len(items)} sites across {CATS}\n")
    ok = miss = 0
    for it in items:
        try:
            path, w, src = best_icon(it["url"])
            if not path:
                print(f"  [MISS] {it['cat']}/{it['name']}"); miss += 1; continue
            dest = f"{ROOT}/assets/img/{it['cat']}/{slug(it['name'])}.png"
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            subprocess.run(["sips", "-s", "format", "png", "-Z", "128", path, "-o", dest],
                           capture_output=True)
            os.unlink(path)
            tag = "apple" if "apple-touch" in src else ("google" if "google" in src else "link")
            print(f"  [OK]  {it['cat']:11s} {it['name'][:26]:26s} {w}px {tag} {os.path.getsize(dest)//1024}KB")
            ok += 1
        except Exception as e:
            print(f"  [ERR] {it['cat']}/{it['name']}: {e}"); miss += 1
        time.sleep(0.2)
    print(f"\ndone: {ok} ok, {miss} missing")

if __name__ == "__main__":
    main()
