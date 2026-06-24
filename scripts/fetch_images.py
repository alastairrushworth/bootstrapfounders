#!/usr/bin/env python3
"""Fetch podcast cover art (iTunes) + YouTube channel avatars (og:image),
resize to 160px, save into assets/img/<cat>/<slug>.jpg.
Slug logic MUST match app.js slugify()."""
import json, os, re, subprocess, sys, tempfile, time, urllib.parse, urllib.request

ROOT = "/Users/alastairrushworth/Documents/GitHub/bootstrapfounders"
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

def get(url, headers=None):
    # Use curl (system cert store) to avoid Python's missing CA bundle.
    cmd = ["curl", "-sL", "--max-time", "30", "-A", UA]
    for k, v in (headers or {}).items():
        if k.lower() != "user-agent":
            cmd += ["-H", f"{k}: {v}"]
    cmd.append(url)
    p = subprocess.run(cmd, capture_output=True)
    if p.returncode != 0:
        raise RuntimeError(f"curl rc={p.returncode}: {p.stderr.decode('utf-8','replace')[:120]}")
    return p.stdout

def save_resized(raw, dest):
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with tempfile.NamedTemporaryFile(suffix=".img", delete=False) as t:
        t.write(raw); tmp = t.name
    # sips: convert to jpeg, max dimension 160
    r = subprocess.run(["sips", "-s", "format", "jpeg", "-Z", "160", tmp, "-o", dest],
                       capture_output=True, text=True)
    os.unlink(tmp)
    if r.returncode != 0:
        raise RuntimeError(r.stderr.strip())
    return os.path.getsize(dest)

# --- podcasts: iTunes Search API ---------------------------------------------
PODCASTS = [
    "Indie Hackers Podcast", "My First Million", "Startups For the Rest of Us",
    "The SaaS Podcast", "The Bootstrapped Founder", "Lenny's Podcast",
    "Acquired", "Build Your SaaS", "Software Social", "How I Built This",
    "The Tim Ferriss Show", "a16z Podcast",
]

def fetch_podcasts():
    print("\n=== PODCASTS (iTunes) ===")
    for name in PODCASTS:
        try:
            q = urllib.parse.urlencode({"media": "podcast", "limit": "1", "term": name})
            data = json.loads(get("https://itunes.apple.com/search?" + q))
            res = data.get("results")
            if not res:
                print(f"  [MISS] {name}: no result"); continue
            art = res[0].get("artworkUrl600") or res[0].get("artworkUrl100")
            matched = res[0].get("collectionName", "?")
            dest = f"{ROOT}/assets/img/podcasts/{slug(name)}.jpg"
            sz = save_resized(get(art), dest)
            print(f"  [OK]  {name:32s} -> {matched[:46]:46s} {sz//1024}KB")
        except Exception as e:
            print(f"  [ERR] {name}: {e}")
        time.sleep(0.3)

# --- youtube: og:image from channel page -------------------------------------
YOUTUBE = {
    "Y Combinator": "https://www.youtube.com/@ycombinator",
    "Starter Story": "https://www.youtube.com/@StarterStory",
    "Greg Isenberg": "https://www.youtube.com/@GregIsenberg",
    "Marc Lou": "https://www.youtube.com/@marclou",
    "Simon Høiberg": "https://www.youtube.com/@SimonHoiberg",
    "Noah Kagan": "https://www.youtube.com/@noahkagan",
    "Ali Abdaal": "https://www.youtube.com/@aliabdaal",
    "The Futur": "https://www.youtube.com/@thefutur",
    "Fireship": "https://www.youtube.com/@Fireship",
}

OG = re.compile(r'<meta\s+property="og:image"\s+content="([^"]+)"')

def fetch_youtube():
    print("\n=== YOUTUBE (og:image) ===")
    for name, url in YOUTUBE.items():
        try:
            html = get(url, {"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9"}).decode("utf-8", "replace")
            m = OG.search(html)
            if not m:
                print(f"  [MISS] {name}: no og:image"); continue
            img = m.group(1).replace("&amp;", "&")
            dest = f"{ROOT}/assets/img/youtube/{slug(name)}.jpg"
            sz = save_resized(get(img), dest)
            print(f"  [OK]  {name:18s} -> {sz//1024}KB  ({img[:50]}...)")
        except Exception as e:
            print(f"  [ERR] {name}: {e}")
        time.sleep(0.3)

if __name__ == "__main__":
    fetch_podcasts()
    fetch_youtube()
    print("\nslugs (verify match app.js):")
    for n in PODCASTS: print(f"  podcasts/{slug(n)}.jpg")
    for n in YOUTUBE:  print(f"  youtube/{slug(n)}.jpg")
