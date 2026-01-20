import { DefaultHeroSectionData } from "@/types/pageData";

interface DefaultHeroSectionInterface {
    content: DefaultHeroSectionData;
    containerClassName?: string;
}

const DefaultHeroSection = ({ content, containerClassName }: DefaultHeroSectionInterface) => {
    return (
        <section className={`w-full py-10 lg:py-20 mb-10 lg:mb-20 bg-cover bg-no-repeat bg-foreground text-white bg-center min-h-[350px] md:min-h-[500px] flex items-center ${containerClassName}`} style={{ backgroundImage: `url(${content.background_image.link})` }}>
            <div className="container mx-auto flex flex-col gap-5 mt-10 md:mt-0">
                <h1 className="text-4xl font-bold flex gap-10 items-center">
                    <span className="min-w-fit">{content.title}</span>
                    <span className="h-0.5 bg-primary w-full"></span>
                </h1>
                <h2 className="text-lg md:text-2xl">{content.subtitle}</h2>
            </div>
        </section>
    )
}

export default DefaultHeroSection