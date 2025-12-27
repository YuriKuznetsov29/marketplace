import { Container } from '@/widgets/container'
import { Filters } from '@/features/filters'
import { ListingsList } from '@/entities/listing'
import { findCars, GetSearchParams } from '@/lib/find-cars'

export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
    const { listings, totalPages } = await findCars(searchParams)

    return (
        <>
            <main className="w-full">
                <Container>
                    <div className="w-full flex flex-col md:grid  md:grid-cols-[300px_1fr]  gap-4 px-4 ">
                        <Filters totalPages={totalPages} />
                        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 col-2 row-2 ">
                            <ListingsList listings={listings} />
                        </div>
                    </div>
                </Container>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </>
    )
}
