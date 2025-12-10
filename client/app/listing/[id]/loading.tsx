import { Container } from '@/components/shared/container'
import { Header } from '@/components/shared/header'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <>
            <Header />
            <main className="w-full">
                <Container className="py-8">
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-1/3" />
                            <div className="aspect-video rounded-xl bg-muted" />
                            <div className="grid grid-cols-2 gap-3">
                                {Array.from({ length: 4 }).map((_, idx) => (
                                    <Skeleton key={`info-${idx}`} className="h-6 w-full" />
                                ))}
                            </div>
                            <Skeleton className="h-24 w-full" />
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                    </div>
                </Container>
            </main>
        </>
    )
}

