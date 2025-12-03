'use client'
import { useEffect, useState } from 'react'

export default function Chat({ chatId, userId }: { chatId: string; userId: string }) {
    const [messages, setMessages] = useState<{ id: string; text: string }[]>([])
    const [text, setText] = useState('')

    useEffect(() => {
        const evtSource = new EventSource(`/api/chats/${chatId}/stream`)

        evtSource.onmessage = (e) => {
            const msg = JSON.parse(e.data)
            setMessages((prev) => [...prev, msg])
        }

        return () => evtSource.close()
    }, [chatId])

    const sendMessage = async () => {
        const res = await fetch(`/api/chats/${chatId}/messages`, {
            method: 'POST',
            body: JSON.stringify({ senderId: userId, text }),
            headers: { 'Content-Type': 'application/json' },
        })
        const msg = await res.json()
        setMessages((prev) => [...prev, msg])
        setText('')
    }

    return (
        <div>
            <div className="messages">
                {messages.map((m) => (
                    <div key={m.id}>{m.text}</div>
                ))}
            </div>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}
