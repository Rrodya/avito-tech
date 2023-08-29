import React, {useEffect, useState} from "react";
import {IFilter, IFilterItems} from "../types";

type FilterProps = { filter: IFilterItems, makeFiltration: (selectedFilter: IFilter[]) => void }

enum EnumFilter {
  category = "Категории",
  platform = "Платформы",
  tag = "Теги"
}

export function GameFilter({filter, makeFiltration}: FilterProps) {
  const [isDrop, setDrop] = useState(false);
  const [selected, setSelected] = useState<IFilter[]>([]);
  const toggleDrop = () => {
    setDrop(!isDrop);
  }

  // const takeFilter = (key: keyof IFilterItems, id: number) => {
  //   const choosedFilter = filter[key].find(f => f.id === id);
  //
  //   if (key === "category") {
  //     const existingCategoryId = selected.find(item => filter.category.some(category => category.id === item.id));
  //
  //     if (existingCategoryId) {
  //       setSelected(prevSelected =>
  //         prevSelected.map(item =>
  //           filter.category.some(category => category.id === item.id) ? choosedFilter! : item
  //         )
  //       );
  //     } else {
  //       setSelected(prevSelected => [...prevSelected, choosedFilter!]);
  //     }
  //   } else {
  //     if (!selected.some(item => item.id === id)) {
  //       setSelected(prevSelected => [...prevSelected, choosedFilter!]);
  //     } else {
  //       setSelected(prevSelected => prevSelected.filter(item => item.id !== id));
  //     }
  //   }
  //
  //   makeFiltration(selected);
  // }

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
    makeFiltration(selected);
  }, [selected]);

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
              onClick={(e) => {
                e.stopPropagation();
                setSelected([]);
              }}
          >
              Clear
          </button> : ""}
        </ul>
        <button className="px-5 bg-indigo-500 h-[50px] text-white">Sort</button>
      </div>

      {isDrop &&
        <div className="absolute w-full bg-slate-500 shadow-md p-3">
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