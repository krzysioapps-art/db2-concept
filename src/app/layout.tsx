import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { manrope } from "./fonts";

import "./globals.css";

import { ProjectNavigationLoader } from "@/components/project-navigation-loader";

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
        <ProjectNavigationLoader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}