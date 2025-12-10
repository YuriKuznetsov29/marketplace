import { prisma } from '@/prisma/prisma-client'
import { axiosInstance } from '@/services/instance'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

interface Params {
    params: Promise<{
        user1: string
        user2: string
    }>
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    console.log(searchParams, 'params')
    // const { user1, user2 } = await params

    const user1 = searchParams.get('user1') || ''
    const user2 = searchParams.get('user2') || ''

    const chat = await axios.post(`http://localhost:4000/chat/create`, { userIds: [user1, user2] })
    console.log(chat.data)

    return NextResponse.json(chat.data)
}
