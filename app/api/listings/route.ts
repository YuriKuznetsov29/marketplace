import { findCars, GetSearchParams } from '@/lib/find-cars'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    const params: GetSearchParams = {
        brands: searchParams.get('brand') || undefined,
        models: searchParams.get('model') || undefined,
        priceFrom: searchParams.get('priceFrom') || undefined,
        priceTo: searchParams.get('priceTo') || undefined,
        mileageFrom: searchParams.get('mileageFrom') || undefined,
        mileageTo: searchParams.get('mileageTo') || undefined,
        yearFrom: searchParams.get('yearFrom') || undefined,
        yearTo: searchParams.get('yearTo') || undefined,
        fuelType: searchParams.get('fuelType') || undefined,
        gearbox: searchParams.get('gearbox') || undefined,
        query: searchParams.get('query') || undefined,
        cursor: searchParams.get('cursor') || undefined,
        limit: Number(searchParams.get('limit') || 12),
    }
    console.log(params, 'req1')

    const listings = await findCars(params)
    return NextResponse.json(listings)
}
