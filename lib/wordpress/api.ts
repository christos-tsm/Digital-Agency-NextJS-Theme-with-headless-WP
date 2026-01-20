import type { PageMetadata } from "@/types/metadata";
import type { Menu, MenuItem } from "@/types/menu";

const WP_BASE_URL = process.env.WORDPRESS_URL || '';
const WP_BASE_FETCH_URL = WP_BASE_URL + '/wp-json/wp/v2';
const WP_MEDIAMIND_API_BASE = `${WP_BASE_URL}/wp-json/mediamind/v1`;

// For standard WordPress REST API endpoints
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${WP_BASE_FETCH_URL}/${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        next: { revalidate: 60 }, // ISR
    });

    if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
    }

    return response.json();
}

// For custom MediaMind API endpoints
async function fetchCustomAPI(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${WP_MEDIAMIND_API_BASE}/${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`MediaMind API error: ${response.status}`);
    }

    return response.json();
}

// Get all posts with ACF fields and embedded data
export async function getPosts(perPage = 10) {
    return fetchAPI(`posts?_embed&per_page=${perPage}`);
}

// Get single post by slug
export async function getPostBySlug(slug: string) {
    const posts = await fetchAPI(`posts?slug=${slug}&_embed`);
    return posts[0] || null;
}

// Get posts with only specific fields (better performance)
export async function getPostsOptimized() {
    return fetchAPI('posts?_fields=id,slug,title,excerpt,acf,_embedded&_embed&per_page=20');
}

// Endpoint 1: Get all ACF options
export async function getACFOptions() {
    try {
        return await fetchCustomAPI('options', {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });
    } catch (error) {
        console.error('Error fetching ACF options:', error);
        // Return a minimal fallback object to prevent build failures
        return {
            logo: { url: '', alt: '' },
            email: '',
            tel: '',
            social_media: [],
            footer_text_el: '',
            footer_text_en: '',
            contact: {}
        };
    }
}

// Endpoint 2: Get page with all ACF fields by slug
export async function getPageWithACF(slug: string) {
    return fetchCustomAPI(`page-acf/${slug}`, {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
}

// Bonus: Get specific options page
export async function getSpecificOptionsPage(pageName: string) {
    return fetchCustomAPI(`options/${pageName}`, {
        next: { revalidate: 3600 },
    });
}

// Polylang functions
// Get page with ACF by slug and language
export async function getPageWithACFByLang(slug: string, lang: string = 'el') {
    try {
        return await fetchCustomAPI(`page-acf/${slug}?lang=${lang}`, {
            next: { revalidate: 60 },
        });
    } catch (error) {
        console.error(`Error fetching page with ACF (${slug}, ${lang}):`, error);
        return null;
    }
}

// Get post by slug and language
export async function getPostBySlugAndLang(slug: string, lang: string = 'el') {
    const posts = await fetchAPI(`posts?slug=${slug}&lang=${lang}&_embed`);
    return posts[0] || null;
}

// Metadata functions
// Get metadata for a page by slug and language
export async function getPageMetadata(slug: string, lang: string = 'el'): Promise<PageMetadata | null> {
    try {
        const page = await getPageWithACFByLang(slug, lang);

        if (!page) {
            return null;
        }

        // Try to get Yoast SEO metadata if available
        const yoastMeta = page.yoast_head_json.json || page.yoast_meta.json || {};

        return {
            title: yoastMeta.title || page.title?.rendered || '',
            description: yoastMeta.description || page.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
            ogImage: yoastMeta.og_image?.[0]?.url || page.featured_image_url || '',
            ogTitle: yoastMeta.og_title || yoastMeta.title || page.title?.rendered || '',
            ogDescription: yoastMeta.og_description || yoastMeta.description || page.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
            twitterCard: yoastMeta.twitter_card || 'summary_large_image',
            canonical: yoastMeta.canonical || `${WP_BASE_URL}/${lang}/${slug}`,
        };
    } catch (error) {
        console.error('Error fetching page metadata:', error);
        return null;
    }
}

// Get metadata for a post by slug and language
export async function getPostMetadata(slug: string, lang: string = 'el'): Promise<PageMetadata | null> {
    try {
        const post = await getPostBySlugAndLang(slug, lang);

        if (!post) {
            return null;
        }

        const yoastMeta = post.yoast_head_json || post.yoast_meta || {};

        return {
            title: yoastMeta.title || post.title?.rendered || '',
            description: yoastMeta.description || post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
            ogImage: yoastMeta.og_image?.[0]?.url || post.featured_image_url || '',
            ogTitle: yoastMeta.og_title || yoastMeta.title || post.title?.rendered || '',
            ogDescription: yoastMeta.og_description || yoastMeta.description || post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
            twitterCard: yoastMeta.twitter_card || 'summary_large_image',
            canonical: yoastMeta.canonical || `${WP_BASE_URL}/${lang}/${slug}`,
        };
    } catch (error) {
        console.error('Error fetching post metadata:', error);
        return null;
    }
}

// Menu functions
// Get menu by location (e.g., 'primary', 'footer') and language
export async function getMenuByLocation(location: string, lang: string = 'el'): Promise<Menu | null> {
    try {
        // Try custom MediaMind API endpoint first
        try {
            const menu = await fetchCustomAPI(`menu/${location}?lang=${lang}`, {
                next: { revalidate: 3600 }, // Cache for 1 hour
            });
            return menu;
        } catch (customError) {
            // If custom endpoint doesn't exist, try standard WordPress menu API
            // This requires a plugin like "WP REST API Menus" or similar
            try {
                const response = await fetch(`${WP_BASE_FETCH_URL}/menus/v1/menus/${location}?lang=${lang}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    next: { revalidate: 3600 },
                });

                if (response.ok) {
                    const menu = await response.json();
                    return menu;
                }
            } catch (standardError) {
                // Try alternative endpoint structure
                try {
                    const response = await fetch(`${WP_BASE_URL}/wp-json/wp-api-menus/v2/menus/${location}?lang=${lang}`, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        next: { revalidate: 3600 },
                    });

                    if (response.ok) {
                        const menu = await response.json();
                        return menu;
                    }
                } catch (altError) {
                    console.error('Error fetching menu:', altError);
                }
            }
        }

        return null;
    } catch (error) {
        console.error('Error fetching menu:', error);
        return null;
    }
}

// Get menu items by menu ID and language
export async function getMenuItems(menuId: number, lang: string = 'el'): Promise<MenuItem[]> {
    try {
        // Try custom MediaMind API endpoint first
        try {
            const items = await fetchCustomAPI(`menu-items/${menuId}?lang=${lang}`, {
                next: { revalidate: 3600 },
            });
            return items;
        } catch (customError) {
            // Try standard WordPress menu API
            try {
                const response = await fetch(`${WP_BASE_FETCH_URL}/menus/v1/menus/${menuId}/items?lang=${lang}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    next: { revalidate: 3600 },
                });

                if (response.ok) {
                    const items = await response.json();
                    return items;
                }
            } catch (standardError) {
                // Try alternative endpoint
                try {
                    const response = await fetch(`${WP_BASE_URL}/wp-json/wp-api-menus/v2/menus/${menuId}?lang=${lang}`, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        next: { revalidate: 3600 },
                    });

                    if (response.ok) {
                        const menu = await response.json();
                        return menu.items || [];
                    }
                } catch (altError) {
                    console.error('Error fetching menu items:', altError);
                }
            }
        }

        return [];
    } catch (error) {
        console.error('Error fetching menu items:', error);
        return [];
    }
}

