import { use } from "react";

import type { PaginatedResponse } from "@/shared/types/types";

export function ProductsTotal<T>({ productsPaginated }: { productsPaginated: Promise<PaginatedResponse<T>> }) {
    const { total } = use(productsPaginated);
    return (
        <p className="text-secondary text-base font-medium">{ total } товаров</p>
    );

}