
export type HeavenBurnRedUnitType = 'Blaster' | 'Tank' | 'Support' | 'Healer'

export type HeavenBurnsRedUnitRarity = 'A' | 'S' | 'SS'

type HeavenBurnsRedUnit = {
  id: string
  name: string
  imgUrl: string
  type: HeavenBurnRedUnitType
  rarity: HeavenBurnsRedUnitRarity
}

export const HEAVEN_BURNS_RED_UNITS: HeavenBurnsRedUnit[] = [
  {
    id: '1',
    name: 'Karen',
    imgUrl: '/heaven-burns-red/units/Karen_SS_100.webp',
    type: 'Blaster',
    rarity: 'SS'
  },
  {
    id: '2',
    name: 'karan',
    imgUrl: '/heaven-burns-red/units/Karen_SS_100.webp',
    type: 'Tank',
    rarity: 'SS'
  },
  {
    id: '3',
    name: 'dsfsdf',
    imgUrl: '/heaven-burns-red/units/Karen_SS_100.webp',
    type: 'Support',
    rarity: 'SS'
  },
  {
    id: '4',
    name: 'sdf',
    imgUrl: '/heaven-burns-red/units/Karen_SS_100.webp',
    type: 'Healer',
    rarity: 'SS'
  }

]