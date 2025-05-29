'use client'

import React from 'react'
import { Container } from './container'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'
import { useSession, signOut, signIn } from 'next-auth/react'
import { Button } from '../ui/button'

interface Props {
    hasSearch?: boolean
    hasCart?: boolean
    className?: string
}

export const Header: React.FC<Props> = () => {
    const { status } = useSession()

    const router = useRouter()
    const [openAuthModal, setOpenAuthModal] = React.useState(false)

    const searchParams = useSearchParams()

    // React.useEffect(() => {
    //     let toastMessage = ''

    //     if (searchParams.has('paid')) {
    //         toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.'
    //     }

    //     if (searchParams.has('verified')) {
    //         toastMessage = 'Почта успешно подтверждена!'
    //     }

    //     if (toastMessage) {
    //         setTimeout(() => {
    //             router.replace('/')
    //             toast.success(toastMessage, {
    //                 duration: 3000,
    //             })
    //         }, 1000)
    //     }
    // }, [])

    return (
        <header className={'border-b mb-4'}>
            <Container className="flex items-center justify-end py-4">
                {status}
                <Button onClick={() => signIn()}>
                    <User size={16} />
                    Войти
                </Button>
            </Container>
        </header>
    )
}
