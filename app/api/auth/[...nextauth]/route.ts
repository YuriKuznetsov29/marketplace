import { prisma } from '@/prisma/prisma-client'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialProvider from 'next-auth/providers/credentials'
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        CredentialProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) return null

                const values = { email: credentials.email }

                const findUser = await prisma.user.findFirst({
                    where: values,
                })

                if (!findUser) return null

                const isPasswordValid = await compare(credentials.password, findUser.password)

                if (!isPasswordValid) return null

                return {
                    id: findUser.id,
                    email: findUser.email,
                    name: findUser.name,
                    role: findUser.role,
                }
            },
        }),
        // ...add more providers here
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        jwt: async ({ token }) => {
            const findUser = await prisma.user.findFirst({
                where: {
                    email: token.email,
                },
            })

            if (findUser) {
                token.id = findUser.id
                token.role = findUser.role
                token.name = findUser.name
                token.email = findUser.email
            }

            return token
        },
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.id
                session.user.role = token.role
            }

            return session
        },
        // signIn: ({ user, account }) => {
        //     return true
        // },
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
