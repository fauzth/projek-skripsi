import { Link } from '@inertiajs/react'

export default function Layout({ children }) {
    return (
        <main>

            <article>{children}</article>
        </main>
    )
}
