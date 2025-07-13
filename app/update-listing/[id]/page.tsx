import { getUserSession } from '@/components/shared/constants/get-user-session'
import { UpdateListingForm } from '@/components/shared/update-listing-form'
import { prisma } from '@/prisma/prisma-client'
import { Container } from 'lucide-react'
import { redirect } from 'next/navigation'

interface Params {
    id: string
}
export default async function UpdateListingPage(params: Promise<Params>) {
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
        <Container>
            <UpdateListingForm />
        </Container>
    )
}
