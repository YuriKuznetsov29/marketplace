import { render } from '@testing-library/react'
// import mockRouter from 'next-router-mock'

// jest.mock('../../../lib/utils', () => ({
//     cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
// }))

// jest.mock('next/navigation', () => ({
//     useSearchParams: () => new URLSearchParams('?page=1'),
//     usePathname: () => '/search',
//     useRouter: () => ({
//         push: jest.fn(),
//         replace: jest.fn(),
//         back: jest.fn(),
//         forward: jest.fn(),
//         refresh: jest.fn(),
//         prefetch: jest.fn(),
//     }),
// }))

import { useSearchParams, useRouter } from 'next/navigation'

export const componentRender = (component: React.ReactNode) => {
    jest.mock('next/navigation')

    const getMock: jest.Mock = jest.fn().mockImplementation(() => '1')
    const toStringMock: jest.Mock = jest.fn()
    ;(useSearchParams as jest.Mock).mockReturnValue({
        get: getMock,
        toString: toStringMock,
    })

    const routerPushMock: jest.Mock = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
        push: routerPushMock,
    })

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
    // Reference: https://github.com/nextauthjs/next-auth/discussions/4185#discussioncomment-2397318
    // We also need to mock the whole next-auth package, since it's used in
    // our various pages via the `export { getServerSideProps }` function.
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
    return render(component)
}
