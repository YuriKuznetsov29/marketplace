import '../services/instance'
import axios from 'axios'
import { Api } from '../services/api-client'
import { axiosInstance } from '../services/instance'

const axiosSpy = jest.spyOn(axiosInstance, 'get')
const errorSpy = jest.spyOn(console, 'error')

describe('getCities', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('should throw network_error', async () => {
        const axiosErr = new axios.AxiosError('Network Error')
        const networkErr = {
            type: 'network_error',
            message: 'Network error',
            original: axiosErr,
        }

        axiosSpy.mockRejectedValueOnce(networkErr)

        await expect(Api.cities.getCities()).rejects.toMatchObject({
            type: 'network_error',
            message: 'Network error',
            original: axiosErr,
        })
    })

    it('should transform network error during request', async () => {
        const networkErr = { message: 'Network Error' }

        axiosInstance.defaults.adapter = jest.fn().mockRejectedValue(networkErr)

        await expect(axiosInstance.get('/cities')).rejects.toEqual({
            type: 'network_error',
            message: 'Network error',
            original: networkErr,
        })

        expect(errorSpy).toHaveBeenCalled()
    })
    it('should return cities', async () => {
        const mockCities = [
            { id: 1, city: 'New York' },
            { id: 2, city: 'London' },
        ]

        jest.spyOn(axiosInstance, 'get').mockResolvedValue({ data: mockCities })

        const result = await Api.cities.getCities()

        expect(result).toEqual(mockCities)
    })
})
