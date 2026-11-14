export type ArticleSection = {
  title: string;
  id: string;
};

export function slugifyArticleHeading(title: string): string {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function stripInlineMarkdown(title: string): string {
  return title
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\\([\\`*_{}\[\]()#+.!|>])/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getArticleSections(markdown: string): ArticleSection[] {
  const sections: ArticleSection[] = [];
  let insideCodeFence = false;

  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      insideCodeFence = !insideCodeFence;
      continue;
    }
    if (insideCodeFence) continue;

    const heading = /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (!heading) continue;

    const title = stripInlineMarkdown(heading[1]);
    const id = slugifyArticleHeading(title) || `section-${sections.length + 1}`;
    sections.push({ title, id });
  }

  return sections;
}

export function getArticleSectionId(sections: ArticleSection[], index: number): string {
  return sections[index]?.id || `section-${index + 1}`;
}

export function getArticleProgress(
  scrollY: number,
  articleTop: number,
  articleHeight: number,
  viewportHeight: number,
): number {
  if (![scrollY, articleTop, articleHeight, viewportHeight].every(Number.isFinite) || articleHeight <= 0 || viewportHeight <= 0) {
    return 0;
  }

  if (articleHeight <= viewportHeight) {
    return scrollY + viewportHeight >= articleTop + articleHeight ? 100 : 0;
  }

  const scrollableDistance = articleHeight - viewportHeight;
  const progress = ((scrollY - articleTop) / scrollableDistance) * 100;
  return Math.round(Math.min(100, Math.max(0, progress)));
}
