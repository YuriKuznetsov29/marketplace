import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { sendSSEMessage } from '../stream/route'

export async function POST(req: NextRequest, { params }: { params: { chatId: string } }) {
    const { chatId } = params
    const body = await req.json()
    const { text, senderId } = body

    const message = await prisma.message.create({
        data: { text, senderId, chatId },
        include: { sender: true },
    })

    sendSSEMessage(chatId, JSON.stringify(message))
    return NextResponse.json(message)
}
