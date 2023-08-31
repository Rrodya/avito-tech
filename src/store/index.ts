import { configureStore } from '@reduxjs/toolkit';
import { api } from './game/gameApi'; 
import {gameSettingsSlice} from './game/gameSettingsSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    gameSettings: gameSettingsSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export const useAppDispatch:() => typeof store.dispatch=useDispatch
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;