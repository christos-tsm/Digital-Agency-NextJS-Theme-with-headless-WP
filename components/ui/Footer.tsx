import { sanitizeHTML } from "@/lib/utils/sanitize-html";
import { getACFOptions, getMenuByLocation } from "@/lib/wordpress/api";
import { Locale } from "@/middleware";
import { ACFOptions } from "@/types/acf";
import Image from "next/image";
import Link from "next/link";
import { MenuLink } from "../generic/MenuLink";
import ObfuscatedEmail from "../generic/ObjuscateEmail";
import Contact from "../generic/Contact";

const Footer = async ({ locale }: { locale: Locale }) => {
    const siteOptions: ACFOptions = await getACFOptions();
    const footerMenu = await getMenuByLocation('footer-menu', locale);
    const footer_text = locale === 'el' ? siteOptions.footer_text_el : siteOptions.footer_text_en;

    return (
        <>
            <footer className="flex flex-col">
                <Contact content={siteOptions.contact} />
                <div className="bg-foreground text-white pt-10 xl:pt-20 pb-10">
                    <div className="container mx-auto flex flex-col md:flex-row gap-10">
                        <div className="flex flex-2 flex-col gap-2">
                            <Link href={locale === 'el' ? '/' : '/en'} aria-label="Logo">
                                <Image src={siteOptions.logo.url} width={141} height={45} alt={siteOptions.logo.alt} className="w-[141px] h-[45px]" />
                            </Link>
                            <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(footer_text) }} className="text-sm" />
                        </div>
                        <div className="flex flex-1 flex-col gap-6">
                            <h5 className="font-bold text-sm">{locale === "el" ? "Χρήσιμοι Σύνδεσμοι" : "Quick Links"}</h5>
                            <ul className="flex flex-col gap-1">
                                {footerMenu?.items.map(item =>
                                    <MenuLink key={item.id} item={item} locale={locale} linkClassName={"text-sm font-medium transition-colors hover:text-primary"} liClassName={"inline-flex"} />
                                )}
                            </ul>
                        </div>
                        <div className="flex flex-1 flex-col gap-6">
                            <h5 className="font-bold text-sm">{locale === "el" ? "Επικοινωνία" : "Contact us"}</h5>
                            <ul className="flex flex-col gap-1">
                                <li className="text-sm">
                                    <ObfuscatedEmail email={siteOptions.email} />
                                </li>
                                <li className="text-sm">
                                    <a href={`tel:${siteOptions.tel}`} className="text-sm font-medium">{siteOptions.tel}</a>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-1 flex-col gap-6">
                            <h5 className="font-bold text-sm">Social Media</h5>
                            <ul className="flex gap-4">
                                {siteOptions.social_media.map(smItem =>
                                    <li className="inline-flex" key={smItem.icon.ID}>
                                        <a href={smItem.url} target="_blank" rel="noopener" aria-label={`${locale === 'el' ? 'Μεταβείτε εδώ: ' : 'Go to: '} ${smItem.url}`}>
                                            <Image src={smItem.icon.url} width={20} height={20} alt={smItem.url} className="w-5 h-5" />
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="container mx-auto mt-10 lg:mt-20">
                        <p className="text-sm">&copy; {new Date().getFullYear()} Rights Reseved | Mediamind</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer