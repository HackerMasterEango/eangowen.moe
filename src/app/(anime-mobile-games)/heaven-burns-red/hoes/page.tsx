import Filters, { Unit } from "@/components/UnitFilters/Filters"
import UnitFilters from "@/components/UnitFilters/UnitFilters"
import * as fuzzySearch from '@m31coding/fuzzy-search'
import { UnitsView } from "@/components/UnitFilters/UnitsView"
import { HEAVEN_BURNS_RED_UNITS } from "@/db/units"


type SearchParams = Promise<{ search?: string }>


const searcher = fuzzySearch.SearcherFactory.createDefaultSearcher()

const units = HEAVEN_BURNS_RED_UNITS

searcher.indexEntities(
  units,
  (e) => e.id,
  (e) => [e.name, `${e.name}`]
)


type PageProps = {
  searchParams: SearchParams
}
async function Page({ searchParams }: PageProps) {

  const { search } = await searchParams

  let units: Unit[] = HEAVEN_BURNS_RED_UNITS

  if (search) {
    const { matches } = searcher.getMatches(new fuzzySearch.Query(search))

    units = matches.map((match) => match.entity)
  }
  

  return (
    <div className="container px-4 py-24 mx-auto">
  
      <UnitFilters initialUnits={units} initialSearch={search} allUnits={HEAVEN_BURNS_RED_UNITS} />
     
    </div>
  )
}



export default Page