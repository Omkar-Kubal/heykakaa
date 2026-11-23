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
  ".hk-home-trust-strip > .hk-home-trust-item",
  ".hk-home-app-grid > .hk-home-app-card",
  ".hk-timeline > li",
  ".hk-project-rows > .hk-project-row, .hk-project-rows > .hk-next-project",
  ".hk-log-page > .hk-log-intro",
  ".hk-build-layout",
  ".hk-build-timeline",
  ".hk-roadmap-page > .hk-roadmap-intro",
  ".hk-roadmap-page > .hk-roadmap-progress",
  ".hk-roadmap-page > .hk-roadmap-columns",
  ".hk-contact-page .hk-contact-intro",
  ".hk-contact-page .hk-contact-grid",
  ".hk-article-page article > .hk-article-header",
  ".hk-article-page > .hk-article-end",
  ".hk-article-page > .hk-article-related",
  ".hk-article-page > .hk-article-nav",
  ".hk-build-timeline > .hk-build-day",
  ".hk-roadmap-column > .hk-roadmap-card",
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
    let frame = 0;
    const updateHeader = () => {
      frame = 0;
      const isScrolled = window.scrollY > 80;
      document.querySelectorAll<HTMLElement>(".hk-header").forEach((header) => {
        header.classList.toggle("is-scrolled", isScrolled);
      });
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const updateVisibility = () => root.classList.toggle("hk-document-hidden", document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

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
    }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });

    for (const element of elements) {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.9) continue;
      const siblingIndex = Array.from(element.parentElement?.children ?? []).indexOf(element);
      element.style.setProperty("--hk-reveal-delay", `${Math.max(0, siblingIndex) * 100}ms`);
      element.classList.add("hk-motion-reveal");
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
      for (const element of elements) {
        element.classList.remove("hk-motion-reveal", "is-visible");
        element.style.removeProperty("--hk-reveal-delay");
      }
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
