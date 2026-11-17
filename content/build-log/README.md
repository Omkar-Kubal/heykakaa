# Build Log entries

Store the series introduction in `introduction.md` and each numbered update in
its own `day-NN.md` file. Publishing an entry requires only changing its
`status` from `draft` to `published` and deploying the site. Use the real
publication date and approved article text; draft entries never appear on the
public index, sitemap, or article routes. The introduction uses
`/build-log/introduction`; numbered days use `/build-log/day-N`.

Introduction frontmatter:

```yaml
---
kind: introduction
series: "Documenting the process"
title: "Introduction: Not Day 1 Yet"
date: 2026-11-13
summary: "One sentence for the timeline and share preview."
reel_url: "https://www.instagram.com/reel/REEL_ID/"
cover_image: "/assets/optional-cover.webp"
cover_alt: "Describe the visible cover."
cover_width: 1080
cover_height: 1920
tags: []
status: draft
---
```

Numbered day frontmatter:

```yaml
---
day: 1
series: "Documenting the process"
title: "Your approved title"
date: 2026-11-14
summary: "One sentence for the timeline and share preview."
reel_url: "https://www.instagram.com/reel/REEL_ID/"
cover_image: "/assets/optional-cover.webp"
cover_alt: "Describe the visible cover."
cover_width: 1080
cover_height: 1920
tags: [android, build-in-public]
status: draft
---
```

Cover fields are optional as a group. If a cover is used, add all four fields,
put the image in `public/assets/`, and use its actual pixel width and height.

The body must contain these level-two headings in order:

1. Goal today
2. What I did
3. Decisions + why
4. Docs / assets
5. Learnings / blockers + Tomorrow
