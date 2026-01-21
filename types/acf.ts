type ImageSize = {
    [key: string]: string | number;
};

export interface ACFImage {
    id: number;
    title: string;
    filename: string;
    filesize: number;
    url: string;
    link: string;
    alt: string;
    author: string;
    description: string;
    caption: string;
    name: string;
    status: string;
    uploaded_to: number;
    date: string;
    modified: string;
    menu_order: number;
    mime_type: string;
    type: string;
    subtype: string;
    icon: string;
    width: number;
    height: number;
    sizes: ImageSize;
}

export interface ACFButton {
    title: string;
    url: string;
    target: string;
}

export interface PostItem {
    ID: number;
    post_title: string;
    post_name: string;
    menu_order: number;
    post_type: string;
    featured_image_url: string;
    taxonomies: Taxonomy[];
}

export interface Taxonomy {
    count: number;
    description: string;
    name: string
    parent: number
    slug: string
    taxonomy: string;
    term_id: number
}

export interface ACFOptionsLogo {
    ID: number;
    alt: string;
    url: string;
    height: number;
    width: number;
}


export interface ACFContactSectionData {
    title: string;
    title_en: string;
    subtitle: string;
    subtitle_en: string;
    text: string;
    text_en: string;
    background_image: ACFImage;
}

export interface ACFOptions {
    logo: ACFOptionsLogo;
    footer_text_en: string;
    footer_text_el: string;
    social_media: ACFSocialMediaOption[];
    email: string;
    tel: string;
    contact: ACFContactSectionData;
}

export interface ACFSocialMediaOption {
    icon: ACFFile;
    url: string;
}

export interface ACFFile {
    ID: number;
    alt: string;
    author: string;
    caption: string;
    date: string;
    description: string;
    filename: string;
    filesize: number;
    height: number;
    icon: string;
    id: number;
    link: string;
    menu_order: number;
    mime_type: string;
    modified: string;
    name: string;
    sizes: {
        '1536x1536': string;
        '1536x1536-height': number;
        '1536x1536-width': number;
        '2048x2048': string;
        '2048x2048-height': number;
        '2048x2048-width': number;
        large: string;
        'large-height': number;
        'large-width': number;
        medium: string;
        'medium-height': number;
        'medium-width': number;
        medium_large: string;
        'medium_large-height': number;
        'medium_large-width': number;
        thumbnail: string;
        'thumbnail-height': number;
        'thumbnail-width': number;
    };
    status: string;
    subtype: string;
    title: string;
    type: string;
    uploaded_to: number;
    url: string;
    width: number;
}