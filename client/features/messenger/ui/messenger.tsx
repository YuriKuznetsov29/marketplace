import Link from 'next/link'
import { Chat, ChatMember, Message, User } from '@prisma/client'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type ChatWithData = Chat & {
    members: (ChatMember & { user: User })[]
    messages: Message[]
}

interface MessengerProps {
    chats: ChatWithData[]
    currentUserId: string
}

export const Messenger = ({ chats, currentUserId }: MessengerProps) => {
    if (chats.length === 0) {
        return (
            <Card className="p-6 text-muted-foreground text-sm">
                Здесь появятся ваши диалоги. Начните чат, чтобы увидеть список.
            </Card>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            {chats.map((chat) => {
                const companion = chat.members.find((m) => m.userId !== currentUserId)?.user
                const companionName = companion?.name ?? 'Собеседник'
                const lastMessage = chat.messages[0]

                return (
                    <Link key={chat.id} href={`/chat/${chat.id}`} className="group">
                        <Card
                            className={cn(
                                'p-4 transition-all duration-200 border bg-card hover:shadow-md'
                            )}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-base truncate">
                                            {companionName}
                                        </span>
                                        {chat.name && (
                                            <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                                                {chat.name}
                                            </span>
                                        )}
                                    </div>
                                    {lastMessage ? (
                                        <p className="text-sm text-muted-foreground truncate mt-1">
                                            {lastMessage.text}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Пока нет сообщений
                                        </p>
                                    )}
                                </div>
                                <div className="text-xs text-muted-foreground whitespace-nowrap">
                                    {lastMessage
                                        ? new Date(lastMessage.createdAt).toLocaleTimeString(
                                              'ru-RU',
                                              {
                                                  hour: '2-digit',
                                                  minute: '2-digit',
                                              }
                                          )
                                        : ''}
                                </div>
                            </div>
                        </Card>
                    </Link>
                )
            })}
        </div>
    )
}
