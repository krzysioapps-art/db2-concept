import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { manrope } from "./fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "db2 architekci",
  description:
    "db2 architekci — architektura wynikająca z miejsca, kontekstu i potrzeb.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={manrope.variable}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}