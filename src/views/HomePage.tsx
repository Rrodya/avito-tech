import React, {useState} from "react";
import { GameFilter } from "../components/GameFilter";
import {filter} from "../initValues";
import {IFilter, IFilterItems, IGame} from "../types";
import { GameCard } from "../components/GameCard";
import axios from "axios";
import {useGetAllGamesQuery} from "../store/game/gameApi";

const filtration: IFilterItems = {
  platform: [],
  category: [],
}

export function HomePage() {
  const [selectedFilter, setSelectedFilter] = React.useState<IFilter[]>([]);
  const { data: games = [], isLoading, isError } = useGetAllGamesQuery(selectedFilter);

  const handleFilterChange = (filters: IFilter[]) => {
    setSelectedFilter(filters);
  };
  return (
    <div className="">
      <h1 className="text-2lg text-slate-600">Список игр</h1>
      <GameFilter filter={filter} makeFiltration={handleFilterChange}/>
      { isLoading && <p className="font-bold text-center mt-3">Loading...</p>}
      { isError && <p className="font-bold text-center mt-3 text-red-500">Some error</p>}
      <div className="grid md:grid-cols-3 gap-4 mt-3">
        {games.length > 0 && games.map((game) => <GameCard game={game} key={game.id}/>)}
      </div>
    </div>
  )
}