import { CarListing } from '@/components/shared/car-listing'
import { Container } from '@/components/shared/container'
import { Filters } from '@/components/shared/filters'
import { Search } from '@/components/shared/search'
import { findCars, GetSearchParams } from '@/lib/find-cars'

export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
    const listings = await findCars(searchParams)

    return (
        <>
            <main className="w-full">
                <Container>
                    <div className="w-full grid grid-cols-[300px_1fr] gap-4">
                        <Filters />
                        <div className="w-full grid grid-cols-3 gap-4">
                            {listings.length > 0 &&
                                listings.map((listing) => (
                                    <CarListing key={listing.id} listing={listing} />
                                ))}
                        </div>
                    </div>
                </Container>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </>
    )
}
