import { createSlice } from "@reduxjs/toolkit"
import { TWsData } from "../../utils/types"

type TWsState = {
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

const wsSlice = createSlice( {
   name: 'webSocket',
   initialState,
   reducers: {
      wsOpen( state, action ) {
         state.status = action.payload
      },
      wsClose() {
         return initialState
      },
      wsConnection( state, action ) {
         state.url = action.payload
      },
      wsOffline( state ) {
         state.status = 'close'
      },
      wsError( state, action ) {
         state.error = action.payload
      },
      wsGetOrders( state, action ) {
         state.data = action.payload
      },
   },
} )


export const {
   wsOpen,
   wsClose,
   wsConnection,
   wsOffline,
   wsError,
   wsGetOrders,
} = wsSlice.actions
export default wsSlice.reducer