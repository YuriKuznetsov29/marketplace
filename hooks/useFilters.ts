import { Api } from '@/services/api-client'
import { Brand, Model } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useSet } from 'react-use'

export interface Filters {
    selectedBrands: Set<string>
    selectedModels: Set<string>
}

type Props = {
    brandIds: string[]
}

interface ReturnProps extends Filters {
    setBrands: (value: string) => void
    setModels: (value: string) => void
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams()

    const [selectedBrands, { toggle: toggleBrands }] = useSet(
        new Set<string>(searchParams.get('brands')?.split(','))
    )

    const [selectedModels, { toggle: toggleModels }] = useSet(
        new Set<string>(searchParams.get('models')?.split(','))
    )

    return useMemo(
        () => ({
            selectedBrands,
            selectedModels,
            setBrands: toggleBrands,
            setModels: toggleModels,
        }),
        [selectedBrands, selectedModels, toggleBrands, toggleModels]
    )
}
