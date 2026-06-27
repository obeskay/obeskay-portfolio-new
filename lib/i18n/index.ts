import esDict from "./es.json";
import enDict from "./en.json";

export type Lang = "es" | "en";

const dictionaries: Record<Lang, Record<string, string>> = {
  es: esDict as Record<string, string>,
  en: enDict as Record<string, string>,
};

export const SUPPORTED_LANGS: Lang[] = ["es", "en"];
export const DEFAULT_LANG: Lang = "es";

export function isLang(value: string | undefined): value is Lang {
  return value === "es" || value === "en";
}

/**
 * Translate a key for the given language, with simple {var} interpolation.
 * Falls back to the other language if the key is missing in the requested one,
 * and finally to the key itself, so the UI never explodes when content drifts.
 */
export function t(
  lang: Lang,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const dict = dictionaries[lang] ?? dictionaries[DEFAULT_LANG];
  const fallback = dictionaries[DEFAULT_LANG];
  const raw = dict[key] ?? fallback[key] ?? key;

  if (!vars) return raw;

  return raw.replace(/\{(\w+)\}/g, (match, name: string) => {
    const v = vars[name];
    return v === undefined || v === null ? match : String(v);
  });
}
