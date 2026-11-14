# Build Log entries

Add one `day-NN.md` file per day. Publishing an entry requires only changing
its `status` from `draft` to `published` and deploying the site. Use the real
publication date and approved article text; draft entries never appear on the
public index or day page.

```yaml
---
day: 1
title: "Your approved title"
date: 2026-11-14
summary: "One sentence for the timeline and share preview."
reel_url: "https://www.instagram.com/reel/REEL_ID/"
tags: [android, build-in-public]
status: draft
---
```

The body must contain these level-two headings in order:

1. Goal today
2. What I did
3. Decisions + why
4. Docs / assets
5. Learnings / blockers + Tomorrow
