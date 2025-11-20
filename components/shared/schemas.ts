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

const date = new Date()
const year = date.getFullYear()

export const listingSchema = z.object({
    brand: z.string().nonempty('Выберите марку'),
    model: z.string().nonempty('Выберите модель'),
    city: z.string().nonempty('Выберите город'),
    year: z.coerce.number().min(1900, 'Укажите корректный год').max(year, 'Укажите корректный год'),
    price: z.coerce.number().min(0, 'Введите цену'),
    mileage: z.coerce.number().min(0, 'Введите пробег'),
    fuelType: z
        .union([
            z.literal('GASOLINE'),
            z.literal('DIESEL'),
            z.literal('ELECTRIC'),
            z.literal('HYBRID'),
        ])
        .refine((value) => value.length > 0, {
            message: 'Выберете тип двигателя',
        }),
    gearbox: z
        .union([z.literal('MANUAL'), z.literal('AUTOMATIC')])
        .refine((value) => value.length > 0, {
            message: 'Выберите коробку передач',
        }),
    description: z.string().nonempty('Введите описание'),
    images: z.custom<FileList>(),
})

export type TFormLoginValues = z.infer<typeof loginSchema>
export type TFormRegisterValues = z.infer<typeof registrationSchema>
export type TFormListingValues = z.infer<typeof listingSchema>
