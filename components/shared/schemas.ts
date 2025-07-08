import { z } from 'zod'

export const passwordSchema = z.string().min(4, { message: 'Введите корректный пароль' })

export const loginSchema = z.object({
    email: z.string().email('Введите корректную почту'),
    password: passwordSchema,
})

export const registrationSchema = loginSchema
    .merge(
        z.object({
            name: z.string().nonempty('Введите имя'),
            confirmPassword: passwordSchema,
        })
    )
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    })

export type TFormLoginValues = z.infer<typeof loginSchema>
export type TFormRegisterValues = z.infer<typeof registrationSchema>
