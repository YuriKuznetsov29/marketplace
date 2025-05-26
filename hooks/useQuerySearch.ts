import React from 'react'
import qs from 'qs'
import { useRouter } from 'next/navigation'

export const useQuerySearch = (searchQuery: string) => {
    const isMounted = React.useRef(false)
    const router = useRouter()

    React.useEffect(() => {
        if (isMounted.current) {
            const params = {
                query: searchQuery,
            }

            const query = qs.stringify(params, {
                arrayFormat: 'comma',
            })

            router.push(`?${query}`, {
                scroll: false,
            })
        }

        isMounted.current = true
    }, [searchQuery])
}
