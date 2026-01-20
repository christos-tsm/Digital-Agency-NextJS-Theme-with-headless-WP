import { sanitizeHTML } from "@/lib/utils/sanitize-html";
import { HeroSectionData } from "@/types/pageData";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PrimaryCTA from "../ui/PrimaryCTA";

interface HeroSectionInterface {
    content: HeroSectionData;
}
const Hero = ({ content }: HeroSectionInterface) => {
    return (
        <section className="bg-foreground relative text-white">
            <div className="flex md:min-h-[800px] lg:min-h-auto h-screen max-h-[720px] 3xl:max-h-[880px]">
                <Image width={content.image.width} height={content.image.height} alt={content.image.alt} src={content.image.url} loading="eager" className="w-full h-auto object-cover" fetchPriority="high" />
            </div>
            <div className="absolute bottom-10 left-0 lg:bottom-auto lg:top-1/2 lg:left-1/2 lg:-translate-1/2 z-2 container flex flex-col gap-5 lg:max-w-fit">
                <div className="flex flex-col gap-5">
                    <h1 className="text-4xl md:text-8xl 2xl:text-[120px] 3xl:text-[150px] leading-[1.2] font-bold font-en" dangerouslySetInnerHTML={{ __html: sanitizeHTML(content.title) }} />
                    <div className="flex lg:items-center xl:items-end gap-5 lg:gap-10 flex-col lg:flex-row">
                        <div className="relative inline-flex lg:min-w-[370px] max-w-[370px] overflow-hidden rounded-xl">
                            <Image src={content.video_poster.url} width={content.video_poster.width} height={content.video_poster.height} alt={content.video_poster.alt} className="h-[110px]" />
                            <span className="animate-ping bg-primary w-12 h-12 text-white absolute top-1/2 left-1/2 -translate-1/2 rounded-full inline-flex items-center justify-center z-1" style={{ animationDuration: '2s' }}></span>
                            <a href="#!" aria-label="Play video button" className="w-12 h-12 bg-primary text-white absolute top-1/2 left-1/2 -translate-1/2 rounded-full inline-flex items-center justify-center z-2">
                                <Play />
                            </a>
                        </div>
                        <h2 className="text-4xl md:text-8xl 2xl:text-[120px] 3xl:text-[150px] font-bold order-first lg:order-last leading-[0.9]" dangerouslySetInnerHTML={{ __html: sanitizeHTML(content.title_part_2) }} />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-12 lg:gap-40">
                    <div className="flex flex-col gap-4 order-last lg:order-first">
                        <Image src={content.clients_image.url} width={content.clients_image.width} height={content.clients_image.height} alt={content.clients_image.alt} />
                        <h3 className="text-md text-sm font-normal" dangerouslySetInnerHTML={{ __html: sanitizeHTML(content.clients_text) }} />
                    </div>
                    <div className="flex flex-col gap-4 lg:max-w-[400px]">
                        <div className="flex flex-col text-base leading-[1.8]" dangerouslySetInnerHTML={{ __html: sanitizeHTML(content.text) }} />
                        <div className="flex">
                            <PrimaryCTA href={content.button.url} hasArrowIcon>
                                {content.button.title}
                            </PrimaryCTA>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero