import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    console.log(req)
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}
