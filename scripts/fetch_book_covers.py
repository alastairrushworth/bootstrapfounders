#!/usr/bin/env python3
"""Fetch book cover art from Open Library and bundle it locally as
assets/img/books/<slug>.jpg (portrait, max 160px tall).

Source cascade per title:
  1. Open Library search.json (title + author) -> cover_i -> covers.openlibrary.org
Indie/self-published titles are often missing or wrong in Open Library; those
degrade gracefully to a plain row (app.js removes a broken <img> on error), so
review new covers visually before committing them.

Slug logic MUST match app.js slugify(). Requires macOS `sips` + `curl`.
"""
import json, os, re, subprocess, tempfile, time, urllib.parse

ROOT = "/Users/alastairrushworth/Documents/GitHub/bootstrapfounders"
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

# (display name -> exact data.js `name`; search title; search author)
BOOKS = [
    ("The Mom Test", "The Mom Test", "Rob Fitzpatrick"),
    ("The Lean Startup", "The Lean Startup", "Eric Ries"),
    ("Traction", "Traction", "Gabriel Weinberg"),
    ("Zero to Sold", "Zero to Sold", "Arvid Kahl"),
    ("The Embedded Entrepreneur", "The Embedded Entrepreneur", "Arvid Kahl"),
    ("MAKE", "MAKE Bootstrapper's Handbook", "Pieter Levels"),
    ("Start Small, Stay Small", "Start Small, Stay Small", "Rob Walling"),
    ("Zero to One", "Zero to One", "Peter Thiel"),
    ("Obviously Awesome", "Obviously Awesome", "April Dunford"),
    ("Hooked", "Hooked How to Build Habit-Forming Products", "Nir Eyal"),
    ("The Minimalist Entrepreneur", "The Minimalist Entrepreneur", "Sahil Lavingia"),
    ("Company of One", "Company of One", "Paul Jarvis"),
    ("The $100 Startup", "The $100 Startup", "Chris Guillebeau"),
    ("The Personal MBA", "The Personal MBA", "Josh Kaufman"),
    ("This Is Marketing", "This Is Marketing", "Seth Godin"),
    ("Founders at Work", "Founders at Work", "Jessica Livingston"),
    ("Rework", "Rework", "Jason Fried"),
    ("The SaaS Playbook", "The SaaS Playbook", "Rob Walling"),
    ("Deploy Empathy", "Deploy Empathy", "Michele Hansen"),
    ("$100M Offers", "$100M Offers", "Alex Hormozi"),
    ("Anything You Want", "Anything You Want", "Derek Sivers"),
    ("Million Dollar Weekend", "Million Dollar Weekend", "Noah Kagan"),
    ("Influence", "Influence The Psychology of Persuasion", "Robert Cialdini"),
    ("Don't Make Me Think", "Don't Make Me Think", "Steve Krug"),
]


# Open Library has no / wrong cover data for these — leave them cover-less
# (they degrade to a plain row) rather than ship a mismatched scan.
SKIP = {
    "MAKE",                 # Pieter Levels, self-published — not in Open Library
    "Anything You Want",    # OL cover id for this title is a wrong, unrelated scan
}


def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')


def get(url):
    p = subprocess.run(["curl", "-sL", "--max-time", "45", "-A", UA, url],
                       capture_output=True)
    if p.returncode != 0:
        raise RuntimeError(f"curl rc={p.returncode}")
    return p.stdout


def save_resized(raw, dest):
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with tempfile.NamedTemporaryFile(suffix=".img", delete=False) as t:
        t.write(raw); tmp = t.name
    r = subprocess.run(["sips", "-s", "format", "jpeg", "-Z", "160", tmp, "-o", dest],
                       capture_output=True, text=True)
    os.unlink(tmp)
    if r.returncode != 0:
        raise RuntimeError(r.stderr.strip())
    return os.path.getsize(dest)


def cover_id(title, author):
    q = urllib.parse.urlencode({
        "title": title, "author": author, "limit": 3,
        "fields": "title,author_name,cover_i",
    })
    d = json.loads(get("https://openlibrary.org/search.json?" + q))
    for doc in d.get("docs", []):
        if doc.get("cover_i"):
            return doc["cover_i"], doc.get("title", "?"), ", ".join(doc.get("author_name", []))
    return None, None, None


def main():
    print("=== BOOK COVERS (Open Library) ===")
    ok = miss = err = 0
    for name, title, author in BOOKS:
        if name in SKIP:
            print(f"  [SKIP] {name:30s} (no reliable cover)"); continue
        try:
            cid, mtitle, mauthor = cover_id(title, author)
            if not cid:
                print(f"  [MISS] {name:30s} no cover"); miss += 1; continue
            raw = get(f"https://covers.openlibrary.org/b/id/{cid}-L.jpg")
            if len(raw) < 1000:   # Open Library returns a tiny blank for missing art
                print(f"  [MISS] {name:30s} blank cover"); miss += 1; continue
            dest = f"{ROOT}/assets/img/books/{slug(name)}.jpg"
            sz = save_resized(raw, dest)
            print(f"  [OK]   {name:30s} -> {mtitle[:28]:28s} / {mauthor[:18]:18s} {sz//1024}KB")
            ok += 1
        except Exception as e:
            print(f"  [ERR]  {name:30s} {e}"); err += 1
        time.sleep(0.5)
    print(f"\n{ok} ok · {miss} missing · {err} errors")


if __name__ == "__main__":
    main()
