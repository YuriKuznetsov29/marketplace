import { NextResponse } from 'next/server'

let clients: { id: string; response: any }[] = []

export async function GET(request: Request, { params }: { params: { chatId: string } }) {
    const { chatId } = params
    const response = new NextResponse(null, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
        },
    })

    const clientId = crypto.randomUUID()
    clients.push({ id: clientId, response })

    request.signal.addEventListener('abort', () => {
        clients = clients.filter((client) => client.id !== clientId)
    })

    return response
}

export function sendSSEMessage(chatId: string, message: string) {
    clients
        .filter((client) => client.id)
        .forEach((client) => {
            client.response.write(`data: ${message}\n\n`)
        })
}
