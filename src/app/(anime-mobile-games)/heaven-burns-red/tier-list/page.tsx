import TierList from '@/components/TierList/TierList'

// copying the categories from here: https://game8.jp/heavenburnsred/425643
type HeavenBurnRedCategories = 'DPS' | 'Buffs' | 'Debuffs' | 'Support'
type HeavenBurnRedTiers = 'S' | 'A' | 'B' | 'C' | 'D' | 'E'

export type HeavenBurnRedUnitType = 'Blaster' | 'Tank' | 'Support' | 'Healer'

function Page() {
  return (
    <div className="container px-4 py-24 mx-auto">
      <TierList<HeavenBurnRedCategories, HeavenBurnRedTiers>
        categories={[
          {
            name: 'DPS',
            colorClass: 'bg-red-500',
            borderClass: 'border-red-500'
          },
          {
            name: 'Buffs',
            colorClass: 'bg-blue-500',
            borderClass: 'border-blue-500'
          },
          {
            name: 'Debuffs',
            colorClass: 'bg-green-500',
            borderClass: 'border-green-500'
          },
          {
            name: 'Support',
            colorClass: 'bg-yellow-300',
            borderClass: 'border-yellow-500'
          }
        ]}
        tiers={[
          {
            tierName: 'S',
            colorClass: 'bg-red-500',
            placements: {
              // all empty
              DPS: [],
              Buffs: [],
              Debuffs: [],
              Support: []
            },
            isEmpty: true
          },

          {
            tierName: 'B',
            colorClass: 'bg-blue-500',
            placements: {
              DPS: [
                {
                  id: '1',
                  imgUrl: '/heaven-burns-red/units/Karen_SS_100.webp'
                },
                {
                  id: '2',
                  imgUrl: '/heaven-burns-red/units/Karen_SS_100.webp'
                }
              ],
              Buffs: [
                {
                  id: '1',
                  imgUrl: '/heaven-burns-red/units/Karen_SS_100.webp'
                }
              ],
              Support: [
                {
                  id: '1',
                  imgUrl: '/heaven-burns-red/units/Karen_SS_100.webp'
                },
                {
                  id: '2',
                  imgUrl: '/heaven-burns-red/units/Karen_SS_100.webp'
                },
                {
                  id: '3',
                  imgUrl: '/heaven-burns-red/units/Karen_SS_100.webp'
                },
                {
                  id: '4',
                  imgUrl: '/heaven-burns-red/units/Karen_SS_100.webp'
                },
                {
                  id: '5',
                  imgUrl: '/heaven-burns-red/units/Karen_SS_100.webp'
                },
                {
                  id: '6',
                  imgUrl: '/heaven-burns-red/units/Karen_SS_100.webp'
                }
              ],
              Debuffs: []
            }
          },
          {
            tierName: 'C',
            colorClass: 'bg-green-500',
            placements: {
              Debuffs: [],
              Buffs: [
                {
                  id: '1',
                  imgUrl: '/heaven-burns-red/units/Megumi_A_100.webp'
                }
              ],
              Support: [],
              DPS: []
            }
          }
        ]}
      />
    </div>
  )
}

export default Page
