import type { Metadata } from "next";
import { ProjectsPageDataInterface } from "@/types/pageData";
import { getPageWithACFByLang } from "@/lib/wordpress/api"
import { generatePageMetadata as generateMetadataHelper } from "@/lib/utils/generate-metadata";
import DefaultHeroSection from "@/components/generic/DefaultHeroSection";
import LocomotiveScrollWrapper from "@/components/LocomotiveScrollWrapper";
import ProjectCard from "@/components/ui/cards/ProjectCard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    // Get metadata for about page based on locale
    const slug = locale === 'el' ? 'projects' : 'projects-en';
    return generateMetadataHelper(slug, locale, "Portfolio - MediaMind", "MediaMind Portfolio - Creative Agency");
}

export default async function Projects({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const slug = locale === 'el' ? 'projects' : 'projects-en';
    const pageData: ProjectsPageDataInterface = await getPageWithACFByLang(slug, locale);
    const { acf: { hero_section, projects } } = pageData;

    return (
        <LocomotiveScrollWrapper>
            <DefaultHeroSection content={hero_section} />
            {projects.length &&
                <div className="container mx-auto my-10 lg:my-20 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
                    {projects.map((project) => <ProjectCard key={project.ID} project={project} imageClassName="h-full" imageContainerClassName="h-[300px] md:h-[450px]" projectCardClassName="md:last:col-span-2" />)}
                </div>
            }
        </LocomotiveScrollWrapper>
    );
}
