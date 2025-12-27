import { getUserSession } from '@/shared/constants'
import { Container } from '@/widgets/container'
import { UpdateListingForm } from '@/features/listing-form'
import { prisma } from '@/prisma/prisma-client'
import { redirect } from 'next/navigation'

interface UpdateListingPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function UpdateListingPage({ params }: UpdateListingPageProps) {
    const { id } = await params

    const session = await getUserSession()

    if (!session) {
        return redirect('/not-auth')
    }

    const listing = await prisma.listing.findFirst({
        where: { AND: [{ id: id }, { sellerId: session?.id }] },
        include: {
            brand: true,
            model: true,
        },
    })

    if (!listing) {
        return redirect('/not-auth')
    }

    return (
        <>
            <Container>
                <UpdateListingForm listing={listing} />{' '}
            </Container>
        </>
    )
}
