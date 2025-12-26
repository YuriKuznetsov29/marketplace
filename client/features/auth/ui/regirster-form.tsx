'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { registerUser } from '@/app/api/actions'
import { registrationSchema, TFormRegisterValues } from '@/features/auth/model/schemas'
import { FormInput } from '@/shared/ui/form-input'
import { Button } from '@/components/ui/button'

export const RegisterForm: React.FC = () => {
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (values: TFormRegisterValues) => {
        try {
            const { email, name, password } = values
            await registerUser({ email, name, password })
        } catch (error) {
            console.log(console.log(error, 'registration error'))
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput name="email" label="E-Mail" required />
                <FormInput name="name" label="Имя" required />
                <FormInput name="password" label="Пароль" required />
                <FormInput name="confirmPassword" label="Подтвердите пароль" required />
                <Button className="w-full mt-4" type="submit">
                    Зарегистрироваться
                </Button>
            </form>
        </FormProvider>
    )
}
