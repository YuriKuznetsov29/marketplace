import { Container } from '@/widgets/container'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'
import { ListingDetail } from '@/entities/listing'

interface Params {
    params: Promise<{
        id: string
    }>
}

export default async function ListingPage({ params }: Params) {
    const { id } = await params

    const listing = await prisma.listing.findFirst({
        where: { id },
        include: {
            brand: true,
            model: true,
            seller: {
                select: {
                    id: true,
                    name: true,
                    phone: true,
                },
            },
            city: true,
        },
    })

    if (!listing) {
        notFound()
    }

    return (
        <>
            <main className="w-full">
                <Container className="py-8 px-4">
                    <ListingDetail listing={listing} />
                </Container>
            </main>
        </>
    )
}
