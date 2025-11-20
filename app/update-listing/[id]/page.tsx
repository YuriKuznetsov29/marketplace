import { getUserSession } from '@/components/shared/constants/get-user-session'
import { Container } from '@/components/shared/container'
import { Header } from '@/components/shared/header'
import { UpdateListingForm } from '@/components/shared/update-listing-form'
import { prisma } from '@/prisma/prisma-client'
import { redirect } from 'next/navigation'

export default async function UpdateListingPage({ params }: { params: { id: string } }) {
    const { id } = params

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
            <Header />
            <Container>
                <UpdateListingForm listing={listing} />{' '}
            </Container>
        </>
    )
}
