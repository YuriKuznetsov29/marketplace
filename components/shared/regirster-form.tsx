'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { registerUser } from '@/app/api/actions'

const formSchema = z
    .object({
        email: z.string().email('Invalid email'),
        name: z.string().nonempty('Name is required'), // Optional: Add a required validation message
        password: z.string().min(6, 'Password must be at least 6 characters long'),
        confirmPassword: z
            .string()
            .min(6, 'Confirmation password must be at least 6 characters long'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })

export const RegisterForm: React.FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { email, name, password } = values
            await registerUser({ email, name, password })
        } catch (error) {
            console.log(console.log(error, 'registration error'))
        }
    }

    return (
        <>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="confirmPassword" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Зарегистрироваться</Button>
                </form>
            </FormProvider>
        </>
    )
}
