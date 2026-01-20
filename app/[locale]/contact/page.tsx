import type { Metadata } from "next";
import { getACFOptions, getPageWithACFByLang } from "@/lib/wordpress/api"
import { ContactPageDataInterface } from "@/types/pageData";
import { generatePageMetadata as generateMetadataHelper } from "@/lib/utils/generate-metadata";
import DefaultHeroSection from "@/components/generic/DefaultHeroSection";
import LocomotiveScrollWrapper from "@/components/LocomotiveScrollWrapper";
import { ACFOptions } from "@/types/acf";
import ObfuscatedEmail from "@/components/generic/ObjuscateEmail";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const slug = locale === 'el' ? 'contact' : 'contact-en';
    return generateMetadataHelper(slug, locale, "Contact us - MediaMind", "Contact us MediaMind - Creative Agency");
}

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const slug = locale === 'el' ? 'contact' : 'contact-en';
    const pageData: ContactPageDataInterface | null = await getPageWithACFByLang(slug, locale);
    const siteOptions: ACFOptions = await getACFOptions();

    if (!pageData || !pageData.acf) {
        return (
            <LocomotiveScrollWrapper>
                <div className="container mx-auto my-20 text-center">
                    <h1 className="text-2xl font-bold mb-4">{locale === 'el' ? 'Η σελίδα δεν βρέθηκε' : 'Page not found'}</h1>
                    <p>{locale === 'el' ? 'Δεν ήταν δυνατή η φόρτωση των δεδομένων.' : 'Unable to load page data.'}</p>
                </div>
            </LocomotiveScrollWrapper>
        );
    }

    const { acf: { hero_section } } = pageData;

    return (
        <LocomotiveScrollWrapper>
            <DefaultHeroSection content={hero_section} />
            <section className="container mx-auto grid grid-cols-2 my-10 lg:my-20 gap-10">
                <div className="flex flex-col items-start gap-2 md:gap-5 rounded font-bold">
                    <h3 className="font-bold text-lg flex items-center gap-5 w-full">
                        <span className="min-w-fit">E-mail</span>
                        <span className="h-0.5 bg-primary w-full"></span>
                    </h3>
                    <span className="text-sm md:text-base"><ObfuscatedEmail email={siteOptions.email} /></span>
                </div>
                <div className="flex flex-col items-start gap-2 md:gap-5 rounded">
                    <h3 className="font-bold text-lg flex items-center gap-5 w-full">
                        <span className="min-w-fit">Τηλέφωνο</span>
                        <span className="h-0.5 bg-primary w-full"></span>
                    </h3>
                    <a href={`tel:${siteOptions.tel}`} className="text-sm md:text-base font-bold">{siteOptions.tel}</a>
                </div>
            </section>
        </LocomotiveScrollWrapper>
    );
}
