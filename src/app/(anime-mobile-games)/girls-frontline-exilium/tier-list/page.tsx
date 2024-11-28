import TierList from '@/components/TierList/TierList'
import { ScrollArea } from '@/components/ui/scroll-area'

type HeavenBurnRedCategories = 'Blaster' | 'Tank' | 'Support' | 'Healer'
type HeavenBurnRedTiers = 'S' | 'A' | 'B' | 'C' | 'D' | 'E'

function Page() {
  return (
    <ScrollArea className="h-screen w-full">
      <div className="container px-4 py-24 mx-auto ">
        <TierList<HeavenBurnRedCategories, HeavenBurnRedTiers>
          categories={[
            {
              name: 'Blaster',
              colorClass: 'bg-red-500'
            },
            {
              name: 'Tank',
              colorClass: 'bg-blue-500'
            },
            {
              name: 'Support',
              colorClass: 'bg-green-500'
            },
            {
              name: 'Healer',
              colorClass: 'bg-yellow-300'
            }
          ]}
          tiers={[
            {
              tierName: 'B',
              colorClass: 'bg-blue-500',
              placements: {
                Blaster: [
                  {
                    id: '1',
                    imgUrl: 'Character 1'
                  },
                  {
                    id: '2',
                    imgUrl: 'Character 1'
                  }
                ],
                Tank: [
                  {
                    id: '1',
                    imgUrl: 'Character 1'
                  }
                ],
                Support: [
                  {
                    id: '1',
                    imgUrl: 'Character 1'
                  }
                ],
                Healer: [
                  {
                    id: '1',
                    imgUrl: 'Character 1'
                  }
                ]
              }
            }
          ]}
        />
      </div>
    </ScrollArea>
  )
}

export default Page
