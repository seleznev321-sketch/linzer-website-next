"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { proof } from "@/content/site";

/**
 * Блок 2 — «мы справимся». Закреплённая (pinned) горизонтальная лента
 * реальных объектов: пока крутишь страницу вниз — карточки едут вбок.
 * Слева «прилипшая» крупная цифра «17», которая досчитывается при появлении.
 * При prefers-reduced-motion — обычная горизонтальная прокрутка без закрепления.
 */
export default function ObjectsScroll() {
  // NEXT_PUBLIC_OBJ_STATIC=1 — принудительно простая (нескролл-зависимая)
  // раскладка ленты. Используется как доступная версия и для проверки контента.
  const forceStatic = process.env.NEXT_PUBLIC_OBJ_STATIC === "1";
  const reduce = useReducedMotion() || forceStatic;
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  // Высота-«разгон»: чем длиннее лента, тем больше прокрутки до её конца.
  // Считаем в эффекте (не в рендере) — иначе window недоступен при сборке.
  const [wrapHeight, setWrapHeight] = useState<string | undefined>(undefined);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const d = Math.max(0, track.scrollWidth - window.innerWidth);
      setDist(d);
      setWrapHeight(`${110 + (d / window.innerHeight) * 95}vh`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const xSmooth = useSpring(x, { stiffness: 120, damping: 28, mass: 0.4 });

  if (reduce) {
    // Доступная версия: статичный заголовок + горизонтальный скролл пальцем/мышью
    return (
      <section id="objects" className="bg-navy py-20 text-white">
        <Header />
        <div className="no-bar mt-10 flex snap-x gap-5 overflow-x-auto px-5 pb-4">
          {proof.objects.map((o) => (
            <Card key={o.title} {...o} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="objects"
      ref={wrapRef}
      className="relative bg-navy text-white"
      style={{ height: wrapHeight }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        {/* Текстура-миллиметровка фоном */}
        <div className="grid-mm pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />

        <div className="relative z-10">
          <Header />
        </div>

        {/* Горизонтальная лента */}
        <motion.div
          ref={trackRef}
          style={{ x: xSmooth }}
          className="mt-8 flex gap-5 pl-[6vw] pr-[6vw] will-change-transform sm:gap-6"
        >
          {proof.objects.map((o) => (
            <Card key={o.title} {...o} />
          ))}
          <EndCard />
        </motion.div>
      </div>
    </section>
  );
}

/* ── Заголовок блока с досчётом «17» ── */
function Header() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * proof.years));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div ref={ref} className="container-x">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent">{proof.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-tight">
            {proof.titleLines.map((l, i) => (
              <span key={i} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
            {proof.lead}
          </p>
        </div>

        <div className="flex shrink-0 items-end gap-3">
          <span className="text-[clamp(4rem,12vw,9rem)] font-extrabold leading-[0.8] text-accent">
            {n}
          </span>
          <span className="mb-2 text-sm font-semibold uppercase leading-tight tracking-wide text-white/70">
            лет
            <br />
            на рынке
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Карточка объекта ── */
function Card({ title, meta, img }: { title: string; meta: string; img: string }) {
  return (
    <article className="group relative h-[58vh] max-h-[560px] w-[80vw] shrink-0 snap-start overflow-hidden rounded-3xl sm:w-[420px]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 [filter:grayscale(0.25)] group-hover:scale-105 group-hover:[filter:grayscale(0)]"
        style={{ backgroundImage: `url('${img}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
      {/* Уголок-миллиметровка как фирменная метка */}
      <div className="grid-mm pointer-events-none absolute right-0 top-0 h-24 w-24 opacity-20" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="mb-2 h-1 w-10 bg-accent" />
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-1 text-sm text-white/70">{meta}</p>
      </div>
    </article>
  );
}

/* ── Финальная карточка-призыв ── */
function EndCard() {
  return (
    <article className="flex h-[58vh] max-h-[560px] w-[80vw] shrink-0 snap-start flex-col justify-center rounded-3xl border border-white/10 bg-navy-2 p-8 sm:w-[420px]">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        и ещё 50+ объектов
      </p>
      <h3 className="mt-3 text-2xl font-extrabold leading-tight">
        Ваш объект может быть следующим
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        Пришлите чертежи или ТЗ — рассчитаем фасад, сроки и стоимость.
      </p>
      <a
        href="#contacts"
        className="mt-6 inline-flex w-fit cursor-pointer rounded-full bg-accent px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-accent-d"
      >
        Рассчитать стоимость
      </a>
    </article>
  );
}
