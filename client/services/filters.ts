import { Brand, Model } from '@prisma/client'
import { axiosInstance } from './instance'
import qs from 'qs'

export const getBrands = async (): Promise<Brand[]> => {
    return (await axiosInstance.get<Brand[]>('/brands')).data
}

export const getModels = async (brands: string[]): Promise<Model[]> => {
    const query = qs.stringify(brands, {
        arrayFormat: 'comma',
    })

    return (
        await axiosInstance.get<Model[]>(`/models/`, {
            params: { brands: query },
        })
    ).data
}
