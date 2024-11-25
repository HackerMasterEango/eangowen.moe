'use client'

import Link from 'next/link'
import Image from 'next/image'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { useRef } from 'react'

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

type GachaNavMenuProps = {
  children: React.ReactNode
}
export function GachaNavMenu({ children }: GachaNavMenuProps) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <HoverCard openDelay={0} closeDelay={200}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent ref={ref} className="p-0 w-auto" side="right">
        <nav className="grid grid-cols-3 gap-1 p-2">
          {gachaGames.map(game => (
            <GachaNavMenuItem key={game.id} ref={ref} game={game} />
          ))}
        </nav>
      </HoverCardContent>
    </HoverCard>
  )
}

type GachaNavMenuItemProps = {
  game: GachaGame
  ref: React.RefObject<HTMLDivElement>
}
const GachaNavMenuItem = ({ game, ref }: GachaNavMenuItemProps) => {
  return (
    <Link
      key={game.id}
      href={`/${game.id}`}
      onClick={() => {
        // hide content now
        ref.current?.style.setProperty('display', 'none')
      }}
    >
      <Image
        src={game.imageUrl}
        alt={game.name}
        width={160}
        height={100}
        className="w-[160px] h-[100px]  object-cover"
      />
    </Link>
  )
}
