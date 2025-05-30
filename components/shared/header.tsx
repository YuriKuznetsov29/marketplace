'use client'

import React, { useState } from 'react'
import { Container } from './container'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'
import { useSession, signOut, signIn } from 'next-auth/react'
import { Button } from '../ui/button'
import { SignInModal } from './signIn-modal'

interface Props {
    hasSearch?: boolean
    hasCart?: boolean
    className?: string
}

export const Header: React.FC<Props> = () => {
    const { status } = useSession()

    const router = useRouter()
    const [openAuthModal, setOpenAuthModal] = useState(false)

    const searchParams = useSearchParams()

    return (
        <header className={'border-b mb-4'}>
            <Container className="flex items-center justify-end py-4">
                {status}
                <Button onClick={() => signIn()}>
                    <User size={16} />
                    Войти
                </Button>
                {/* <SignInModal open={openAuthModal} setOpen={setOpenAuthModal} /> */}
            </Container>
        </header>
    )
}
