import { createSlice } from "@reduxjs/toolkit"
import { TWsState } from "./wsProfileSlice";


const initialState: TWsState = {
   url: '',
   status: 'close',
   error: null,
   data: null,
}

const wsFeedSlice = createSlice( {
   name: 'webSocketFeed',
   initialState,
   reducers: {
      wsFeedOpen( state, action ) {
         state.status = action.payload
      },
      wsFeedClose() {
         return initialState
      },
      wsFeedConnection( state, action ) {
         state.url = action.payload
      },
      wsFeedOffline( state ) {
         state.status = 'close'
      },
      wsFeedError( state, action ) {
         state.status = action.payload.type
         state.error = action.payload
      },
      wsFeedGetOrders( state, action ) {
         state.data = action.payload
      },
   },
} )


export const {
   wsFeedOpen,
   wsFeedClose,
   wsFeedConnection,
   wsFeedOffline,
   wsFeedError,
   wsFeedGetOrders,
} = wsFeedSlice.actions
export default wsFeedSlice.reducer