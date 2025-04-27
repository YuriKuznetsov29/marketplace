'use client'

import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectGroup,
} from '@/components/ui/select'

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { useFilters } from '@/hooks/useFilters'

const options = [
    { label: 'React', value: 'react' },
    { label: 'Next.js', value: 'next' },
    { label: 'Tailwind', value: 'tailwind' },
    { label: 'TypeScript', value: 'ts' },
]

interface Props {
    className?: string
}

export const Filters: React.FC = ({ className }: Props) => {
    const [brandId, setBrandId] = React.useState<string>('')
    const { brands, models } = useFilters({ brandId })

    const [selected, setSelected] = useState<string[]>([])
    const [open, setOpen] = useState(false)

    const toggleOption = (value: string) => {
        setSelected((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        )
    }

    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-64 justify-start">
                        {selected.length > 0
                            ? selected
                                  .map((val) => options.find((opt) => opt.value === val)?.label)
                                  .join(', ')
                            : 'Select technologies'}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2">
                    <div className="flex flex-col space-y-2">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className="flex items-center space-x-2"
                                onClick={() => toggleOption(option.value)}
                            >
                                <Checkbox checked={selected.includes(option.value)} />
                                <span>{option.label}</span>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
            <Select onValueChange={setBrandId}>
                <SelectGroup>
                    <SelectLabel>Марка</SelectLabel>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Любая" />
                    </SelectTrigger>
                    <SelectContent>
                        {brands.map(({ id, name }) => (
                            <SelectItem key={id} value={id}>
                                {name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectGroup>
            </Select>
            {models.length > 0 && (
                <Select>
                    <SelectGroup>
                        <SelectLabel>Модель</SelectLabel>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Любая" />
                        </SelectTrigger>
                        <SelectContent>
                            {models.map(({ id, name }) => (
                                <SelectItem key={id} value={id}>
                                    {name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </SelectGroup>
                </Select>
            )}
        </div>
    )
}
