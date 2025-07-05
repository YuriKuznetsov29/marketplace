'use server'

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
