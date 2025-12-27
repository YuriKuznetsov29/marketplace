'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { RegisterForm } from './regirster-form'
import { useState } from 'react'
import { SignInForm } from './signIn-form'
import { Filters } from '@/features/filters/ui/filters'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

export const SignInModal: React.FC<Props> = ({ open, setOpen }: Props) => {
    const [form, setForm] = useState<'signIn' | 'register'>('signIn')

    return (
        <Dialog open={open}>
            <DialogContent>
                {form === 'register' ? (
                    <>
                        <RegisterForm />
                        <Button onClick={() => setForm('signIn')}>Войти</Button>
                    </>
                ) : (
                    <>
                        <SignInForm setOpen={setOpen} />
                        <Button onClick={() => setForm('register')}>Зарегистрироваться</Button>
                    </>
                )}
                <Button onClick={() => signIn('github')}>GitHub</Button>
            </DialogContent>
        </Dialog>
    )
}
