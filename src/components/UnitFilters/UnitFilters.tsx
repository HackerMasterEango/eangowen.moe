import React from 'react'
import Filters from './Filters'
import { UnitsView } from './UnitsView'
import { HEAVEN_BURNS_RED_UNITS } from '@/db/units'

const UnitFilters = () => {
  return (
    <div className="container">
      <div className='mb-4'>
        <Filters />
      </div>
    <UnitsView />

    </div>
  )
}

export default UnitFilters