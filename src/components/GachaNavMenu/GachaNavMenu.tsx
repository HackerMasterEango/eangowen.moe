'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import Image from 'next/image'
import Link from 'next/link'

interface GachaGame {
  id: string
  name: string
  imageUrl: string
}

const gachaGames: GachaGame[] = [
  { id: 'honkai-star-rail', name: 'Honkai Star Rail', imageUrl: '/hsr-main.webp' },
  { id: 'revue-starlight-relive', name: 'Revue Starlight Relive', imageUrl: '/revue-main.jpg' },
  { id: 'girls-frontline-exilium', name: 'Girls Frontline Exilium', imageUrl: '/gfl2-main.jpg' },
  { id: 'heaven-burns-red', name: 'Heaven Burns Red', imageUrl: '/hbr-main.jpg' }
]

export function GachaNavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-dark-800 text-white hover:bg-dark-700">
            Gacha Games
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-dark-700">
              {gachaGames.map(game => (
                <GachaNavCard key={game.id} game={game} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const GachaNavCard = ({ game }: { game: GachaGame }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={`/${game.id}`}
          className="block space-y-1 rounded-md leading-none no-underline outline-none transition-colors hover:text-white focus:bg-dark-800 focus:text-white"
        >
          <div className="relative h-[100px] w-full overflow-hidden rounded-md">
            <Image
              src={game.imageUrl}
              alt={game.name}
              fill
              className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <h3 className="text-lg font-semibold leading-tight text-white">{game.name}</h3>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
