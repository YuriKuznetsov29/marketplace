import { Listing } from '@prisma/client'
import { GetSearchParams } from '@/lib/find-cars'
import { useEffect, useRef, useState } from 'react'
import { Api } from '@/services/api-client'
import { CarListing } from './car-listing'
import { CarListingSkeleton } from './car-listing-skeleton'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export const ListingsList = ({ searchParams }: { searchParams: Promise<GetSearchParams> }) => {
    const [listings, setListings] = useState<Listing[] | []>([])
    const [cursor, setCursor] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const triggerRef = useRef<HTMLDivElement>(null)

    useInfiniteScroll({
        callback: loadMore,
        triggerRef: triggerRef,
        wrapperRef: null,
    })

    async function loadMore() {
        try {
            setLoading(true)
            const params = {
                ...(await searchParams),
                cursor,
                limit: 12,
            }
            const newListings = await Api.listing.getListings(params)
            setListings([...listings, ...newListings])
            setCursor(newListings[newListings.length - 1].id)
            setLoading(false)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadMore()
    }, [])

    return (
        <>
            {listings.length > 0 &&
                listings.map((listing) => <CarListing key={listing.id} listing={listing} />)}
            {loading && (
                <>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <CarListingSkeleton key={`skeleton-${i}`} />
                    ))}
                </>
            )}
            <div ref={triggerRef} />
        </>
    )
}
