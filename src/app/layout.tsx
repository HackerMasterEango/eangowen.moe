import { Header } from '@/components/Header/Header'
import { Toaster } from '@/components/ui/sonner'
import { supabaseServerClient } from '@/lib/supabase/serverClient'
import './globals.css'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await supabaseServerClient()

  const { error, data } = await supabase.auth.getUser()

  console.log('user', data)
  const isLoggedIn = !error

  return (
    <html lang="en">
      <body>
        <header>
          <Header isLoggedIn={isLoggedIn} />
        </header>
        <main className="h-full w-full ">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