// Helper function to build hierarchical menu structure
function buildMenuHierarchy(items: MenuItem[]): MenuItem[] {
    const itemMap = new Map<number, MenuItem>();
    const rootItems: MenuItem[] = [];

    // First pass: create map of all items
    items.forEach(item => {
        itemMap.set(item.id, { ...item, children: [] });
    });

    // Second pass: build hierarchy
    items.forEach(item => {
        const menuItem = itemMap.get(item.id)!;
        if (item.parent && item.parent > 0) {
            const parent = itemMap.get(item.parent);
            if (parent) {
                if (!parent.children) {
                    parent.children = [];
                }
                parent.children.push(menuItem);
            }
        } else {
            rootItems.push(menuItem);
        }
    });

    // Sort items by menu_order
    const sortByOrder = (items: MenuItem[]) => {
        items.sort((a, b) => a.menu_order - b.menu_order);
        items.forEach(item => {
            if (item.children && item.children.length > 0) {
                sortByOrder(item.children);
            }
        });
    };

    sortByOrder(rootItems);
    return rootItems;
}

// Get menu with hierarchical structure by location and language
export async function getMenuByLocationWithHierarchy(location: string, lang: string = 'el'): Promise<MenuItem[]> {
    try {
        const menu = await getMenuByLocation(location, lang);

        if (!menu) {
            return [];
        }

        let items: MenuItem[] = [];

        // If menu already has items, use them
        if (menu.items && menu.items.length > 0) {
            items = menu.items;
        } else if (menu.id) {
            // Otherwise fetch items by menu ID
            items = await getMenuItems(menu.id, lang);
        }

        // Build hierarchical structure
        return buildMenuHierarchy(items);
    } catch (error) {
        console.error('Error fetching menu with hierarchy:', error);
        return [];
    }
}

export async function sendEmail(
    form_id: string,
    form_data: Record<string, string>
): Promise<{ success: boolean; message: string; invalidFields?: Record<string, any> }> {
    try {
        // If running client-side, use Next.js API route as proxy
        // If running server-side, call WordPress directly
        const isClient = typeof window !== 'undefined';
        const apiUrl = isClient
            ? '/api/send-email'
            : `${WP_MEDIAMIND_API_BASE}/send-email`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                form_id: form_id,
                form_data: form_data
            })
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message || 'Σφάλμα κατά την αποστολή',
                invalidFields: result.invalidFields || {}
            };
        }

        if (result.success) {
            return {
                success: true,
                message: result.message || 'Το μήνυμά σας στάλθηκε επιτυχώς!'
            };
        } else {
            // Handle error response from WordPress
            const errorMsg = result.message || 'Σφάλμα κατά την αποστολή';
            const invalidFields = result.invalidFields || result.data?.invalid_fields || {};

            return {
                success: false,
                message: errorMsg,
                invalidFields
            };
        }
    } catch (error: any) {
        console.error('Error sending email:', error);
        return {
            success: false,
            message: error.message || 'Σφάλμα σύνδεσης. Παρακαλώ δοκιμάστε ξανά.'
        };
    }
}