import { Container } from '@/components/shared/container'
import { Header } from '@/components/shared/header'
import { CarListingSkeleton } from '@/components/shared/car-listing-skeleton'

export default function Loading() {
    return (
        <>
            <Header />
            <Container>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <CarListingSkeleton key={`user-listing-skeleton-${idx}`} />
                    ))}
                </div>
            </Container>
        </>
    )
}

