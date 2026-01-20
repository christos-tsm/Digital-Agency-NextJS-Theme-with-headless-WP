'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLocaleName } from '@/lib/i18n';
import { locales, type Locale } from '@/middleware';
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
    currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
    const pathname = usePathname();

    // Remove current locale from pathname to get base path
    // /el/about -> /about, /en/about -> /about
    const basePath = pathname.replace(/^\/(el|en)/, '') || '/';

    return (
        <div className="flex gap-2">
            {locales.map((locale) => {
                const isActive = locale === currentLocale;
                // Greek (el) uses root path, English uses /en/ prefix
                const href = locale === 'el' ? basePath : `/en/${basePath}`;

                return (
                    !isActive &&
                    <Link href={href} key={locale} className="flex items-center gap-1 text-sm font-bold text-white hover:text-primary transition-colors duration-300">
                        <Globe />
                        {getLocaleName(locale)}
                    </Link>
                );
            })}
        </div>
    );
}
