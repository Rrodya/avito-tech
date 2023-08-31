import React, {useState} from "react";
import { GameFilter } from "../components/GameFilter";
import {filter, sort} from "../initValues";
import {IFilter, IFilterItems, IGame, SortOption} from "../types";
import { GameCard } from "../components/GameCard";
import {useGetAllGamesQuery} from "../store/game/gameApi";

const filtration: IFilterItems = {
  platform: [],
  category: [],
}

const PAGE_SIZE = 10;

export function HomePage() {
  const [selectedFilter, setSelectedFilter] = React.useState<IFilter[]>([]);
  const [sortOption, setSortOption] = useState<SortOption | null>(null);
  const { data: games = [], isLoading, isError } = useGetAllGamesQuery({filters: selectedFilter, sort: sortOption});
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (filters: IFilter[]) => {
    setSelectedFilter(filters);
  };

  return (
    <div className="">
      <h1 className="text-2lg text-slate-600">Список игр</h1>
      <GameFilter 
        filter={filter} 
        makeFiltration={handleFilterChange} 
        sortOption={sortOption} 
        setSortOption={setSortOption} 
        sort={sort}  
      />
      { isLoading && <p className="font-bold text-center mt-3">Loading...</p>}
      { isError && <p className="font-bold text-center mt-3 text-red-500">Some error</p>}
      <div className="grid md:grid-cols-3 gap-4 mt-3">
        {games.length > 0 && games.map((game) => <GameCard game={game} key={game.id}/>)}
      </div>
    </div>
  )
}