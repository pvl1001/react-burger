import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderIdRequest } from "../../utils/api";
import { toggleLoader } from "./loaderSlice";


export const getOrderId = createAsyncThunk<string, string[]>(
   'order/getOrderId',
   async ( ingredientsId, { dispatch, rejectWithValue } ) => {
      try {
         dispatch( toggleLoader() )
         const res = await orderIdRequest( { ingredients: ingredientsId } )
         if ( res?.success ) return res.order.number
         throw res
      } catch ( err: any ) {
         console.log( 'Ошибка получения номера заявки: ' + err.message )
         return rejectWithValue( err.message )
      } finally {
         dispatch( toggleLoader() )
      }
   }
)


type TInitialState = {
   id: string,
   idRequest: boolean,
   idFailed: boolean,
}

const initialState: TInitialState = {
   id: '',
   idRequest: false,
   idFailed: false,
}

const orderSlice = createSlice( {
   name: 'order',
   initialState,
   reducers: {},
   extraReducers: ( builder ) => {
      builder
         .addCase( getOrderId.pending, ( state ) => {
            state.idRequest = true
         } )
         .addCase( getOrderId.fulfilled, ( state, action ) => {
            state.id = action.payload
            state.idRequest = false
            state.idFailed = false
         } )
         .addCase( getOrderId.rejected, ( state ) => {
            state.id = ''
            state.idRequest = false
            state.idFailed = true
         } )
   }
} )


export default orderSlice.reducer