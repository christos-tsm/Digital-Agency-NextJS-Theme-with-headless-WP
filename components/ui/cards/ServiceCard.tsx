import { ServicesPostItem } from "@/types/pageData"
import { sanitizeHTML } from "@/lib/utils/sanitize-html"
import PrimaryCTA from "../PrimaryCTA"
import Link from "next/link"
import Image from "next/image"
import { type Locale } from "@/types/locale"

interface ServiceCardInterface {
    service: ServicesPostItem;
    locale: Locale;
    variation?: "secondary" | null;
}

const ServiceCard = ({ service, locale, variation }: ServiceCardInterface) => {
    let containerClassNames: string, iconOnTop: boolean;
    if (variation === 'secondary') {
        containerClassNames = "bg-background text-foreground border border-primary/10 transition-colors hover:border-primary"
        iconOnTop = true;
    } else {
        containerClassNames = "bg-foreground text-white"
        iconOnTop = false;
    }
    return (
        <article id="service-<?= get_the_ID() ?>" className={`px-5 py-5 group rounded-xl relative ${containerClassNames}`}>
            <Link href={`/services/${service.post_name}`} aria-label={`Read more about ${service.post_title}`} className="absolute top-0 left-0 w-full h-full z-2"></Link>
            <div className={`flex flex-col ${!iconOnTop && 'lg:flex-row'} gap-5 h-full`}>
                <div className="flex-1 w-20 h-20 max-h-20">
                    <div className="bg-primary rounded-xl inline-flex items-center justify-center w-20 h-20">
                        <span className="icon [&>svg]:fill-white w-14 h-14">
                            <Image src={service.acf.icon.url} width={56} height={56} alt={service.post_title} className="invert-100" />
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-5 h-full">
                    <div className="flex items-center gap-5">
                        <h3 className="text-lg font-bold min-w-fit" dangerouslySetInnerHTML={{ __html: sanitizeHTML(service.post_title) }} />
                        <span className="h-0.5 bg-primary w-0 transition-all group-hover:w-full duration-700"></span>
                    </div>
                    <div className="text-sm flex-1" dangerouslySetInnerHTML={{ __html: sanitizeHTML(service.acf.short_description) }} />
                    <PrimaryCTA href={`/services/${service.post_name}`} hasArrowIcon className="w-fit">
                        {locale === 'el' ? 'Περισσότερα' : 'Read more'}
                    </PrimaryCTA>
                </div>
            </div>
        </article>
    )
}

export default ServiceCard