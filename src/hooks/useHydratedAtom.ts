import { useAtom, WritableAtom } from "jotai"
import { useEffect, useRef } from "react"


// mega autistic optimization to use an initial server value
// then sync it with the atom after the first render cycle
export const useHydratedAtom = <T,>(
  atom: WritableAtom<T, [T], void>,
  initialValue: T
) => {
  const [atomValue, setAtomValue] = useAtom(atom)
  const initialRenderDone = useRef(false)
  
  useEffect(() => {
    if (!initialRenderDone.current) {
      initialRenderDone.current = true
    }

    setAtomValue(initialValue)
  }, [])


  return [
    initialRenderDone.current ? atomValue : initialValue,
    setAtomValue
  ] as const
  
}