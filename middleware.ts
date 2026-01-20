import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Supported languages
export const locales = ['el', 'en'] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'el';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // If pathname already has a locale prefix (el or en), continue as-is
    if (pathname.startsWith('/el/') || pathname === '/el' ||
        pathname.startsWith('/en/') || pathname === '/en') {
        return NextResponse.next();
    }

    // For root path, rewrite to /el (Greek default) without changing URL
    if (pathname === '/') {
        const url = request.nextUrl.clone();
        url.pathname = '/el';
        return NextResponse.rewrite(url);
    }

    // For other paths without locale, rewrite to include locale
    // Check cookie for preference, default to Greek
    const cookieLocale = request.cookies.get('locale')?.value;
    const locale = cookieLocale === 'en' ? 'en' : 'el';

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.rewrite(url);
}

// Helper function to get locale from cookie (used by components)
export function getLocaleFromCookie(request: NextRequest): Locale | null {
    const cookieLocale = request.cookies.get('locale')?.value;
    if (cookieLocale && locales.includes(cookieLocale as Locale)) {
        return cookieLocale as Locale;
    }
    return null;
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|api|favicon.ico|.*\\..*).*)',
    ],
};
