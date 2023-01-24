import { configureStore } from "@reduxjs/toolkit"
import burgerIngredientsSlice from './slices/burgerIngredientsSlice'
import burgerConstructorSlice from "./slices/burgerConstructorSlice"
import orderSlice from "./slices/orderSlice";
import currentIngredientSlice from "./slices/currentIngredientSlice";

export const store = configureStore( {
   reducer: {
      burgerIngredients: burgerIngredientsSlice,
      burgerConstructor: burgerConstructorSlice,
      currentIngredient: currentIngredientSlice,
      order: orderSlice,
   },
   devTools: process.env.NODE_ENV === 'development',
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware( {
         serializableCheck: false,
      } )
} )