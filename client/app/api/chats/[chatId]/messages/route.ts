import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { sendSSEMessage } from '../stream/route'

interface Params {
    params: Promise<{
        chatId: string
    }>
}

export async function POST(req: NextRequest, { params }: Params) {
    const { chatId } = await params
    const body = await req.json()
    const { text, senderId } = body

    const message = await prisma.message.create({
        data: { text, chatId, userId: senderId },
        include: { User: true },
    })

    sendSSEMessage(chatId, JSON.stringify(message))
    return NextResponse.json(message)
}
