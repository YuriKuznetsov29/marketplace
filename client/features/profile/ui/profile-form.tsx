'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { updateUserInfo } from '@/app/api/actions'
import toast from 'react-hot-toast'
import { User } from '@prisma/client'
import { FormInput } from '@/shared/ui/form-input'
import { profileSchema, TFormProfileValues } from '../model/schemas'

interface Props {
    user: User
}

export const ProfileForm: React.FC<Props> = ({ user }) => {
    const form = useForm<TFormProfileValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            email: user.email,
            name: user.name,
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (data: TFormProfileValues) => {
        try {
            await updateUserInfo({
                email: data.email,
                name: data.name,
                password: data.password,
            })

            toast.error('Данные обновлены 📝', {
                icon: '✅',
            })
        } catch (error) {
            console.log(error)
            return toast.error('Ошибка при обновлении данных', {
                icon: '❌',
            })
        }
    }

    const onClickSignOut = () => {
        signOut({
            callbackUrl: '/',
        })
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput name="email" label="E-Mail" required />
                <FormInput name="name" label="Полное имя" required />

                <FormInput type="password" name="password" label="Новый пароль" required />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    label="Повторите пароль"
                    required
                />

                <Button
                    disabled={form.formState.isSubmitting}
                    className="text-base mt-10 mr-4"
                    type="submit"
                >
                    Сохранить
                </Button>

                <Button
                    onClick={onClickSignOut}
                    variant="secondary"
                    disabled={form.formState.isSubmitting}
                    className="text-base"
                    type="button"
                >
                    Выйти
                </Button>
            </form>
        </FormProvider>
    )
}
