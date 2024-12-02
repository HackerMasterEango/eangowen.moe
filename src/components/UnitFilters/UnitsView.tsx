
"use client"
import { useAtom } from "jotai"
import Image from "next/image"
import { unitsAtom } from "./filterAtoms"




export const UnitsView = () => {

  const [units] = useAtom(unitsAtom)

  if (!units || units.length === 0) {
    return <div>No units found</div>
  }
  return (

<div className="flex gap-3 items-center">
      {units.map(({ id, name, imgUrl }) => (
        <div key={id} className="flex flex-col items-center">
          <CharacterCard  imgUrl={imgUrl} />
          <span>{name}</span>

          </div>
        
      ))}
      
    </div>
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