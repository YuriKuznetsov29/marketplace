'use client'

import { Listing } from '@prisma/client'
import { CarListing } from './car-listing'

interface ListingsListProps {
    listings: Listing[]
}

export const ListingsList = ({ listings }: ListingsListProps) => {
    return (
        <>
            {listings?.length > 0 &&
                listings.map((listing, i) => <CarListing key={i} listing={listing} />)}
        </>
    )
}
