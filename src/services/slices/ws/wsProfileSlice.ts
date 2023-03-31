import { createSlice } from "@reduxjs/toolkit"
import { TWsData } from "../../../utils/types"

export type TWsState = {
   url: string,
   status: string,
   error: null | Event,
   data: null | TWsData,
}

const initialState: TWsState = {
   url: '',
   status: 'close',
   error: null,
   data: null,
}

const wsProfileSlice = createSlice( {
   name: 'webSocketProfile',
   initialState,
   reducers: {
      wsProfileOpen( state, action ) {
         state.status = action.payload
      },
      wsProfileClose() {
         return initialState
      },
      wsProfileConnection( state, action ) {
         state.url = action.payload
      },
      wsProfileOffline( state ) {
         state.status = 'close'
      },
      wsProfileError( state, action ) {
         state.status = action.payload.type
         state.error = action.payload
      },
      wsProfileGetOrders( state, action ) {
         state.data = action.payload
      },
   },
} )


export const {
   wsProfileConnection,
   wsProfileOffline,
} = wsProfileSlice.actions

export default wsProfileSlice.reducer