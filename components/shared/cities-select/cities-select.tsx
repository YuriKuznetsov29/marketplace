import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { handleApiError } from '@/lib/handle-api-error'
import { Api } from '@/services/api-client'
import React, { useEffect, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'

interface CitiesSelectProps {
    value: string
    setValue: (value: string) => void
}
export function CitiesSelect({ value, setValue }: CitiesSelectProps) {
    const [cities, setCities] = useState<{ id: number; city: string }[]>([])
    const [valueName, setValueName] = useState('')

    const onChangeValue = (val: string) => {
        setValue(val)
        setValueName(cities.find((c) => String(c.id) === val)?.city || '')
    }

    useEffect(() => {
        Api.cities
            .getCities()
            .then((res) => {
                const normalized = res
                    .filter((c) => c.city && typeof c.id === 'number')
                    .map((c) => ({ id: c.id, city: c.city! }))
                    .sort((a, b) => a.city.localeCompare(b.city))
                setCities([{ id: -1, city: 'Выберете город' }, ...normalized])
            })
            .catch((err) => handleApiError(err))
    }, [])

    return (
        <Select
            value={value}
            onValueChange={(val) => {
                onChangeValue(val)
            }}
        >
            <SelectTrigger className="h-12 w-full justify-between">
                <SelectValue placeholder={'Выберите город'}>{valueName}</SelectValue>
            </SelectTrigger>
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
    )
}
