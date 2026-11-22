"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { shouldStartNavigationTransition } from "@/lib/navigation-motion";

function getMotionVariant(pathname: string) {
  if (pathname === "/" || pathname === "/projects") return "collection";
  if (pathname.startsWith("/projects/syncspend")) return "spend";
  if (pathname.startsWith("/projects/synctasks")) return "tasks";
  if (pathname === "/contact") return "contact";
  if (pathname === "/roadmap") return "roadmap";
  if (pathname.startsWith("/build-log/") || pathname.startsWith("/guides/")) return "article";
  return "build";
}

const revealTargets = [
  "main > section",
  "main > .hk-log-intro",
  "main > .hk-build-timeline > li",
  "main > .hk-contact-intro",
  "main > .hk-contact-grid",
  "main.hk-roadmap-page > *",
  "main > article > .hk-article-header",
  "main > article > .hk-article-end",
  "main > article > .hk-article-nav",
].join(", ");

export function SiteMotion() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const previousPath = useRef<string | null>(null);
  const transitionTimer = useRef<number | null>(null);
  const variant = getMotionVariant(pathname);

  useEffect(() => {
    const root = document.documentElement;
    const previous = previousPath.current;
    previousPath.current = pathname;
    root.dataset.motionVariant = variant;
    root.classList.add("hk-route-arriving");

    const arrivalTimer = window.setTimeout(() => {
      root.classList.remove("hk-route-arriving");
    }, 340);

    if (previous !== null && previous !== pathname) {
      setIsTransitioning(true);
      if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
      transitionTimer.current = window.setTimeout(() => setIsTransitioning(false), 100);
    }

    return () => window.clearTimeout(arrivalTimer);
  }, [pathname, variant]);

  useEffect(() => {
    const startTransition = () => {
      setIsTransitioning(true);
      if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
      transitionTimer.current = window.setTimeout(() => setIsTransitioning(false), 500);
    };

    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest("a");
      if (!anchor) return;

      if (shouldStartNavigationTransition({
        href: anchor.href || null,
        currentHref: window.location.href,
        target: anchor.getAttribute("target"),
        hasDownload: anchor.hasAttribute("download"),
        button: event.button,
        defaultPrevented: event.defaultPrevented,
        metaKey: event.metaKey,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
      })) {
        startTransition();
      }
    };

    const onPageHistory = () => startTransition();
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) startTransition();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPageHistory);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPageHistory);
      window.removeEventListener("pageshow", onPageShow);
      if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealTargets));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

    for (const element of elements) {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.9) continue;
      element.classList.add("hk-motion-reveal");
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
      for (const element of elements) element.classList.remove("hk-motion-reveal", "is-visible");
    };
  }, [pathname]);

  return (
    <>
      <div className={`hk-motion-art hk-motion-art--${variant}`} aria-hidden="true">
        <svg viewBox="0 0 420 380" focusable="false">
          <g className="hk-motion-task-art">
            <circle className="hk-motion-ring" cx="288" cy="86" r="25" />
            <path className="hk-motion-check" d="m277 86 8 8 16-18" />
            <circle cx="242" cy="154" r="7" />
            <path d="M263 154h83" />
            <circle cx="242" cy="194" r="7" />
            <path d="M263 194h64" />
            <circle cx="242" cy="234" r="7" />
            <path d="M263 234h75" />
          </g>
          <g className="hk-motion-spend-art">
            <path className="hk-motion-chart-grid" d="M68 280h278M68 240h278M68 200h278" />
            <rect className="hk-motion-bar hk-motion-bar-one" x="95" y="219" width="25" height="61" rx="5" />
            <rect className="hk-motion-bar hk-motion-bar-two" x="145" y="190" width="25" height="90" rx="5" />
            <rect className="hk-motion-bar hk-motion-bar-three" x="195" y="211" width="25" height="69" rx="5" />
            <rect className="hk-motion-bar hk-motion-bar-four" x="245" y="156" width="25" height="124" rx="5" />
            <rect className="hk-motion-bar hk-motion-bar-five" x="295" y="174" width="25" height="106" rx="5" />
            <path className="hk-motion-chart-line" d="m99 202 58-37 57 15 58-58 53 13" />
          </g>
        </svg>
      </div>
      <div className={`hk-route-transition${isTransitioning ? " is-active" : ""}`} aria-hidden="true" />
    </>
  );
}
