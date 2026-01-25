import type { Metadata } from "next";
import { ProjectSinglePageDataInterface, ServicesSinglePageDataInterface } from "@/types/pageData";
import { getCPT } from "@/lib/wordpress/api"
import LocomotiveScrollWrapper from "@/components/LocomotiveScrollWrapper";
import { sanitizeHTML } from "@/lib/utils/sanitize-html";
import Image from "next/image";
import { CircleArrowOutUpRight } from "lucide-react";
import Marquee from "@/components/ui/Marquee";
import DefaultHeroSection from "@/components/generic/DefaultHeroSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    const pageData: ServicesSinglePageDataInterface | null = await getCPT(slug, 'service');

    if (!pageData || !pageData.yoast_head_json) {
        return {
            title: "Project - MediaMind",
            description: "MediaMind Project - Creative Agency",
        };
    }

    const yoast = pageData.yoast_head_json;
    const ogImage = yoast.og_image?.[0]?.url;

    return {
        title: yoast.title || "Project - MediaMind",
        description: yoast.description || "MediaMind Project - Creative Agency",
        openGraph: {
            title: yoast.og_title || yoast.title || "Project - MediaMind",
            description: yoast.og_description || yoast.description || "MediaMind Project - Creative Agency",
            images: ogImage ? [{ url: ogImage }] : [],
            url: yoast.canonical || undefined,
        },
        twitter: {
            card: (yoast.twitter_card as 'summary' | 'summary_large_image' | 'app' | 'player') || 'summary_large_image',
            title: yoast.og_title || yoast.title || "Project - MediaMind",
            description: yoast.og_description || yoast.description || "MediaMind Project - Creative Agency",
        },
        alternates: {
            canonical: yoast.canonical,
        },
    };
}

export default async function ServicesDetails({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug } = await params;
    const pageData: ServicesSinglePageDataInterface | null = await getCPT(slug, 'service');

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

    const { acf: { icon, hero_section, marquee_text, short_description, long_description, image } } = pageData;

    return (
        <LocomotiveScrollWrapper>
            <DefaultHeroSection content={hero_section} containerClassName="mb-0!" />
            <Marquee>
                {marquee_text}
            </Marquee>
            <section className="container mx-auto my-10 lg:my-20">
                <h2 className="text-lg md:text-2xl text-center font-bold" dangerouslySetInnerHTML={{ __html: sanitizeHTML(short_description) }} />
            </section>
            <div className="flex flex-col md:flex-row gap-4  bg-foreground text-white mt-10 lg:mt-20">
                <div className="flex-1 p-10 lg:p-20">
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(long_description) }} className="text-lg flex flex-col gap-5" />
                </div>
                {image &&
                    <div className="flex-1 relative">
                        <Image src={image.url} fill alt={hero_section.title} className="w-full h-full object-cover" />
                    </div>
                }
            </div>
        </LocomotiveScrollWrapper>
    );
}
