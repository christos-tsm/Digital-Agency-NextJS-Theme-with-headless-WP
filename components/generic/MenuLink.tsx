import { convertWpUrlToLocalizedPath } from "@/lib/utils/get-localized-path";
import { Locale } from "@/types/locale";
import { MenuItem } from "@/types/menu";
import Link from "next/link";

export function MenuLink({ item, locale, linkClassName, liClassName }: { item: MenuItem; locale: Locale, linkClassName?: string, liClassName?: string }) {
    const href = convertWpUrlToLocalizedPath(item.url, locale)
    const hasChildren = item.children && item.children.length > 0

    return (
        <li className={`relative group m-0 inline-flex ${liClassName}`}>
            <Link
                href={href}
                className={`${linkClassName}`}
            >
                {item.title}
            </Link>
            {hasChildren && (
                <ul className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.children!.map((child) => (
                        <MenuLink key={child.id} item={child} locale={locale} />
                    ))}
                </ul>
            )}
        </li>
    )
}