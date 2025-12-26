import { Container } from '@/widgets/container/container'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <>
            <main className="w-full">
                <Container className="py-8 space-y-4">
                    <Skeleton className="h-8 w-40" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <Skeleton key={`profile-field-${idx}`} className="h-10 w-full" />
                        ))}
                    </div>
                    <Skeleton className="h-10 w-32" />
                </Container>
            </main>
        </>
    )
}
