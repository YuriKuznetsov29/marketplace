import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
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
