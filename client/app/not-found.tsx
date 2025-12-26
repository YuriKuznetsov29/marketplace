import { Container } from '@/widgets/container/container'
import { Header } from '@/widgets/header/ui/header'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <>
             />
            <main className="w-full">
                <Container className="py-16 text-center">
                    <h1 className="text-6xl font-bold mb-4">404</h1>
                    <h2 className="text-3xl font-semibold mb-4">Объявление не найдено</h2>
                    <p className="text-muted-foreground mb-8">
                        К сожалению, объявление с данным ID не существует или было удалено.
                    </p>
                    <Link href="/">
                        <Button>Вернуться на главную</Button>
                    </Link>
                </Container>
            </main>
        </>
    )
}
