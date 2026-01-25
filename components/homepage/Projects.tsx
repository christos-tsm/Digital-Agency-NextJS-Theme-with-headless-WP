import React from 'react'
import Marquee from "../ui/Marquee"
import { ProjectsSectionData } from "@/types/pageData";
import ProjectCard from "../ui/cards/ProjectCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProjectsSlider from "./ProjectsSlider";

interface ProjectsSectionInterface {
    content: ProjectsSectionData;
}

const Projects = ({ content }: ProjectsSectionInterface) => {

    return (
        <section className="relative overflow-hidden mt-10 xl:mt-20 bg-foreground py-10 xl:py-20">
            <div className="absolute top-0 left-0 w-full marquee overflow-hidden flex items-center gap-5 opacity-10 py-5 font-en  pointer-events-none">
                <Marquee className="bg-transparent" textClassName="text-white md:text-7xl">
                    {content.marquee_text}
                </Marquee>
            </div>
            <div className="container mx-auto">
                <div className="flex flex-col items-center gap-2 mb-5 lg:mb-10">
                    <h2 className="section-title" dangerouslySetInnerHTML={{ __html: content.title }} />
                    <h3 className="section-subtitle text-white!" dangerouslySetInnerHTML={{ __html: content.subtitle }} />
                </div>
                {content.projects.length >= 1 ?
                    <ProjectsSlider projects={content.projects} />
                    : null}
            </div>
            <div className="flex justify-center gap-5 mt-5 lg:mt-10">
                <span className="cta cta--primary projects-swiper-btn--prev cursor-pointer">
                    <ArrowLeft />
                </span>
                <span className="cta cta--primary projects-swiper-btn--next cursor-pointer">
                    <ArrowRight />
                </span>
            </div>
        </section>
    )
}

export default Projects