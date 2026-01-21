import NavigationMenu from "./NavigationMenu"
import Link from "next/link";
import Image from "next/image";
import { getACFOptions } from "@/lib/wordpress/api";
import { ACFOptions } from "@/types/acf";
import LanguageSwitcher from "../LanguageSwitcher";
import { Locale } from "@/types/locale";
import { CircleX, Logs, MenuIcon, X } from "lucide-react";
import MobileMenu from "../MobileMenu";
import HeaderClientWrapper from "../HeaderClientWrapper";

const Header = async ({ locale }: { locale: Locale }) => {
    const siteOptions: ACFOptions = await getACFOptions();

    const mobileMenuContent = (
        <>
            <NavigationMenu
                key={`mobile-${locale}`}
                locale={locale as "en" | "el"}
                menuLocation="primary-menu"
                linkClassName="text-white hover:text-primary transition-colors text-sm font-medium"
                navClassName="container mx-auto flex-1"
                ulClassName="flex flex-col justify-center gap-5"
            />
            <ul className="flex justify-around pb-10 pt-5 border-t border-t-white/10">
                {siteOptions.social_media.map(smItem =>
                    <li className="inline-flex" key={smItem.icon.ID}>
                        <a href={smItem.url} target="_blank" rel="noopener" aria-label={`${locale === 'el' ? 'Μεταβείτε εδώ: ' : 'Go to: '} ${smItem.url}`}>
                            <Image src={smItem.icon.url} width={20} height={20} alt={smItem.url} className="w-5 h-5" />
                        </a>
                    </li>
                )}
            </ul>
        </>
    );

    return (
        <>
            <header className="absolute top-0 left-0 w-full py-2 md:py-4 z-10 border-b border-b-white/10">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex-1 max-w-[200px] flex">
                        <Link href={locale === 'el' ? '/' : '/en/'} aria-label="Logo">
                            <Image src={siteOptions.logo.url} width={141} height={45} alt={siteOptions.logo.alt} className="w-[141px] h-[45px]" />
                        </Link>
                    </div>
                    <div className="flex-1 hidden lg:flex">
                        <NavigationMenu
                            key={locale}
                            locale={locale as "en" | "el"}
                            menuLocation="primary-menu"
                            linkClassName="text-white hover:text-primary transition-colors text-sm font-medium"
                            navClassName="flex-1 flex"
                            ulClassName="flex items-center justify-center gap-10"
                        />
                    </div>
                    <div className="flex-1 max-w-[200px] flex justify-end gap-5 items-center">
                        <LanguageSwitcher currentLocale={locale as "en" | "el"} key={locale} />
                        <HeaderClientWrapper mobileMenuContent={mobileMenuContent} logo={siteOptions.logo.url} currentLocale={locale as "en" | "el"} />
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header