import Reveal from "@/components/Reveal";
import LeadForm, { type Field } from "@/components/LeadForm";
import { company, supplyTags, vacancies, nav } from "@/content/site";

function FormHead({
  eyebrow,
  title,
  sub,
  dark,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  dark?: boolean;
}) {
  return (
    <div>
      <p className={`eyebrow ${dark ? "text-accent" : "text-navy-3"}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-[clamp(1.7rem,3.5vw,2.6rem)] font-extrabold leading-[1.1] tracking-tight ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 text-lg leading-relaxed ${
          dark ? "text-white/70" : "text-muted"
        }`}
      >
        {sub}
      </p>
    </div>
  );
}

/* ░░ Заявка на расчёт ░░ */
const leadFields: Field[] = [
  { kind: "input", name: "name", placeholder: "Ваше имя", required: true, half: true },
  { kind: "input", name: "phone", type: "tel", placeholder: "Телефон", required: true, half: true },
  { kind: "input", name: "company", placeholder: "Компания (застройщик / генподрядчик)" },
  { kind: "input", name: "object", placeholder: "Объект и адрес" },
  {
    kind: "select",
    name: "worktype",
    placeholder: "Тип работ",
    half: true,
    options: [
      "Навесной вентфасад (НВФ)",
      "Светопрозрачные конструкции (СПК)",
      "Витражи / входные группы",
      "Комплекс работ",
    ],
  },
  { kind: "input", name: "area", placeholder: "Площадь, м² (примерно)", half: true },
  { kind: "textarea", name: "message", placeholder: "Комментарий, сроки, ссылка на проект" },
];

