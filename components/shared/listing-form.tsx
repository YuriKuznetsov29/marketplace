'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput } from './form-input'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import { TFormListingValues, listingSchema } from './schemas'
import { useFiltersBrands } from '@/hooks/useFiltersBrands'
import { useFiltersModels } from '@/hooks/useFiltersModels'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { FormTextarea } from './form-textarea'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { createListing } from '@/app/api/actions'

export const ListingForm = () => {
    const form = useForm<TFormListingValues>({
        resolver: zodResolver(listingSchema),
        defaultValues: {
            brand: '',
            model: '',
            fuelType: '',
            year: '',
            gearbox: '',
            price: '',
            mileage: '',
            images: undefined,
            description: '',
        },
    })

    const [brand, setBrand] = useState('')
    const formRef = useRef<HTMLFormElement>(null)

    const { brands } = useFiltersBrands()
    const { models } = useFiltersModels({ brand })

    const onSubmit = async (data: TFormListingValues) => {
        if (formRef.current instanceof HTMLFormElement) {
            const body = new FormData(formRef.current)
            console.log(data, models, body, 'data')
            try {
                await createListing(data)

                toast.error('Данные обновлены 📝', {
                    icon: '✅',
                })
            } catch (error) {
                return toast.error('Ошибка при обновлении данных', {
                    icon: '❌',
                })
            }
        }
    }

    const onChangeBrand = (value: string) => {
        setBrand(value)
    }

    const date = new Date()
    const year = date.getFullYear()

    return (
        <FormProvider {...form}>
            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name="brand"
                    control={form.control}
                    render={({ field }) => (
                        <Select
                            onValueChange={(value) => {
                                onChangeBrand(value)
                                field.onChange(value)
                            }}
                            defaultValue={field.value}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Выберете бренд" />
                            </SelectTrigger>
                            <SelectContent>
                                {brands.map((brand) => (
                                    <SelectItem value={brand.name}>{brand.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {models.length > 0 && (
                    <FormField
                        name="model"
                        control={form.control}
                        render={({ field }) => (
                            <Select
                                onValueChange={(value) => field.onChange(value)}
                                defaultValue={field.value}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Выберете модель" />
                                </SelectTrigger>
                                <SelectContent>
                                    {models.map((model) => (
                                        <SelectItem value={model.name}>{model.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                )}
                <FormField
                    name="fuelType"
                    control={form.control}
                    render={({ field }) => (
                        <Select
                            onValueChange={(value) => {
                                onChangeBrand(value)
                                field.onChange(value)
                            }}
                            defaultValue={field.value}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Тип двигателя" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="GASOLINE">Бензин</SelectItem>
                                <SelectItem value="DIESEL">Дизель</SelectItem>
                                <SelectItem value="ELECTRIC">Электрический</SelectItem>
                                <SelectItem value="HYBRID">Гибрид</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <FormField
                    name="gearbox"
                    control={form.control}
                    render={({ field }) => (
                        <Select
                            onValueChange={(value) => {
                                onChangeBrand(value)
                                field.onChange(value)
                            }}
                            defaultValue={field.value}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Коробка передач" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="AUTOMATIC">Автоматическая</SelectItem>
                                <SelectItem value="MANUAL">Ручная</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <FormInput
                    name="year"
                    label="Год выпуска"
                    min={1930}
                    max={year}
                    type="number"
                    required
                />
                <FormInput name="price" label="Цена" min={10000} type="number" required />
                <FormInput name="mileage" label="Пробег" type="number" required />
                <FormTextarea name="description" label="Описание" required />
                <FormInput name="images" accept="image/*" label="Фото" type="file" />
                <Button className="w-full mt-4" type="submit">
                    Разместить объявление
                </Button>
            </form>
        </FormProvider>
    )
}
