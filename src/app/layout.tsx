import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://линзер.рф"),
  title:
    "ЛИНЗЕР — проектирование и монтаж фасадов и остекления зданий | Владивосток",
  description:
    "ЛИНЗЕР — навесные вентилируемые фасады, светопрозрачные конструкции и витражи для высотного строительства. С 2008 года, более 70 объектов на Дальнем Востоке. Собственное производство и монтаж.",
  openGraph: {
    title: "ЛИНЗЕР — фасады и остекление зданий",
    description:
      "Навесные вентилируемые фасады, светопрозрачные конструкции, витражи. С 2008 года, более 70 объектов. Владивосток — Хабаровск — Находка.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E1A24",
};

// ID счётчика Яндекс.Метрики — задаётся через переменную окружения NEXT_PUBLIC_YM_ID
const YM_ID = process.env.NEXT_PUBLIC_YM_ID;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>
        {children}

        {/* ── Яндекс.Метрика ── */}
        {YM_ID && (
          <>
            <Script id="yandex-metrika" strategy="afterInteractive">
              {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${YM_ID}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });`}
            </Script>
            <noscript>
              <div>
                <img
                  src={`https://mc.yandex.ru/watch/${YM_ID}`}
                  style={{ position: "absolute", left: "-9999px" }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
