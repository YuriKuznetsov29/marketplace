// app/loading.tsx
import { CarListingSkeleton } from '@/entities/listing'
import { Container } from '@/widgets/container'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <>
            <main className="w-full">
                <Container>
                    <div className="w-full grid grid-cols-[300px_1fr] gap-4">
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-2/3" />
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-8 w-1/2" />
                        </div>
                        <div className="w-full grid grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <CarListingSkeleton key={`skeleton-${i}`} />
                            ))}
                        </div>
                    </div>
                </Container>
            </main>
        </>
    )
}
