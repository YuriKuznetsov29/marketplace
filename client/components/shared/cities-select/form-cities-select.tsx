'use client'

import { useEffect, useState } from 'react'
import { useFormContext, type FieldValues } from 'react-hook-form'
import { Virtuoso } from 'react-virtuoso'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Api } from '@/services/api-client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'

interface FormCitiesSelectProps extends FieldValues {
    className?: string
    label?: string
    placeholder?: string
}

export const FormCitiesSelect: React.FC<FormCitiesSelectProps> = ({
    className,
    label = 'Город',
    placeholder = 'Выберите город',
    ...props
}) => {
    const { control, watch } = useFormContext()
    const [cities, setCities] = useState<{ id: number; city: string }[]>([])
    const selectedCityId = watch('city') // текущее значение из формы

    const selectedLabel = selectedCityId
        ? cities.find((c) => String(c.id) === selectedCityId)?.city
        : ''

    useEffect(() => {
        Api.cities.getCities().then((res) => {
            const normalized = res
                .filter((c) => c.city)
                .map((c) => ({ id: c.id, city: c.city! }))
                .sort((a, b) => a.city.localeCompare(b.city))
            setCities(normalized)
        })
    }, [])

    return (
        <FormField
            control={control}
            name="city"
            {...props}
            render={({ field }) => (
                <FormItem className={cn('flex flex-col gap-2', className)}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <Select value={field.value} onValueChange={(val) => field.onChange(val)}>
                        <FormControl>
                            <SelectTrigger className="h-12 w-full justify-between">
                                <SelectValue placeholder={placeholder}>{selectedLabel}</SelectValue>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <Virtuoso
                                style={{ height: 320 }}
                                totalCount={cities.length}
                                itemContent={(index) => {
                                    const city = cities[index]
                                    return (
                                        <SelectItem key={city.id} value={String(city.id)}>
                                            {city.city}
                                        </SelectItem>
                                    )
                                }}
                            />
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
