'use client'
import { SignInModal } from '@/features/auth/ui/signIn-modal'
import { ProfileButton } from '@/features/profile'
import { useState } from 'react'

export const HeaderContent = () => {
    const [openAuthModal, setOpenAuthModal] = useState(false)

    return (
        <>
            <div className="flex items-center">
                <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
                <SignInModal open={openAuthModal} setOpen={setOpenAuthModal} />
            </div>
        </>
    )
}
