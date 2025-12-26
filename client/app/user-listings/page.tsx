import { CarListing } from '@/entities/listing/ui/car-listing'
import { getUserSession } from '@/shared/constants/get-user-session'
import { Container } from '@/widgets/container/container'
import { Header } from '@/widgets/header/ui/header'
import { prisma } from '@/prisma/prisma-client'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function UserListings() {
    const session = await getUserSession()

    if (!session) {
        return redirect('/not-auth')
    }

    const user = await prisma.user.findFirst({ where: { id: session?.id } })

    if (!user) {
        return redirect('/not-auth')
    }

    const listings = await prisma.listing.findMany({
        where: { seller: { id: user.id } },
        include: {
            brand: true,
            model: true,
            city: true,
        },
    })

    return (
        <>
             />
            <Container className="py-8 px-4">
                <div className="w-full flex flex-col md:grid  md:grid-cols-3 gap-4">
                    {listings.length > 0 &&
                        listings.map((listing) => (
                            <CarListing changeListing key={listing.id} listing={listing} />
                        ))}
                </div>
            </Container>
        </>
    )
}
