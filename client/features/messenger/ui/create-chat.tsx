'use client'
import { createChat } from '@/services/chat'
import { Button } from '../../../components/ui/button'
import { CardFooter } from '../../../components/ui/card'
import { useRouter } from 'next/navigation'

interface CreateChatProps {
    userId1?: string
    userId2: string
}
export const CreateChat = ({ userId1, userId2 }: CreateChatProps) => {
    const router = useRouter()

    const handleCreateChat = async () => {
        if (userId1) {
            const chat = await createChat({ user1: userId1, user2: userId2 })
            router.push(`/chat/${chat.id}`)
        } else {
            router.push('/not-auth')
        }
    }

    return (
        <CardFooter>
            <Button className="w-full" onClick={handleCreateChat}>
                Связаться с продавцом
            </Button>
        </CardFooter>
    )
}
