import { NavigationWrapper } from '@/components/Navbar/NavigationWrapper'
import { ScrollArea } from '@/components/ui/scroll-area'
import { supabaseServerClient } from '@/lib/supabase/serverClient'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await supabaseServerClient()
  const {
    data: { session }
  } = await supabase.auth.getSession()

  return (
    <div className="flex overflow-hidden">
      <NavigationWrapper isLoggedIn={!!session} />
      <ScrollArea className="h-screen flex-1">{children}</ScrollArea>
    </div>
  )
}
