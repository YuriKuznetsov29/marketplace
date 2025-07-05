'use client'

import { z } from 'zod'
import { Dialog, DialogContent } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Input } from '../ui/input'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '../ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession, signOut, signIn } from 'next-auth/react'
import { RegisterForm } from './regirster-form'
import { useState } from 'react'
import { SignInForm } from './signIn-form'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

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
                <Button onClick={() => signOut()}>Выйти</Button>
            </DialogContent>
        </Dialog>
    )
}
