import { Brand, Model } from '@prisma/client'
import { axiosInstance } from './instance'

export const getBrands = async (): Promise<Brand[]> => {
    return (await axiosInstance.get<Brand[]>('/brands')).data
}

export const getModels = async (brandId: string): Promise<Model[]> => {
    return (await axiosInstance.get<Model[]>(`/models/${brandId}`)).data
}
