import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
        // Ошибка сети
        if (!err.response) {
            return Promise.reject({
                type: 'network_error',
                message: 'Network error',
                original: err,
            })
        }

        // Ошибка от API
        const { status, data } = err.response

        return Promise.reject({
            type: 'api_error',
            status,
            message: data?.message || 'API Error',
            data,
        })
    }
)
