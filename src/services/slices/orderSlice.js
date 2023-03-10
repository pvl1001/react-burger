import { createSlice } from '@reduxjs/toolkit';
import { request } from "../../utils/request";
import { NORMA_API } from "../../utils/burger-api";
import { toggleLoader } from "./loaderSlice";
import { getCookie } from "../../utils/setCookie";


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
         state.id = ''
         state.idRequest = false
         state.idFailed = true
      },
   },
} )


export const getOrderId = ( ingredientsId ) => async ( dispatch ) => {
   try {
      dispatch( toggleLoader() )
      dispatch( getOrderIdRequest() )
      const { order, success } = await request( `${ NORMA_API }/orders`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
         },
         body: JSON.stringify( { ingredients: ingredientsId } )
      } )
      if ( success ) return dispatch( getOrderIdSuccess( order.number ) )
      dispatch( getOrderIdFailed() )
   } catch ( err ) {
      console.log( 'Ошибка получения номера заявки: ' + err )
      dispatch( getOrderIdFailed() )
   } finally {
      dispatch( toggleLoader() )
   }
}


export const {
   getOrderIdSuccess,
   getOrderIdRequest,
   getOrderIdFailed,
} = orderSlice.actions
export default orderSlice.reducer