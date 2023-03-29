// @ts-nocheck
import store from "../../store";
import reduce, {
   wsFeedClose,
   wsFeedConnection,
   wsFeedError,
   wsFeedGetOrders,
   wsFeedOffline,
   wsFeedOpen
} from './wsFeedSlice'

const initialState = {
   url: '',
   status: 'close',
   error: null,
   data: null,
}

const data = {
   success: true,
   total: 46666,
   totalToday: 156,
   orders: [ {}, {} ]
}

describe( 'wsFeedSlice', () => {
   it( 'return initial state', () => {
      expect( store.getState().webSocketFeed ).toStrictEqual( initialState )
   } )

   it( 'handle wsFeedOpen', () => {
      expect( reduce( initialState, wsFeedOpen( 'open' ) ) ).toStrictEqual( {
         ...initialState,
         status: 'open',
      } )
   } )

   it( 'handle wsFeedClose', () => {
      expect( reduce( {
         url: 'https//:test.ru',
         status: 'open',
         error: null,
         data: data,
      }, wsFeedClose() ) ).toStrictEqual( initialState )
   } )

   it( 'handle wsFeedConnection', () => {
      expect( reduce( initialState, wsFeedConnection( 'https//:test.ru' ) ) ).toStrictEqual( {
         ...initialState,
         url: 'https//:test.ru',
      } )
   } )

   it( 'handle wsFeedOffline', () => {
      expect( reduce( initialState, wsFeedOffline() ) ).toStrictEqual( {
         ...initialState,
         status: 'close',
      } )
   } )

   it( 'handle wsFeedError', () => {
      expect( reduce( initialState, wsFeedError( { type: 'error', message: 'error' } ) ) ).toStrictEqual( {
         ...initialState,
         status: 'error',
         error: { type: 'error', message: 'error' },
      } )
   } )

   it( 'handle wsFeedGetOrders', () => {
      expect( reduce( initialState, wsFeedGetOrders( data ) ) ).toStrictEqual( {
         ...initialState, data: data,
      } )
   } )
} )