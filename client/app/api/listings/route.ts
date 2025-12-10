import { findCars, GetSearchParams } from '@/lib/find-cars'
import { NextRequest, NextResponse } from 'next/server'
import qs from 'qs'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    const params: GetSearchParams = {
        brands: searchParams.get('brands') || undefined,
        models: searchParams.get('models') || undefined,
        priceFrom: searchParams.get('priceFrom') || undefined,
        priceTo: searchParams.get('priceTo') || undefined,
        mileageFrom: searchParams.get('mileageFrom') || undefined,
        mileageTo: searchParams.get('mileageTo') || undefined,
        yearFrom: searchParams.get('yearFrom') || undefined,
        yearTo: searchParams.get('yearTo') || undefined,
        fuelType: searchParams.get('fuelType') || undefined,
        gearbox: searchParams.get('gearbox') || undefined,
        query: searchParams.get('query') || undefined,
        page: Number(searchParams.get('page') || 1),
        cursor: searchParams.get('cursor') || undefined,
        limit: Number(searchParams.get('limit') || 12),
    }

    const query = qs.stringify(params, {
        arrayFormat: 'comma',
    })
    const listings = await findCars(params)
    return NextResponse.json(listings)
}
