import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <section className="p-12 flex flex-col gap-8 text-center items-center w-full h-full text-neutral-100">
      <h1 className="text-2xl font-semibold mt-24">all things anime mobile gaming</h1>
      <p>
        eangowen is your one stop shop to winning at these anime mobile games in a major way. you are dumb and need
        guides for anime mobile games and eangowen has you covered!
      </p>

      <AnimeMobileGames />

      <section className="mt-12">
        <h2 className="text-2xl font-semibold bg-primary-500 p-8 text-primary-50 shadow-lg">powered by Xolze GPT</h2>
      </section>

      {/* 
      
      1. powered xolze GPT
      2. community tier lists
      3. testimonials
      */}
    </section>
  )
}

type GameCard = {
  id: number
  img: string
  href: string
  tags: string[]
  title: string
}

const gameCards: GameCard[] = [
  {
    id: 0,
    title: 'Heaven Burns Red',
    img: '/hbr-main.jpg',
    href: '/heaven-burns-red',
    tags: ['yuri', 'grand strategy']
  },
  {
    id: 1,
    title: 'Girls Frontline Exilium',
    img: '/gfl2-main.jpg',
    href: '/girls-frontline-exilium',
    tags: ['strategy']
  },
  {
    id: 2,
    title: 'Honkai Star Rail',
    img: '/hsr-main.webp',
    href: '/honkai-star-rail',
    tags: ['gay', 'racist', 'trans', 'gay', 'feminist']
  },
  {
    id: 3,
    title: 'Revue Starlight ReLIVE',
    img: '/hsr-main.webp',
    href: '/revue-starlight-relive',
    tags: ['gay', 'yuri', 'trans', 'lesbian', 'feminist']
  }
]

const AnimeMobileGames = () => {
  return (
    <div className="flex flex-wrap gap-4 w-fit">
      {gameCards.map(game => (
        <GameCard key={game.id} {...game} />
      ))}
    </div>
  )
}

type GameCardProps = {
  title: string
  img: string
  href: string
  tags: string[]
}

const GameCard = ({ title, img, href, tags }: GameCardProps) => {
  return (
    <Link href={href} className="group block">
      <div
        className="relative overflow-hidden rounded-lg shadow-lg 
      transition-all duration-300 ease-in group-hover:scale-105 group-hover:shadow-xl"
      >
        <Image
          src={img}
          alt={title}
          width={300}
          height={300}
          // TODO: fix images in photoshop
          className="h-[200px] w-[300px] object-cover object-right-top"
          // className="h-[300px] w-[300px] object-cover object-right-top"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-dark-800/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-2">
          <h3 className="text-xl font-bold text-neutral-100 shadow-sm mb-1">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="bg-dark-900/50 text-neutral-100">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

// community tier lists

// gacha revenue stats made up numbers

// tier list
