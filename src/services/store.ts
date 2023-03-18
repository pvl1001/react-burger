import { configureStore } from "@reduxjs/toolkit"
import burgerIngredientsSlice from './slices/burgerIngredientsSlice'
import burgerConstructorSlice from "./slices/burgerConstructorSlice"
import orderSlice from "./slices/orderSlice";
import currentIngredientSlice from "./slices/currentIngredientSlice";
import loaderSlice from "./slices/loaderSlice";
import authSlice from "./slices/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { socketMiddleware } from "./middleware/socketMiddleware";
import wsFeedSlice from "./slices/wsFeedSlice";
import { AppDispatch, RootState, TwsProfileActions, TwsFeedActions } from "./types";
import wsProfileSlice from "./slices/wsProfileSlice";


const wsProfileActions: TwsProfileActions = {
   wsConnection: 'webSocketProfile/wsProfileConnection',
   wsOffline: 'webSocketProfile/wsProfileOffline',
   wsOpen: 'webSocketProfile/wsProfileOpen',
   wsError: 'webSocketProfile/wsProfileConnectionError',
   wsMessage: 'webSocketProfile/wsProfileGetOrders',
   wsClose: 'webSocketProfile/wsProfileClose',
}

const wsFeedActions: TwsFeedActions = {
   wsConnection: 'webSocketFeed/wsFeedConnection',
   wsOffline: 'webSocketFeed/wsFeedOffline',
   wsOpen: 'webSocketFeed/wsFeedOpen',
   wsError: 'webSocketFeed/wsFeedConnectionError',
   wsMessage: 'webSocketFeed/wsFeedGetOrders',
   wsClose: 'webSocketFeed/wsFeedClose',
}


const store = configureStore( {
   reducer: {
      auth: authSlice,
      burgerIngredients: burgerIngredientsSlice,
      burgerConstructor: burgerConstructorSlice,
      currentIngredient: currentIngredientSlice,
      order: orderSlice,
      loader: loaderSlice,
      webSocketProfile: wsProfileSlice,
      webSocketFeed: wsFeedSlice,
   },
   devTools: process.env.NODE_ENV === 'development',
   middleware: ( getDefaultMiddleware ) =>
      getDefaultMiddleware().concat(
         socketMiddleware( wsProfileActions ),
         socketMiddleware( wsFeedActions )
      ),
} )


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

export default store