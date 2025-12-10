'use client'
import { Message } from '@prisma/client'
import React, { useEffect, useState, useRef } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { getMessages } from '@/app/api/actions'

type ChatMessage = Message & { senderId?: string }

interface ChatProps {
    chatId: string
    userId: string
    lastMessages: ChatMessage[]
}

export default function Chat({ chatId, userId, lastMessages }: ChatProps) {
    const URL_REGEX = /(https?:\/\/[^\s]+)/gi

    const [cursor, setCursor] = useState<string | null>(null)
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [text, setText] = useState('')
    const [isSending, setIsSending] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const messagesStartRef = useRef<HTMLDivElement>(null)
    const messagesContainerRef = useRef<HTMLDivElement>(null)

    useInfiniteScroll({
        wrapperRef: messagesContainerRef,
        triggerRef: messagesStartRef,
        callback: () => setCursor(messages[messages.length - 1].id),
    })

    const companionId =
        messages.find((m) => (m.senderId ?? m.userId) !== userId)?.senderId ??
        messages.find((m) => m.userId !== userId)?.userId
    const companionName = companionId ? `Собеседник ${companionId.slice(0, 6)}` : 'Собеседник'
    const lastMessage = messages[messages.length - 1]

    const formatTime = (date?: Date | string) => {
        if (!date) return ''
        return new Date(date).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const renderMessageText = (content: string) => {
        return content.split(URL_REGEX).map((part, index) => {
            const isUrl = /^https?:\/\/\S+$/i.test(part)

            if (isUrl) {
                return (
                    <a
                        key={`url-${part}-${index}`}
                        href={part}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary underline underline-offset-2 break-all hover:text-primary/80 transition-colors"
                    >
                        {part}
                    </a>
                )
            }

            return (
                <span key={`text-${index}`} className="break-words">
                    {part}
                </span>
            )
        })
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        getMessages(chatId, cursor).then((messages) => {
            console.log(messages)
            setMessages((prev) => [...prev, ...messages])
        })
    }, [cursor])

    // useEffect(() => {
    //     scrollToBottom()
    // }, [messages])

    useEffect(() => {
        const es = new EventSource(`${process.env.NEXT_PUBLIC_CHAT_API_URL}chat/${chatId}/stream`)

        es.onmessage = (e) => {
            const message = JSON.parse(e.data)
            setMessages((prev) => [...prev, message])
        }

        return () => es.close()
    }, [chatId])

    const sendMessage = async () => {
        if (!text.trim() || isSending) return

        setIsSending(true)
        try {
            await fetch(`${process.env.NEXT_PUBLIC_CHAT_API_URL}chat/${chatId}/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, senderId: userId }),
            })
            setText('')
        } finally {
            setIsSending(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <Card className="flex flex-col h-[600px] w-full max-w-2xl mx-auto shadow-lg">
            <CardHeader className="border-b pb-4">
                <div className="flex flex-col gap-1">
                    <CardTitle className="text-xl font-semibold">{companionName}</CardTitle>
                    {lastMessage && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="truncate max-w-[220px]">{lastMessage.text}</span>
                            <span className="text-xs text-muted-foreground/80">•</span>
                            <span className="text-xs">{formatTime(lastMessage.createdAt)}</span>
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 bg-muted/30">
                    <div ref={messagesStartRef} />
                    {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            <p className="text-sm">Пока нет сообщений. Начните общение!</p>
                        </div>
                    ) : (
                        messages.map((m) => {
                            const messageSenderId = m.senderId ?? m.userId
                            const isOwnMessage = messageSenderId === userId
                            return (
                                <div
                                    key={m.id}
                                    className={cn(
                                        'flex w-full mb-2',
                                        isOwnMessage ? 'justify-end' : 'justify-start'
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm transition-all duration-200',
                                            isOwnMessage
                                                ? 'bg-primary text-primary-foreground rounded-br-sm ml-auto'
                                                : 'bg-card text-card-foreground border rounded-bl-sm mr-auto'
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                'text-xs font-semibold mb-1.5 opacity-80',
                                                isOwnMessage
                                                    ? 'text-primary-foreground/90 text-right'
                                                    : 'text-muted-foreground text-left'
                                            )}
                                        >
                                            {isOwnMessage ? companionName : 'Вы'}
                                        </div>
                                        <div className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                                            {renderMessageText(m.text)}
                                        </div>
                                        {m.createdAt && (
                                            <div
                                                className={cn(
                                                    'text-xs mt-1.5 opacity-70',
                                                    isOwnMessage ? 'text-right' : 'text-left'
                                                )}
                                            >
                                                {new Date(m.createdAt).toLocaleTimeString('ru-RU', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="border-t p-4 bg-background">
                    <div className="flex gap-2">
                        <Input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Введите сообщение..."
                            className="flex-1"
                            disabled={isSending}
                        />
                        <Button
                            onClick={sendMessage}
                            disabled={!text.trim() || isSending}
                            size="icon"
                            className="shrink-0"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
