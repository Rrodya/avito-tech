import React, {useState} from "react";
import {IFilter, IFilterItems, SortOption} from "../types";
import { EnumFilter, EnumSort } from "../enums";
type FilterProps = { 
  filter: IFilterItems, 
  makeFiltration: (selectedFilter: IFilter[]) => void,
  sortOption: SortOption | null,
  setSortOption: (sort: SortOption | null) => void,
  sort: string[],
  stateFilters: IFilter[],
}

export function GameFilter({filter, makeFiltration, sortOption, setSortOption, sort, stateFilters}: FilterProps) {
  const [isDrop, setDrop] = useState(false);

  const [selected, setSelected] = useState<IFilter[]>(stateFilters.length ? stateFilters : []);

  const toggleDrop = () => {
    setDrop(!isDrop);
  }

  const takeFilter = (key: keyof IFilterItems, id: number) => {
    const foundFilter = filter[key].find(f => f.id === id);

    if (!foundFilter) return;

    const choosedFilter: IFilter = { ...foundFilter, type: key };

    if (selected.some(item => item.id === choosedFilter.id && item.type === choosedFilter.type)) {
      setSelected(prev => prev.filter(item => item.id !== choosedFilter.id || item.type !== choosedFilter.type));
    } else {
      setSelected(prev => [...prev, choosedFilter]);
    }
  }

  const clearSelected = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelected([]);
  }

  const handleSortClick = (option: SortOption) => {
    if (sortOption === option) {
      setSortOption(null);
    } else {
      setSortOption(option);
    }
  };

  const goSearch = () => {
    setDrop(false);
    makeFiltration(selected);
  }

  return (
    <div
      className="relative"
    >
      <div className="flex gap-2 items-center mt-4">
        <ul
          className="relative w-full h-[50px] flex items-center px-3 bg-slate-600 flex text-white list-none overflow-hidden whitespace-nowrap"
          onClick={toggleDrop}
        >
          {selected.length ? selected.map(f => <li key={f.id} className="mr-4">{f.name}</li>) : <p>Фильтр</p>}

          {selected.length ? <button
              className="absolute right-0 top-0 transform bg-indigo-700 h-full p-3 flex items-center justify-center text-white font-bold"
              onClick={clearSelected}
          >
              Очистить
          </button> : ""}
        </ul>
        <button 
          className="px-5 bg-indigo-500 h-[50px] text-white"
          onClick={goSearch}
        >Поиск</button>
      </div>

      {isDrop &&
        <div className="absolute w-full bg-slate-500 shadow-md p-3 z-10">
          {
            Object.entries(filter).map(([key, filterItems]) => (
              <div key={key}>
                <p className="font-bold text-indigo-200">
                  {EnumFilter[key as keyof typeof EnumFilter]}
                </p>
                <ul className="flex py-2 flex-wrap">
                  {filterItems.map((item: IFilter) => {
                    const isSelected = selected.some(selectedItem => selectedItem.id === item.id);
                    const itemClasses = [
                      "flex",
                      "items-center",
                      "mr-2",
                      "mb-2",
                      "cursor-pointer",
                      "transition-all",
                      isSelected ? "bg-slate-200" : "hover:bg-slate-200",
                      isSelected ? "text-slate-700" : "text-gray-200",
                      isSelected ? "" : "hover:text-slate-600"
                    ].join(' ');


                    return (
                      <li
                        key={item.id}
                        className={itemClasses}
                        onClick={() => takeFilter(key as keyof IFilterItems, item.id)}
                      >
                        <p className="text-sm font-medium px-2">{item.name}</p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))
          }
        </div>}
        <div className="mt-4"> 
          <p className="font-bold">Сортировка:</p>
          <div className="flex gap-2">  
            {sort.map(option => (
              <button
                key={option}
                className={`p-3 hover:bg-slate-500 hover:text-slate-200 transistion-all ${sortOption === option ? 'bg-slate-500 text-slate-200' : ''}`}
                onClick={() => handleSortClick(option as SortOption)}
                
              >
                {EnumSort[option as keyof typeof sortOption]}
              </button>
            ))}
          </div>
        </div>
    </div>
  )
}