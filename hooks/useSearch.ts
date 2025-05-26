import { Api } from '@/services/api-client'
import { Brand, FuelType, GearboxType, Model } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useSet } from 'react-use'
import { QueryFilters } from './useFilters'

interface ReturnProps {
    query: string
    setQuery: (value: string) => void
}

export const useSearch = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>

    const [query, setQuery] = useState(searchParams.get('query') || '')

    return useMemo(
        () => ({
            query,
            setQuery,
        }),
        [query]
    )
}
