import type { Middleware, MiddlewareAPI } from 'redux'
import { AppDispatch, RootState } from "../store"

export const socketMiddleware = ( wsActions: any ): Middleware => {
   return (( store: MiddlewareAPI<AppDispatch, RootState> ) => {
      let socket: WebSocket | null = null

      return next => action => {
         const { dispatch } = store
         const { type, payload } = action
         const { wsConnection, wsOffline, wsOpen, wsError, wsMessage, wsClose } = wsActions


         if ( type === wsConnection ) {
            socket = new WebSocket( payload )
         }

         if ( type === wsOffline ) {
            if ( socket ) {
               socket.close( 1000, `WebSocket closed` )
               socket = null
            }
         }

         if ( socket ) {
            socket.onopen = () => {
               console.log('onopen')
               dispatch( { type: wsOpen } )
            }
            socket.onerror = () => {
               console.log('onerror')
               dispatch( { type: wsError } )
            }
            socket.onmessage = ( { data } ) => {
               console.log('onmessage')
               dispatch( { type: wsMessage, payload: JSON.parse( data ) } )
            }
            socket.onclose = ( { code }) => {
               console.log('onclose')
               dispatch( { type: wsClose, payload: code.toString() } )
            }
         }

         next( action )
      }
   }) as Middleware
}