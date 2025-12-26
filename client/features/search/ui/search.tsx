'use client'
import React, { useState } from 'react'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { FiltersReturnProps } from '@/hooks/useFilters'

interface Props {
    filters: FiltersReturnProps
}
export const Search: React.FC<Props> = ({ filters }: Props) => {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <div className="flex w-full items-center space-x-2 col-span-2">
            <Input
                type="text"
                placeholder="Введите запрос"
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" onClick={() => filters.setQuery(searchQuery)}>
                Search
            </Button>
        </div>
    )
}
