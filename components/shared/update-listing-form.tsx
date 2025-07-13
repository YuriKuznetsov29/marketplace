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
import { FormField } from '@/components/ui/form'
import { updateListing } from '@/app/api/actions'
import { Brand, Listing, Model } from '@prisma/client'

interface Props {
    listing: Listing & {
        brand: Brand
        model: Model
    }
}

export const UpdateListingForm: React.FC = () => {
    const form = useForm<TFormListingValues>({
        resolver: zodResolver(listingSchema),
        defaultValues: {
            // brand: listing.brand.name,
            // model: listing.model.name,
            brand: '',
            model: '',
            fuelType: undefined,
            year: undefined,
            gearbox: undefined,
            price: undefined,
            mileage: undefined,
            images: undefined,
            description: '',
        },
    })

    const [brand, setBrand] = useState(null)
    const formRef = useRef<HTMLFormElement>(null)

    // const { brands } = useFiltersBrands()
    // const { models } = useFiltersModels({ brand })

    const onSubmit = async (data: TFormListingValues) => {
        if (formRef.current instanceof HTMLFormElement) {
            try {
                // await updateListing(data)

                toast.error('Объявление создано 📝', {
                    icon: '✅',
                })
            } catch (error) {
                return toast.error('Ошибка при создании объявления', {
                    icon: '❌',
                })
            }
        }
    }

    // const date = new Date()
    // const year = date.getFullYear()

    return (
        <FormProvider {...form}>
            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name="brand"
                    render={({ field }) => (
                        <Select
                            onValueChange={(value) => {
                                setBrand(value)
                                field.onChange(value)
                            }}
                            defaultValue={field.value}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Выберете бренд" />
                            </SelectTrigger>
                            <SelectContent>
                                {brands.map((brand) => (
                                    <SelectItem value={brand.id}>{brand.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {models && models?.length > 0 && (
                    <FormField
                        name="model"
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
                                        <SelectItem value={model.id}>{model.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                )}
                <FormField
                    name="fuelType"
                    render={({ field }) => (
                        <Select
                            onValueChange={(value) => {
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
                    render={({ field }) => (
                        <Select
                            onValueChange={(value) => {
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
                    max={2025}
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
