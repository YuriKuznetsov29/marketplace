import NextAuth, { AuthOptions } from 'next-auth'
import { authOptions } from '@/components/shared/constants/auth-options'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
