import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, TFormLoginValues } from '../model/schemas'
import { FormInput } from '@/shared/ui/form-input'

interface Props {
    setOpen: (open: boolean) => void
}

export const SignInForm: React.FC<Props> = ({ setOpen }: Props) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function onSubmit(values: TFormLoginValues) {
        try {
            const resp = await signIn('credentials', { ...values })
            if (!resp?.ok) {
                throw Error()
            }

            setOpen(false)
        } catch (error) {
            console.log(error, 'login error')
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput name="email" label="E-Mail" required />
                <FormInput name="password" label="Пароль" required />
                <Button className="w-full mt-4" type="submit">
                    Войти
                </Button>
            </form>
        </FormProvider>
    )
}
