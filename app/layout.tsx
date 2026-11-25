import type { Metadata } from "next";
import localFont from "next/font/local";
import Favicon from "./Favicon";
import "./globals.css";

// Тот же шрифт, что в плагине (ParaType Free Font License).
const ptSans = localFont({ src: "./fonts/PTSansNarrow-Bold.ttf", variable: "--font-pt", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sauce.emeel.fyi"),
  title: { default: "secret sauce", template: "%s — secret sauce" },
  description: "плагины secret sauce. соус секретный, плагины — нет.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={ptSans.variable}>
      <body>
        {children}
        <Favicon />
      </body>
    </html>
  );
}
