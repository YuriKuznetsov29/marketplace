import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id
    const models = await prisma.model.findMany({
        where: {
            brandId: id,
        },
    })

    return NextResponse.json(models)
}
