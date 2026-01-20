import type { Metadata } from "next";
import { getPageWithACFByLang } from "@/lib/wordpress/api"
import { ServicesPageDataInterface } from "@/types/pageData";
import { generatePageMetadata as generateMetadataHelper } from "@/lib/utils/generate-metadata";
import Marquee from "@/components/ui/Marquee";
import DefaultHeroSection from "@/components/generic/DefaultHeroSection";
import LocomotiveScrollWrapper from "@/components/LocomotiveScrollWrapper";
import ServiceCard from "@/components/ui/cards/ServiceCard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const slug = locale === 'el' ? 'services' : 'services-en';
    return generateMetadataHelper(slug, locale, "Services - MediaMind", "MediaMind Services - Creative Agency");
}

export default async function Services({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const slug = locale === 'el' ? 'services' : 'services-en';
    const pageData: ServicesPageDataInterface | null = await getPageWithACFByLang(slug, locale);

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

    const { acf: { hero_section, marquee_text, services } } = pageData;

    return (
        <LocomotiveScrollWrapper>
            <DefaultHeroSection content={hero_section} containerClassName="mb-0!" />
            <Marquee>
                {marquee_text}
            </Marquee>
            {services.length &&
                <section className="container mx-auto my-10 lg:my-20 grid grid-cols-1 md:grid-cols-2 gap-10">
                    {services.map(service =>
                        <ServiceCard key={service.ID} service={service} variation="secondary" locale={locale as "el" | "en"} />
                    )}
                </section>
            }
        </LocomotiveScrollWrapper>
    );
}
