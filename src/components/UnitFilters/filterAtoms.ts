import { atom } from 'jotai'
import { atomWithHash } from 'jotai-location'
import { Unit } from './Filters'
import { HEAVEN_BURNS_RED_UNITS } from '@/db/units'


export const unitSearchAtom = atomWithHash<string>("search", "")

export const unitsAtom = atom<Unit[]>(HEAVEN_BURNS_RED_UNITS)
