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
import { formatTime, renderMessageText } from '../lib/helpers'

const baseURL =
    process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_CHAT_API_URL
        : process.env.NEXT_PUBLIC_CHAT_API_URL_PROD

type ChatMessage = Message & { senderId?: string }

interface ChatProps {
    chatId: string
    userId: string
    lastMessages: ChatMessage[]
}

export function Chat({ chatId, userId }: ChatProps) {
    const [cursor, setCursor] = useState<string | null>(null)
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [text, setText] = useState('')
    const [isSending, setIsSending] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const messagesStartRef = useRef<HTMLDivElement>(null)
    const messagesContainerRef = useRef<HTMLDivElement>(null)
    const firstMessageRef = useRef<HTMLDivElement>(null)
    const didInitialFetch = useRef(false)
    const isPaginationRef = useRef(false)

    const messageLimit = 20

    useInfiniteScroll({
        wrapperRef: messagesContainerRef,
        triggerRef: messagesStartRef,
        callback: () => {
            if (messages.length === 0) return
            setCursor(messages[0].id)
        },
    })

    const companionId =
        messages.find((m) => (m.senderId ?? m.userId) !== userId)?.senderId ??
        messages.find((m) => m.userId !== userId)?.userId
    const companionName = companionId ? `Собеседник ${companionId.slice(0, 6)}` : 'Собеседник'

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }

    useEffect(() => {
        if (cursor === null && didInitialFetch.current) return

        if (cursor === null) {
            didInitialFetch.current = true
        }

        getMessages(chatId, cursor, messageLimit).then((messages) => {
            setMessages((prev) => [...messages, ...prev])
            firstMessageRef.current?.scrollIntoView()
            isPaginationRef.current = true
        })
    }, [cursor])

    useEffect(() => {
        if (messages.length === messageLimit) scrollToBottom()

        if (isPaginationRef.current) {
            isPaginationRef.current = false
            return
        }

        scrollToBottom()
    }, [messages])

    useEffect(() => {
        const es = new EventSource(`${baseURL}chat/${chatId}/stream`)

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
            await fetch(`${baseURL}chat/${chatId}/send`, {
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
                <CardTitle className="text-xl font-semibold">{companionName}</CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 bg-muted/30">
                    <div ref={messagesStartRef} />
                    {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            <p className="text-sm">Пока нет сообщений. Начните общение!</p>
                        </div>
                    ) : (
                        messages.map((m, i) => {
                            const messageSenderId = m.senderId ?? m.userId
                            const isOwnMessage = messageSenderId === userId
                            return (
                                <div
                                    ref={i === 0 ? firstMessageRef : undefined}
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
                                                {formatTime(m.createdAt)}
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
