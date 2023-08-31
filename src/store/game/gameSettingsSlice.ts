import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFilter, SortOption } from "../../types";

interface GameSettgins {
  filters: IFilter[],
  sort: SortOption | null;
}

const initialState: GameSettgins = {
  filters: [],
  sort: null
}

export const gameSettingsSlice = createSlice({
  name: "gameSettings",
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<IFilter[]>) => {
      state.filters = action.payload;
    },
    addSort: (state, action: PayloadAction<SortOption | null>) => {
      state.sort = action.payload
    }
  }
});


export default gameSettingsSlice.reducer;
export const {addFilter, addSort} = gameSettingsSlice.actions;