import { sanitizeHTML } from "@/lib/utils/sanitize-html";
import { TestimonialsSectionData } from "@/types/pageData"
import Image from "next/image";
import React from 'react'
import TestimonialsSlider from "./TestimonialsSlider";
import { Quote } from "lucide-react";

interface TestimonialsPageInterface {
    content: TestimonialsSectionData;
}

const Testimonials = ({ content }: TestimonialsPageInterface) => {
    return (
        <section className="relative overflow-hidden container mx-auto my-10 xl:my-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="flex flex-col gap-5">
                    <Image src={content.image.url} width={content.image.width} height={content.image.height} alt={content.image.alt} className="w-full h-auto rounded-xl" />
                </div>
                {content.testimonials &&
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-2">
                            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: sanitizeHTML(content.title) }} />
                            <h3 className="section-subtitle" dangerouslySetInnerHTML={{ __html: sanitizeHTML(content.subtitle) }} />
                        </div>
                        <span className="text-primary">
                            <Quote className="fill-primary" width={56} height={56} />
                        </span>
                        <TestimonialsSlider testimonials={content.testimonials} />
                    </div>
                }
            </div>
        </section>
    )
}

export default Testimonials