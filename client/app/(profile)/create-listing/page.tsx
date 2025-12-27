import React from 'react'
import { getUserSession } from '@/shared/constants'
import { Container } from '@/widgets/container/'
import { ListingForm } from '@/features/listing-form'
import { prisma } from '@/prisma/prisma-client'
import { redirect } from 'next/navigation'

export default async function CreateListing() {
    const session = await getUserSession()

    if (!session) {
        return redirect('/not-auth')
    }

    const user = await prisma.user.findFirst({ where: { id: session?.id } })

    if (!user) {
        return redirect('/not-auth')
    }

    return (
        <Container>
            <ListingForm />
        </Container>
    )
}
