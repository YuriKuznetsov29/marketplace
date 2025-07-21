import React from 'react'
import qs from 'qs'
import { useRouter } from 'next/navigation'
import { Filters } from './useFilters'

export const useQueryFilters = (filters: Filters) => {
    const isMounted = React.useRef(false)
    const router = useRouter()

    React.useEffect(() => {
        if (isMounted.current) {
            const params = {
                ...filters.prices,
                ...filters.mileage,
                ...filters.year,
                brands: Array.from(filters.selectedBrands),
                models: Array.from(filters.selectedModels),
                fuelType: Array.from(filters.fuelType),
                gearbox: Array.from(filters.gearbox),
                query: filters.query,
            }

            const query = qs.stringify(params, {
                arrayFormat: 'comma',
            })

            router.push(`?${query}`, {
                scroll: false,
            })
        }

        isMounted.current = true
    }, [filters])
}
