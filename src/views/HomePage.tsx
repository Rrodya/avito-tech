import React from "react";
import { GameFilter } from "../components/GameFilter";

let filtersData: Array<{id: number, name: string}> = [
  {
      id: 1,
      name: "PC",
    },
    {
      id: 2,
      name: "Actions",
    },
    {
      id: 3,
      name: "Xbox",
    }
]


export function HomePage() {
  return (
    <div className="">
      <h1 className="text-2lg text-slate-600">Список игр</h1>
      <GameFilter filterData={filtersData}/>
    </div>
  )
}