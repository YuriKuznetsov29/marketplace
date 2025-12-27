import { Container } from '@/widgets/container'
import { prisma } from '@/prisma/prisma-client'
import { redirect } from 'next/navigation'
import { getUserSession } from '@/shared/constants'
import { Chat } from '@/features/messenger'

interface Params {
    params: Promise<{
        id: string
    }>
}

export default async function ChatPage({ params }: Params) {
    const { id } = await params

    const session = await getUserSession()

    if (!session) {
        return redirect('/not-auth')
    }

    const messages = await prisma.message.findMany({ where: { chatId: id } })

    return (
        <>
            <main className="w-full">
                <Container className="py-8">
                    <Chat chatId={id} userId={session.id} lastMessages={messages} />
                </Container>
            </main>
        </>
    )
}
