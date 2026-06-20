import { createElement, type CSSProperties, type ReactNode } from "react";

type Tag = "div" | "section" | "article" | "li" | "span";

/**
 * Scroll-reveal обёртка. Помечает элемент data-reveal — анимацию включает
 * RevealEngine (CSS + IntersectionObserver). Серверный компонент: без JS и
 * для поисковых краулеров контент остаётся видимым (надёжно для SEO).
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** y оставлен для совместимости вызовов; смещение задаётся в CSS */
  y?: number;
  as?: Tag;
}) {
  const style: CSSProperties | undefined =
    delay > 0 ? { transitionDelay: `${delay}s` } : undefined;
  return createElement(
    as,
    { className, style, "data-reveal": "" },
    children,
  );
}

/** Контейнер-сетка. Дети (RevealItem) появляются по мере прокрутки. */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return <div className={className}>{children}</div>;
}

/** Элемент с эффектом появления. */
export function RevealItem({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "article" | "li";
}) {
  const style: CSSProperties | undefined =
    delay > 0 ? { transitionDelay: `${delay}s` } : undefined;
  return createElement(
    as,
    { className, style, "data-reveal": "" },
    children,
  );
}
