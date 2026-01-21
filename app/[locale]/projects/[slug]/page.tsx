import type { Metadata } from "next";
import { ProjectSinglePageDataInterface } from "@/types/pageData";
import { getCPT } from "@/lib/wordpress/api"
import LocomotiveScrollWrapper from "@/components/LocomotiveScrollWrapper";
import { sanitizeHTML } from "@/lib/utils/sanitize-html";
import Image from "next/image";
import { CircleArrowOutUpRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    const pageData: ProjectSinglePageDataInterface | null = await getCPT(slug, 'project');

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

// Helper function to extract taxonomy names from _embedded
function getTaxonomyNames(pageData: ProjectSinglePageDataInterface, taxonomyName: string = 'project-category'): string[] {
    if (!pageData._embedded || !pageData._embedded['wp:term']) {
        return [];
    }

    // _embedded['wp:term'] is an array of arrays, each containing terms for different taxonomies
    const allTerms = pageData._embedded['wp:term'].flat();
    return allTerms
        .filter(term => term.taxonomy === taxonomyName)
        .map(term => term.name);
}

export default async function ProjectDetails({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug } = await params;
    const pageData: ProjectSinglePageDataInterface | null = await getCPT(slug, 'project');

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

    const { acf: { title, intro_text, gallery_source, after_gallery_text, live_url } } = pageData;

    // Get taxonomy names
    const categoryNames = getTaxonomyNames(pageData, 'project-category');

    return (
        <LocomotiveScrollWrapper>
            <section className={`w-full py-10 lg:py-20 mb-10 lg:mb-20 bg-cover bg-no-repeat bg-foreground text-white bg-center min-h-[350px] md:min-h-[500px] flex items-center relative`}>
                <div className="container mx-auto flex flex-col gap-5 mt-10 md:mt-0 relative z-2">
                    <h1 className="text-4xl font-bold flex gap-10 items-center">
                        <span className="min-w-fit">{title}</span>
                        <span className="h-0.5 bg-primary w-full"></span>
                    </h1>
                    <div className="flex items-center gap-5">
                        {categoryNames ?
                            <ul className="flex gap-2 flex-1">
                                {categoryNames.map((cat, index) => <li className="border border-white/20 px-4 py-2 text-sm rounded" key={index}>{cat}</li>)}
                            </ul>
                            : null}
                        {live_url ?
                            <a href={live_url} className="bg-primary text-white rounded w-fit px-4 py-2 text-sm font-bold inline-flex gap-2 items-center" target="_blank" rel="noopener">
                                {locale === 'el' ? 'Δείτε την ιστοσελίδα' : 'View live site'}
                                <CircleArrowOutUpRight />
                            </a>
                            : null}
                    </div>
                </div>
                <div></div>
            </section>
            <section className="container mx-auto my-10 lg:my-20">
                <h2 className="text-lg md:text-2xl" dangerouslySetInnerHTML={{ __html: sanitizeHTML(intro_text) }} />
            </section>
            <div className="grid grid-cols-2 gap-4 container mx-auto">
                {gallery_source.formatted_value.length >= 1 ?
                    <>
                        <div className="grid gap-4">
                            {gallery_source.formatted_value.filter((_, index) => index % 4 === 0).map(img => (
                                <div key={img}>
                                    <Image className="h-full w-full object-cover max-w-full rounded-xl" src={img} width={500} height={500} alt={title} />
                                </div>
                            ))}
                        </div>
                        <div className="grid gap-4">
                            {gallery_source.formatted_value.filter((_, index) => index % 4 === 1).map(img => (
                                <div key={img}>
                                    <Image className="h-full w-full object-cover max-w-full rounded-xl" src={img} width={500} height={500} alt={title} />
                                </div>
                            ))}
                        </div>
                        <div className="grid gap-4">
                            {gallery_source.formatted_value.filter((_, index) => index % 4 === 2).map(img => (
                                <div key={img}>
                                    <Image className="h-full w-full object-cover max-w-full rounded-xl" src={img} width={500} height={500} alt={title} />
                                </div>
                            ))}
                        </div>
                        <div className="grid gap-4">
                            {gallery_source.formatted_value.filter((_, index) => index % 4 === 3).map(img => (
                                <div key={img}>
                                    <Image className="h-full w-full object-cover max-w-full rounded-xl" src={img} width={500} height={500} alt={title} />
                                </div>
                            ))}
                        </div>
                    </>
                    : null}
            </div>
            <div className="flex flex-col gap-4 text-center bg-foreground text-white py-10 lg:py-20 mt-10 lg:mt-20">
                <div className="mx-auto container">
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(after_gallery_text) }} className="text-xl flex flex-col gap-5" />
                </div>
            </div>
        </LocomotiveScrollWrapper>
    );
}
