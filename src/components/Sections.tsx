import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import {
  gates,
  serviceGroups,
  projectGallery,
  portfolioMore,
  production,
  why,
} from "@/content/site";

function SectionHead({
  eyebrow,
  title,
  sub,
  dark,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <p className={`eyebrow ${dark ? "text-accent" : "text-navy-3"}`}>
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          className={`mt-4 text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-[1.08] tracking-tight ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p
            className={`mt-4 text-lg leading-relaxed ${
              dark ? "text-white/70" : "text-muted"
            }`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ░░ Три входа ░░ */
export function Gates() {
  return (
    <section className="bg-navy">
      <div className="container-x pt-16 pb-20">
        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {gates.map((g) => (
            <RevealItem key={g.tag} as="article">
              <a
                href={g.href}
                className="group flex h-full cursor-pointer flex-col rounded-2xl border border-white/10 bg-navy-2 p-7 transition-colors duration-300 hover:border-accent/40"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {g.tag}
                </span>
                <h3 className="mt-3 text-xl font-bold text-white">{g.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/65">
                  {g.text}
                </p>
                <span className="mt-5 text-sm font-semibold text-white transition-colors group-hover:text-accent">
                  {g.action} →
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ░░ Услуги ░░ */
export function Services() {
  return (
    <section id="services" className="bg-white py-24">
      <div className="container-x">
        <SectionHead
          eyebrow="Что мы делаем"
          title="Семь направлений — полный цикл по каждому"
          sub="От проектирования и расчётов до изготовления на собственном производстве и монтажа на высоте."
        />

        {serviceGroups.map((group) => (
          <div key={group.id} className="mt-14">
            <Reveal>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px flex-1 bg-line" />
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  {group.label}
                </span>
                <span className="h-px flex-1 bg-line" />
              </div>
            </Reveal>
            <RevealGroup
              className={`grid gap-6 sm:grid-cols-2 ${
                group.items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
              }`}
            >
              {group.items.map((s) => (
                <RevealItem key={s.num} as="article">
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper-soft transition-shadow duration-300 hover:shadow-xl hover:shadow-navy/8">
                    <div className="relative h-48 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.img}
                        alt={s.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                      <span className="absolute bottom-3 left-4 text-3xl font-extrabold text-white/30 leading-none">
                        {s.num}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-base font-bold leading-snug text-ink">
                        {s.title}
                      </h3>
                      <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
                        {s.text}
                      </p>
                      <ul className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
                        {s.points.map((p) => (
                          <li
                            key={p}
                            className="flex items-start gap-2 text-sm text-ink"
                          >
                            <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ░░ Портфолио ░░ */
export function Portfolio() {
  return (
    <section id="portfolio" className="bg-navy py-24">
      <div className="container-x">
        <SectionHead
          dark
          eyebrow="Реализованные объекты"
          title="Более 70 объектов с 2008 года"
          sub="Жилые комплексы, торговые центры, гостиницы и промышленные здания во Владивостоке, Хабаровске и Находке."
        />

        <div className="mt-12 grid grid-cols-3 gap-1.5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {projectGallery.map((src, i) => (
            <div
              key={src}
              className="group relative overflow-hidden rounded-lg"
              style={{ paddingBottom: "75%" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Объект ${i + 1}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/30" />
            </div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col items-start gap-5 rounded-2xl border border-white/10 bg-navy-2 p-7 md:flex-row md:items-center md:justify-between">
            <span className="max-w-2xl text-[15px] leading-relaxed text-white/70">
              {portfolioMore}
            </span>
            <a
              href="#contacts"
              className="shrink-0 cursor-pointer rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-navy transition-colors duration-200 hover:bg-accent-d"
            >
              Обсудить ваш объект
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ░░ Производство ░░ */
export function Production() {
  return (
    <section id="production" className="bg-white py-24">
      <div className="container-x">
        <SectionHead
          eyebrow="Собственное производство"
          title="Делаем сами — от заготовки до монтажа"
          sub="Не посредники. Комплекс из четырёх цехов и собственная монтажная техника — это контроль качества и сроков на каждом этапе."
        />
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {production.map((p, i) => (
            <RevealItem key={p.title} as="div">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-paper-soft p-6">
                <span className="text-sm font-bold text-accent-d">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-base font-bold leading-snug text-ink">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {p.text}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ░░ Почему мы ░░ */
export function Why() {
  return (
    <section id="why" className="bg-navy py-24">
      <div className="container-x">
        <SectionHead
          dark
          eyebrow="Почему застройщики выбирают ЛИНЗЕР"
          title="Закрываем главные риски фасадного подряда"
        />
        <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {why.map((w) => (
            <RevealItem key={w.title} as="div">
              <div className="h-full bg-navy p-7 transition-colors duration-300 hover:bg-navy-2">
                <h3 className="text-lg font-bold text-white">{w.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65">
                  {w.text}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
