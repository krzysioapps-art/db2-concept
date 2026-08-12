import type { Language } from "./translations";

export function getLanguageFromPath(
  pathname: string
): Language {
  return pathname === "/en" ||
    pathname.startsWith("/en/")
    ? "en"
    : "pl";
}

export function getLanguagePrefix(
  language: Language
) {
  return language === "en" ? "/en" : "";
}

export function localizedPath(
  path: string,
  language: Language
) {
  const cleanPath =
    path === "/" ? "" : path;

  return `${getLanguagePrefix(language)}${cleanPath || "/"}`;
}