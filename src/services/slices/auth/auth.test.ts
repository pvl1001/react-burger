import store from "../../store";

describe( 'authSlice', () => {
   it( 'return initial state', () => {
      expect( store.getState().auth ).toStrictEqual( {
         user: null ,
         accessToken: '' ,
         refreshToken: '' ,
         authRequest: false,
         authFailed: false ,
      } )
   } )
} )