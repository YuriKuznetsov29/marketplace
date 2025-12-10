import { toast } from 'react-hot-toast'

type NetworkError = {
    type: 'network_error'
    message: string
}

type ApiError = {
    type: 'api_error'
    status: number
    message: string
    data: unknown
}

export function handleApiError(err: ApiError | NetworkError) {
    console.error(err)
    if (err.type === 'network_error') {
        toast.error('Проблема с сетью, попробуйте позже')
        return
    }

    if (err.type === 'api_error') {
        switch (err.status) {
            case 401:
                toast.error('Вы не авторизованы')
                break
            case 403:
                toast.error('Нет доступа')
                break
            case 404:
                toast.error('Неверный запрос')
                break
            case 500:
                toast.error('Ошибка сервера')
                break
            default:
                toast.error(err.message)
        }
    }
}
