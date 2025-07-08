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
