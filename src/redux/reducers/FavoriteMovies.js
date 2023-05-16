import { createSlice } from "@reduxjs/toolkit";

const FavoriteSlice = createSlice({
  name: "Favorite",
  initialState: {
    list: [],
  },
  reducers: {
    setFavorite: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setFavorite } = FavoriteSlice.actions;
export default FavoriteSlice.reducer;
