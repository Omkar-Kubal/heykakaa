"use client";

import { useEffect, useRef, useState } from "react";

export function CountUpNumber({ value, suffix }: { value: number; suffix: string }) {
  const element = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const target = element.current;
    if (!target) return;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      setDisplayValue(value);
      return;
    }

    setDisplayValue(0);
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(target);
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / 1200, 1);
        setDisplayValue(Math.round(value * progress));
        if (progress < 1) frame = window.requestAnimationFrame(animate);
      };
      frame = window.requestAnimationFrame(animate);
    }, { threshold: 0.15 });

    observer.observe(target);
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={element} className="hk-count-up" aria-label={`${value}${suffix}`}>{displayValue}{suffix}</span>;
}
