export interface MenuItem {
    id: number;
    title: string;
    url: string;
    slug?: string;
    type: string; // 'post_type', 'taxonomy', 'custom', etc.
    object?: string;
    object_id?: number;
    parent?: number;
    menu_order: number;
    children?: MenuItem[];
}

export interface Menu {
    id: number;
    name: string;
    slug: string;
    items: MenuItem[];
}
