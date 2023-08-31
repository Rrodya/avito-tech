import React from "react";
import { IGame } from "../types";
import { Link } from "react-router-dom";
import { convertToRuFormat } from "../common/methods";

type GameCardProps = {game: IGame}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link to={`/${game.id}`}>
      <div className="w-full bg-slate-300 px-3 py-5 relative">
        <div>
          <img src={game.thumbnail} alt={game.title} />
        </div>
        <h2 className="text-slate-700 font-bold mt-2">{game.title}</h2>
        <p>Издатель: <i>{game.publisher}</i></p>
        <p>Жанр: <i>{game.genre}</i></p>
        <p className="italic absolute bottom-1 right-3 text-slate-500 text-xs">{convertToRuFormat(game.release_date)}</p>
      </div>
    </Link>
    
  )
}