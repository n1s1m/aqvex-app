interface PaginatedResponse<T> {
    data: T[];
    page: number;
    pages: number[];
    per_page: number;
    total: number;
    total_pages: number;
}

interface Product {
    category: string;
    currency: string;
    discount_percent: number;
    id: string;
    image: string;
    in_stock: boolean;
    name: string;
    old_price: number;
    price: number;
    rating: number;
    reviews_count: number;
    selected_volume_id: string;
    slug: string;
    volumes: { id: string; label: string; in_stock: boolean }[];
}

type Sort = "rating" | "price" | "name";

export type { PaginatedResponse, Product, Sort };