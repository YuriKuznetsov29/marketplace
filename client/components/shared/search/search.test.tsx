import { render, screen } from '@testing-library/react'
import { FiltersReturnProps, useFilters } from '@/hooks/useFilters'
import { Search } from './search'
import { userEvent } from '@testing-library/user-event'
const Wrapper = () => {
    const filters = useFilters()
    return <Search filters={filters} />
}

describe('Search', () => {
    it('test render', () => {
        render(<Wrapper />)
        expect(screen.getByText('Search')).toBeInTheDocument()
    })

    it('test typing', async () => {
        render(<Wrapper />)
        expect(screen.getByText('Search')).toBeInTheDocument()

        const input = screen.getByPlaceholderText('Введите запрос')

        const user = userEvent.setup()
        await user.type(input, 'test')

        expect(input).toHaveValue('test')
    })

    it('calls filters.setQuery with current input value', async () => {
        const mockFilters = {
            setQuery: jest.fn(),
        } as unknown as FiltersReturnProps

        render(<Search filters={mockFilters} />)

        const input = screen.getByPlaceholderText('Введите запрос')
        const button = screen.getByText('Search')

        const user = userEvent.setup()
        await user.type(input, 'test')
        await user.click(button)

        expect(input).toHaveValue('test')
        expect(mockFilters.setQuery).toHaveBeenCalledWith('test')
        expect(mockFilters.setQuery).toHaveBeenCalledTimes(1)
    })
})
