import axios from 'axios'

const baseURL =
    process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_API_URL
        : process.env.NEXT_PUBLIC_API_URL_PROD

export const axiosInstance = axios.create({
    baseURL,
})

axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
        console.error(err)

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
