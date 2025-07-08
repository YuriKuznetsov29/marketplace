import { CarListing } from '@/components/shared/car-listing'
import { getUserSession } from '@/components/shared/constants/get-user-session'
import { Container } from '@/components/shared/container'
import { Filters } from '@/components/shared/filters'
import { Header } from '@/components/shared/header'
import { ProfileForm } from '@/components/shared/profile-form'
import { Search } from '@/components/shared/search'
import { findCars, GetSearchParams } from '@/lib/find-cars'
import { prisma } from '@/prisma/prisma-client'
import { redirect } from 'next/navigation'

export default async function Profile({
    searchParams,
}: {
    searchParams: Promise<GetSearchParams>
}) {
    const session = await getUserSession()

    if (!session) {
        return redirect('/not-auth')
    }

    const user = await prisma.user.findFirst({ where: { id: session?.id } })

    if (!user) {
        return redirect('/not-auth')
    }

    return (
        <>
            <Header />
            <main className="w-full">
                <Container>
                    <ProfileForm user={user} />
                </Container>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </>
    )
}
