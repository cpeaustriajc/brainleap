import Script from 'next/script'
import { SidebarProvider } from '../components/sidebar'
import './styles.css'

export const metadata = {
    title: 'Doctrina',
    description: 'Doctrina: An e-learning platform for the modern age.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" dir="ltr">
            <SidebarProvider>
                <body>{children}</body>
                <Script src="/js/script.js" />
            </SidebarProvider>
        </html>
    )
}
