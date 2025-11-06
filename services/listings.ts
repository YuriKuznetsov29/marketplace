import { GetSearchParams } from '@/lib/find-cars'
import qs from 'qs'
import { axiosInstance } from './instance'
import { Listing } from '@prisma/client'

export const getListings = async (params: GetSearchParams): Promise<Listing[]> => {
    // const query = qs.stringify(params, {
    //     arrayFormat: 'comma',
    // })

    return (
        await axiosInstance.get<Listing[]>(`/listings/`, {
            params,
        })
    ).data
}
