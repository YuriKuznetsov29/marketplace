import { useRef, useEffect } from 'react'

export function useFreezeScroll<T>({
    messages,
    containerRef,
}: {
    messages: T[]
    containerRef: React.RefObject<HTMLDivElement>
}) {
    const isPaginationRef = useRef(false)
    const prevScrollHeightRef = useRef(0)

    const beforePagination = () => {
        const container = containerRef.current
        if (!container) return

        prevScrollHeightRef.current = container.scrollHeight
        isPaginationRef.current = true
    }

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // 🟢 ПАГИНАЦИЯ — сохраняем позицию
        if (isPaginationRef.current) {
            const newScrollHeight = container.scrollHeight
            const diff = newScrollHeight - prevScrollHeightRef.current

            container.scrollTop += diff
            isPaginationRef.current = false
            return
        }

        // 🔵 НОВОЕ СООБЩЕНИЕ — вниз
        container.scrollTop = container.scrollHeight
    }, [messages, containerRef])

    return {
        beforePagination,
    }
}
