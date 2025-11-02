import { Listing, Brand, Model, User } from '@prisma/client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

interface ListingWithRelations extends Listing {
    brand: Brand
    model: Model
    seller: Pick<User, 'id' | 'name' | 'phone'>
}

interface ListingDetailProps {
    listing: ListingWithRelations
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
        MANUAL: 'Механика',
        AUTOMATIC: 'Автоматическая',
    }
    return labels[gearbox] || gearbox
}

export const ListingDetail: React.FC<ListingDetailProps> = ({ listing }) => {
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{listing.title}</h1>
                    <div className="text-4xl font-bold text-primary">
                        {new Intl.NumberFormat('ru-RU', {
                            style: 'currency',
                            currency: 'RUB',
                        }).format(listing.price)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div>
                            <span className="text-sm text-muted-foreground">Марка</span>
                            <p className="font-semibold">{listing.brand.name}</p>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">Модель</span>
                            <p className="font-semibold">{listing.model.name}</p>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">Год выпуска</span>
                            <p className="font-semibold">{listing.year}</p>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">Пробег</span>
                            <p className="font-semibold">
                                {new Intl.NumberFormat('ru-RU').format(listing.mileage)} км
                            </p>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">Тип двигателя</span>
                            <p className="font-semibold">{getFuelTypeLabel(listing.fuelType)}</p>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">Коробка передач</span>
                            <p className="font-semibold">{getGearboxLabel(listing.gearbox)}</p>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">Местоположение</span>
                            <p className="font-semibold">{listing.location}</p>
                        </div>
                    </div>

                    <div className="pt-4">
                        <h2 className="text-xl font-semibold mb-4">Описание</h2>
                        <p className="text-muted-foreground whitespace-pre-wrap">
                            {listing.description}
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Фотографии</h2>
                        <div className="space-y-4">
                            {listing.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${listing.title} - фото ${index + 1}`}
                                    className="w-full h-auto rounded-lg object-cover"
                                    width={800}
                                    height={600}
                                />
                            ))}
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Продавец</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold">{listing.seller.name}</p>
                            {listing.seller.phone && (
                                <div className="mt-2">
                                    <span className="text-sm text-muted-foreground">Телефон: </span>
                                    <a
                                        href={`tel:${listing.seller.phone}`}
                                        className="text-sm font-semibold hover:underline"
                                    >
                                        {listing.seller.phone}
                                    </a>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Связаться с продавцом</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
