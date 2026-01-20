'use client';

import { useParams } from 'next/navigation';
import { type Locale, locales, defaultLocale } from '@/middleware';

/**
 * Custom hook to get the current locale
 * Works in client components by reading from URL params
 * @returns The current locale ('el' or 'en')
 */
export function useLocale(): Locale {
    const params = useParams();
    const locale = params?.locale as string;

    if (locale && locales.includes(locale as Locale)) {
        return locale as Locale;
    }

    return defaultLocale;
}
