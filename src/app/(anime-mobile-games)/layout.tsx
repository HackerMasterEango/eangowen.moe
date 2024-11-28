import { NavigationWrapper } from '@/components/Navbar/NavigationWrapper'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex overflow-hidden">
      <NavigationWrapper />
      <ScrollArea className="h-screen flex-1">{children}</ScrollArea>
    </div>
  )
}
