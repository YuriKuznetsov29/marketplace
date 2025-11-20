import { Container } from '@/components/shared/container'
import { Filters } from '@/components/shared/filters'
import { Header } from '@/components/shared/header'
import { ListingsList } from '@/components/shared/listings-list'
import { findCars, GetSearchParams } from '@/lib/find-cars'

export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
    const { listings, totalPages } = await findCars(searchParams)

    return (
        <>
            <Header />
            <main className="w-full">
                <Container>
                    <div className="w-full grid grid-cols-[300px_1fr] gap-4">
                        <Filters totalPages={totalPages} />
                        <div className="w-full grid grid-cols-3 gap-4 col-2 row-2">
                            <ListingsList listings={listings} />
                        </div>
                    </div>
                </Container>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </>
    )
}
