import { createSlice } from '@reduxjs/toolkit';
import { toggleLoader } from "./loaderSlice";
import {
   authRequest,
   loginRequest,
   logoutRequest,
   patchUserRequest,
   registerRequest
} from "../../utils/burger-api";
import { deleteCookie, setCookie } from "../../utils/setCookie";


const authSlice = createSlice( {
   name: 'auth',
   initialState: {
      user: null,
      accessToken: '',
      refreshToken: '',
      authRequest: false,
      authFailed: false,
   },
   reducers: {
      getAuthRequest( state ) {
         state.authRequest = true
      },
      getAuthFailed( state ) {
         state.authRequest = false
         state.authFailed = true
         state.authFailed = ''
      },
      getTokenSuccess( state, action ) {
         const { accessToken, refreshToken, user } = action.payload
         state.authFailed = false
         state.authRequest = false
         state.accessToken = accessToken
         state.refreshToken = refreshToken
         state.user = user
      },
      getUserSuccess( state, action ) {
         state.authFailed = false
         state.authRequest = false
         state.user = action.payload
      },
      signIn( state, action ) {
         state.user = action.payload
      },
      logOut( state ) {
         state.user = null
      },
   },
} )


// регистрация пользователя
export const userRegister = ( value ) => async ( dispatch ) => {
   try {
      dispatch( getAuthRequest() )
      dispatch( toggleLoader() )
      const res = await registerRequest( value )
      if ( res.success ) {
         dispatch( getTokenSuccess( res ) )
         return res
      }
      dispatch( getAuthFailed() )
   } catch ( err ) {
      dispatch( getAuthFailed() )
      console.log( 'Ошибка userRegister: ' + err.message, value )
   } finally {
      dispatch( toggleLoader() )
   }
}

// вход пользователя
export const userLogin = ( value ) => async ( dispatch ) => {
   try {
      dispatch( getAuthRequest() )
      dispatch( toggleLoader() )
      const res = await loginRequest( value )
      if ( res.success ) {
         dispatch( getTokenSuccess( res ) )
         const authToken = res.accessToken.split( 'Bearer ' )[1]
         setCookie( 'token', authToken )
         localStorage.setItem( 'refreshToken', res.refreshToken )
         return res
      }
      dispatch( getAuthFailed() )
   } catch ( err ) {
      dispatch( getAuthFailed() )
      console.log( 'Ошибка userLogin: ' + err.message, value )
   } finally {
      dispatch( toggleLoader() )
   }
}

// выход пользователя
export const userLogout = ( value ) => async ( dispatch ) => {
   try {
      dispatch( getAuthRequest() )
      dispatch( toggleLoader() )
      const { success } = await logoutRequest()

      if ( success ) {
         deleteCookie('token')
         localStorage.clear()
         return dispatch( logOut() )
      }
      dispatch( getAuthFailed() )
   } catch ( err ) {
      dispatch( getAuthFailed() )
      console.log( 'Ошибка userLogout: ' + err.message, value )
   } finally {
      dispatch( toggleLoader() )
   }
}

// получить данные пользователя
export const getUser = () => async ( dispatch ) => {
   try {
      dispatch( getAuthRequest() )
      dispatch( toggleLoader() )
      const res = await authRequest()

      if ( res.success ) return dispatch( getUserSuccess( res.user ) )
      dispatch( getAuthFailed() )
   } catch ( err ) {
      dispatch( getAuthFailed() )
      console.log( 'Ошибка getUser: ' + err.message )
   } finally {
      dispatch( toggleLoader() )
   }
}

// обновить данные пользователя
export const patchUser = ( form ) => async ( dispatch ) => {
   try {
      dispatch( getAuthRequest() )
      dispatch( toggleLoader() )
      const { success, user } = await patchUserRequest( form )

      if ( success ) return dispatch( getUserSuccess( user ) )
      dispatch( getAuthFailed() )
   } catch ( err ) {
      dispatch( getAuthFailed() )
      console.log( 'Ошибка patchUser: ' + err.message )
   } finally {
      dispatch( toggleLoader() )
   }
}


export const {
   logOut,
   getAuthRequest,
   getAuthFailed,
   getTokenSuccess,
   getUserSuccess,
} = authSlice.actions
export default authSlice.reducer