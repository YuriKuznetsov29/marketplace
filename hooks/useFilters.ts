import { Api } from '@/services/api-client'
import { Brand, FuelType, Model } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useSet } from 'react-use'

export interface PriceProps {
    priceFrom?: number
    priceTo?: number
}

// export enum FuelType {
//     Gasoline = 'Gasoline',
//     Diesel = 'Diesel',
//     Electric = 'Electric',
//     Hybrid = 'Hybrid',
// }

export interface QueryFilters extends PriceProps {
    brands: string
    models: string
    prices: string
    fuelType: string
}

export interface Filters {
    selectedBrands: Set<string>
    selectedModels: Set<string>
    prices: PriceProps
    fuelType: Set<string>
}

interface ReturnProps extends Filters {
    setBrands: (value: string) => void
    setModels: (value: string) => void
    setFuelType: (value: FuelType) => void
    setPrices: (name: keyof PriceProps, value: number) => void
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>

    const [selectedBrands, { toggle: toggleBrands }] = useSet(
        new Set<string>(searchParams.get('brands')?.split(','))
    )

    const [selectedModels, { toggle: toggleModels }] = useSet(
        new Set<string>(searchParams.get('models')?.split(','))
    )

    const [fuelType, { toggle: toggleFuelType }] = useSet(
        new Set<string>(searchParams.get('fuelType')?.split(','))
    )

    const [prices, setPrices] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    })

    const updatePrices = (name: keyof PriceProps, value: number) => {
        setPrices((prev) => ({ ...prev, [name]: value }))
    }

    return useMemo(
        () => ({
            selectedBrands,
            selectedModels,
            prices,
            fuelType,
            setBrands: toggleBrands,
            setModels: toggleModels,
            setPrices: updatePrices,
            setFuelType: toggleFuelType,
        }),
        [selectedBrands, selectedModels, prices, fuelType]
    )
}
