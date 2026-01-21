'use client'

import { useLocale } from "@/lib/hooks/useLocale";
import { ProjectsPostItem } from "@/types/pageData"
import { CircleArrowOutUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link";

interface ProjectCardInterface {
    project: ProjectsPostItem;
    className?: string;
    imageContainerClassName?: string;
    imageClassName?: string;
    projectCardClassName?: string;
}

const ProjectCard = ({ project, imageContainerClassName = 'h-[300px] md:h-[700px]', imageClassName = 'h-650px', projectCardClassName = '' }: ProjectCardInterface) => {
    const locale = useLocale();
    return (
        <article id={`project-${project.ID}`} className={`group relative flex! flex-col swiper-slide overflow-hidden rounded-2xl ${projectCardClassName}`}>
            <Link href={`/${locale}/projects/${project.post_name}`} aria-label={`${locale === 'el' ? `δείτε περισσότερα για ${project.post_title}` : `See more about ${project.post_title}`}`} className="absolute top-1/2 left-1/2 -translate-1/2 w-20 h-20 bg-primary text-white inline-flex justify-center items-center z-3 rounded-full opacity-0 transition-opacity group-hover:opacity-100 duration-700">
                <span className="inline-flex">
                    <CircleArrowOutUpRight />
                </span>
            </Link>
            <div className={`inline-flex ${imageContainerClassName} w-full relative`}>
                <div className="absolute top-0 left-0 w-full h-full bg-foreground/50 z-2"></div>
                <Image src={project.featured_image_url} fill alt={project.post_title} className={`w-full ${imageClassName} object-cover h-auto`} sizes="100vw" />
            </div>
            <div className="absolute bottom-2 left-2 px-4 py-4 md:px-12 md:py-5 bg-foreground rounded-2xl z-3 shadow-[0px_0px_50px_18px_rgba(0,0,0,0.05)]">
                <div className="text-white">
                    <h3 className="font-bold text-lg">{project.post_title}</h3>
                </div>
                {project.taxonomies['project-category'] && project.taxonomies['project-category'].length >= 1 &&
                    <ul className="flex flex-wrap gap-5 text-white mt-2">
                        {project.taxonomies['project-category'].map(tax => <li key={tax.term_id} className="text-xs font-bold text-gray-500 rounded-lg">{tax.name}</li>)}
                    </ul>
                }
            </div>
        </article>
    )
}

export default ProjectCard