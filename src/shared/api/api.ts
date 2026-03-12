import type { PaginatedResponse, Product as ProductType } from "../types/types";

const getPages = (total: number, per_page: number) => {
    return Math.ceil(total / per_page);
}

export function fetchProducts({
    page = 1,
    per_page = 10,
    sort = 'rating',
    search,
}: {
    page?: number;
    per_page?: number;
    search?: string;
    sort?: 'rating' | 'price' | 'name';
}) {
    return fetch(`/mock-data.json`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((res) => res.json())
        .then((res) => (res.data.products || [] as ProductType[])
            .filter((product: ProductType) => product.name.toLowerCase().includes(search?.toLowerCase() || ''))
            .sort((a: ProductType, b: ProductType) => {
                if (sort === 'rating') {
                    return b.rating - a.rating;
                }
                if (sort === 'price') {
                    return b.price - a.price;
                }
                return a.name.localeCompare(b.name);
            }))
        .then((res) => ({ data: [...res.slice((page - 1) * per_page, page * per_page)], page, pages: Array.from({ length: getPages(res.length, per_page) }, (_, i) => i + 1), total_pages: getPages(res.length, per_page), total: res.length, per_page }) as PaginatedResponse<ProductType>);
}