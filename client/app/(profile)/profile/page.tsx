import { getUserSession } from '@/shared/constants/get-user-session'
import { Container } from '@/widgets/container/container'
import { ProfileForm } from '@/shared/profile-form'
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
