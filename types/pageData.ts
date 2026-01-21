import { ACFButton, ACFFile, ACFImage, PostItem, Taxonomy } from "./acf";

export interface HeroSectionData {
    image: ACFImage;
    title: string;
    title_part_2: string;
    text: string;
    button: ACFButton;
    video_poster: ACFImage;
    video_url: string;
    clients_image: ACFImage;
    clients_text: string;
}

export interface AboutSectionData {
    title: string;
    subtitle: string;
    counter: string;
    counter_text: string;
    image_2: ACFImage;
    text: string;
    link: ACFButton;
}

export interface ServicesSectionData {
    title: string;
    subtitle: string;
    services: ServicesPostItem[]
    button: ACFButton;
}

export interface ServicesPostItem extends PostItem {
    acf: {
        icon: ACFFile;
        short_description: string;
        long_description: string;
    }
}

export interface ProjectsPostItem extends Omit<PostItem, 'taxonomies'> {
    taxonomies: {
        'project-category': Taxonomy[]
    }
}

export interface ProjectsSectionData {
    marquee_text: string;
    title: string;
    subtitle: string;
    projects: ProjectsPostItem[];
    button: ACFButton;
}

export interface TestimonialsSectionData {
    image: ACFImage;
    title: string;
    subtitle: string;
    testimonials: Testimonial[];
}

export interface Testimonial {
    name: string;
    platform?: string;
    text: string;
}


export interface HomepageDataInterface {
    acf: {
        hero: HeroSectionData;
        marquee_text: string;
        about_us: AboutSectionData;
        banner: ACFImage;
        services: ServicesSectionData;
        projects: ProjectsSectionData;
        testimonials: TestimonialsSectionData;
    }
}

export interface AboutPageDataInterface {
    acf: {
        hero_section: DefaultHeroSectionData;
        about_us: AboutPageAboutUsSectionData;
        services: AboutPageServicesSectionData;
    }
}

export interface DefaultHeroSectionData {
    title: string;
    subtitle: string;
    background_image: ACFImage;
}

export interface AboutPageAboutUsSectionData {
    title: string;
    subtitle: string;
    text: string;
    image: ACFImage;
    services: {
        title: string;
    }[]
}

export interface AboutPageServicesSectionData {
    title: string;
    subtitle: string;
    text: string;
    link: ACFButton;
}

export interface ProjectsPageDataInterface {
    acf: {
        hero_section: DefaultHeroSectionData;
        projects: ProjectsPostItem[];
    }
}

export interface ServicesPageDataInterface {
    acf: {
        hero_section: DefaultHeroSectionData;
        services: ServicesPostItem[];
        marquee_text: string;
    }
}

export interface ContactPageDataInterface {
    acf: {
        hero_section: DefaultHeroSectionData;
    }
}

export interface ProjectSinglePageDataInterface {
    title: string;
    slug: string;
    acf: {
        title: string;
        intro_text: string;
        gallery_source: {
            formatted_value: string[]
        }
        after_gallery_text: string;
        live_url?: string;
    };
    yoast_head_json?: {
        title?: string;
        description?: string;
        og_title?: string;
        og_description?: string;
        og_image?: Array<{ url?: string; width?: number; height?: number }>;
        twitter_card?: string;
        canonical?: string;
    };
    _embedded?: {
        'wp:term'?: Taxonomy[][];
    };
    'project-category'?: number[];
}