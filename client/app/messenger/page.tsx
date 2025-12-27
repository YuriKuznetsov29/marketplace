import { Container } from '@/widgets/container'
import { getUserSession } from '@/shared/constants'
import { prisma } from '@/prisma/prisma-client'
import { redirect } from 'next/navigation'
import { Messenger } from '@/features/messenger'

export default async function MessengerPage() {
    const session = await getUserSession()

    if (!session) {
        return redirect('/not-auth')
    }

    const chats = await prisma.chat.findMany({
        where: { members: { some: { userId: session.id } } },
        include: {
            members: { include: { user: true } },
            messages: { orderBy: { createdAt: 'desc' }, take: 1 },
        },
        orderBy: { createdAt: 'desc' },
    })

    return (
        <>
            <main className="w-full">
                <Container className="py-8 flex flex-col gap-4  px-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold">Мессенджер</h1>
                    </div>
                    <Messenger chats={chats} currentUserId={session.id} />
                </Container>
            </main>
        </>
    )
}
