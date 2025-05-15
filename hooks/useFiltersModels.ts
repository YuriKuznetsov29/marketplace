import { Api } from '@/services/api-client'
import { Brand, Model } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type ReturnProps = {
    models: Model[]
}

export const useFiltersModels = (): ReturnProps => {
    const [models, setModels] = useState<Model[]>([])

    const searchParams = useSearchParams()

    const brands = searchParams.get('brands')?.split(',')

    console.log(brands, 'ids')

    useEffect(() => {
        if (!brands?.length) return
        Api.filters.getModels(brands).then(setModels)
    }, [brands?.length])

    return { models }
}
