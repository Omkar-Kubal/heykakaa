"use client";

import { useEffect, useRef } from "react";

export function PatternWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.clearRect(0, 0, width, height);

      const spacing = 14;
      for (let y = 8; y < height; y += spacing) {
        for (let x = 8; x < width; x += spacing) {
          const firstWave = Math.sin(x * 0.0064 + y * 0.0067);
          const secondWave = Math.sin(x * 0.0042 - y * 0.0092);
          const rightGlow = Math.max(0, (x / width - 0.36) * 1.15);
          const bottomGlow = Math.max(0, (y / height - 0.53) * 0.6);
          const wave = Math.max(0, (firstWave + secondWave + 1.3) / 3.3);
          const opacity = Math.min(0.68, 0.06 + wave * (0.18 + rightGlow + bottomGlow));
          const arm = 2.2 + 1.8 * wave;
          context.strokeStyle = `rgba(48, 128, 255, ${opacity})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(x - arm, y);
          context.lineTo(x + arm, y);
          context.moveTo(x, y - arm);
          context.lineTo(x, y + arm);
          context.stroke();
        }
      }
    };

    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    draw();
    return () => observer.disconnect();
  }, []);

  return <canvas ref={canvasRef} className="hk-pattern" aria-hidden="true" />;
}
