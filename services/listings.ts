import { GetSearchParams } from '@/lib/find-cars'
import qs from 'qs'
import { axiosInstance } from './instance'
import { Listing } from '@prisma/client'

export const getListings = async (
    params: GetSearchParams
): Promise<{ listing: Listing[]; totalPages: number }> => {
    const query = qs.stringify(params, {
        arrayFormat: 'comma',
    })
    console.log(params, 'query')

    return (
        await axiosInstance.get<{ listing: Listing[]; totalPages: number }>(`/listings/`, {
            params,
        })
    ).data
}
