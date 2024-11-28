import Image from 'next/image'
import React from 'react'

const TierList = ({ numCols = 2 }) => {
  return (
    <div className="w-full">
      {/* TODO:      */}
      <div
        // copy above into inline style
        className="grid  gap-2 "
        style={{
          gridTemplateColumns: `auto ${' 1fr'.repeat(numCols)}`
        }}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 row-start-1 col-span-full">
          <div
            className={`grid gap-2 items-center`}
            style={{
              gridTemplateColumns: `auto ${' 1fr'.repeat(numCols)}`
            }}
          >
            <div className="w-12" />
            <Columns />
          </div>
        </div>
        {/* Rows */}
        <Row />
        <Row /> <Row />
        <Row />
        <Row />
        <Row /> <Row />
        <Row />
        <Row />
        <Row /> <Row />
        <Row />
        <Row />
        <Row /> <Row />
        <Row />
        <Row />
        <Row /> <Row />
        <Row />
        <Row />
        <Row /> <Row />
        <Row />
        <Row />
        <Row /> <Row />
        <Row />
        <Row />
        <Row /> <Row />
        <Row />
        <Row />
        <Row /> <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        {/* ... more rows */}
      </div>
    </div>
  )
}

const Columns = ({ numCols = 2 }) => {
  return (
    <div
      className={` bg-dark-700 p-4 rounded-lg`}
      style={{
        gridColumn: `span ${numCols} / span ${numCols}`
      }}
    >
      <div
        className={`grid  gap-2 grid-cols-2`}
        style={{
          gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`
        }}
      >
        <div className="bg-red-500 rounded-full text-center">DPS</div>
        <div className="bg-blue-500 rounded-full text-center">Healer</div>
      </div>
    </div>
  )
}

//
const Row = () => {
  return (
    <>
      <div className="bg-blue-500 w-12  flex items-center justify-center h-full">S</div>
      <div className="flex gap-2 flex-wrap bg-dark-800 rounded-lg items-center p-4">
        <CharacterCard />
        <CharacterCard />
      </div>
      <div className="flex gap-2 flex-wrap bg-dark-800 rounded-lg items-center p-4">
        <CharacterCard />
        <CharacterCard />
      </div>
    </>
  )
}

export function CharacterCard() {
  return (
    <div className="w-[100px] h-[100px] overflow-hidden rounded-lg cursor-pointer">
      <Image
        src="/heaven-burns-red/units/Megumi_A_100.webp"
        width={100}
        height={100}
        alt="Karen A"
        className="w-[100px] h-[100px]  hover:scale-105 
                transition-transform duration-1000 transform-gpu translate-z-0"
      />
    </div>
  )
}

export default TierList
