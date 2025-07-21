import { getUserSession } from '@/components/shared/constants/get-user-session'
import { Container } from '@/components/shared/container'
import { ProfileForm } from '@/components/shared/profile-form'
import { prisma } from '@/prisma/prisma-client'
import { redirect } from 'next/navigation'

export default async function Profile() {
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
            <main className="w-full">
                <Container>
                    <ProfileForm user={user} />
                </Container>
            </main>
        </>
    )
}
