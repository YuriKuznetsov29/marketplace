import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    await prisma.listing.deleteMany()
    await prisma.user.deleteMany()
    await prisma.model.deleteMany()
    await prisma.brand.deleteMany()

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

    const brands: Record<string, any> = {}
    const models: Record<string, Record<string, any>> = {}

    for (const [brandName, modelNames] of Object.entries(carBrands)) {
        const brand = await prisma.brand.create({
            data: {
                name: brandName,
                models: {
                    create: modelNames.map((name) => ({ name })),
                },
            },
        })
        brands[brandName] = brand
        const createdModels = await prisma.model.findMany({ where: { brandId: brand.id } })
        models[brandName] = {}
        for (const model of createdModels) {
            models[brandName][model.name] = model
        }
    }

    const users = await prisma.user.createMany({
        data: [
            { name: 'Alice', email: 'alice@example.com', password: hashSync('111111', 10) },
            { name: 'Bob', email: 'bob@example.com', password: hashSync('111111', 10) },
            { name: 'Charlie', email: 'charlie@example.com', password: hashSync('111111', 10) },
            { name: 'Diana', email: 'diana@example.com', password: hashSync('111111', 10) },
            { name: 'Ethan', email: 'ethan@example.com', password: hashSync('111111', 10) },
        ],
    })

    const createdUsers = await prisma.user.findMany()
    const fuelTypes = ['GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID']
    const gearboxTypes = ['MANUAL', 'AUTOMATIC']
    const cities = [26, 67, 122, 224, 251, 510, 620, 770, 787, 1117]

    const random = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]
    const getRandomInt = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min

    for (let i = 0; i < 100; i++) {
        const brandName = random(Object.keys(carBrands))
        const modelName = random(carBrands[brandName])
        const year = getRandomInt(2005, 2024)
        const mileage = getRandomInt(10000, 250000)
        const price = getRandomInt(3000, 80000)
        const user = createdUsers[i % createdUsers.length]
        const title = `${brandName} ${modelName} ${year}`
        const description = `${brandName} ${modelName} ${year} года выпуска в отличном состоянии. Пробег — ${mileage} км. ${random(fuelTypes)}, коробка — ${random(gearboxTypes)}.`

        await prisma.listing.create({
            data: {
                title,
                description,
                price,
                mileage,
                year,
                fuelType: random(fuelTypes),
                gearbox: random(gearboxTypes),
                // location: random(cities),
                images: [
                    `https://loremflickr.com/800/600/car,${brandName},${modelName}?random=${i}`,
                ],
                sellerId: user.id,
                brandId: brands[brandName].id,
                modelId: models[brandName][modelName].id,
                cityId: random(cities),
            },
        })
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
