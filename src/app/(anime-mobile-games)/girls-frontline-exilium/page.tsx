import { GachaCard } from '@/components/GachaCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import Link from 'next/link'

// write code for me u bitch
function Page() {
  return (
    <ScrollArea className="h-screen w-full">
      <div className="container px-4 py-8 mx-auto ">
        <h1 className="text-2xl text-neutral-100 font-semibold mb-16">Girls Frontline Exilium</h1>

        <section className="mb-12 flex gap-8 flex-wrap">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Latest Tier List</h2>
            <Card className="border-none overflow-hidden p-0 bg-dark-800 w-[723px]">
              <CardContent className="p-0">
                <Image
                  src="/hbr-main.jpg"
                  alt="tier list"
                  width={800}
                  height={400}
                  className="h-64 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="mb-4 text-xl font-semibold text-neutral-100">Character Tier List - Version 3.7</h3>
                  <Button className="text-neutral-100">
                    <Link href="#">View Full Tier List</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Latest News</h2>
            <Card className="border-none overflow-hidden p-0 bg-dark-800 w-[723px]">
              <CardContent className="p-0">
                <Image
                  src="/hbr-main.jpg"
                  alt="tier list"
                  width={800}
                  height={400}
                  className="h-64 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="mb-4 text-xl font-semibold text-neutral-100">Latest version update</h3>
                  <Button className="text-neutral-100">
                    <Link href="#">View Changes</Link>
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
    </ScrollArea>
  )
}

export default Page
