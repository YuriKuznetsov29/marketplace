import { Api } from '@/services/api-client'
import { Brand } from '@prisma/client'
import { useEffect, useState } from 'react'

export interface Filters {
    brands: Set<string>
    models: Set<string>[]
}

interface ReturnProps {
    brands: Brand[]
}

export const useFiltersBrands = (): ReturnProps => {
    const [brands, setBrands] = useState<Brand[]>([])

    useEffect(() => {
        Api.filters.getBrands().then(setBrands)
    }, [])

    return { brands }
}
