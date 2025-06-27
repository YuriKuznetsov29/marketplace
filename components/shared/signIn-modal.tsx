'use client'

import { z } from 'zod'
import { Dialog, DialogContent } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Input } from '../ui/input'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '../ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession, signOut, signIn } from 'next-auth/react'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

export const SignInModal: React.FC<Props> = ({ open, setOpen }: Props) => {
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
        <Dialog open={open}>
            <DialogContent>
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
                        <Button type="submit">Submit</Button>
                    </form>
                </FormProvider>
                {/* <Button onClick={() => signIn('github')}>GitHub</Button> */}
            </DialogContent>
        </Dialog>
    )
}
