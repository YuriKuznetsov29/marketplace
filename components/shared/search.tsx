'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useDebounce } from 'react-use'
import { redirect, useRouter } from 'next/navigation'
import { Api } from '@/services/api-client'
import { Listing } from '@prisma/client'
import { CarListing } from './car-listing'
import { FiltersReturnProps, useFilters } from '@/hooks/useFilters'
import { useQueryFilters } from '@/hooks/useQueryFilters'
import { useQuerySearch } from '@/hooks/useQuerySearch'
import { useSearch } from '@/hooks/useSearch'

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
