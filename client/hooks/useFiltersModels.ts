import { Api } from '@/services/api-client'
import { Model } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type ReturnProps = {
    models: Model[]
}

interface Props {
    brand?: string
}

export const useFiltersModels = ({ brand }: Props): ReturnProps => {
    const [models, setModels] = useState<Model[]>([])

    const searchParams = useSearchParams()

    const brands = searchParams.get('brands')?.split(',')

    useEffect(() => {
        if (brand) {
            Api.filters.getModels([brand]).then(setModels)
            return
        }

        if (!brands?.length) return
        Api.filters.getModels(brands).then(setModels)
    }, [brands?.length, brand])

    return { models }
}
