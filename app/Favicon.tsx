"use client";

import { useEffect } from "react";

const SIZE = 64;
const FRAMES = 30;
const FPS = 20;

// Браузеры не анимируют фавиконки сами, поэтому кадры из спрайта подставляются в <link rel="icon"> по таймеру.
// Статичный запасной вариант — app/icon.png (первый кадр).
export default function Favicon() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval>;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = SIZE;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const frames = Array.from({ length: FRAMES }, (_, i) => {
        ctx.clearRect(0, 0, SIZE, SIZE);
        ctx.drawImage(img, -i * SIZE, 0);
        return canvas.toDataURL();
      });
      let i = 0;
      timer = setInterval(() => {
        i = (i + 1) % FRAMES;
        for (const link of document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]')) link.href = frames[i];
      }, 1000 / FPS);
    };
    img.src = "/favicon-sprite.png";
    return () => clearInterval(timer);
  }, []);
  return null;
}
