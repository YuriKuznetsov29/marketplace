import { Api } from '@/services/api-client'
import { Brand, Model } from '@prisma/client'
import { useEffect, useState } from 'react'

type ReturnProps = {
    brands: Brand[]
    models: Model[]
}

type Props = {
    brandId: string
}

export const useFilters = ({ brandId }: Props): ReturnProps => {
    const [brands, setBrands] = useState<Brand[]>([])
    const [models, setModels] = useState<Model[]>([])

    useEffect(() => {
        Api.filters.getBrands().then(setBrands)
    }, [])

    useEffect(() => {
        Api.filters.getModels(brandId).then(setModels)
    }, [brandId])

    return { brands, models }
}
