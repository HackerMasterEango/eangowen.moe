import { GachaCard } from '@/components/GachaCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import Link from 'next/link'

function Page() {
  return (
    <div className="container px-4 py-8 mx-auto ">
      <h1 className="text-2xl text-neutral-100 font-semibold mb-16">Girls Frontline Exilium</h1>

      <section className="mb-12 flex gap-8 flex-wrap">
        <div className="flex-1 min-w-[320px] max-w-[723px]">
          <h2 className="mb-4 text-2xl font-semibold">Latest Tier List</h2>
          <Card className="border-none overflow-hidden p-0 bg-dark-800 ">
            <CardContent className="p-0">
              <Image
                src="/hbr-main.jpg"
                alt="tier list"
                width={723}
                height={300}
                // NOTE: this image is so high res, will try to prefetch on home page
                quality={100}
                className="h-[300px] w-full object-cover object-[50%_20%]"
              />
              <div className="p-4">
                <h3 className="mb-4 text-xl font-semibold text-neutral-100">Character Tier List - Version 3.7</h3>

                <Button className="text-neutral-100" asChild>
                  <Link href="/girls-frontline-exilium/tier-list">View Full Tier List</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1 min-w-[420px] max-w-[723px]">
          <h2 className="mb-4 text-2xl font-semibold">Latest News</h2>
          <Card className="border-none overflow-hidden p-0 bg-dark-800">
            <CardContent className="p-0">
              <Image
                src="/hbr-main.jpg"
                alt="tier list"
                width={723}
                height={300}
                // NOTE: this image is so high res, will try to prefetch on home page
                quality={100}
                className="h-[300px] w-full object-cover object-[50%_20%]"
              />
              <div className="p-4">
                <h3 className="mb-4 text-xl font-semibold text-neutral-100">Character Tier List - Version 3.7</h3>

                <Button className="text-neutral-100" asChild>
                  <Link href="/girls-frontline-exilium/tier-list">View Full Tier List</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl text-neutral-100 font-semibold mb-4">Guides</h2>
        <div className="flex gap-2 flex-wrap">
          <GachaCard
            type="guide"
            imgURL="/hsr-main.webp"
            href="#"
            title="himeko guide"
            description="himeko is a powerful trailblazer"
          />
        </div>
      </section>
    </div>
  )
}

export default Page
