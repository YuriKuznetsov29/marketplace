import { Container } from '@/components/shared/container'
import { Header } from '@/components/shared/header'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'
import { ListingDetail } from '@/components/shared/listing-detail'

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
        },
    })

    if (!listing) {
        notFound()
    }

    return (
        <>
            <Header />
            <main className="w-full">
                <Container className="py-8">
                    <ListingDetail listing={listing} />
                </Container>
            </main>
        </>
    )
}
