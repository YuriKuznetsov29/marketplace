'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Container } from '../../container/container'
import { Home, PlusCircle, List, MessageCircle, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

interface HeaderProps {
    children?: React.ReactNode
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
    {
        href: '/messenger',
        label: 'Мессенджер',
        icon: MessageCircle,
    },
]

export const Header: React.FC<HeaderProps> = ({ children }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { data: session } = useSession()
    const pathname = usePathname()

    const isAuthenticated = !!session

    const NavigationLinks = ({ mobile = false }: { mobile?: boolean }) => {
        return (
            <>
                {navigationItems.map((item) => {
                    const Icon = item.icon
                    const isActive =
                        item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href)

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => mobile && setMobileMenuOpen(false)}
                            className={cn(
                                mobile
                                    ? 'flex items-center gap-3 px-4 py-3 text-base font-medium transition-colors hover:bg-accent rounded-md'
                                    : 'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
                                isActive
                                    ? mobile
                                        ? 'bg-accent text-primary'
                                        : 'text-primary'
                                    : 'text-muted-foreground'
                            )}
                        >
                            <Icon size={mobile ? 20 : 18} />
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </>
        )
    }

    return (
        <header className={'border-b mb-4 px-4'}>
            <Container className="flex items-center justify-between py-4">
                {isAuthenticated && (
                    <>
                        {/* Десктопная навигация */}
                        <nav className="hidden md:flex items-center gap-6" data-testid="header">
                            <NavigationLinks />
                        </nav>

                        {/* Мобильное меню */}
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden"
                                    aria-label="Открыть меню"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[280px] sm:w-[320px]">
                                <SheetHeader>
                                    <SheetTitle>Меню</SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col gap-2 mt-6">
                                    <NavigationLinks mobile />
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </>
                )}

                {children}
            </Container>
        </header>
    )
}
