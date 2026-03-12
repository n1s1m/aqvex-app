import { use } from "react";

import type { Product as ProductType } from "@/shared/types/types";
import { Product } from "./product";


export function ProductsList({ productsPromise }: { productsPromise: Promise<ProductType[]> }) {
    const products = use(productsPromise);
    return (
        <div className="grid gap-5 w-full mt-5 grid-cols-[minmax(0,350px)_minmax(0,350px)_minmax(0,350px)_minmax(0,350px)] max-sm:flex max-sm:flex-wrap max-sm:justify-center max-sm:items-center max-sm:flex-col">
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
            {products.length === 0 && (
                <div className="flex items-center justify-center w-full h-100 col-span-4 py-10">
                    <p className="text-primary text-xl">По вашему запросу ничего не найдено</p>
                </div>
            )}
        </div>
    );
}
