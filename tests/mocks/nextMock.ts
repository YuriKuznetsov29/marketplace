import { useSearchParams, useRouter } from 'next/navigation'

// jest.mock('next/navigation')

// ;(useSearchParams as jest.Mock).mockReturnValue({
//     get: getMock,
//     toString: toStringMock,
// })

jest.mock('next/navigation', () => {
    const getMock: jest.Mock = jest.fn().mockImplementation(() => '1')
    const toStringMock: jest.Mock = jest.fn()
    return {
        useSearchParams() {
            return new URLSearchParams(
                'priceFrom=10000&priceTo=1000000&mileageFrom=1&mileageTo=200000&yearFrom=2020&yearTo=2025&brands=Toyota&models=Camry&fuelType=GASOLINE%2CDIESEL&gearbox=MANUAL%2CAUTOMATIC&city=2%2C6&query=&page=1'
            )
        },
        get: getMock,
        toString: toStringMock,
    }
})

// const routerPushMock: jest.Mock = jest.fn()
// ;(useRouter as jest.Mock).mockReturnValue({
//     push: routerPushMock,
// })

const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { name: 'admin' },
}

jest.mock('next-auth/react', () => {
    const originalModule = jest.requireActual('next-auth/react')
    return {
        __esModule: true,
        ...originalModule,
        useSession: jest.fn(() => ({
            data: mockSession,
            status: 'authenticated',
        })),
    }
})

jest.mock('next-auth', () => ({
    __esModule: true,
    default: jest.fn(),
    unstable_getServerSession: jest.fn(
        () =>
            new Promise((resolve) => {
                resolve({
                    expiresIn: undefined,
                    loggedInAt: undefined,
                    someProp: 'someString',
                })
            })
    ),
}))
