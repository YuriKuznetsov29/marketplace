import { useFilters } from '../useFilters'
import { useSearchParams } from 'next/navigation'
import { renderHook } from '@testing-library/react'

describe('useFilters', () => {
    beforeAll(() => {
        jest.clearAllMocks()
    })

    it('should return url parameters', () => {
        const params = useSearchParams()
        expect(params.get('page')).toBe('1')

        const { result } = renderHook(() => useFilters())
        expect(result.current.page).toBe(1)
        expect(result.current.prices.priceFrom).toBe(10000)
        expect(result.current.prices.priceTo).toBe(1000000)
        expect(result.current.mileage.mileageFrom).toBe(1)
        expect(result.current.mileage.mileageTo).toBe(200000)
        expect(result.current.year.yearFrom).toBe(2020)
        expect(result.current.year.yearTo).toBe(2025)

        const brand = new Set(['Toyota'])
        expect(result.current.selectedBrands).toEqual(brand)

        const model = new Set(['Camry'])
        expect(result.current.selectedModels).toEqual(model)

        const fuelType = new Set(['GASOLINE', 'DIESEL'])
        expect(result.current.fuelType).toEqual(fuelType)

        const gearbox = new Set(['MANUAL', 'AUTOMATIC'])
        expect(result.current.gearbox).toEqual(gearbox)

        expect(result.current.city).toBe('2,6')
        expect(result.current.query).toBe('')
    })

    it('should return an object whith correct properties', () => {
        const { result } = renderHook(() => useFilters())
        expect(result.current.prices).toHaveProperty('priceFrom')
        expect(result.current.prices).toHaveProperty('priceTo')
        expect(result.current.mileage).toHaveProperty('mileageFrom')
        expect(result.current.mileage).toHaveProperty('mileageTo')
        expect(result.current.year).toHaveProperty('yearFrom')
        expect(result.current.year).toHaveProperty('yearTo')
        expect(result.current).toHaveProperty('selectedBrands')
        expect(result.current).toHaveProperty('selectedModels')
        expect(result.current).toHaveProperty('fuelType')
        expect(result.current).toHaveProperty('gearbox')
        expect(result.current).toHaveProperty('city')
        expect(result.current).toHaveProperty('query')
        expect(result.current).toHaveProperty('page')
        expect(typeof result.current.setQuery).toBe('function')
        expect(typeof result.current.setBrands).toBe('function')
        expect(typeof result.current.setModels).toBe('function')
        expect(typeof result.current.setPrices).toBe('function')
        expect(typeof result.current.setMileage).toBe('function')
        expect(typeof result.current.setYear).toBe('function')
        expect(typeof result.current.setGearbox).toBe('function')
        expect(typeof result.current.setFuelType).toBe('function')
        expect(typeof result.current.setCity).toBe('function')
        expect(typeof result.current.setPage).toBe('function')
    })
})
