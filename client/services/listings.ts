import { GetSearchParams } from '@/lib/find-cars'
import { axiosInstance } from './instance'
import { Listing } from '@prisma/client'

export const getListings = async (
    params: GetSearchParams
): Promise<{ listing: Listing[]; totalPages: number }> => {
    return (
        await axiosInstance.get<{ listing: Listing[]; totalPages: number }>(`/listings/`, {
            params,
        })
    ).data
}
