import React from 'react'
import Filters, { Unit } from './Filters'
import { UnitsView } from './UnitsView'


type UnitFiltersProps = {
  initialUnits: Unit[]
  allUnits: Unit[]
  initialSearch?: string
}
const UnitFilters = ({
  initialUnits,
  allUnits,
  initialSearch = ""
}: UnitFiltersProps) => {



  return (
    <div className="container">
      <div className='mb-4'>
        <Filters initialSearch={initialSearch} allUnits={allUnits} />
      </div>
    <UnitsView initialUnits={initialUnits} />

    </div>
  )
}

export default UnitFilters