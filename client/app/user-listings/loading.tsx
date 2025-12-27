import { Container } from '@/widgets/container'
import { CarListingSkeleton } from '@/entities/listing'

export default function Loading() {
    return (
        <>
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
