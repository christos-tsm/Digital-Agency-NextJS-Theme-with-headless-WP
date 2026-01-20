import Image from "next/image";
import type { Metadata } from "next";
import { getPageWithACFByLang } from "@/lib/wordpress/api"
import { AboutPageDataInterface } from "@/types/pageData";
import { generatePageMetadata as generateMetadataHelper } from "@/lib/utils/generate-metadata";
import { sanitizeHTML } from "@/lib/utils/sanitize-html";
import Marquee from "@/components/ui/Marquee";
import DefaultHeroSection from "@/components/generic/DefaultHeroSection";
import LocomotiveScrollWrapper from "@/components/LocomotiveScrollWrapper";
import PrimaryCTA from "@/components/ui/PrimaryCTA";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    // Get metadata for about page based on locale
    const slug = locale === 'el' ? 'about' : 'about-en';
    return generateMetadataHelper(slug, locale, "About - MediaMind", "About MediaMind - Creative Agency");
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const slug = locale === 'el' ? 'about' : 'about-en';
    const pageData: AboutPageDataInterface | null = await getPageWithACFByLang(slug, locale);

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

    const { acf: { hero_section, about_us, services } } = pageData;

    return (
        <LocomotiveScrollWrapper>
            <DefaultHeroSection content={hero_section} />
            <section className="my-10 lg:my-20">
                <div className="container mx-auto flex flex-col md:flex-row gap-5 lg:gap-10">
                    <div className="flex flex-1 max-w-[565px]">
                        <Image className="rounded-2xl object-cover" src={about_us.image.url} width={about_us.image.width} height={about_us.image.height} alt={about_us.image.alt} />
                    </div>
                    <div className="flex flex-col flex-1">
                        <h2 className="section-title">{about_us.title}</h2>
                        <h3 className="section-subtitle">{about_us.subtitle}</h3>
                        <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(about_us.text) }} className="text-sm lg:text-base mt-5 lg:mt-10 flex flex-col gap-5" />
                        {about_us.services ?
                            <ul className="grid grid-cols-2 lg:flex flex-wrap gap-2 lg:gap-5 mt-5 lg:mt-10">
                                {about_us.services.map((service, index) => <li className="px-2 lg:px-4 py-2 last:col-span-2 text-center border-foreground bg-primary text-white text-xs lg:text-sm font-medium rounded" key={index}>{service.title}</li>)}
                            </ul>
                            : null}
                    </div>
                </div>
            </section>
            <section className="my-10 lg:my-20 mb-0 md:mb-10 lg:mb-20">
                <div className="container mx-auto flex flex-col items-center text-center">
                    <h2 className="section-title">{services.title}</h2>
                    <h3 className="section-subtitle">{services.subtitle}</h3>
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(services.text) }} className="text-sm lg:text-base my-5 lg:my-10 max-w-[800px] mx-auto flex flex-col gap-5" />
                    <div className="flex justify-center">
                        <PrimaryCTA href={services.link.url} hasArrowIcon>
                            {services.link.title}
                        </PrimaryCTA>
                    </div>
                </div>
            </section>
        </LocomotiveScrollWrapper>
    );
}
