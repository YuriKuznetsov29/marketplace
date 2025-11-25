const { useCallback } = require('react')

const useDebounce = (cb, delay) => {
    let timerId = null

    return useCallback(
        (...args) => {
            if (timerId) clearTimeout(timerId)
            timerId = setTimeout(() => {
                cb(...args)
            }, delay)
        },
        [cb]
    )
}

function User({ userId }) {
    const [user, setUser] = useState(null)

    const fetchUsers = async () => {
        const data = await fetch(`/api/users/${userId}`)
        const response = await data.json()
        setUser(response)
    }

    const fetchUsersDebounced = useDebounce(fetchUsers, 1000)

    useEffect(() => {
        fetchUsersDebounced()
    }, [userId])

    return <div>{user?.name}</div>
}
