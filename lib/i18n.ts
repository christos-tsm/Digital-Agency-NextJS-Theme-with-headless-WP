import { locales, type Locale, defaultLocale } from "@/types/locale";

export function isValidLocale(locale: string): locale is Locale {
    return locales.includes(locale as Locale);
}

export function getLocaleName(locale: Locale): string {
    const names: Record<Locale, string> = {
        el: "EL",
        en: "EN",
    };
    return names[locale];
}

export function getAlternateLocale(currentLocale: Locale): Locale {
    return currentLocale === 'el' ? 'en' : 'el';
}
