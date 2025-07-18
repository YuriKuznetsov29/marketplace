import { getUserSession } from '@/components/shared/constants/get-user-session'
import { Container } from '@/components/shared/container'
import { ListingForm } from '@/components/shared/listing-form'
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

    return (
        <Container>
            <ListingForm />
        </Container>
    )
}
