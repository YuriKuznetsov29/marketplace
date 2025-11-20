'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Container } from './container'
import { SignInModal } from './signIn-modal'
import { ProfileButton } from './profile-button'
import { Home, PlusCircle, List } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
    hasSearch?: boolean
    hasCart?: boolean
    className?: string
}

const navigationItems = [
    {
        href: '/',
        label: 'Главная',
        icon: Home,
    },
    {
        href: '/user-listings',
        label: 'Мои объявления',
        icon: List,
    },
    {
        href: '/create-listing',
        label: 'Создать объявление',
        icon: PlusCircle,
    },
]

export const Header: React.FC<Props> = () => {
    const [openAuthModal, setOpenAuthModal] = useState(false)
    const { data: session } = useSession()
    const pathname = usePathname()

    const isAuthenticated = !!session

    return (
        <header className={'border-b mb-4'}>
            <Container className="flex items-center justify-between py-4">
                {isAuthenticated && (
                    <nav className="flex items-center gap-6">
                        {navigationItems.map((item) => {
                            const Icon = item.icon
                            const isActive =
                                item.href === '/'
                                    ? pathname === '/'
                                    : pathname.startsWith(item.href)

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
                                        isActive ? 'text-primary' : 'text-muted-foreground'
                                    )}
                                >
                                    <Icon size={18} />
                                    <span>{item.label}</span>
                                </Link>
                            )
                        })}
                    </nav>
                )}
                <div className="flex items-center">
                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
                    <SignInModal open={openAuthModal} setOpen={setOpenAuthModal} />
                </div>
            </Container>
        </header>
    )
}
