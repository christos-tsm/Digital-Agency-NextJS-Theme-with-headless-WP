'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLocaleName } from '@/lib/i18n';
import { locales, type Locale } from '@/types/locale';
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
    currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
    const pathname = usePathname();
    const basePath = pathname.replace(/^\/(el|en)/, '') || '/';

    return (
        <div className="flex gap-2">
            {locales.map((locale) => {
                const isActive = locale === currentLocale;
                if (isActive) return null;

                let href = `/${locale}${basePath}`;

                // Αν είμαστε σε project page, μετατρέπουμε το slug
                if (basePath.startsWith('/projects/')) {
                    const slugMatch = basePath.match(/^\/projects\/(.+)$/);
                    if (slugMatch) {
                        const slug = slugMatch[1];

                        if (locale === 'en') {
                            // Προσθέτουμε -en στο τέλος αν δεν υπάρχει ήδη
                            if (!slug.endsWith('-en')) {
                                href = `/en/projects/${slug}-en`;
                            }
                        } else {
                            // Αφαιρούμε -en από το τέλος αν υπάρχει
                            if (slug.endsWith('-en')) {
                                href = `/el/projects/${slug.replace(/-en$/, '')}`;
                            }
                        }
                    }
                }

                if (basePath.startsWith('/services/')) {
                    const slugMatch = basePath.match(/^\/services\/(.+)$/);
                    if (slugMatch) {
                        const slug = slugMatch[1];

                        if (locale === 'en') {
                            // Προσθέτουμε -en στο τέλος αν δεν υπάρχει ήδη
                            if (!slug.endsWith('-en')) {
                                href = `/en/services/${slug}-en`;
                            }
                        } else {
                            // Αφαιρούμε -en από το τέλος αν υπάρχει
                            if (slug.endsWith('-en')) {
                                href = `/el/services/${slug.replace(/-en$/, '')}`;
                            }
                        }
                    }
                }

                return (
                    <Link href={href} key={locale} className="flex items-center gap-1 text-sm font-bold text-white hover:text-primary transition-colors duration-300">
                        <Globe />
                        {getLocaleName(locale)}
                    </Link>
                );
            })}
        </div>
    );
}
