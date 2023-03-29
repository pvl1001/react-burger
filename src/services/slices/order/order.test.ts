import store from '../../store'

describe( 'orderSlice', () => {
   it( 'return initial state', () => {
      expect( store.getState().order ).toStrictEqual( {
         id: '',
         idRequest: false,
         idFailed: false,
      } )
   } )
} )