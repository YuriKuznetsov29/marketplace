'use client'

import { Listing, Brand, Model, City } from '@prisma/client'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import { Calendar, Gauge, Fuel, Settings, MapPin } from 'lucide-react'
import { useState } from 'react'

interface ListingWithRelations extends Listing {
    brand?: Brand
    model?: Model
    city?: City
}

interface CarListingProps {
    listing: ListingWithRelations
    changeListing?: boolean
}

const getFuelTypeLabel = (fuelType: string) => {
    const labels: Record<string, string> = {
        GASOLINE: 'Бензин',
        DIESEL: 'Дизель',
        ELECTRIC: 'Электрический',
        HYBRID: 'Гибрид',
    }
    return labels[fuelType] || fuelType
}

const getGearboxLabel = (gearbox: string) => {
    const labels: Record<string, string> = {
        MANUAL: 'МКПП',
        AUTOMATIC: 'АКПП',
    }
    return labels[gearbox] || gearbox
}

export const CarListing: React.FC<CarListingProps> = ({ listing, changeListing = false }) => {
    const [imageError, setImageError] = useState(false)

    const imageUrl = listing.images?.[0]
        ? listing.images[0].startsWith('http')
            ? listing.images[0]
            : `/uploads/${listing.images[0]}`
        : null

    const brandModel =
        listing.brand && listing.model
            ? `${listing.brand.name} ${listing.model.name}`
            : listing.title

    const formattedPrice = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
    }).format(listing.price)

    const formattedMileage = new Intl.NumberFormat('ru-RU').format(listing.mileage)

    return (
        <Link
            href={changeListing ? `/update-listing/${listing.id}` : `/listing/${listing.id}`}
            className="block h-full"
        >
            <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden group">
                <CardHeader className="p-0 relative">
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                        {imageUrl && !imageError ? (
                            <img
                                src={imageUrl}
                                alt={brandModel}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                                <span className="text-muted-foreground text-sm">Нет фото</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {listing.images && listing.images.length > 1 && (
                            <div className="absolute top-3 right-3 z-10">
                                <span className="px-2.5 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-medium rounded-md">
                                    {listing.images.length} фото
                                </span>
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col p-4 gap-3">
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {brandModel}
                        </h3>
                        <div className="mb-3">
                            <span className="text-2xl font-bold text-primary">
                                {formattedPrice}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{listing.year} год</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Gauge className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{formattedMileage} км</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Fuel className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{getFuelTypeLabel(listing.fuelType)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Settings className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{getGearboxLabel(listing.gearbox)}</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 border-t flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{listing.city?.city}</span>
                </CardFooter>
            </Card>
        </Link>
    )
}
