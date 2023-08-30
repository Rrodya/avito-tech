import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {IFilter, IGame} from "../../types";  // assuming your types are in 'gameTypes.ts'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getGameById: builder.query<IGame, number>({
      query: (id) => `game?id=${id}`,
    }),
    getAllGames: builder.query<IGame[], IFilter[]>({
      query: (filters) => {
        const categories = filters
          .filter(item => item.type === 'category')
          .map(item => item.name)
          .join('.');
        const platforms = filters
          .filter(item => item.type === 'platform')
          .map(item => item.name);

        let params: Record<string, string> = {};

        if (categories) params["category"] = categories;
        if (platforms.length === 1) params["platform"] = platforms[0]; // Only single platform
        console.log(params);
        return { url: 'games', params };
      },
    }),
  }),
});

export const { useGetGameByIdQuery, useGetAllGamesQuery  } = api;