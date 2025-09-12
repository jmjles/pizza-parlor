import type { Metadata } from 'next'
import { CssBaseline } from '@mui/material'
import brickWall from '@/assets/images/bricks.jpg'
import StoreProvider from '@/store/StoreProvider.tsx'

export const metadata: Metadata = {
    title: 'Pizza Parlor',
    description: 'Online POS System',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                <CssBaseline />
                <StoreProvider>{children}</StoreProvider>
                <div
                    style={{
                        backgroundImage: `url(${brickWall.src})`,
                        position: 'fixed',
                        zIndex: '-99',
                        width: '100%',
                        height: '100%',
                        top: 0,
                    }}
                />
            </body>
        </html>
    )
}
