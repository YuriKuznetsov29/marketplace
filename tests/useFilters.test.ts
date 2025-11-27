import { useFilters } from '../hooks/useFilters'
import { useSearchParams } from 'next/navigation'
import { renderHook } from '@testing-library/react'

jest.mock('next/navigation', () => ({
    useSearchParams() {
        return new URLSearchParams(
            'priceFrom=10000&priceTo=1000000&mileageFrom=1&mileageTo=200000&yearFrom=2020&yearTo=2025&brands=Toyota&models=Camry&fuelType=GASOLINE%2CDIESEL&gearbox=MANUAL%2CAUTOMATIC&city=2%2C6&query=&page=1'
        )
    },
}))

describe('useFilters', () => {
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
})
