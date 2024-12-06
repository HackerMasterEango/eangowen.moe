import { atom } from 'jotai'
import { Unit } from './Filters'
import { HEAVEN_BURNS_RED_UNITS } from '@/db/units'


export const unitSearchAtom = atom<string>("")

export const unitsAtom = atom<Unit[]>(HEAVEN_BURNS_RED_UNITS)
