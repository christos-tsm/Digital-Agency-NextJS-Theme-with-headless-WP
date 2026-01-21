import { sanitizeHTML } from "@/lib/utils/sanitize-html";
import { ACFContactSectionData } from "@/types/acf";
import ContactForm from "./ContactForm";
import { Locale } from "@/types/locale";

interface ContactInterface {
    content: ACFContactSectionData;
    locale: Locale;
}

const Contact = ({ content, locale }: ContactInterface) => {
    const title = locale === 'el' ? content.title : content.title_en;
    const subtitle = locale === 'el' ? content.subtitle : content.subtitle_en;
    const text = locale === 'el' ? content.text : content.text_en;

    return (
        <section className="py-10 lg:py-20 bg-cover bg-center bg-no-repeat relative bg-background/85" style={{ backgroundImage: `url(${content.background_image.url})`, backgroundBlendMode: 'lighten' }}>
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 relative z-2 gap-10 xl:gap-20">
                <div className="flex flex-col gap-2">
                    <h2 className="section-title">{title}</h2>
                    <h3 className="section-subtitle">{subtitle}</h3>
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(text) }} className="mt-5" />
                </div>
                <div>
                    <ContactForm locale={locale} />
                </div>
            </div>
        </section>
    )
}

export default Contact