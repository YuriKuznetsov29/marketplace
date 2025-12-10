import { RefObject, useEffect } from 'react'

export interface useInfiniteScrollOptions {
    callback?: () => void
    triggerRef: RefObject<HTMLDivElement | null>
    wrapperRef: RefObject<HTMLDivElement | null>
}

export function useInfiniteScroll({ callback, triggerRef, wrapperRef }: useInfiniteScrollOptions) {
    useEffect(() => {
        let observer: IntersectionObserver | null = null

        if (callback) {
            const options = {
                root: wrapperRef ? wrapperRef.current : null,
                rootMargin: '10px',
                threshold: 1.0,
            }

            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback()
                }
            }, options)

            if (triggerRef.current) {
                observer.observe(triggerRef.current)
            }
        }

        return () => {
            if (observer && triggerRef.current) {
                observer.unobserve(triggerRef.current)
            }
        }
    }, [triggerRef, wrapperRef, callback])
}
