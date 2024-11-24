import { Header } from '@/components/Header'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Header />
        </header>
        <main className="h-screen w-full ">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
