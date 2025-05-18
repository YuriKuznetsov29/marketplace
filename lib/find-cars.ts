import { PriceProps } from '@/hooks/useFilters'
import { prisma } from '@/prisma/prisma-client'
import { FuelType, GearboxType } from '@prisma/client'

export interface GetSearchParams {
    brands?: string
    models?: string
    priceFrom?: string
    priceTo?: string
    fuelType?: string
    gearbox?: string
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000000

export const findCars = async (params: Promise<GetSearchParams>) => {
    const { brands, models, priceFrom, priceTo, fuelType, gearbox } = await params

    const minPrice = Number(priceFrom) || DEFAULT_MIN_PRICE
    const maxPrice = Number(priceTo) || DEFAULT_MAX_PRICE

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
            fuelType: {
                in: fuelType?.split(',') as unknown as FuelType[],
            },
            gearbox: {
                in: gearbox?.split(',') as unknown as GearboxType[],
            },
            price: {
                gte: minPrice,
                lte: maxPrice,
            },
        },
    })

    console.log(brands, models)
    console.log(listing, 'listing')

    return listing
}
