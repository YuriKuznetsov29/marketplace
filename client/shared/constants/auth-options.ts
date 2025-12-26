import { AuthOptions, User } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialProvider from 'next-auth/providers/credentials'
import { prisma } from '@/prisma/prisma-client'
import { compare, hashSync } from 'bcrypt'

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                }
            },
        }),
        CredentialProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials) return null

                const values = { email: credentials.email }

                const findUser = await prisma.user.findFirst({
                    where: values,
                })

                if (!findUser) return null

                const isPasswordValid = await compare(credentials.password, findUser.password)

                if (!isPasswordValid) return null

                return {
                    id: Number(findUser.id),
                    email: findUser.email,
                    name: findUser.name,
                    // role: findUser.role,
                }
            },
        }),
        // ...add more providers here
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        signIn: async ({ user, account }) => {
            try {
                if (account?.provider === 'credentials') {
                    return true
                }

                // if (!user.email) {
                //     return false
                // }

                const findUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { provider: account?.provider, providerId: account?.providerAccountId },
                            { email: user?.email || '' },
                        ],
                    },
                })

                if (findUser) {
                    await prisma.user.update({
                        where: {
                            id: findUser.id,
                        },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId,
                        },
                    })

                    return true
                }

                await prisma.user.create({
                    data: {
                        email: user?.email || '',
                        password: hashSync(user.id.toString(), 10),
                        name: user.name || '',
                        provider: account?.provider,
                        providerId: account?.providerAccountId,
                    },
                })

                return true
            } catch (error) {
                console.log(error)
                return false
            }
        },
        jwt: async ({ token }) => {
            const findUser = await prisma.user.findFirst({
                where: {
                    email: String(token.email),
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
    },
    secret: process.env.NEXTAUTH_SECRET,
}
