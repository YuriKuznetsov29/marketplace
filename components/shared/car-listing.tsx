import { Listing } from '@prisma/client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

interface CarListingProps {
    listing: Listing
}

export const CarListing: React.FC<CarListingProps> = ({ listing }) => {
    return (
        <Card className="min-w-[300px]">
            <CardHeader>
                <CardTitle>{listing.title}</CardTitle>
                <CardDescription>{listing.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{listing.price}</p>
            </CardContent>
            <CardFooter>
                <p>{listing.location}</p>
            </CardFooter>
        </Card>
    )
}
