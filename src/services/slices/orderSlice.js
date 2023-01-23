import { createSlice } from '@reduxjs/toolkit';
import { request } from "../../utils/request";
import { NORMA_API } from "../../utils/burger-api";


const orderSlice = createSlice( {
   name: 'order',
   initialState: {
      id: '',
      idRequest: false,
      idFailed: false,
   },
   reducers: {
      getOrderIdSuccess( state, action ) {
         state.id = action.payload
         state.idRequest = false
         state.idFailed = false
      },
      getOrderIdRequest( state ) {
         state.idRequest = true
      },
      getOrderIdFailed( state ) {
         state.idRequest = false
         state.idFailed = true
      },
   },
} )


export const getOrderId = ( ingredientsId ) => async ( dispatch ) => {
   try {
      dispatch( getOrderIdRequest() )
      const { order, success } = await request( `${ NORMA_API }/orders`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify( { ingredients: ingredientsId } )
      } )
      if ( success ) return dispatch( getOrderIdSuccess( order.number ) )
      dispatch( getOrderIdFailed() )
   } catch ( err ) {
      dispatch( getOrderIdFailed() )
      alert( 'Ошибка запроса заявки' )
      console.log( err )
   }
}


export const {
   getOrderIdSuccess,
   getOrderIdRequest,
   getOrderIdFailed,
} = orderSlice.actions
export default orderSlice.reducer