"use client";

import { useEffect, useRef } from "react";

// Реклама: играет со звуком, пока видна, и замолкает, когда уезжает за экран.
// Браузер не даёт звук без жеста (скролл жестом не считается) — тогда стартуем
// без звука и включаем его на первом клике/клавише. Клик по ролику — вкл/выкл звук.
// Ссылка a[href="#ad"] запускает ролик прямо в клике, не дожидаясь доскролла:
// Safari разрешает звук только если play() вызван внутри жеста.
export default function AdVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current!;
    let visible = false;
    let userMuted = false;

    const play = () => {
      v.muted = userMuted;
      v.play().catch(() => {
        v.muted = true;
        v.play().catch(() => {});
      });
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) play();
        else v.pause();
      },
      { threshold: 0.5 },
    );
    io.observe(v);

    const onGesture = (e: Event) => {
      const bait = e.target instanceof Element && e.target.closest('a[href="#ad"]');
      if (e.target === v) userMuted = !v.muted;
      v.muted = userMuted;
      if ((visible || bait) && v.paused) play();
    };
    addEventListener("click", onGesture);
    addEventListener("keydown", onGesture);

    return () => {
      io.disconnect();
      removeEventListener("click", onGesture);
      removeEventListener("keydown", onGesture);
    };
  }, []);

  return <video ref={ref} id="ad" src="/gentra-fx/ad.mp4" poster="/gentra-fx/ad-poster.jpg" width={1440} height={1080} loop playsInline />;
}
