'use server'

import { getUserSession } from '@/components/shared/constants/get-user-session'
import { TFormListingValues } from '@/components/shared/schemas'
import { prisma } from '@/prisma/prisma-client'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'
import fs from 'fs'
import path from 'path'

export async function getMessages(
    chatId: string,
    cursor: string | null,
    messageLimit: number = 20
) {
    const messages = await prisma.message.findMany({
        where: { chatId },
        take: messageLimit,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: String(cursor) } : undefined,
        orderBy: { createdAt: 'desc' },
    })

    return messages.reverse()
}

export async function createChat(userIds: string[]) {
    const chat = await prisma.chat.findFirst({
        where: {
            members: {
                some: {
                    userId: {
                        in: userIds,
                    },
                },
            },
        },
    })

    if (chat) {
        return chat
    }

    return prisma.chat.create({
        data: {
            members: {
                create: userIds.map((id) => ({ userId: id })),
            },
        },
    })
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        })

        if (user) {
            throw new Error('Пользователь уже существует')
        }

        await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashSync(body.password, 10),
            },
        })
    } catch (err) {
        console.log('Error [CREATE_USER]', err)
        throw err
    }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession()

        if (!currentUser) {
            throw new Error('Пользователь не найден')
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: currentUser.id,
            },
        })

        await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                name: body.name,
                email: body.email,
                password: body.password
                    ? hashSync(body.password as string, 10)
                    : findUser?.password,
            },
        })
    } catch (err) {
        console.log('Error [UPDATE_USER]', err)
        throw err
    }
}

export async function createListing(body: TFormListingValues) {
    try {
        const currentUser = await getUserSession()

        if (!currentUser) {
            throw new Error('Пользователь не найден')
        }

        const file = body.images[0]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const newFileName = `${uniqueSuffix}-${file.name}`
        const uploadDir = './public/uploads'

        // const fs = require('fs')
        // const path = require('path')
        fs.mkdirSync(path.join(process.cwd(), uploadDir), { recursive: true })

        const filePath = path.join(process.cwd(), uploadDir, newFileName)
        const buffer = await file.arrayBuffer()
        fs.writeFileSync(filePath, Buffer.from(buffer))

        await prisma.listing.create({
            data: {
                description: body.description || '',
                title: body.description,
                price: body.price,
                mileage: body.mileage,
                year: Number(body.year),
                fuelType: body.fuelType,
                gearbox: body.gearbox,
                // cityId: Number(body.city),
                images: [newFileName],
                seller: {
                    connect: {
                        id: currentUser.id,
                    },
                },
                brand: {
                    connect: {
                        id: body.brand,
                    },
                },
                model: {
                    connect: {
                        id: body.model,
                    },
                },
                city: {
                    connect: {
                        id: Number(body.city),
                    },
                },
            },
        })
    } catch (err) {
        console.log('Error [CREATE_LISTING]', err)
        throw err
    }
}

export async function updateListing(body: TFormListingValues & { id: string }) {
    try {
        const currentUser = await getUserSession()

        if (!currentUser) {
            throw new Error('Пользователь не найден')
        }

        console.log(body)

        const findListing = await prisma.listing.findFirst({
            where: {
                id: body.id,
            },
        })

        if (!findListing) {
            throw new Error('Объявление не найдено')
        }

        const file = body.images[0]

        let newFileName
        if (file?.name !== undefined) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
            newFileName = `${uniqueSuffix}-${file.name}`
            const uploadDir = './public/uploads'

            // const fs = require('fs')
            // const path = require('path')

            const filePath = path.join(process.cwd(), uploadDir, newFileName)
            const buffer = await file.arrayBuffer()
            fs.writeFileSync(filePath, Buffer.from(buffer))
        }

        await prisma.listing.update({
            where: {
                id: body.id,
            },
            data: {
                description: body.description || '',
                title: body.description,
                price: body.price,
                cityId: Number(body.city),
                mileage: body.mileage,
                year: Number(body.year),
                fuelType: body.fuelType,
                gearbox: body.gearbox,
                images: file?.name && newFileName ? [newFileName] : findListing.images,
            },
        })
    } catch (err) {
        console.log('Error [UPDATE_LISTING]', err)
        throw err
    }
}
