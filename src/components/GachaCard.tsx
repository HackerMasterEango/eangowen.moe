// GachaCard

import Link from 'next/link'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { Badge } from './ui/badge'
import { ChevronRight } from 'lucide-react'

type GachaCardProps = {
  title: string
  description: string
  href: string
  type: 'guide' | 'tierlist' | 'news'
  imgURL?: string
  author?: string
}
export function GachaCard({ title, description, imgURL, type, author }: GachaCardProps) {
  return (
    <Link href="/gacha">
      <Card
        className="overflow-hidden text-neutral-100 transition-all
      ease-in duration-100 hover:translate-y-1 hover:shadow-lg hover:shadow-neutral-600 bg-dark-800 border-none"
      >
        {/* TODO: have the sizes as props */}
        <CardContent className="p-0 w-[500px] h-[150px]">
          <div className="flex">
            {imgURL && (
              <div className="relative h-[150px] w-[150px]">
                <Image
                  src={imgURL}
                  alt={title}
                  fill
                  className="object-cover"
                  // TODO: need sizes prop
                />
              </div>
            )}

            <div className="flex justify-between w-full">
              <div className="flex flex-col justify-between p-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  {description && <p className="text-sm text-neutral-200">{description}</p>}
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="text-xs">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Badge>
                </div>
                {author && <p className="text-xs text-neutral-200">By {author}</p>}
              </div>

              <div className=" self-center mr-4">
                <ChevronRight className="w-8 h-8 stroke-neutral-100" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
