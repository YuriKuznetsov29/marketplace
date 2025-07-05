import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

interface Props {
    setOpen: (open: boolean) => void
}

export const SignInForm: React.FC<Props> = ({ setOpen }: Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
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
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
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
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit">
                    Войти
                </Button>
            </form>
        </FormProvider>
    )
}
