import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import foodSlice from './slices/foodSlice'
import categorySlice from './slices/categorySlice'
import measurementSlice from './slices/measurementSlice'
import fridgeItemSlice from './slices/fridgeItemSlice'
import userShoppingListSlice from './slices/userShoppingListSlice'
import userTaskSlice from './slices/userTaskSlice'


export const store = configureStore({
  reducer: {
    auth: authSlice,
    food: foodSlice,
    category: categorySlice,
    measurement: measurementSlice,
    fridgeItem: fridgeItemSlice,
    userShoppingList: userShoppingListSlice,
    userTask: userTaskSlice,
  },
})