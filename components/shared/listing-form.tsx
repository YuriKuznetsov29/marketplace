'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput } from './form-input'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import { TFormListingValues, listingSchema } from './schemas'
import { useFiltersBrands } from '@/hooks/useFiltersBrands'
import { useFiltersModels } from '@/hooks/useFiltersModels'
import { Label } from '@radix-ui/react-label'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Checkbox } from '../ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Brand } from '@prisma/client'

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
            image: '',
            description: '',
        },
    })

    const [brand, setBrand] = useState('')

    const [openModel, setOpenModel] = useState(false)

    const { brands } = useFiltersBrands()
    const { models } = useFiltersModels({ brand })

    const onSubmit = async (data: TFormListingValues) => {
        try {
            console.log(data)
            toast.error('Данные обновлены 📝', {
                icon: '✅',
            })
        } catch (error) {
            return toast.error('Ошибка при обновлении данных', {
                icon: '❌',
            })
        }
    }

    const onChangeBrand = (value: string) => {
        setBrand(value)
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Select name="brand" onValueChange={(value) => onChangeBrand(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Выберете бренд" />
                    </SelectTrigger>
                    <SelectContent>
                        {brands.map((brand) => (
                            <SelectItem value={brand.name}>{brand.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {models.length > 0 && (
                    <Select name="model">
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
                <FormInput name="email" label="E-Mail" required />
                <Button className="w-full mt-4" type="submit">
                    Зарегистрироваться
                </Button>
            </form>
        </FormProvider>
    )
}
