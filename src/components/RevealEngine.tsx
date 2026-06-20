"use client";

import { useEffect } from "react";

/**
 * Включает scroll-reveal: ставит на <html> класс reveal-ready (после чего
 * CSS прячет непоявившиеся блоки) и через IntersectionObserver добавляет .in
 * элементам с data-reveal по мере прокрутки. Однократно на каждый элемент.
 *
 * Без JS / при ?nofx=1 / prefers-reduced-motion контент остаётся видимым.
 */
export default function RevealEngine() {
  useEffect(() => {
    if (/[?&]nofx=1/.test(window.location.search)) return;

    const root = document.documentElement;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    root.classList.add("reveal-ready");
    if (reduce) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    els.forEach((el) => {
      // Элементы, уже видимые при загрузке, показываем сразу
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) el.classList.add("in");
      else io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
