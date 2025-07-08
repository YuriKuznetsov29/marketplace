'use client'

import React, { useState } from 'react'
import { Container } from './container'
import { SignInModal } from './signIn-modal'
import { ProfileButton } from './profile-button'

interface Props {
    hasSearch?: boolean
    hasCart?: boolean
    className?: string
}

export const Header: React.FC<Props> = () => {
    const [openAuthModal, setOpenAuthModal] = useState(false)

    return (
        <header className={'border-b mb-4'}>
            <Container className="flex items-center justify-end py-4">
                <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
                <SignInModal open={openAuthModal} setOpen={setOpenAuthModal} />
            </Container>
        </header>
    )
}
