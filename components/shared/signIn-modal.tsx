'use client'

import { z } from 'zod'
import { DialogContent } from '@radix-ui/react-dialog'
import { Dialog } from '../ui/dialog'
import { Form } from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { zodResolver } from '@hookform/resolvers/zod'

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

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Dialog open={open}>
            <DialogContent>
                <Form {...form}>
                    <Input placeholder="Email" />
                    <Input placeholder="Password" />
                    <Button type="submit">Submit</Button>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
