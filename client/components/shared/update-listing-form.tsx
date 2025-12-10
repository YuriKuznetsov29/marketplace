'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { updateListing } from '@/app/api/actions'
import { useFiltersBrands } from '@/hooks/useFiltersBrands'
import { useFiltersModels } from '@/hooks/useFiltersModels'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { FormCitiesSelect } from './cities-select/form-cities-select'
import { FormInput } from './form-input'
import { FormTextarea } from './form-textarea'
import { fuelOptions, gearboxOptions } from './constants/listing-options'
import { TFormListingValues, listingSchema } from './schemas'
import { Brand, Listing, Model } from '@prisma/client'

interface Props {
    listing: (Listing & {
        brand: Brand
        model: Model
    }) & {
        cityId?: number | null
    }
}

export const UpdateListingForm: React.FC<Props> = ({ listing }) => {
    const form = useForm<TFormListingValues>({
        resolver: zodResolver(listingSchema),
        defaultValues: {
            brand: listing.brand.id,
            model: listing.model.id,
            city: listing.cityId ? String(listing.cityId) : '',
            fuelType: listing.fuelType,
            year: listing.year,
            gearbox: listing.gearbox,
            price: listing.price,
            mileage: listing.mileage,
            images: undefined,
            description: listing.description,
        },
    })

    const { isSubmitting } = form.formState

    const [brand, setBrand] = useState(listing.brand.id)

    const { brands } = useFiltersBrands()
    const { models } = useFiltersModels({ brand })

    const onSubmit = async (data: TFormListingValues) => {
        try {
            await updateListing({ ...data, id: listing.id })

            toast.success('Объявление обновлено ✏️', {
                icon: '✅',
            })
        } catch (error) {
            console.error(error)
            toast.error('Ошибка при обновлении объявления', {
                icon: '❌',
            })
        }
    }

    const currentYear = new Date().getFullYear()

    useEffect(() => {
        if (brand !== listing.brand.id) {
            form.setValue('model', '')
        }
    }, [brand, form, listing.brand.id])

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-4xl">
                <Card className="border border-border/70 shadow-lg">
                    <CardHeader className="space-y-2 border-b bg-muted/50">
                        <CardTitle>Редактирование объявления</CardTitle>
                        <CardDescription>
                            При необходимости обновите характеристики автомобиля, фотографии и
                            контактные данные. Изменения вступят в силу сразу после сохранения.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-10 py-10">
                        <section className="space-y-4">
                            <div>
                                <h3 className="text-base font-semibold">Основная информация</h3>
                                <p className="text-sm text-muted-foreground">
                                    Уточните марку, модель и город размещения. Эти данные помогут
                                    покупателям быстрее найти ваше объявление.
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="brand"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel>Бренд</FormLabel>
                                            <Select
                                                onValueChange={(value) => {
                                                    setBrand(value)
                                                    field.onChange(value)
                                                }}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="h-12 w-full justify-between">
                                                        <SelectValue placeholder="Выберите бренд" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {brands.map((brandItem) => (
                                                        <SelectItem
                                                            key={brandItem.id}
                                                            value={brandItem.id}
                                                        >
                                                            {brandItem.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {models.length > 0 && (
                                    <FormField
                                        key={brand}
                                        control={form.control}
                                        name="model"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col gap-2">
                                                <FormLabel>Модель</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="h-12 w-full justify-between">
                                                            <SelectValue placeholder="Выберите модель" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {models.map((model) => (
                                                            <SelectItem
                                                                key={model.id}
                                                                value={model.id}
                                                            >
                                                                {model.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                <FormCitiesSelect
                                    control={form.control}
                                    className="md:col-span-2 lg:col-span-1"
                                    placeholder="Выберите город размещения"
                                />
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div>
                                <h3 className="text-base font-semibold">
                                    Технические характеристики
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Проверьте корректность характеристик автомобиля, чтобы повысить
                                    доверие покупателей.
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="fuelType"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel>Тип двигателя</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="h-12 w-full justify-between">
                                                        <SelectValue placeholder="Выберите тип топлива" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {fuelOptions.map((option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="gearbox"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel>Коробка передач</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="h-12 w-full justify-between">
                                                        <SelectValue placeholder="Выберите коробку передач" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {gearboxOptions.map((option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormInput
                                    className="flex flex-col"
                                    name="year"
                                    label="Год выпуска"
                                    min={1930}
                                    max={currentYear}
                                    type="number"
                                    required
                                />
                                <FormInput
                                    className="flex flex-col"
                                    name="mileage"
                                    label="Пробег, км"
                                    type="number"
                                    min={0}
                                    required
                                />
                                <FormInput
                                    className="flex flex-col"
                                    name="price"
                                    label="Цена, ₽"
                                    min={10000}
                                    type="number"
                                    required
                                />
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div>
                                <h3 className="text-base font-semibold">Описание и медиа</h3>
                                <p className="text-sm text-muted-foreground">
                                    Обновите описание и фотографии при необходимости, чтобы
                                    поддерживать актуальность объявления.
                                </p>
                            </div>
                            <div className="grid gap-4">
                                <FormTextarea
                                    className="flex flex-col"
                                    name="description"
                                    label="Описание"
                                    placeholder="Опишите состояние автомобиля, комплектацию и историю обслуживания"
                                    required
                                />
                                <FormInput
                                    className="flex flex-col"
                                    name="images"
                                    accept="image/*"
                                    label="Фотографии"
                                    type="file"
                                    multiple
                                />
                            </div>
                        </section>
                    </CardContent>

                    <CardFooter className="border-t bg-muted/30 pt-6">
                        <Button
                            className="ml-auto min-w-[220px]"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Сохраняем...' : 'Сохранить изменения'}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </FormProvider>
    )
}
