import React from "react";
import { useParams } from "react-router-dom";
import { EnymSystemReq } from "../enums";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import { Link } from "react-router-dom";
import {useGetGameByIdQuery} from "../store/game/gameApi";
import { convertToRuFormat } from "../common/methods";

export function GamePage() {
  const {id} = useParams();

  const { data: game, isLoading, isError } = useGetGameByIdQuery(Number(id));




  return (
    <div className="text-slate-700 mt-2">
      <Link to="/"><span className="text-blue-600">Назад</span></Link>
      { isLoading && <p className="font-bold text-center mt-3">Loading...</p>}
      { isError && <p className="font-bold text-center mt-3 text-red-500">Some error</p>}
      {game &&

        <div className="mt-3">
          <div className="flex flex-col gap-5 md:flex-row-reverse md:justify-between">
            <div className="relative w-full h-auto md:w-1/2">
              <img src={game?.thumbnail} alt="" className="w-full h-auto" />
            </div>  
            <div className="md:pt-0" >
              <p className="font-bold text-2lg md:text-xl">{game.title}</p>
              <p className="italic text-xs mt-2">Дата релиза: {convertToRuFormat(game.release_date)}</p>
              <p className="mt-5">Издатель: <span className="italic">{game.publisher}</span></p>
              <p>Разработчик: <span className="italic">{game.developer}</span></p>
              <p>Жанр: <span className="italic">{game.genre}</span></p>
              {game.minimum_system_requirements && <div>
                <p className="font-bold">Минимальные системные требования: </p>
                <ul className="pl-3">
                  {game.minimum_system_requirements && Object.entries(game.minimum_system_requirements).map(([key, value]) => {
                    return (
                      <li key={key}>{EnymSystemReq[key as keyof typeof EnymSystemReq]}: <span className="italic">{value}</span></li>
                    )
                  })}    
                </ul>
              </div>}
            </div>    
          </div>
          <div className="mt-5">
              <p className="font-bold mb-4">Скриншоты</p>
              <Swiper 
                modules={[Virtual, Pagination, Navigation]} 
                spaceBetween={10} 
                slidesPerView={1} 
                virtual
                navigation
                pagination={{ clickable: true }}
              >
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