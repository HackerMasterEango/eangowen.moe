import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type TierListCategory<T extends string> = {
  name: T
  colorClass: string
  borderClass: string
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
  isEmpty?: boolean
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
        className="grid md:gap-2 tier-list-template-columns"
        style={{ '--num-cols': numCols } as React.CSSProperties}
      >
        {/* Sticky Header */}
        <div className="sticky top-16 z-10 row-start-1 col-span-full max-md:hidden">
          <div
            className={`grid gap-2 items-center tier-list-template-columns`}
            style={{ '--num-cols': numCols } as React.CSSProperties}
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
      {/* Tier Name */}
      <div
        className={cn(
          'w-12 flex items-center justify-center md:min-h-[134px]',
          'md:h-full',
          'max-md:w-full max-md:p-2 max-md:text-center', // Mobile: full width
          'max-md:my-2 max-md:rounded-lg', // Mobile: margin between tiers
          tier.colorClass,
          // on mobile if tier.isEmpty, hide the tier
          tier.isEmpty ? 'max-md:hidden' : ''
        )}
      >
        {tier.tierName}
      </div>

      {/* Categories */}
      {categories.map((category, idx) => (
        <div
          key={category.name}
          className={cn(
            'bg-dark-600 md:rounded-lg p-4 max-md:py-2',
            'md:flex md:gap-2 md:flex-wrap', // Desktop: flex layout
            // Mobile: rounded border radius for first/last visible categories
            {
              'max-md:rounded-t-lg':
                tier.placements[category.name].length > 0 &&
                idx === categories.findIndex(c => tier.placements[c.name].length > 0),
              'max-md:rounded-b-lg':
                tier.placements[category.name].length > 0 &&
                idx === categories.findLastIndex(c => tier.placements[c.name].length > 0)
            },

            tier.placements[category.name].length === 0 ? 'max-md:hidden' : ''
          )}
        >
          {/* Category name - only show on mobile */}
          <div className="md:hidden">
            <div className={cn('text-sm text-center', category.colorClass)}>
              <span>{category.name}</span>
            </div>
            {/* Divider to extend border..... this is technology! */}
            <div className={cn('border-x-2 h-2', category.borderClass)} />
          </div>

          {/* Character cards */}
          <div
            className={cn(
              'flex gap-2 flex-wrap md:border-none border-x-2 border-b-2 px-2 pb-2 rounded-b',
              category.borderClass
            )}
          >
            {tier.placements[category.name].map(character => (
              <CharacterCard key={character.id} imgUrl={character.imgUrl} />
            ))}
          </div>
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
    <>
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
    </>
  )
}

export default TierList
