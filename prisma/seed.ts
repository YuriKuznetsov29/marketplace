// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Полный список марок и моделей
    const carBrands: Record<string, string[]> = {
        Toyota: ['Camry', 'Corolla', 'RAV4', 'Land Cruiser'],
        BMW: ['3 Series', '5 Series', 'X5', 'X3'],
        Tesla: ['Model S', 'Model 3', 'Model X', 'Model Y'],
        Mercedes: ['C-Class', 'E-Class', 'GLC', 'GLE'],
        Audi: ['A4', 'A6', 'Q5', 'Q7'],
        Ford: ['Focus', 'Fusion', 'Explorer', 'Mustang'],
        Volkswagen: ['Golf', 'Passat', 'Tiguan', 'Polo'],
        Honda: ['Civic', 'Accord', 'CR-V', 'Fit'],
        Hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe'],
        Kia: ['Rio', 'Cerato', 'Sportage', 'Sorento'],
    }

    const brandEntries = await Promise.all(
        Object.entries(carBrands).map(async ([brandName, modelNames]) => {
            const brand = await prisma.brand.create({
                data: {
                    name: brandName,
                    models: {
                        create: modelNames.map((model) => ({ name: model })),
                    },
                },
            })
            return brand
        })
    )

    // Пользователи
    const users = await prisma.user.createMany({
        data: [
            { name: 'Alice', email: 'alice@example.com', password: 'hashedpass1' },
            { name: 'Bob', email: 'bob@example.com', password: 'hashedpass2' },
            { name: 'Charlie', email: 'charlie@example.com', password: 'hashedpass3' },
        ],
    })

    const createdUsers = await prisma.user.findMany()

    // Объявления (по 1 от каждого пользователя)
    for (let i = 0; i < createdUsers.length; i++) {
        const user = createdUsers[i]
        const brand = brandEntries[i % brandEntries.length]
        const model = await prisma.model.findFirst({
            where: { brandId: brand.id },
        })

        if (model) {
            await prisma.listing.create({
                data: {
                    title: `${brand.name} ${model.name} от ${user.name}`,
                    description: 'Хорошее состояние, своевременное обслуживание.',
                    price: 10000 + i * 2500,
                    mileage: 50000 + i * 10000,
                    fuelType: 'GASOLINE',
                    gearbox: 'AUTOMATIC',
                    location: 'Москва',
                    images: ['https://example.com/car.jpg'],
                    sellerId: user.id,
                    brandId: brand.id,
                    modelId: model.id,
                },
            })
        }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
