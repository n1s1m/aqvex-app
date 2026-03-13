import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { useSearch } from "@/shared/hooks/use-search";
import { useSort } from "@/shared/hooks/use-sort";
import { useProducts } from "@/shared/hooks/use-products";
import type { Sort } from "@/shared/types/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Image, Input } from "@/shared/ui";

import { ProductsPagination } from "./products-pagination";
import { ProductsList } from "./products-list";
import { Search } from "lucide-react";
import { ProductsTotal } from "./products-total";

export function Content() {
    const {
        paginatedProductsPromise,
        refetchProducts,
        defaultSort,
        defaultSearch,
    } = useProducts({
        search: "",
    });

    const { search, handleChangeSearch } = useSearch(defaultSearch, (search) =>
        refetchProducts({ search, page: 1, sort: sort as Sort })
    );

    const { sort, handleChangeSort } = useSort(defaultSort, (sort) =>
        refetchProducts({ sort: sort as Sort, page: 1, search })
    );

    const onPageChange = async (newPage: number) => {
        refetchProducts({ page: newPage, search, sort: sort as Sort });
    };

    const productsPromise = useMemo(
        () => paginatedProductsPromise.then((r) => r.data),
        [paginatedProductsPromise]
    );

    return <div className="content-container">
        <div className="flex gap-2 flex-col justify-end items-end max-sm:px-4">
            <div className="relative w-full max-w-md mb-5">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <Input
                    placeholder="Поиск"
                    type="text"
                    className="w-full text-primary h-11 pl-13"
                    value={search}
                    onChange={handleChangeSearch}
                />
            </div>
            <div className="flex w-full justify-between items-center">
                <Suspense fallback={<div>Loading...</div>}>
                    <ProductsTotal productsPaginated={paginatedProductsPromise} />
                </Suspense>
                <div className="flex gap-2.5 items-center">
                    <Image src="/sort-icon.svg" alt="sort" width={16} height={16} />
                    <Select
                        value={sort}
                        onValueChange={handleChangeSort}
                    >
                        <SelectTrigger className="max-w-md text-primary border-none">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="rating">По популярности</SelectItem>
                            <SelectItem value="price">По цене</SelectItem>
                            <SelectItem value="name">По названию</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </div>

        </div>
        <div className="flex flex-wrap justify-start items-center flex-col">
            <ErrorBoundary
                fallbackRender={(e) => (
                    <div className="text-red-500">
                        Something went wrong:{JSON.stringify(e)}{" "}
                    </div>
                )}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <ProductsList productsPromise={productsPromise} />
                    <ProductsPagination productsPaginated={paginatedProductsPromise} onPageChange={onPageChange} />
                </Suspense>
            </ErrorBoundary>
        </div>
    </div>;
}