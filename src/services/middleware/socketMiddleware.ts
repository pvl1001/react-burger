import type { Middleware, MiddlewareAPI } from 'redux'
import { AppDispatch, RootState, TwsProfileActions, TwsFeedActions } from "../types"


export const socketMiddleware = ( wsActions: TwsProfileActions | TwsFeedActions ): Middleware => {
   return (( store: MiddlewareAPI<AppDispatch, RootState> ) => {
      let ws: WebSocket | null = null

      return next => action => {
         const { dispatch } = store
         const { type, payload } = action
         const { wsConnection, wsOffline, wsOpen, wsError, wsMessage, wsClose } = wsActions


         if ( type === wsConnection ) {
            ws = new WebSocket( payload )
         }

         if ( ws && type === wsOffline ) {
            ws.close( 1000, `WebSocket success closed` )
            ws = null
         }

         if ( ws ) {
            ws.onopen = ( event ) => {
               console.log( 'onopen' )
               dispatch( { type: wsOpen, payload: event.type } )
            }
            ws.onerror = ( event ) => {
               dispatch( { type: wsError, payload: event } )
            }
            ws.onmessage = ( event ) => {
               dispatch( { type: wsMessage, payload: JSON.parse( event.data ) } )
            }
            ws.onclose = ( event ) => {
               dispatch( { type: wsClose, payload: event.type } )
               console.log( event.reason )
            }
         }

         next( action )
      }
   }) as Middleware
}