import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IGame } from "../types";
import { game } from "../data/data";
import { EnymSystemReq } from "../enums";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Controller } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';

export function GamePage() {
  const {id} = useParams();
  const [same, setSame] = useState<IGame | null>(null);

  useEffect(() => {
    setSame(game);
    console.log(game);
  }, [id]);

  return (
    <div className="text-slate-700 mt-2">
      {game &&
        <div>
          <div className="flex flex-col md:flex-row-reverse md:justify-between">
            <div className="relative w-full h-auto md:w-1/2">
              <img src={game?.thumbnail} alt="" className="w-full h-auto" />
            </div>  
            <div className="md:pt-0 pt-4" >
              <p className="font-bold text-2lg md:text-xl">{game.title}</p>
              <p className="italic text-xs">{game.release_date}</p>
              <p>Издатель: <span className="italic">{game.publisher}</span></p>
              <p>Разработчик: <span className="italic">{game.developer}</span></p>
              <p>Жанр: <span className="italic">{game.genre}</span></p>
              <div>
                <p className="font-bold">Системные требования: </p>
                <ul className="pl-3">
                  {game.minimum_system_requirements && Object.entries(game.minimum_system_requirements).map(([key, value]) => {
                    return (
                      <li key={key}>{EnymSystemReq[key as keyof typeof EnymSystemReq]}: <span className="italic">{value}</span></li>
                    )
                  })}    
                </ul>
              </div>
            </div>    
          </div>
          <div className="mt-5">
              <p className="font-bold mb-4">Скриншоты</p>
              <Swiper modules={[Virtual]} spaceBetween={10} slidesPerView={1} virtual>
                  {game.screenshots!.length && game.screenshots?.map((screenshot, index) => (
                    <SwiperSlide key={screenshot.id} virtualIndex={index}>
                      <img src={screenshot.image} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
            </div>
        </div> 
      }
    </div>
  )
}