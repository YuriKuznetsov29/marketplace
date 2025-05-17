'use client'

import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { useFilters } from '@/hooks/useFilters'
import { Brand } from '@prisma/client'
import { useFiltersBrands } from '@/hooks/useFiltersBrands'
import { useFiltersModels } from '@/hooks/useFiltersModels'
import { useQueryFilters } from '@/hooks/useQueryFilters'

interface Props {
    className?: string
}

export const Filters: React.FC = ({ className }: Props) => {
    const [open, setOpen] = useState(false)

    const [openModel, setOpenModel] = useState(false)

    const { brands } = useFiltersBrands()
    const { models } = useFiltersModels()
    const filters = useFilters()

    useQueryFilters(filters)

    console.log(filters.selectedBrands)

    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-64 block truncate text-left">
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
                        <Button variant="outline" className="w-64 block truncate text-left">
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
        </div>
    )
}
