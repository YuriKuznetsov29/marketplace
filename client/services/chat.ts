import { Chat } from '@prisma/client'
import { axiosInstance } from './instance'

interface createChatParams {
    user1: string
    user2: string
}

export const createChat = async (users: createChatParams): Promise<Chat> => {
    const { user1, user2 } = users
    return (await axiosInstance.get(`/chats/create/?user1=${user1}&user2=${user2}`)).data
}
