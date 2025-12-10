import { Container } from '@/components/shared/container'
import { Header } from '@/components/shared/header'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <>
            <Header />
            <main className="w-full">
                <Container className="py-8 flex flex-col gap-4">
                    <Skeleton className="h-7 w-32" />
                    <div className="flex flex-col gap-3">
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <div
                                key={`chat-skeleton-${idx}`}
                                className="p-4 rounded-xl border bg-card"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-40" />
                                        <Skeleton className="h-3 w-52" />
                                    </div>
                                    <Skeleton className="h-3 w-12" />
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </main>
        </>
    )
}

