import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import GasdeliveryShop from './components/gasdeliveryShop'
import shopSlice from './slices/shopSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice, 
    shop: shopSlice
  },
})