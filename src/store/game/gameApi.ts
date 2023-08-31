import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {IFilter, IGame, SortOption} from "../../types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),

  endpoints: (builder) => ({
    getGameById: builder.query<IGame, number>({
      query: (id) => `game?id=${id}`,
      keepUnusedDataFor: 5 * 60,
    }),
    getAllGames: builder.query<IGame[], {filters: IFilter[], sort: SortOption | null}>({
      query: ({filters, sort}) => {

        const categories = filters
          .filter(item => item.type === 'category')
          .map(item => item.name)
          .join('.');
        const platforms = filters
          .filter(item => item.type === 'platform')
          .map(item => item.name);
        

        let params: Record<string, string> = {};

        if (categories) params["category"] = categories;
        if (platforms.length === 1) params["platform"] = platforms[0];
        if (sort) params["sort"] = sort;
        return { url: 'games', params };
      },
      keepUnusedDataFor: 5 * 60,
    }),
  }),
});

export const { useGetGameByIdQuery, useGetAllGamesQuery  } = api;