import { Container } from '@/widgets/container'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <>
            <main className="w-full">
                <Container className="py-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <div key={`msg-${idx}`} className="flex justify-start">
                                    <Skeleton className="h-14 w-3/4 max-w-xl rounded-2xl" />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-11 w-full" />
                            <Skeleton className="h-11 w-11 rounded-xl" />
                        </div>
                    </div>
                </Container>
            </main>
        </>
    )
}
