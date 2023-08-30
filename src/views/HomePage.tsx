import React, {useState} from "react";
import { GameFilter } from "../components/GameFilter";
import {filter} from "../initValues";
import {IFilter, IFilterItems, IGame} from "../types";
import { games } from "../data/data";
import { GameCard } from "../components/GameCard";
import axios from "axios";

const filtration: IFilterItems = {
  platform: [],
  category: [],
  tag: [],
}

export function HomePage() {
  const [filtration, setFiltration] = useState<IFilterItems[]>([])
  // const [games, setGames] = useState<IGame[]>([])
  
  const makeFiltration = (selectedFilter: IFilter[]) => {


    // const options = {
    //   method: 'GET',
    //   url: 'https://free-to-play-games-database.p.rapidapi.com/api/filter',
    //   params: {},
    //   headers: {
    //     'X-RapidAPI-Key': 'e764877f20mshdd63dd89f438712p1217cfjsn0e67f0d64b31',
    //     'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    //   }
    // };

    // if (selectedFilter.length === 0) {
    //   // Directly call the URL without any params
    //   axios.request(options)
    //     .then(response => {
    //       // Handle your response here
    //     })
    //     .catch(error => {
    //       // Handle error
    //     });
    //   return;
    // }

    // Filter out categories and platforms based on your conditions
    const categories = selectedFilter
      .filter(item => item.type === 'category')
      .map(item => item.name)
      .join('.');
    const platforms = selectedFilter
      .filter(item => item.type === 'platform')
      .map(item => item.name);
    const tags = selectedFilter
      .filter(item => item.type === 'tag')
      .map(item => item.name)
      .join('.');

    let params: any = {};

    if (categories) {
      params["category"] = categories;
    }
    if (platforms.length <= 1) { // As per your requirement of not sending if there are multiple platforms
      params["platform"] = platforms[0]; // Only single platform
    }
    if (tags) {
      params["tag"] = tags;
    }

    // const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";

    const options = {
      method: 'GET',
      url: 'https://example.com',
      params: params,
      headers: {
        'X-RapidAPI-Key': 'e764877f20mshdd63dd89f438712p1217cfjsn0e67f0d64b31',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    // axios.request(options)
    //   .then(response => {
    //     // Handle your response here
    //   })
    //   .catch(error => {
    //     // Handle error
    //   });
  }
  return (
    <div className="">
      <h1 className="text-2lg text-slate-600">Список игр</h1>
      <GameFilter filter={filter} makeFiltration={makeFiltration}/>
      <div className="grid md:grid-cols-3 gap-4 mt-3">
        { games.length && games.map((game) => <GameCard game={game} key={game.id}/>)}
      </div>
    </div>
  )
}