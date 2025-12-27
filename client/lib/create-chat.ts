import { prisma } from '@/prisma/prisma-client'

export const createChat = async (listingId: string, userId: string) => {
    prisma.chat.create({ data: { name: userId } })
}
