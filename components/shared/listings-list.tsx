'use client'

import { Listing } from '@prisma/client'
import { GetSearchParams } from '@/lib/find-cars'
import { useEffect, useRef, useState } from 'react'
import { Api } from '@/services/api-client'
import { CarListing } from './car-listing'
import { CarListingSkeleton } from './car-listing-skeleton'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useSearchParams } from 'next/navigation'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../ui/pagination'

interface ListingsListProps {
    listings: Listing[]
}

export const ListingsList = ({ listings }: ListingsListProps) => {
    // const [listings, setListings] = useState<Listing[] | []>([])
    // const [cursor, setCursor] = useState<string | null>(null)
    // const [loading, setLoading] = useState(false)
    // const [page, setPage] = useState(1)
    // const [total, setTotal] = useState(0)
    // const triggerRef = useRef<HTMLDivElement>(null)

    // useInfiniteScroll({
    //     callback: loadMore,
    //     triggerRef: triggerRef,
    //     wrapperRef: null,
    // })
    // const searchParams = useSearchParams()

    // async function loadMore() {
    //     try {
    //         setLoading(true)
    //         const params = {
    //             brands: searchParams.get('brands') || undefined,
    //             models: searchParams.get('models') || undefined,
    //             priceFrom: searchParams.get('priceFrom') || undefined,
    //             priceTo: searchParams.get('priceTo') || undefined,
    //             mileageFrom: searchParams.get('mileageFrom') || undefined,
    //             mileageTo: searchParams.get('mileageTo') || undefined,
    //             yearFrom: searchParams.get('yearFrom') || undefined,
    //             yearTo: searchParams.get('yearTo') || undefined,
    //             fuelType: searchParams.get('fuelType') || undefined,
    //             gearbox: searchParams.get('gearbox') || undefined,
    //             query: searchParams.get('query') || undefined,
    //             cursor,
    //             page: page,
    //             limit: 12,
    //         }

    //         const { listing, totalPages } = await Api.listing.getListings(params)
    //         setListings(listing)
    //         setTotal(totalPages)
    //         // setCursor(newListings[newListings.length - 1].id)
    //         setLoading(false)
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     loadMore()
    // }, [page])

    return (
        <>
            {listings.length > 0 &&
                listings.map((listing, i) => <CarListing key={i} listing={listing} />)}
            {/* {loading && (
                <>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <CarListingSkeleton key={`skeleton-${i}`} />
                    ))}
                </>
            )} */}
        </>
    )
}
