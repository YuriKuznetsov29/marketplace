import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import csv from 'csv-parser'

const prisma = new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
})
const cities: any[] = []

fs.createReadStream('./data/cities.csv')
    .pipe(csv({ separator: ',' }))
    .on('data', (row) => {
        if (!row.address) return // пропуск пустых строк

        cities.push({
            address: row.address,
            postalCode: row.postal_code || null,
            country: row.country || null,
            federalDistrict: row.federal_district || null,
            regionType: row.region_type || null,
            region: row.region || null,
            areaType: row.area_type || null,
            area: row.area || null,
            cityType: row.city_type || null,
            city: row.city || null,
            settlementType: row.settlement_type || null,
            settlement: row.settlement || null,
            kladrId: row.kladr_id || null,
            fiasId: row.fias_id || null,
            fiasLevel: row.fias_level ? parseInt(row.fias_level) : null,
            capitalMarker: row.capital_marker ? parseInt(row.capital_marker) : null,
            okato: row.okato || null,
            oktmo: row.oktmo || null,
            taxOffice: row.tax_office || null,
            timezone: row.timezone || null,
            geoLat: row.geo_lat ? parseFloat(row.geo_lat) : null,
            geoLon: row.geo_lon ? parseFloat(row.geo_lon) : null,
            population: row.population ? parseInt(row.population) : null,
            foundationYear: row.foundation_year ? parseInt(row.foundation_year) : null,
        })
    })
    .on('end', async () => {
        cities.forEach((c) => {
            for (const [k, v] of Object.entries(c)) {
                if (v === undefined) console.log(`Поле ${k} пустое!`)
            }
        })
        await prisma.city.deleteMany({})
        const batchSize = 500 // 500 объектов за раз безопасно
        for (let i = 0; i < cities.length; i += batchSize) {
            const batch = cities.slice(i, i + batchSize)
            await prisma.city.createMany({
                data: batch,
                skipDuplicates: true, // эквивалент ON CONFLICT DO NOTHING
            })
            console.log(`Импортировано ${i + batch.length} / ${cities.length} записей`)
        }

        await prisma.$disconnect()
    })
