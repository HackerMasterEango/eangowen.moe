
"use client"
import { Input } from '../ui/input'
import { useAtom, useSetAtom } from 'jotai'
import { unitsAtom, unitSearchAtom } from './filterAtoms'
import * as fuzzySearch from '@m31coding/fuzzy-search'
import { HEAVEN_BURNS_RED_UNITS } from '@/db/units'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useHydratedAtom } from '@/hooks/useHydratedAtom'


export type Unit = {
  id: string
  name: string
  imgUrl: string
}

const searcher = fuzzySearch.SearcherFactory.createDefaultSearcher()

const units = HEAVEN_BURNS_RED_UNITS

searcher.indexEntities(
  units,
  (e) => e.id,
  (e) => [e.name, `${e.name}`]
)

type FiltersProps = {
  initialSearch: string,
  allUnits: Unit[]
}
const Filters = ({
  initialSearch,
  allUnits
}: FiltersProps) => {
  
  const setUnits = useSetAtom(unitsAtom)

  const [search, setSearch] = useHydratedAtom(unitSearchAtom, initialSearch)


  const router = useRouter()




  const onSearchUnit = (query: string) => {
    // set search query parameter on url
    router.push(`${window.location.pathname}?search=${encodeURIComponent(query)}`)

    setSearch(query)

    const { matches } = searcher.getMatches(new fuzzySearch.Query(query))

    setUnits(
      matches.length > 0 ? matches.map((match) => match.entity) : allUnits
    )
  }


  return (
    <div>
      <Input value={search} onChange={e => onSearchUnit(e.target.value)}/>


    </div>
  )
}

export default Filters