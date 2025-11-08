import { CarListing } from '@/components/shared/car-listing'
import { Container } from '@/components/shared/container'
import { Filters } from '@/components/shared/filters'
import { Header } from '@/components/shared/header'
import { ListingsList } from '@/components/shared/listings-list'
import { Button } from '@/components/ui/button'
import { findCars, GetSearchParams } from '@/lib/find-cars'
import { Api } from '@/services/api-client'
import { Listing } from '@prisma/client'
import { List } from 'lucide-react'

export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
    // const [listings, setListings] = useState<Listing[] | []>([])
    // const [cursor, setCursor] = useState<string | null>(null)
    // const [loading, setLoading] = useState(false)

    // async function loadMore() {
    //     try {
    //         setLoading(true)
    //         const params = {
    //             ...(await searchParams),
    //             cursor,
    //             limit: 12,
    //         }
    //         const newListings = await Api.listing.getListings(params)
    //         setListings([...listings, ...newListings])
    //         setCursor(newListings[newListings.length - 1].id)
    //         setLoading(false)
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }
    const { listings, totalPages } = await findCars(searchParams)
    // useEffect(() => {
    //     loadMore()
    // }, [])

    console.log(totalPages, 'listings')

    return (
        <>
            <Header />
            <main className="w-full">
                <Container>
                    <div className="w-full grid grid-cols-[300px_1fr] gap-4">
                        <Filters totalPages={totalPages} />
                        <div className="w-full grid grid-cols-3 gap-4 col-2 row-2">
                            {/* {listings.length > 0 &&
                                listings.map((listing) => (
                                    <CarListing key={listing.id} listing={listing} />
                                ))} */}
                            {/* <Button disabled={loading} onClick={loadMore}>
                                {loading ? 'Loading...' : 'Load more'}
                            </Button> */}
                            <ListingsList listings={listings} />
                        </div>
                    </div>
                </Container>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </>
    )
}
