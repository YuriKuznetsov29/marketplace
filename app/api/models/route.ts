import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import qs from 'qs'

export async function GET(req: NextRequest, { params }: { params: { brands: string[] } }) {
    const query = req.nextUrl.searchParams.get('brands') || ''
    const brands = Object.values(qs.parse(query)) as string[]

    const models = await prisma.model.findMany({
        where: {
            brand: {
                name: {
                    in: brands,
                },
            },
        },
    })

    console.log(models, 'params')

    return NextResponse.json(models)
}
