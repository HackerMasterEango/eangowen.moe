import Filters from "@/components/UnitFilters/Filters"
import UnitFilters from "@/components/UnitFilters/UnitFilters"
import { UnitsView } from "@/components/UnitFilters/UnitsView"
import { HEAVEN_BURNS_RED_UNITS } from "@/db/units"

function Page() {
  return (
    <div className="container px-4 py-24 mx-auto">
      <UnitFilters />
      </div>
  )
}



export default Page