export function LeadFormSection() {
  return (
    <section id="lead-form" className="bg-paper-soft py-24">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <FormHead
            eyebrow="Заказчикам"
            title="Заявка на расчёт стоимости работ"
            sub="Пришлите параметры объекта — подготовим предварительный расчёт и предложение. Если есть проект (АР, чертежи) — приложите, расчёт будет точнее."
          />
          <ul className="mt-7 flex flex-col gap-3">
            {[
              "Ответ в течение рабочего дня",
              "Предварительная оценка — бесплатно",
              "Конфиденциальность данных по объекту",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-[15px] text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-navy">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <LeadForm
            formLabel="Заявка на расчёт"
            fields={leadFields}
            submitLabel="Отправить заявку"
            note="Нажимая кнопку, вы соглашаетесь на обработку персональных данных."
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ░░ Поставщикам ░░ */
const supplierFields: Field[] = [
  { kind: "input", name: "company", placeholder: "Компания", required: true, half: true },
  { kind: "input", name: "contact", placeholder: "Контактное лицо", half: true },
  { kind: "input", name: "phone", type: "tel", placeholder: "Телефон", required: true, half: true },
  { kind: "input", name: "email", type: "email", placeholder: "E-mail", half: true },
  { kind: "input", name: "nomenclature", placeholder: "Что предлагаете (номенклатура)" },
  { kind: "textarea", name: "message", placeholder: "Кратко об условиях, ссылка на прайс / КП" },
];

export function Suppliers() {
  return (
    <section id="suppliers" className="bg-white py-24">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <FormHead
            eyebrow="Поставщикам"
            title="Сотрудничество и закупки"
            sub="Постоянно закупаем материалы для производства и монтажа. Если вы поставщик — пришлите коммерческое предложение через одно окно, мы рассмотрим и ответим."
          />
          <div className="mt-7 flex flex-wrap gap-2.5">
            {supplyTags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-paper-soft px-4 py-2 text-sm text-ink"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <LeadForm
            formLabel="КП от поставщика"
            fields={supplierFields}
            submitLabel="Отправить КП"
            note="Файлы прайса/КП пришлём запросом на почту после первичной заявки."
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ░░ Вакансии ░░ */
const resumeFields: Field[] = [
  { kind: "input", name: "name", placeholder: "ФИО", required: true, half: true },
  { kind: "input", name: "phone", type: "tel", placeholder: "Телефон", required: true, half: true },
  { kind: "input", name: "position", placeholder: "Желаемая должность", required: true },
  { kind: "input", name: "experience", placeholder: "Опыт / ключевые навыки" },
  { kind: "textarea", name: "message", placeholder: "О себе, ссылка на резюме (hh, диск)" },
];

export function Careers() {
  return (
    <section id="careers" className="bg-navy py-24">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <FormHead
            dark
            eyebrow="Работа в ЛИНЗЕР"
            title="Присоединяйтесь к команде"
            sub="Растущее производство и крупные объекты на Дальнем Востоке. Открытые направления:"
          />
          <ul className="mt-7 flex flex-col divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
            {vacancies.map((v) => (
              <li
                key={v.role}
                className="flex flex-col bg-navy-2 px-5 py-4"
              >
                <strong className="text-[15px] font-semibold text-white">
                  {v.role}
                </strong>
                <span className="mt-0.5 text-sm text-white/55">{v.note}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-white/55">
            Не нашли свою позицию? Присылайте резюме — рассмотрим.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <LeadForm
            formLabel="Резюме"
            fields={resumeFields}
            submitLabel="Отправить резюме"
            note="Резюме файлом пришлём запросом на почту после первичной заявки."
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ░░ Контакты ░░ */
const callbackFields: Field[] = [
  { kind: "input", name: "name", placeholder: "Ваше имя", required: true },
  { kind: "input", name: "phone", type: "tel", placeholder: "Телефон", required: true },
];

export function Contacts() {
  const items = [
    { lbl: "Телефон", val: company.phone, href: company.phoneHref },
    { lbl: "E-mail", val: company.email, href: `mailto:${company.email}` },
    { lbl: "Офис", val: company.office },
    { lbl: "География работ", val: company.geo },
  ];
  return (
    <section id="contacts" className="bg-white py-24">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow text-navy-3">Контакты</p>
          <h2 className="mt-4 text-[clamp(1.7rem,3.5vw,2.6rem)] font-extrabold tracking-tight text-ink">
            Связаться с нами
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <dl className="flex flex-col divide-y divide-line overflow-hidden rounded-2xl border border-line">
              {items.map((it) => (
                <div key={it.lbl} className="px-6 py-5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {it.lbl}
                  </dt>
                  <dd className="mt-1.5 text-[15px] font-medium text-ink">
                    {it.href ? (
                      <a
                        href={it.href}
                        className="transition-colors hover:text-navy-3"
                      >
                        {it.val}
                      </a>
                    ) : (
                      it.val
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.08}>
            <div id="callback">
              <h3 className="mb-4 text-xl font-bold text-ink">
                Заказать обратный звонок
              </h3>
              <LeadForm
                formLabel="Обратный звонок"
                fields={callbackFields}
                submitLabel="Перезвоните мне"
                note="Перезвоним в рабочее время."
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ░░ Подвал ░░ */
export function Footer() {
  return (
    <footer className="bg-navy">
      <div className="container-x grid gap-10 py-16 md:grid-cols-3">
        <div>
          <span className="text-lg font-extrabold text-white">
            ЛИНЗЕР<span className="text-accent">®</span>
          </span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">
            Проектирование и монтаж фасадов и остекления зданий. С 2008 года.
          </p>
        </div>
        <nav className="flex flex-col gap-2.5">
          {nav
            .filter((n) => n.href !== "#why")
            .map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-white/60 transition-colors hover:text-accent"
              >
                {n.label}
              </a>
            ))}
        </nav>
        <div className="flex flex-col gap-2.5">
          <a
            href={company.phoneHref}
            className="text-sm font-semibold text-white"
          >
            {company.phone}
          </a>
          <a
            href={`mailto:${company.email}`}
            className="text-sm text-white/60 transition-colors hover:text-accent"
          >
            {company.email}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-sm text-white/45 sm:flex-row">
          <span>© 2008–2026 ЛИНЗЕР. Все права защищены.</span>
          <a href="#top" className="transition-colors hover:text-accent">
            Наверх ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
