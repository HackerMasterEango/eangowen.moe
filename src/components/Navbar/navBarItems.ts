import { Book, LucideIcon } from 'lucide-react'

type NavBarItem = {
  name: string
  icon: LucideIcon
}
type NavBarItems = {
  [key: string]: NavBarItem[]
}

export const NAV_BAR_ITEMS: NavBarItems = {
  'heaven-burns-red': [
    {
      name: 'Guide',
      icon: Book
    }
  ]
}
