import type { Locale } from "@/middleware";

const WP_BASE_URL = process.env.WORDPRESS_URL || '';

/**
 * Get localized path for a given slug and locale
 */
export function getLocalizedPath(slug: string, locale: Locale): string {
    return `/${locale}/${slug}`;
}

/**
 * Get slug from a localized path
 */
export function getSlugFromPath(path: string, locale: Locale): string {
    return path.replace(`/${locale}/`, '');
}

/**
 * Convert WordPress full URL to Next.js relative path
 * 
 * WordPress returns: https://example.com/el/about
 * Next.js needs: /el/about
 * 
 * @param url - Full WordPress URL
 * @param locale - Current locale (used as fallback if URL doesn't have language prefix)
 * @returns Relative path for Next.js routing
 */
export function convertWpUrlToLocalizedPath(url: string, locale: Locale): string {
    if (!url) {
        return locale === 'el' ? '/' : '/en';
    }

    // Remove WordPress base URL if present
    let path = url;
    if (WP_BASE_URL && url.startsWith(WP_BASE_URL)) {
        path = url.replace(WP_BASE_URL, '');
    }

    // Remove protocol and domain if present (http://, https://)
    path = path.replace(/^https?:\/\/[^\/]+/, '');

    // Ensure path starts with /
    if (!path.startsWith('/')) {
        path = '/' + path;
    }

    // If it's already a localized path (starts with /el/ or /en/), return as is
    if (path.startsWith('/el/') || path.startsWith('/en/')) {
        return path;
    }

    // If it's root, return localized root
    if (path === '/' || path === '') {
        return locale === 'el' ? '/' : '/en';
    }

    // If path doesn't have language prefix, extract slug and use getLocalizedPath
    const slug = path.replace(/^\/+/, '');
    return getLocalizedPath(slug, locale);
}
