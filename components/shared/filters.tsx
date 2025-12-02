'use client'

import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { useFilters } from '@/hooks/useFilters'
import { useFiltersBrands } from '@/hooks/useFiltersBrands'
import { useFiltersModels } from '@/hooks/useFiltersModels'
import { useQueryFilters } from '@/hooks/useQueryFilters'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Search } from './search/search'
import { PaginationListings } from './pagination-listings'
import { CitiesSelect } from './cities-select/cities-select'

interface FiltersProps {
    className?: string
    totalPages: number
}

export const Filters = ({ className, totalPages }: FiltersProps) => {
    const [open, setOpen] = useState(false)

    const [openModel, setOpenModel] = useState(false)

    const { brands } = useFiltersBrands()
    const { models } = useFiltersModels({})
    const filters = useFilters()

    useQueryFilters(filters)

    return (
        <>
            <Search filters={filters} />
            <div className={cn('flex flex-col gap-4', className)}>
                <div className="flex flex-col gap-2">
                    <Label htmlFor={'brand'}>Бренд</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                id="brand"
                                variant="outline"
                                className="w-full block truncate text-left"
                            >
                                {filters.selectedBrands.size > 0
                                    ? Array.from(filters.selectedBrands).join(', ')
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
                                                filters.setBrands(brand.name)
                                                filters.clearModels()
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
                </div>
                {models.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <Label htmlFor={'model'}>Модель</Label>
                        <Popover open={openModel} onOpenChange={setOpenModel}>
                            <PopoverTrigger asChild>
                                <Button
                                    id={'model'}
                                    variant="outline"
                                    className="w-full block truncate text-left"
                                >
                                    {filters.selectedModels.size > 0
                                        ? Array.from(filters.selectedModels).join(', ')
                                        : 'Select models'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-2 max-h-[200px] overflow-y-auto">
                                <div className="flex flex-col space-y-2">
                                    {models.map((model) => (
                                        <div key={model.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                value={model.name}
                                                checked={filters.selectedModels.has(model.name)}
                                                onCheckedChange={() =>
                                                    filters.setModels(model.name)
                                                }
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
                    </div>
                )}

                <CitiesSelect value={filters.city} setValue={filters.setCity} />

                <div className="flex flex-col gap-2">
                    <Label htmlFor={'price'}>Цена, ₽</Label>
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            placeholder="от"
                            value={String(filters.prices.priceFrom)}
                            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
                        />
                        <Input
                            type="number"
                            placeholder="до"
                            value={String(filters.prices.priceTo)}
                            min={1000}
                            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor={'price'}>Год выпуска</Label>
                    <div className="flex gap-2">
                        <Input
                            placeholder="от"
                            type="number"
                            value={String(filters.year.yearFrom)}
                            onChange={(e) => filters.setYear('yearFrom', Number(e.target.value))}
                        />
                        <Input
                            placeholder="до"
                            type="number"
                            value={String(filters.year.yearTo)}
                            onChange={(e) => filters.setYear('yearTo', Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor={'price'}>Пробег, км</Label>
                    <div className="flex gap-2">
                        <Input
                            placeholder="от"
                            type="number"
                            value={String(filters.mileage.mileageFrom)}
                            onChange={(e) =>
                                filters.setMileage('mileageFrom', Number(e.target.value))
                            }
                        />
                        <Input
                            placeholder="до"
                            type="number"
                            value={String(filters.mileage.mileageTo)}
                            onChange={(e) =>
                                filters.setMileage('mileageTo', Number(e.target.value))
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor={'price'}>Коробка передач</Label>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="manual"
                            value={'manual'}
                            onCheckedChange={() => filters.setGearbox('MANUAL')}
                        />
                        <label htmlFor={`manual`}>Механика</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="auto"
                            value={'auto'}
                            onCheckedChange={() => filters.setGearbox('AUTOMATIC')}
                        />
                        <label htmlFor={`auto`}>Автоматическая</label>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor={'price'}>Тип двигателя</Label>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="gasoline"
                            value={'gasoline'}
                            onCheckedChange={() => filters.setFuelType('GASOLINE')}
                        />
                        <label htmlFor={`gasoline`}>Бензин</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="diesel"
                            value={'diesel'}
                            onCheckedChange={() => filters.setFuelType('DIESEL')}
                        />
                        <label htmlFor={`diesel`}>Дизель</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="electric"
                            value={' electric'}
                            onCheckedChange={() => filters.setFuelType('ELECTRIC')}
                        />
                        <label htmlFor={`electric`}>Электрический</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="hybrid"
                            value={'hybrid'}
                            onCheckedChange={() => filters.setFuelType('HYBRID')}
                        />
                        <label htmlFor={`hybrid`}>Гибрид</label>
                    </div>
                </div>
            </div>
            <PaginationListings filters={filters} totalPages={totalPages} />
        </>
    )
}
