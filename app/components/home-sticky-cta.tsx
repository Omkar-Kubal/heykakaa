"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { androidApps } from "@/lib/android-apps";
import { PlayStoreLink } from "./play-store-link";

export function HomeStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("#hero");
    if (!hero) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(hero.getBoundingClientRect().bottom <= 0);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0.05 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <aside className={`hk-mobile-sticky-cta${visible ? " is-visible" : ""}`} aria-hidden={!visible} inert={!visible}>
      <PlayStoreLink appName="SyncSpend" href={androidApps.syncspend.playUrl} className="hk-primary-button" tabIndex={visible ? 0 : -1}>
        Get SyncSpend on Google Play <ArrowUpRight aria-hidden="true" size={16} />
      </PlayStoreLink>
    </aside>
  );
}
