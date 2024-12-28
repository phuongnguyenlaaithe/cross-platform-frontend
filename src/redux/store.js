import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import foodSlice from './slices/foodSlice'
import categorySlice from './slices/categorySlice'
import measurementSlice from './slices/measurementSlice'
import fridgeItemSlice from './slices/fridgeItemSlice'
import groupsSlice from './slices/groupsSlice'
import mealPlanSlice from './slices/mealPlanSlice'
import userShoppingListSlice from './slices/userShoppingListSlice'
import userTaskSlice from './slices/userTaskSlice'
import recipeSlice from './slices/recipeSlice'


export const store = configureStore({
  reducer: {
    auth: authSlice,
    food: foodSlice,
    groups: groupsSlice,
    category: categorySlice,
    measurement: measurementSlice,
    fridgeItem: fridgeItemSlice,
    mealPlan: mealPlanSlice,
    userShoppingList: userShoppingListSlice,
    userTask: userTaskSlice,
    recipe: recipeSlice
  },
})
