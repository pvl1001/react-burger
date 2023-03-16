import { configureStore } from "@reduxjs/toolkit"
import burgerIngredientsSlice from './slices/burgerIngredientsSlice'
import burgerConstructorSlice from "./slices/burgerConstructorSlice"
import orderSlice from "./slices/orderSlice";
import currentIngredientSlice from "./slices/currentIngredientSlice";
import loaderSlice from "./slices/loaderSlice";
import authSlice from "./slices/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import wsSlice from "./slices/wsSlice";
import { socketMiddleware } from "./middleware/socketMiddleware";


const wsActions = {
   wsConnection: 'webSocket/wsConnection',
   wsOffline: 'webSocket/wsOffline',
   wsOpen: 'webSocket/wsOpen',
   wsError: 'webSocket/wsConnectionError',
   wsMessage: 'webSocket/wsGetOrders',
   wsClose: 'webSocket/wsClose',
}

const store = configureStore( {
   reducer: {
      auth: authSlice,
      burgerIngredients: burgerIngredientsSlice,
      burgerConstructor: burgerConstructorSlice,
      currentIngredient: currentIngredientSlice,
      order: orderSlice,
      loader: loaderSlice,
      webSocket: wsSlice,
   },
   devTools: process.env.NODE_ENV === 'development',
   middleware: ( getDefaultMiddleware ) =>
      getDefaultMiddleware().concat( socketMiddleware( wsActions ) ),
} )

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

export default store