import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const CarListingSkeleton: React.FC = () => {
    return (
        <Card className="transition-transform cursor-wait">
            <CardHeader>
                <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="mt-4 h-[200px] w-full" />
            </CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-24" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-4 w-32" />
            </CardFooter>
        </Card>
    )
}
