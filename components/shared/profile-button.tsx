import { useSession } from 'next-auth/react'
import React from 'react'
import { Button } from '../ui/button'
import { CircleUser, User } from 'lucide-react'
import Link from 'next/link'

interface Props {
    onClickSignIn?: () => void
    className?: string
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
    const { data: session, status } = useSession()

    const isLoading = status === 'loading'

    return (
        <div className={className}>
            {!session ? (
                <Button
                    onClick={onClickSignIn}
                    variant="outline"
                    className="flex items-center gap-1"
                    loading={isLoading}
                >
                    <User size={16} />
                    Войти
                </Button>
            ) : (
                <Link href="/profile">
                    <Button
                        variant="secondary"
                        className="flex items-center gap-2"
                        loading={isLoading}
                    >
                        <CircleUser size={18} />
                        Профиль
                    </Button>
                </Link>
            )}
        </div>
    )
}
