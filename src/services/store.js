import { configureStore } from "@reduxjs/toolkit"
import burgerIngredientsSlice from './slices/burgerIngredientsSlice'
import burgerConstructorSlice from "./slices/burgerConstructorSlice"
import orderSlice from "./slices/orderSlice";
import currentIngredientSlice from "./slices/currentIngredientSlice";
import loaderSlice from "./slices/loaderSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore( {
   reducer: {
      auth: authSlice,
      burgerIngredients: burgerIngredientsSlice,
      burgerConstructor: burgerConstructorSlice,
      currentIngredient: currentIngredientSlice,
      order: orderSlice,
      loader: loaderSlice,
   },
   devTools: process.env.NODE_ENV === 'development',
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware( {
         serializableCheck: false,
      } )
} )