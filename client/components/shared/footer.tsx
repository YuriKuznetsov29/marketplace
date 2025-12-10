import Link from 'next/link'
import { Container } from './container'

export const Footer = () => {
    return (
        <footer className="mt-10 px-4 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
            <Container className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Marketplace</span>
                <div className="flex items-center gap-4">
                    <Link href="/user-listings" className="hover:text-foreground transition-colors">
                        Мои объявления
                    </Link>
                    <Link href="/messenger" className="hover:text-foreground transition-colors">
                        Мессенджер
                    </Link>
                    <Link href="/not-auth" className="hover:text-foreground transition-colors">
                        Поддержка
                    </Link>
                </div>
                <span className="text-xs sm:text-sm">© {new Date().getFullYear()}</span>
            </Container>
        </footer>
    )
}
