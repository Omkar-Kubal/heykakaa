"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

export function CopyCodeBlock({ children }: { children: ReactNode }) {
  const block = useRef<HTMLDivElement>(null);
  const resetTimer = useRef<number | null>(null);
  const [status, setStatus] = useState<"copied" | "error" | null>(null);

  useEffect(() => () => {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
  }, []);

  const copyCode = async () => {
    const code = block.current?.querySelector("code")?.innerText;
    if (!code || !navigator.clipboard?.writeText) {
      setStatus("error");
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setStatus("copied");
    } catch {
      setStatus("error");
    }

    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setStatus(null), 2000);
  };

  return (
    <div className="hk-code-block" ref={block}>
      <button className="hk-code-copy" type="button" onClick={copyCode}>
        {status === "copied" ? <Check aria-hidden="true" size={14} /> : <Copy aria-hidden="true" size={14} />}
        {status === "copied" ? "Copied" : "Copy code"}
      </button>
      <pre>{children}</pre>
      <span className="hk-visually-hidden" aria-live="polite">{status === "copied" ? "Copied code to clipboard." : status === "error" ? "Could not copy code." : ""}</span>
    </div>
  );
}
