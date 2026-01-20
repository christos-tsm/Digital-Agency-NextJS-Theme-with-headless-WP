import type { Metadata } from "next";
import type { PageMetadata } from "@/types/metadata";
import { getPageMetadata } from "@/lib/wordpress/api";

/**
 * Converts PageMetadata to Next.js Metadata format
 */
export function convertPageMetadataToMetadata(metadata: PageMetadata | null, fallbackTitle: string = "MediaMind", fallbackDescription: string = "MediaMind - Creative Agency"): Metadata {
    if (metadata) {
        return {
            title: metadata.title,
            description: metadata.description,
            openGraph: {
                title: metadata.ogTitle || metadata.title,
                description: metadata.ogDescription || metadata.description,
                images: metadata.ogImage ? [{ url: metadata.ogImage }] : [],
            },
            twitter: {
                card: metadata.twitterCard as 'summary' | 'summary_large_image' | 'app' | 'player' || 'summary_large_image',
                title: metadata.ogTitle || metadata.title,
                description: metadata.ogDescription || metadata.description,
            },
            alternates: {
                canonical: metadata.canonical,
            },
        };
    }

    return {
        title: fallbackTitle,
        description: fallbackDescription,
    };
}

/**
 * Helper function to generate metadata for a page
 * @param slug - The page slug (will be converted based on locale)
 * @param locale - The locale (el or en)
 * @param fallbackTitle - Fallback title if metadata is not found
 * @param fallbackDescription - Fallback description if metadata is not found
 */
export async function generatePageMetadata(
    slug: string,
    locale: string,
    fallbackTitle: string = "MediaMind",
    fallbackDescription: string = "MediaMind - Creative Agency"
): Promise<Metadata> {
    const metadata = await getPageMetadata(slug, locale);
    return convertPageMetadataToMetadata(metadata, fallbackTitle, fallbackDescription);
}
