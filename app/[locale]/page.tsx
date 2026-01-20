import { getPageWithACFByLang } from "@/lib/wordpress/api"
import { HomepageDataInterface } from "@/types/pageData";
import Hero from "@/components/homepage/Hero";
import Marquee from "@/components/ui/Marquee";
import About from "@/components/homepage/About";
import Services from "@/components/homepage/Services";
import Image from "next/image";
import Projects from "@/components/homepage/Projects";
import LocomotiveScrollWrapper from "@/components/LocomotiveScrollWrapper";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const slug = locale === 'el' ? 'archiki' : 'homepage';
    const pageData: HomepageDataInterface | null = await getPageWithACFByLang(slug, locale);

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

    const { acf: { hero, marquee_text, about_us, banner, services, projects } } = pageData;


    return (
        <LocomotiveScrollWrapper>
            <Hero content={hero} />
            <Marquee>
                {marquee_text}
            </Marquee>
            <About content={about_us} />
            <div className="flex container mx-auto overflow-hidden">
                <Image src={banner.url} width={banner.width} height={banner.height} alt={banner.alt} className="rounded-xl" />
            </div>
            <Services content={services} locale={locale} />
            <Projects content={projects} />
        </LocomotiveScrollWrapper>
    );
}
