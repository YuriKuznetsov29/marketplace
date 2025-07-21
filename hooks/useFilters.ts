import { Api } from '@/services/api-client'
import { Brand, FuelType, GearboxType, Model } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useSet } from 'react-use'

export interface PriceProps {
    priceFrom?: number
    priceTo?: number
}

export interface MileageProps {
    mileageFrom?: number
    mileageTo?: number
}

export interface YearProps {
    yearFrom?: number
    yearTo?: number
}

export interface QueryFilters extends PriceProps, MileageProps, YearProps {
    brands: string
    models: string
    prices: string
    mileage: string
    fuelType: string
    year: string
    gearbox: string
    query: string
}

export interface Filters {
    selectedBrands: Set<string>
    selectedModels: Set<string>
    prices: PriceProps
    mileage: MileageProps
    year: YearProps
    fuelType: Set<string>
    gearbox: Set<string>
    query: string
}

export interface FiltersReturnProps extends Filters {
    setBrands: (value: string) => void
    setModels: (value: string) => void
    setFuelType: (value: FuelType) => void
    setPrices: (name: keyof PriceProps, value: number) => void
    setMileage: (name: keyof MileageProps, value: number) => void
    setGearbox: (value: GearboxType) => void
    setQuery: (value: string) => void
    setYear: (name: keyof YearProps, value: number) => void
}

export const useFilters = (): FiltersReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>

    const [selectedBrands, { toggle: toggleBrands }] = useSet(
        new Set<string>(searchParams.get('brands')?.split(','))
    )

    const [selectedModels, { toggle: toggleModels }] = useSet(
        new Set<string>(searchParams.get('models')?.split(','))
    )

    const [gearbox, { toggle: toggleGearbox }] = useSet(
        new Set<string>(searchParams.get('gearbox')?.split(','))
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

    const [year, setYear] = useState<YearProps>({
        yearFrom: Number(searchParams.get('yearFrom')) || undefined,
        yearTo: Number(searchParams.get('yearTo')) || undefined,
    })

    const updateYear = (name: keyof YearProps, value: number) => {
        setYear((prev) => ({ ...prev, [name]: value }))
    }

    const [mileage, setMileage] = useState<MileageProps>({
        mileageFrom: Number(searchParams.get('mileageFrom')) || undefined,
        mileageTo: Number(searchParams.get('mileageTo')) || undefined,
    })

    const updateMileage = (name: keyof MileageProps, value: number) => {
        setMileage((prev) => ({ ...prev, [name]: value }))
    }

    const [query, setQuery] = useState(searchParams.get('query') || '')

    return useMemo(
        () => ({
            selectedBrands,
            selectedModels,
            prices,
            mileage,
            fuelType,
            gearbox,
            year,
            query,
            setBrands: toggleBrands,
            setModels: toggleModels,
            setPrices: updatePrices,
            setMileage: updateMileage,
            setGearbox: toggleGearbox,
            setFuelType: toggleFuelType,
            setYear: updateYear,
            setQuery,
        }),
        [selectedBrands, selectedModels, prices, mileage, gearbox, fuelType, year, query]
    )
}
