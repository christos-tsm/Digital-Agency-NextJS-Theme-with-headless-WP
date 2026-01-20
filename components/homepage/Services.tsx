import { sanitizeHTML } from "@/lib/utils/sanitize-html";
import { PostItem } from "@/types/acf";
import { ServicesPostItem, ServicesSectionData } from "@/types/pageData";
import ServiceCard from "../ui/cards/ServiceCard";
import PrimaryCTA from "../ui/PrimaryCTA";


interface ServicesSectionInterface {
    content: ServicesSectionData;
    locale: string;
}

const Services = async ({ content, locale }: ServicesSectionInterface) => {

    return (
        <section className="relative overflow-hidden container mx-auto my-10 xl:my-20">
            <div className="flex flex-col gap-2 mb-5 lg:mb-10">
                <h2 className="section-title" dangerouslySetInnerHTML={{ __html: sanitizeHTML(content.title) }} />
                <h3 className="section-subtitle" dangerouslySetInnerHTML={{ __html: sanitizeHTML(content.subtitle) }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
                {content.services.length >= 1 ?
                    content.services.map((service: ServicesPostItem) => <ServiceCard key={service.ID} service={service} locale={locale as "el" | "en"} />)
                    : null}
            </div>
            <div className="flex mt-5 lg:mt-10">
                <PrimaryCTA href={content.button.url} >
                    {content.button.title}
                </PrimaryCTA>
            </div>
        </section>
    )
}

export default Services