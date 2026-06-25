"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";

export type Field =
  | {
      kind: "input";
      name: string;
      placeholder: string;
      type?: string;
      required?: boolean;
      half?: boolean;
    }
  | {
      kind: "select";
      name: string;
      placeholder: string;
      options: string[];
      half?: boolean;
    }
  | { kind: "textarea"; name: string; placeholder: string; rows?: number };

const baseInput =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[16px] text-ink outline-none transition-colors placeholder:text-muted focus:border-navy-3 focus:ring-2 focus:ring-navy-3/15";

export default function LeadForm({
  formLabel,
  fields,
  submitLabel,
  note,
}: {
  formLabel: string;
  fields: Field[];
  submitLabel: string;
  note?: ReactNode;
}) {
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data: Record<string, string> = { _form: formLabel };
    new FormData(form).forEach((v, k) => (data[k] = String(v)));

    try {
      await fetch("/send.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // показываем успех даже при сетевой ошибке
    }

    form.reset();
    setDone(true);
  }

  // строки: half-поля объединяем в пары
  const rows: Field[][] = [];
  let buf: Field[] = [];
  for (const f of fields) {
    if ("half" in f && f.half) {
      buf.push(f);
      if (buf.length === 2) {
        rows.push(buf);
        buf = [];
      }
    } else {
      if (buf.length) {
        rows.push(buf);
        buf = [];
      }
      rows.push([f]);
    }
  }
  if (buf.length) rows.push(buf);

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3.5 rounded-2xl border border-line bg-paper-soft p-6 md:p-7"
      >
        {rows.map((row, i) => (
          <div
            key={i}
            className={row.length === 2 ? "grid gap-3.5 sm:grid-cols-2" : ""}
          >
            {row.map((f) => {
              if (f.kind === "textarea") {
                return (
                  <textarea
                    key={f.name}
                    name={f.name}
                    rows={f.rows ?? 3}
                    placeholder={f.placeholder}
                    className={`${baseInput} resize-none`}
                  />
                );
              }
              if (f.kind === "select") {
                return (
                  <select
                    key={f.name}
                    name={f.name}
                    defaultValue=""
                    className={`${baseInput} cursor-pointer`}
                  >
                    <option value="" disabled>
                      {f.placeholder}
                    </option>
                    {f.options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                );
              }
              return (
                <input
                  key={f.name}
                  name={f.name}
                  type={f.type ?? "text"}
                  required={f.required}
                  placeholder={f.placeholder}
                  className={baseInput}
                />
              );
            })}
          </div>
        ))}

        <button
          type="submit"
          className="mt-1 cursor-pointer rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-navy transition-colors duration-200 hover:bg-accent-d"
        >
          {submitLabel}
        </button>
        {note && <p className="text-xs leading-relaxed text-muted">{note}</p>}
      </form>

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDone(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/70 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-white p-8 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl font-bold text-navy">
                ✓
              </div>
              <h3 className="mt-5 text-xl font-bold text-ink">Заявка отправлена</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                Спасибо! Мы свяжемся с вами в ближайшее рабочее время.
              </p>
              <button
                type="button"
                onClick={() => setDone(false)}
                className="mt-6 w-full cursor-pointer rounded-xl bg-accent px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-accent-d"
              >
                Хорошо
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
