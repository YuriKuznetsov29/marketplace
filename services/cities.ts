import { City } from '@prisma/client'
import { axiosInstance } from './instance'

export const getCities = async (): Promise<City[]> => {
    return (await axiosInstance.get<City[]>('/cities')).data
}
