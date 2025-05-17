import { prisma } from '@/prisma/prisma-client'

export interface GetSearchParams {
    brands?: string
    models?: string
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000

export const findCars = async (params: Promise<GetSearchParams>) => {
    // const brands = await params.brands?.split(',')
    // const models = await params.models?.split(',')

    const { brands, models } = await params

    // const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE
    // const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE

    if (!brands || brands.length === 0 || !models || models.length === 0) {
        return []
    }

    const listing = await prisma.listing.findMany({
        where: {
            brand: {
                name: {
                    in: brands?.split(','),
                },
            },
            model: {
                name: {
                    in: models?.split(','),
                },
            },
        },
    })

    console.log(brands, models)
    console.log(listing, 'listing')

    return listing
}
