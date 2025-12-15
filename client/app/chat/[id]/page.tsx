import { Container } from '@/components/shared/container'
import { Header } from '@/components/shared/header'
import { prisma } from '@/prisma/prisma-client'
import { redirect } from 'next/navigation'
import { getUserSession } from '@/components/shared/constants/get-user-session'
import Chat from '@/components/shared/chat/chat'

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
            <Header />
            <main className="w-full">
                <Container className="py-8">
                    <Chat chatId={id} userId={session.id} lastMessages={messages} />
                </Container>
            </main>
        </>
    )
}
