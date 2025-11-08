import { prisma } from '@/prisma/prisma-client'
import { FuelType, GearboxType } from '@prisma/client'

export interface GetSearchParams {
    brands?: string
    models?: string
    priceFrom?: string
    priceTo?: string
    mileageFrom?: string
    mileageTo?: string
    yearFrom?: string
    yearTo?: string
    fuelType?: string
    gearbox?: string
    query?: string
    page: number
    cursor?: string | null
    limit: number
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000000000
const DEFAULT_MIN_MILEAGE = 0
const DEFAULT_MAX_MILEAGE = 10000000
const DEFAULT_MIN_YEAR = 1900
const DEFAULT_MAX_YEAR = new Date().getFullYear()

export const findCars = async (params: Promise<GetSearchParams>) => {
    const {
        brands,
        models,
        priceFrom,
        priceTo,
        mileageFrom,
        mileageTo,
        yearFrom,
        yearTo,
        fuelType,
        gearbox,
        query,
        page,
        cursor,
        limit,
    } = await params

    const minPrice = Number(priceFrom) || DEFAULT_MIN_PRICE
    const maxPrice = Number(priceTo) || DEFAULT_MAX_PRICE

    const minMileage = Number(mileageFrom) || DEFAULT_MIN_MILEAGE
    const maxMileage = Number(mileageTo) || DEFAULT_MAX_MILEAGE

    const minYear = Number(yearFrom) || DEFAULT_MIN_YEAR
    const maxYear = Number(yearTo) || DEFAULT_MAX_YEAR

    const pageNumber = page || 1
    const limitNumber = limit || 12

    const listings = await prisma.listing.findMany({
        take: limitNumber,
        skip: (pageNumber - 1) * limitNumber,
        // cursor: cursor ? { id: cursor } : undefined,
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
            mileage: {
                gte: minMileage,
                lte: maxMileage,
            },
            year: {
                gte: minYear,
                lte: maxYear,
            },
            OR: [
                {
                    brand: {
                        name: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                },
                {
                    model: {
                        name: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                },
                {
                    title: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
                {
                    description: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
            ],
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
    const totalCount = await prisma.listing.count({
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
            mileage: {
                gte: minMileage,
                lte: maxMileage,
            },
            year: {
                gte: minYear,
                lte: maxYear,
            },
            OR: [
                {
                    brand: {
                        name: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                },
                {
                    model: {
                        name: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                },
                {
                    title: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
                {
                    description: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
            ],
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    const totalPages = Math.ceil(totalCount / 12)

    console.log(listings, 'params in findCars')

    return { listings, totalPages }
}
