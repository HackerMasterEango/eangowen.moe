import { Book, LucideIcon, Users2 } from 'lucide-react'

type NavBarItem = {
  name: string
  icon: LucideIcon
  href: string
}
type NavBarItems = {
  [key: string]: NavBarItem[]
}

export const NAV_BAR_ITEMS: NavBarItems = {
  'heaven-burns-red': [
    {
      name: 'Guide',
      icon: Book,
      href: '/heaven-burns-red/guide',
    },
    {
      name: 'Hoes',
      icon: Users2,
      href: '/heaven-burns-red/hoes',
    }
  ]
}
