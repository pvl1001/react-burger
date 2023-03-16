import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TWsData } from "../../utils/types";

type TWsState = {
   wsOpen: boolean,
   wsUrl: string,
   wsConnectionStatus: boolean,
   wsError: null | string,
   data: null | TWsData,
}

const initialState: TWsState = {
   wsOpen: false,
   wsUrl: '',
   wsConnectionStatus: false,
   wsError: null,
   data: null,
}

const wsSlice = createSlice( {
   name: 'webSocket',
   initialState,
   reducers: {
      wsOpen( state, action: PayloadAction<boolean> ) {
         state.wsOpen = action.payload;
         state.wsError = null;
      },
      wsClose( state ) {
         state.wsOpen = false;
         state.wsUrl = ''
         state.wsError = null;
         state.data = null;
      },
      wsConnection( state, action: PayloadAction<string> ) {
         state.wsConnectionStatus = true;
         state.wsUrl = action.payload
      },
      wsOffline( state ) {
         state.wsConnectionStatus = false;
      },
      wsConnectionError( state, action: PayloadAction<null | string> ) {
         state.wsError = action.payload;
      },
      wsGetOrders( state, action: PayloadAction<TWsData> ) {
         state.data = action.payload;
      },
   },
} )


export const {
   wsOpen,
   wsClose,
   wsConnection,
   wsOffline,
   wsConnectionError,
   wsGetOrders,
} = wsSlice.actions
export default wsSlice.reducer