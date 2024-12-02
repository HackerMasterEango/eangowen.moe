
"use client"
import { Input } from '../ui/input'
import { useAtom } from 'jotai'
import { unitsAtom, unitSearchAtom } from './filterAtoms'
import * as fuzzySearch from '@m31coding/fuzzy-search'
import { HEAVEN_BURNS_RED_UNITS } from '@/db/units'


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

const Filters = () => {
  const [search, setSearch] = useAtom(unitSearchAtom)
  const [units, setUnits] = useAtom(unitsAtom)

  const onSearchUnit = (search: string) => {
    const { matches } = searcher.getMatches(new fuzzySearch.Query(search))

    setSearch(search)

    setUnits(
      matches.map((match) => match.entity)
    )


  }
  return (
    <div>
      <Input value={search} onChange={e => onSearchUnit(e.target.value)}/>


    </div>
  )
}

export default Filters