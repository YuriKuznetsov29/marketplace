import { Listing } from '@prisma/client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'

interface CarListingProps {
    listing: Listing
}

export const CarListing: React.FC<CarListingProps> = ({ listing }) => {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>{listing.title}</CardTitle>
                <CardDescription>{listing.description}</CardDescription>
                <img src={listing.images[0]} alt={listing.title} width={300} height={200} />
            </CardHeader>
            <CardContent>
                <p>{listing.price}</p>
                <p>{listing.mileage}</p>
                {/* <p>{listing.year}</p> */}
                <p>{listing.fuelType}</p>
                <p>{listing.gearbox}</p>
            </CardContent>
            <CardFooter>
                <p>{listing.location}</p>
            </CardFooter>
        </Card>
    )
}
