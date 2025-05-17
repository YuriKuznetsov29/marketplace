import { CarListing } from '@/components/shared/car-listing'
import { Container } from '@/components/shared/container'
import { Filters } from '@/components/shared/filters'
import { findCars, GetSearchParams } from '@/lib/find-cars'

export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
    const listings = await findCars(searchParams)

    return (
        <div className="h-screen flex justify-center items-center ">
            <main className="w-full">
                <Container>
                    <div className="w-full flex gap-4">
                        <Filters />
                        {listings.length > 0 &&
                            listings.map((listing) => (
                                <CarListing key={listing.id} listing={listing} />
                            ))}
                    </div>
                </Container>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </div>
    )
}
