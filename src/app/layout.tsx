import type { Metadata } from "next";
import { Space_Grotesk, Inter_Tight } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const display = Space_Grotesk({
  variable: "--f-display",
  subsets: ["latin"],
});

const sans = Inter_Tight({
  variable: "--f-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOIR — coffee · breakfast · slow mornings",
  description:
    "A small coffee place in Warsaw. Espresso, pastries and long mornings. Open every day 08:00 — 22:00.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} antialiased`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-dvh font-sans">
        <Script id="noir-theme" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem("noir-theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","light")}})();`}
        </Script>
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <Cursor />
          <div className="grain" aria-hidden="true" />
        </ThemeProvider>
      </body>
    </html>
  );
}
