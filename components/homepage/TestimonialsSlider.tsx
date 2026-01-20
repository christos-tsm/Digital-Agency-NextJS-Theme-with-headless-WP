"use client"

import 'swiper/css';
import 'swiper/css/effect-fade';
import { Testimonial } from "@/types/pageData"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade } from 'swiper/modules';
import { sanitizeHTML } from "@/lib/utils/sanitize-html";

interface TestimonialsSliderInterface {
    testimonials: Testimonial[]
}

const TestimonialsSlider = ({ testimonials }: TestimonialsSliderInterface) => {
    return (
        <Swiper
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            navigation={false}
            modules={[EffectFade]}
            className="testimonials-swiper w-full"
        >
            {testimonials.map(testimonial =>
                <SwiperSlide>
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(testimonial.text) }} className="italic text-sm border-b border-b-slate-500/10 pb-5 mb-5" />
                    <h4 className="font-bold mb-2 inline-flex items-center text-sm">{testimonial.name} {testimonial.platform && <span className="font-bold">@ {testimonial.platform}</span>}</h4>
                </SwiperSlide>
            )}
        </Swiper>
    )
}

export default TestimonialsSlider