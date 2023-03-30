import store from "./store";

export type TwsProfileActions = {
   wsConnection: 'webSocketProfile/wsProfileConnection',
   wsOffline: 'webSocketProfile/wsProfileOffline',
   wsOpen: 'webSocketProfile/wsProfileOpen',
   wsError: 'webSocketProfile/wsProfileConnectionError',
   wsMessage: 'webSocketProfile/wsProfileGetOrders',
   wsClose: 'webSocketProfile/wsProfileClose',
}

export type TwsFeedActions = {
   wsConnection: 'webSocketFeed/wsFeedConnection',
   wsOffline: 'webSocketFeed/wsFeedOffline',
   wsOpen: 'webSocketFeed/wsFeedOpen',
   wsError: 'webSocketFeed/wsFeedConnectionError',
   wsMessage: 'webSocketFeed/wsFeedGetOrders',
   wsClose: 'webSocketFeed/wsFeedClose',
}


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch