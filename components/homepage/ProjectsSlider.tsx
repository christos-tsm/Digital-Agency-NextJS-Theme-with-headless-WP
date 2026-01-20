'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useRef, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { ProjectsPostItem } from "@/types/pageData";
import ProjectCard from "../ui/cards/ProjectCard";

interface ProjectsSliderInterface {
    projects: ProjectsPostItem[];
}

export default function ProjectsSlider({ projects }: ProjectsSliderInterface) {
    const swiperRef = useRef<SwiperType | null>(null);

    useEffect(() => {
        const prevButton = document.querySelector('.projects-swiper-btn--prev');
        const nextButton = document.querySelector('.projects-swiper-btn--next');

        const handlePrevClick = () => {
            if (swiperRef.current) {
                swiperRef.current.slidePrev();
            }
        };

        const handleNextClick = () => {
            if (swiperRef.current) {
                swiperRef.current.slideNext();
            }
        };

        if (prevButton) {
            prevButton.addEventListener('click', handlePrevClick);
        }
        if (nextButton) {
            nextButton.addEventListener('click', handleNextClick);
        }

        return () => {
            if (prevButton) {
                prevButton.removeEventListener('click', handlePrevClick);
            }
            if (nextButton) {
                nextButton.removeEventListener('click', handleNextClick);
            }
        };
    }, []);

    return (
        <>
            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                speed={1500}
                modules={[EffectCoverflow, Navigation]}
                className="projects-swiper overflow-visible!"
            >
                {projects.map((project, index) =>
                    <SwiperSlide key={project.ID || index} className="shadow-[0px_0px_50px_18px_rgba(0,0,0,0)] [&.swiper-slide-active]:shadow-[0px_0px_50px_18px_rgba(0,0,0,0.3)] transition-shadow duration-500">
                        <ProjectCard project={project} />
                    </SwiperSlide>
                )}
            </Swiper>
        </>
    );
}
