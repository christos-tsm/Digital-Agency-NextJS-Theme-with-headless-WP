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
    const pageData: HomepageDataInterface = await getPageWithACFByLang(slug, locale);
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
