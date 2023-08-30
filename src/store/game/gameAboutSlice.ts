import { createSlice } from '@reduxjs/toolkit';
import {IGame} from "../../types";

interface GameState {
  games: Record<string, IGame>,
  lastAccessed: Record<string, number>,
}
const initialState: GameState = {
  games: {},
  lastAccessed: {}
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameData: (state, action) => {
      const { id, data } = action.payload;
      state.games[id] = data;
    },
    updateLastAccessed: (state, action) => {
      const id = action.payload;
      state.lastAccessed[id] = Date.now(); // update the last accessed time
    }
  }
});

export const { setGameData, updateLastAccessed } = gameSlice.actions;

export default gameSlice.reducer;