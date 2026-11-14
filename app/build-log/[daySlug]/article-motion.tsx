"use client";

import { useEffect, useState } from "react";
import { getArticleProgress } from "@/lib/article-progress";

export function ArticleMotion() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.querySelector<HTMLElement>(".hk-article-page article");
    if (!article) return;

    const targets = Array.from(article.querySelectorAll<HTMLElement>(
      ".hk-article-body > h2, .hk-article-body > h3, .hk-article-body > p, .hk-article-body > ul, .hk-article-body > ol, .hk-article-body > blockquote, .hk-article-body > pre, .hk-article-body > table",
    ));
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let observer: IntersectionObserver | undefined;

    if (!prefersReducedMotion && "IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        }
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

      for (const target of targets) {
        target.classList.add("hk-article-reveal");
        if (target.getBoundingClientRect().top < window.innerHeight) {
          target.classList.add("is-visible");
        } else {
          observer.observe(target);
        }
      }
    }

    let frame = 0;
    const updateProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const articleTop = article.getBoundingClientRect().top + window.scrollY;
        const nextProgress = getArticleProgress(window.scrollY, articleTop, article.scrollHeight, window.innerHeight);
        setProgress((current) => current === nextProgress ? current : nextProgress);
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (frame) window.cancelAnimationFrame(frame);
      observer?.disconnect();
      for (const target of targets) target.classList.remove("hk-article-reveal", "is-visible");
    };
  }, []);

  return (
    <div
      className="hk-article-progress"
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-valuetext={`${progress}% read`}
    >
      <span style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
}
