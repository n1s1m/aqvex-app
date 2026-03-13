import { use, useTransition } from "react";

import type { PaginatedResponse } from "@/shared/types/types";
import { PaginationLink, PaginationNext, PaginationPrevious } from "@/shared/ui";

export function ProductsPagination<T>({ productsPaginated, onPageChange }: { productsPaginated: Promise<PaginatedResponse<T>>, onPageChange: (page: number) => void }) {
    const [isLoading, _startTransition] = useTransition();
    const { total_pages, page: currentPage, pages } = use(productsPaginated);
    if (total_pages <= 1) return null;
    return (
        <nav className="flex items-center justify-center gap-2 flex-row mt-8 mb-16">
            <PaginationPrevious
                size="md"
                className="w-11.5"
                disabled={currentPage <= 1 || isLoading}
                text=""
                onClick={() => onPageChange(currentPage - 1)}
            />
            {pages.map((page) => (
                <PaginationLink key={page} size="md" className="w-11.5" isActive={page === currentPage} disabled={isLoading} onClick={() => onPageChange(page)} >
                    {page}
                </PaginationLink>
            ))}
            <PaginationNext
                size="md"
                className="w-11.5"
                disabled={currentPage >= total_pages || isLoading}
                text=""
                onClick={() => onPageChange(currentPage + 1)}
            />
        </nav>
    );

}