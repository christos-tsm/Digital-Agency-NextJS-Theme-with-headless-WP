import type { Metadata } from "next";
import { Manrope, Titillium_Web } from "next/font/google";
import "../globals.css";
import { locales, type Locale } from "@/types/locale";
import { notFound } from "next/navigation";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Providers from "@/components/Providers";
import { generatePageMetadata as generateMetadataHelper } from "@/lib/utils/generate-metadata";

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["greek", "latin"]
});

const titillium = Titillium_Web({
    variable: "--font-titillium",
    weight: ["400", "600", "700"],
    subsets: ["latin"]
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    // Get metadata for homepage based on locale
    const slug = locale === 'el' ? 'archiki' : 'homepage';
    return generateMetadataHelper(slug, locale);
}

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params, }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }>; }>) {
    const { locale } = await params;
    // Validate locale
    if (!locales.includes(locale as Locale)) {
        notFound();
    }
    return (
        <html lang={locale} className={`${manrope.variable} ${titillium.variable} overflow-hidden`}>
            {/* Coming Soon Banner @TODO Remove overflow hidden from <html> */}
            <body className="antialiased">
                <Providers>
                    <Header locale={locale as "en" | "el"} />
                    {/* Comming Soon Banner */}
                    <div className="text-white fixed flex flex-col gap-10 items-center justify-center top-0 left-0 w-full h-full bg-foreground z-50">
                        <h1 className="text-3xl md:text-5xl font-bold">coming<span className="text-primary">soon.</span></h1>
                        <p className="text-5xl md:text-7xl font-bold">media<span className="text-primary">core.</span></p>
                        <p className="text-xl md:text-2xl font-light">creative<span className="text-primary">digital</span>agency</p>
                    </div>
                    {children}
                    <Footer locale={locale as "en" | "el"} />
                </Providers>
            </body>
        </html>
    );
}
