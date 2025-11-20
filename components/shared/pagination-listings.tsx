import { FiltersReturnProps } from '@/hooks/useFilters'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../ui/pagination'

interface PaginationListings {
    totalPages: number
    filters: FiltersReturnProps
}

export const PaginationListings = ({ totalPages, filters }: PaginationListings) => {
    const { page, setPage } = filters

    const getPageNumbers = () => {
        const maxVisible = 3
        let start = Math.max(1, page - Math.floor(maxVisible / 2))
        let end = start + maxVisible - 1

        if (end > totalPages) {
            end = totalPages
            start = Math.max(1, end - maxVisible + 1)
        }

        const pages = []
        for (let i = start; i <= end; i++) pages.push(i)
        return pages
    }

    const pages = getPageNumbers()

    const handlePrev = () => {
        if (page > 1) setPage(page - 1)
    }

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1)
    }

    return (
        <Pagination className="col-span-full">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={handlePrev} />
                </PaginationItem>

                {pages[0] > 1 && (
                    <>
                        <PaginationItem>
                            <PaginationLink onClick={() => setPage(1)}>{1}</PaginationLink>
                        </PaginationItem>
                        {pages[0] > 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                    </>
                )}
                {pages.map((num) => (
                    <PaginationItem key={num}>
                        <PaginationLink onClick={() => setPage(num)} isActive={page === num}>
                            {num}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {pages[pages.length - 1] < totalPages && (
                    <>
                        {pages[pages.length - 1] < totalPages - 1 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink onClick={() => setPage(totalPages)}>
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <PaginationNext onClick={handleNext} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
