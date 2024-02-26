import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shop: {
    id: 1,
    title: 'BabaEddy Mini Mart',
    imgUrl: null,
    rating: null,
    genre: null,
    address: null,
    description: null,
    lng: 37.06817234281969,
    lat: -1.0389145224029308,
  },
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShop: (state, action) => {
      state.shop = action.payload;
    },
  },
});

// Action creators
export const { setShop } = shopSlice.actions;

export const selectShop = (state) => state.shop.shop;

export default shopSlice.reducer;
