"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useRef } from "react";
import { hero, company } from "@/content/site";

/**
 * Блок 1 — главный экран (эффект «Вау»).
 * Фирменные приёмы брендбука «Икра»: монохромное фото-флагман (Аквамарин),
 * текстура-«миллиметровка» `+`, заголовок «собирается» по буквам (логотип 4×4),
 * подсветка-спотлайт сетки под курсором. Один акцентный цвет (голубой) + ч/б.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, reduce ? 1.06 : 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Спотлайт под курсором — двигаем CSS-переменные напрямую (без ре-рендера).
  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduce || !spotRef.current || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      spotRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
      spotRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
      spotRef.current.style.opacity = "1";
    },
    [reduce],
  );
  const onLeave = useCallback(() => {
    if (spotRef.current) spotRef.current.style.opacity = "0";
  }, []);

  // Счётчик задержки для побуквенной анимации заголовка.
  let li = 0;

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-navy"
    >
      {/* Фон — фото-флагман с лёгким параллаксом и наездом */}
      <motion.div
        aria-hidden
        style={{ y: bgY, scale: bgScale, backgroundImage: `url('${hero.image}')` }}
        className="absolute inset-0 bg-cover bg-center [filter:grayscale(0.35)_contrast(1.05)]"
      />
      {/* Тонировка под фирменный сине-стальной монохром */}
      <div className="absolute inset-0 bg-[#0e1a24] mix-blend-color opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/55 to-transparent" />

      {/* Текстура-миллиметровка */}
      <div className="grid-mm absolute inset-0 opacity-[0.10]" aria-hidden />
      {/* Спотлайт: подсветка сетки под курсором */}
      <div
        ref={spotRef}
        aria-hidden
        className="grid-mm absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          WebkitMaskImage:
            "radial-gradient(220px at var(--mx) var(--my), #000 0%, transparent 70%)",
          maskImage:
            "radial-gradient(220px at var(--mx) var(--my), #000 0%, transparent 70%)",
        }}
      />

      {/* Контент */}
      <motion.div style={{ opacity: fade }} className="container-x relative z-10 py-20">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rotate-45 bg-accent" aria-hidden />
          <p className="eyebrow text-accent">{hero.eyebrow}</p>
        </div>

        {/* Заголовок «по сетке» — буквы собираются из ячеек */}
        <h1 className="relative mt-5 max-w-4xl text-[clamp(2.1rem,6vw,4.6rem)] font-extrabold uppercase leading-[1.0] tracking-[-0.01em] text-white">
          {/* Призрачная сетка 4×4 за заголовком */}
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-x-2 -inset-y-4 -z-10 hidden opacity-[0.07] sm:block"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
              backgroundSize: "25% 33.33%",
            }}
          />
          {hero.titleLines.map((line, i) => {
            const accent = line === hero.accentWord;
            return (
              <span key={i} className="block">
                {Array.from(line).map((ch, j) => (
                  <span
                    key={j}
                    className={`letter ${accent ? "text-accent" : ""}`}
                    style={{ animationDelay: `${0.15 + li++ * 0.03}s` }}
                  >
                    {ch === " " ? " " : ch}
                  </span>
                ))}
              </span>
            );
          })}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg"
        >
          {hero.lead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.82, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-9 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4"
        >
          {hero.stats.map((s) => (
            <div key={s.lbl} className="glass rounded-2xl px-4 py-5">
              <div className="text-3xl font-extrabold text-accent md:text-4xl">
                {s.num}
              </div>
              <div className="mt-1 text-xs leading-snug text-white/70 md:text-sm">
                {s.lbl}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.94, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#lead-form"
            className="cursor-pointer rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-navy transition-colors duration-200 hover:bg-accent-d"
          >
            Рассчитать стоимость работ
          </a>
          <a
            href="#callback"
            className="cursor-pointer rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
          >
            Заказать звонок
          </a>
        </motion.div>

        <p className="mt-8 text-sm font-medium tracking-wide text-white/55">
          {company.geo}
        </p>
      </motion.div>

      {/* Подсказка прокрутки */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-white/30 p-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
