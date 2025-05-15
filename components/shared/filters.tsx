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
import { Brand } from '@prisma/client'
import { useFiltersBrands } from '@/hooks/useFiltersBrands'
import { useFiltersModels } from '@/hooks/useFiltersModels'
import { useQueryFilters } from '@/hooks/useQueryFilters'

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
    const [selected, setSelected] = useState<Brand[]>([])
    const [open, setOpen] = useState(false)

    const [openModel, setOpenModel] = useState(false)

    const { brands } = useFiltersBrands()
    const { models } = useFiltersModels()
    const filters = useFilters()

    useQueryFilters(filters)

    const toggleOption = (brand: Brand) => {
        setSelected((prev) =>
            prev.includes(brand) ? prev.filter((v) => v !== brand) : [...prev, brand]
        )
    }

    console.log(filters.selectedBrands)

    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-64 justify-start">
                        {selected.length > 0
                            ? selected.map((brand) => brand.name).join(', ')
                            : 'Select brands'}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2">
                    <div className="flex flex-col space-y-2">
                        {brands.map((brand) => (
                            <div key={brand.id} className="flex items-center space-x-2">
                                <Checkbox
                                    value={brand.name}
                                    checked={filters.selectedBrands.has(brand.name)}
                                    onCheckedChange={() => {
                                        console.log('change')
                                        filters.setBrands(brand.name)
                                    }}
                                    id={`checkbox-${String(brand.name)}-${String(brand.id)}`}
                                />
                                <label
                                    htmlFor={`checkbox-${String(brand.name)}-${String(brand.id)}`}
                                >
                                    {brand.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
            {models.length > 0 && (
                <Popover open={openModel} onOpenChange={setOpenModel}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-64 justify-start">
                            {filters.selectedModels.size > 0
                                ? Array.from(filters.selectedModels).join(', ')
                                : 'Select models'}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-2 max-h-[200px] overflow-y-scroll">
                        <div className="flex flex-col space-y-2">
                            {models.map((model) => (
                                <div key={model.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        value={model.name}
                                        checked={filters.selectedModels.has(model.name)}
                                        onCheckedChange={() => filters.setModels(model.name)}
                                        id={`checkbox-${String(model.name)}-${String(model.id)}`}
                                    />
                                    <label
                                        htmlFor={`checkbox-${String(model.name)}-${String(model.id)}`}
                                    >
                                        {model.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            )}
            {/* <Select onValueChange={setBrandId}>
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
            )} */}
        </div>
    )
}
