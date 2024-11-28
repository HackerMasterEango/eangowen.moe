import TierList from '@/components/TierList/TierList'
import { ScrollArea } from '@/components/ui/scroll-area'

type HeavenBurnRedCategories = 'Blaster' | 'Tank' | 'Support' | 'Healer'
type HeavenBurnRedTiers = 'S' | 'A' | 'B' | 'C' | 'D' | 'E'

function Page() {
  return (
    <ScrollArea className="h-screen w-full">
      <div className="container px-4 py-24 mx-auto">
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
              tierName: 'S',
              colorClass: 'bg-red-500',
              placements: {
                // all empty
                Blaster: [],
                Tank: [],
                Support: [],
                Healer: []
              }
            },

            {
              tierName: 'B',
              colorClass: 'bg-blue-500',
              placements: {
                Blaster: [
                  {
                    id: '1',
                    imgUrl: '/heaven-burns-red/units/Karen_SS_100.webp'
                  },
                  {
                    id: '2',
                    imgUrl: '/heaven-burns-red/units/Karen_SS_100.webp'
                  }
                ],
                Tank: [
                  {
                    id: '1',
                    imgUrl: '/heaven-burns-red/units/Karen_SS_100.webp'
                  }
                ],
                Support: [
                  {
                    id: '1',
                    imgUrl: '/heaven-burns-red/units/Karen_SS_100.webp'
                  }
                ],
                Healer: []
              }
            },
            {
              tierName: 'C',
              colorClass: 'bg-green-500',
              placements: {
                Blaster: [],
                Tank: [
                  {
                    id: '1',
                    imgUrl: '/heaven-burns-red/units/Megumi_A_100.webp'
                  }
                ],
                Support: [],
                Healer: []
              }
            }
          ]}
        />
      </div>
    </ScrollArea>
  )
}

export default Page
