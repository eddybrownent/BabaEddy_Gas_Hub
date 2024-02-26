import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  products: [],
  previousOrder: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    removeFromCart: (state, action) => {
      const newCart = [...state.products];
      const productIndex = state.products.findIndex((product) => product.id == action.payload.id);
      if (productIndex >= 0) {
        newCart.splice(productIndex, 1);
      }
      state.products = newCart;
    },
    emptyCart: (state, action) => {
      state.products = [];
    },
    setPreviousOrder: (state, action) => {
      state.previousOrder = action.payload;
    },
  },
});

// Action creators
export const {
  addToCart, removeFromCart, emptyCart, setPreviousOrder,
} = cartSlice.actions;

export const selectCartproducts = (state) => state.cart.products;

export const selectCartproductsById = createSelector(
  [selectCartproducts, (_, id) => id],
  (products, id) => products.filter((product) => product.id === id),
);

export const selectCartTotal = createSelector(
  selectCartproducts,
  (products) => products.reduce((total, product) => total + product.price, 0),
);

export default cartSlice.reducer;
