import type { Metadata } from "next";
import { Manrope, Titillium_Web } from "next/font/google";
import "../globals.css";
import { locales, type Locale } from "@/middleware";
import { notFound } from "next/navigation";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Next13ProgressBar, Next13ProgressProps } from "next13-progressbar";
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
        <html lang={locale} className={`${manrope.variable} ${titillium.variable}`}>
            <body className="antialiased">
                <Providers>
                    <Header locale={locale as "en" | "el"} />
                    {children}
                    <Footer locale={locale as "en" | "el"} />
                </Providers>
            </body>
        </html>
    );
}
