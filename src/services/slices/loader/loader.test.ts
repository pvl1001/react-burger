import store from '../../store'
import reducer, { toggleLoader } from "./loaderSlice";


const initialState = {
   visible: false
}

describe( 'loaderSlice', () => {

   it( 'return initial state', () => {
      expect( store.getState().loader ).toStrictEqual( initialState )
   } )

   it( 'handle toggleLoader', () => {
      expect( reducer( initialState, toggleLoader() ) ).toStrictEqual( {
         visible: true
      } )
   } )

} )