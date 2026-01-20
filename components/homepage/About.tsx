import { sanitizeHTML } from "@/lib/utils/sanitize-html";
import { AboutSectionData } from "@/types/pageData";
import Image from "next/image";
import PrimaryCTA from "../ui/PrimaryCTA";

interface AboutSectionInterface {
    content: AboutSectionData;
}

const About = ({ content }: AboutSectionInterface) => {
    return (
        <section className="relative overflow-hidden container mx-auto my-10 xl:my-20">
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-10">
                <div className="flex flex-col gap-2 flex-1">
                    <h2 className="section-title" dangerouslySetInnerHTML={{ __html: sanitizeHTML(content.title) }} />
                    <h3 className="section-subtitle" dangerouslySetInnerHTML={{ __html: sanitizeHTML(content.subtitle) }} />
                </div>
                <div className="flex flex-col gap-5 lg:gap-10 flex-1">
                    <div className="flex gap-10 justify-between flex-col lg:flex-row relative">
                        <div className="flex flex-col gap-5 lg:gap-10 flex-1 max-w-[500px]">
                            <div className="inline-flex overflow-hidden rounded-xl">
                                <Image src={content.image_2.url} width={content.image_2.width} height={content.image_2.height} alt={content.image_2.alt} />
                            </div>
                            <div className="flex flex-col gap-5 lg:gap-10 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: sanitizeHTML(content.text) }} />
                            <div className="flex">
                                <PrimaryCTA href={content.link.url} hasArrowIcon>
                                    {content.link.title}
                                </PrimaryCTA>
                            </div>
                        </div>
                        <div className="flex flex-col absolute lg:static bottom-0 right-0 opacity-10 md:opacity-100">
                            <h4 className="text-primary font-bold text-8xl">{content.counter}</h4>
                            <p className="font-bold text-lg">{content.counter_text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About