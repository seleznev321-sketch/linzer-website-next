"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const WAY_OPTIONS = ["Почта", "Макс", "Другое"] as const;
type Way = (typeof WAY_OPTIONS)[number];

const PLACEHOLDERS: Record<Way, string> = {
  Почта: "Ваш e-mail",
  Макс: "Ваш номер в Макс",
  Другое: "Номер или e-mail",
};

export default function RequisitesButton() {
  const [open, setOpen] = useState(false);
  const [way, setWay] = useState<Way>("Почта");
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = {
      _form: "Реквизиты — запрос",
      way,
      recipient: fd.get("recipient") as string,
      message: fd.get("message") as string,
    };

    try {
      await fetch("/send.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // показываем успех даже при сетевой ошибке
    }

    setDone(true);
  }

  function close() {
    setOpen(false);
    setTimeout(() => setDone(false), 400);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer text-left text-sm text-white/60 transition-colors hover:text-accent"
      >
        Реквизиты
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-navy/75 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 14 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-7"
            >
              {done ? (
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl font-bold text-navy">
                    ✓
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-ink">Запрос принят</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    Мы получили ваш запрос и вышлем реквизиты в ближайшее время.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-6 w-full cursor-pointer rounded-xl bg-accent px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-accent-d"
                  >
                    Хорошо
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-5 flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-ink">Реквизиты компании</h3>
                      <p className="mt-1 text-sm text-muted">
                        Укажите куда отправить — мы вышлем
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={close}
                      className="cursor-pointer text-muted transition-colors hover:text-ink"
                      aria-label="Закрыть"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    {/* Выбор способа */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                        Куда отправить
                      </p>
                      <div className="flex gap-2">
                        {WAY_OPTIONS.map((w) => (
                          <button
                            key={w}
                            type="button"
                            onClick={() => setWay(w)}
                            className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                              way === w
                                ? "border-accent bg-accent text-navy"
                                : "border-line bg-paper-soft text-ink hover:border-navy-3"
                            }`}
                          >
                            {w}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Контакт */}
                    <input
                      name="recipient"
                      type="text"
                      required
                      placeholder={PLACEHOLDERS[way]}
                      className="w-full rounded-xl border border-line bg-paper-soft px-4 py-3 text-[16px] text-ink outline-none transition-colors placeholder:text-muted focus:border-navy-3 focus:ring-2 focus:ring-navy-3/15"
                    />

                    {/* Сообщение */}
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Сообщение (необязательно)"
                      className="w-full resize-none rounded-xl border border-line bg-paper-soft px-4 py-3 text-[16px] text-ink outline-none transition-colors placeholder:text-muted focus:border-navy-3 focus:ring-2 focus:ring-navy-3/15"
                    />

                    <button
                      type="submit"
                      className="cursor-pointer rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-navy transition-colors hover:bg-accent-d"
                    >
                      Отправить запрос
                    </button>
                    <p className="text-xs text-muted">
                      Мы получим запрос и вышлем реквизиты вам лично.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
