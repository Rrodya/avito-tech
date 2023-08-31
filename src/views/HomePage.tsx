import React from "react";
import { GameFilter } from "../components/GameFilter";
import {filter, sort} from "../initValues";
import {IFilter, SortOption} from "../types";
import { GameCard } from "../components/GameCard";
import { useGetAllGamesQuery } from "../store/game/gameApi";
import { useAppDispatch, useAppSelector } from "../store";
import { addFilter, addSort } from "../store/game/gameSettingsSlice";

export function HomePage() {
  const dispatch = useAppDispatch();

  const stateFilters = useAppSelector(state => state.gameSettings.filters);
  const stateSort = useAppSelector(state => state.gameSettings.sort);

  const { data: games = [], isFetching, isError } = useGetAllGamesQuery({filters: stateFilters, sort: stateSort});

  
  const handleFilterChange = (filters: IFilter[]) => {
    dispatch(addFilter(filters));
  };

  const handleSortChange = (sort: SortOption | null) => {
    dispatch(addSort(sort));
  }
  console.log("games.length:", games.length);
  console.log("isFetching:", isFetching);
  console.log("isError:", isError);
 
  return (
    <div className="">
      <h1 className="text-2lg text-slate-600">Список игр</h1>
      <GameFilter 
        filter={filter} 
        makeFiltration={handleFilterChange} 
        sortOption={stateSort} 
        setSortOption={handleSortChange} 
        sort={sort} 
        stateFilters={stateFilters} 
      />
      { isFetching && <p className="font-bold text-center mt-3">Loading...</p>}
      { isError && <p className="font-bold text-center mt-3 text-red-500">Some error</p>}
      { !games.length && !isFetching && !isError && <p className="font-bold text-center mt-3 text-gray-600">Нет результатов</p> }
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mt-3">
        {games.length > 0 && games.map((game) => <GameCard game={game} key={game.id}/>)}
      </div>
    </div>
  )
}