import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type TierListCategory<T extends string> = {
  name: T
  colorClass: string
}

// actual character image placed on tier list.
type TieredCharacter = {
  id: string
  imgUrl: string
}

// lookup type of character type to tiered character
// e.g. in heavens burns red: Blaster -> TieredCharacter[]
type Placements<C extends string> = {
  [K in C]: TieredCharacter[]
}

type Tier<C extends string, T extends string> = {
  tierName: T
  colorClass: string
  placements: Placements<C>
}

type TierListProps<CategoryType extends string, TierNameType extends string> = {
  categories: TierListCategory<CategoryType>[]
  tiers: Tier<CategoryType, TierNameType>[]
}
const TierList = <C extends string, T extends string>({ categories, tiers }: TierListProps<C, T>) => {
  const numCols = categories.length

  return (
    <div className="w-full">
      <div
        className="grid  gap-2 "
        style={{
          gridTemplateColumns: `auto ${' 1fr'.repeat(numCols)}`
        }}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 row-start-1 col-span-full">
          <div
            className={`grid gap-2 items-center`}
            style={{
              gridTemplateColumns: `auto ${' 1fr'.repeat(numCols)}`
            }}
          >
            <div className="w-12" />
            <Columns<C> categories={categories} numCols={numCols} />
          </div>
        </div>
        {tiers.map(tier => (
          <Row<C, T> key={tier.tierName} tier={tier} categories={categories} />
        ))}
      </div>
    </div>
  )
}

type ColumnsProps<C extends string> = {
  categories: TierListCategory<C>[]
  numCols: number
}
const Columns = <C extends string>({ categories, numCols }: ColumnsProps<C>) => {
  return (
    <div
      // -mx-2 px-2 ...... nice hacking!
      className="bg-dark-700 py-4 -mx-2 px-2 rounded-lg"
      style={{
        gridColumn: `span ${numCols} / span ${numCols}`
      }}
    >
      <div
        className={`grid  gap-2 grid-cols-2`}
        style={{
          gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`
        }}
      >
        {categories.map(category => (
          <div key={category.name} className={cn('rounded-full text-center', category.colorClass)}>
            {category.name}
          </div>
        ))}
      </div>
    </div>
  )
}

type RowProps<C extends string, T extends string> = {
  tier: Tier<C, T>
  categories: TierListCategory<C>[]
}
const Row = <C extends string, T extends string>({ tier, categories }: RowProps<C, T>) => {
  return (
    <>
      <div className={cn('w-12 flex items-center justify-center h-full min-h-[132px]', tier.colorClass)}>
        {tier.tierName}
      </div>
      {categories.map(category => (
        <div key={category.name} className="flex gap-2 flex-wrap bg-dark-800 rounded-lg p-4">
          {tier.placements[category.name].map(character => (
            <CharacterCard key={character.id} imgUrl={character.imgUrl} />
          ))}
        </div>
      ))}
    </>
  )
}

type CharacterCardProps = {
  imgUrl: string
}
const CharacterCard = ({ imgUrl }: CharacterCardProps) => {
  return (
    <div className="w-[100px] h-[100px] overflow-hidden rounded-lg cursor-pointer">
      <Image
        src={imgUrl}
        width={100}
        height={100}
        alt="Karen A"
        className="w-[100px] h-[100px]  hover:scale-105 
                transition-transform duration-1000 transform-gpu translate-z-0"
      />
    </div>
  )
}

export default TierList
