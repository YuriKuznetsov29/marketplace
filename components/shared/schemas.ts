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

export const listingSchema = z.object({
    brand: z.string().nonempty('Выберите марку'),
    model: z.string().nonempty('Выберите модель'),
    year: z.string().nonempty('Выберите год'),
    price: z.string().nonempty('Выберите цену'),
    mileage: z.string().nonempty('Выберите пробег'),
    fuelType: z.string().nonempty('Выберите тип топлива'),
    gearbox: z.string().nonempty('Выберите коробку передач'),
    description: z.string().nonempty('Введите описание'),
    image: z.string().nonempty('Загрузите фото'),
})

export type TFormLoginValues = z.infer<typeof loginSchema>
export type TFormRegisterValues = z.infer<typeof registrationSchema>
export type TFormListingValues = z.infer<typeof listingSchema>
