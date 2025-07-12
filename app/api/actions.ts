'use server'

import { getUserSession } from '@/components/shared/constants/get-user-session'
import { prisma } from '@/prisma/prisma-client'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

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

export async function createListing(body: Prisma.ListingUpdateInput) {
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

        if (!findUser) {
            throw new Error('Пользователь не найден')
        }

        // if (!(body.images instanceof FileList)) {
        //     throw new Error('Файл не выбран')
        // }

        const file = body.images[0]
        // // Генерация уникального имени файла
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const newFileName = `${uniqueSuffix}-${file.name}`
        const uploadDir = './public/uploads' // Папка для сохранения изображений

        // // Создаем папку, если она не существует
        const fs = require('fs')
        const path = require('path')
        fs.mkdirSync(path.join(process.cwd(), uploadDir), { recursive: true })

        // // Сохранение файла
        const filePath = path.join(process.cwd(), uploadDir, newFileName)
        const buffer = await file.arrayBuffer()
        fs.writeFileSync(filePath, Buffer.from(buffer))

        await prisma.listing.create({
            data: {
                description: body.description || '',
                title: body.description,
                price: Number(body.price),
                mileage: Number(body.mileage),
                year: Number(body.year),
                fuelType: body.fuelType,
                gearbox: body.gearbox,
                location: '',
                images: [newFileName],
                seller: findUser,
                sellerId: findUser?.id,
                brand: body.brand,
                model: body.model,
            },
        })
    } catch (err) {
        console.log('Error [UPDATE_USER]', err)
        throw err
    }
}
