import { Skeleton } from '@/components/ui/skeleton'
import { Container } from '@/widgets/container'

export default function Loading() {
    return (
        <>
            <main className="w-full">
                <Container className="py-8 space-y-4">
                    <Skeleton className="h-8 w-48" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.from({ length: 8 }).map((_, idx) => (
                            <Skeleton key={`field-${idx}`} className="h-10 w-full" />
                        ))}
                    </div>
                    <Skeleton className="h-20 w-full" />
                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </Container>
            </main>
        </>
    )
}
