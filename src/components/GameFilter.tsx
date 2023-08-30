import React, {useEffect, useState} from "react";
import {IFilter, IFilterItems} from "../types";
import { EnumFilter } from "../enums";
type FilterProps = { filter: IFilterItems, makeFiltration: (selectedFilter: IFilter[]) => void }



export function GameFilter({filter, makeFiltration}: FilterProps) {
  const [isDrop, setDrop] = useState(false);
  const [selected, setSelected] = useState<IFilter[]>([]);
  const toggleDrop = () => {
    setDrop(!isDrop);
  }

  const takeFilter = (key: keyof IFilterItems, id: number) => {
    const foundFilter = filter[key].find(f => f.id === id);

    if (!foundFilter) return;

    const choosedFilter: IFilter = { ...foundFilter, type: key };

    if (key === 'category' && selected.some(item => item.type === 'category')) {
      setSelected(prev => [...prev.filter(item => item.type !== 'category'), choosedFilter]);
      return;
    }

    if (selected.some(item => item.id === choosedFilter.id && item.type === choosedFilter.type)) {
      setSelected(prev => prev.filter(item => item.id !== choosedFilter.id || item.type !== choosedFilter.type));
      return;
    }

    setSelected(prev => [...prev, choosedFilter]);
  }

  useEffect(() => {
    if(!isDrop) {
      makeFiltration(selected);
    } else {
      if(!selected.length) {
        console.log("sele");
        makeFiltration(selected);
      }
    }
  }, [isDrop, selected]);

  const clearSelected = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelected([]);
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
          {selected.length ? selected.map(f => <li key={f.id} className="mr-4">{f.name}</li>) : <p>Filter</p>}

          {selected.length ? <button
              className="absolute right-0 top-0 transform bg-indigo-700 h-full p-3 flex items-center justify-center text-white font-bold"
              onClick={clearSelected}
          >
              Clear
          </button> : ""}
        </ul>
        <button className="px-5 bg-indigo-500 h-[50px] text-white">Sort</button>
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
    </div>
  )
}