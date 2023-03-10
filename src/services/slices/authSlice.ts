import { createSlice } from '@reduxjs/toolkit';
import { toggleLoader } from "./loaderSlice";
import {
   authRequest,
   getRefreshTokenRequest,
   loginRequest,
   logoutRequest,
   patchUserRequest,
   registerRequest
} from "../../utils/burger-api";
import { deleteCookie, setCookie } from "../../utils/setCookie";
import { AppDispatch } from "../store";
import { ILoginForm, IUser, TStoreUser } from "../../utils/types";


type TInitialState = {
   user: null | TStoreUser
   accessToken: string
   refreshToken: string
   authRequest: boolean
   authFailed: boolean
}

const initialState: TInitialState = {
   user: null,
   accessToken: '',
   refreshToken: '',
   authRequest: false,
   authFailed: false,
}


const authSlice = createSlice( {
   name: 'auth',
   initialState,
   reducers: {
      getAuthRequest( state ) {
         state.authRequest = true
      },
      getAuthFailed( state ) {
         state.authRequest = false
         state.authFailed = true
         state.accessToken = ''
         state.refreshToken = ''
         state.user = null
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
      logOut( state ) {
         state.user = null
      },
   },
} )


// регистрация пользователя
export const userRegister = ( value: IUser ) => async ( dispatch: AppDispatch ) => {
   try {
      dispatch( getAuthRequest() )
      dispatch( toggleLoader() )
      const res = await registerRequest( value )
      if ( res.success ) {
         dispatch( getTokenSuccess( res ) )
         return res
      }
      dispatch( getAuthFailed() )
   } catch ( err: any ) {
      dispatch( getAuthFailed() )
      console.log( 'Ошибка userRegister: ' + err.message, value )
   } finally {
      dispatch( toggleLoader() )
   }
}

// вход пользователя
export const userLogin = ( value: ILoginForm ) => async ( dispatch: AppDispatch ) => {
   try {
      dispatch( getAuthRequest() )
      dispatch( toggleLoader() )
      const res = await loginRequest( value )
      if ( res.success ) {
         dispatch( getTokenSuccess( res ) )
         const authToken = res.accessToken.split( 'Bearer ' )[1]
         setCookie( 'token', authToken )
         setCookie( 'refreshToken', res.refreshToken )
         return res
      }
      dispatch( getAuthFailed() )
   } catch ( err: any ) {
      dispatch( getAuthFailed() )
      console.log( 'Ошибка userLogin: ' + err.message, value )

      if ( err.status === 403 ) {
         const newToken = await getRefreshTokenRequest()
         await authRequest( newToken )
      }
   } finally {
      dispatch( toggleLoader() )
   }
}

// выход пользователя
export const userLogout = () => async ( dispatch: AppDispatch ) => {
   try {
      dispatch( getAuthRequest() )
      dispatch( toggleLoader() )
      const { success, message } = await logoutRequest()

      if ( success ) {
         console.log( message )
         deleteCookie( 'token' )
         deleteCookie( 'refreshToken' )
         dispatch( logOut() )
         return success
      }
      dispatch( getAuthFailed() )
   } catch ( err: any ) {
      dispatch( getAuthFailed() )
      console.log( 'Ошибка userLogout: ' + err.message )
   } finally {
      dispatch( toggleLoader() )
   }
}

// получить данные пользователя
export const getUser = () => async ( dispatch: AppDispatch ) => {
   try {
      dispatch( getAuthRequest() )
      dispatch( toggleLoader() )
      const res = await authRequest()
      if ( res.success ) return dispatch( getUserSuccess( res.user ) )
      dispatch( getAuthFailed() )
   } catch ( err ) {
      dispatch( getAuthFailed() )
   } finally {
      dispatch( toggleLoader() )
   }
}

// обновить данные пользователя
export const patchUser = ( form: IUser ) => async ( dispatch: AppDispatch ) => {
   try {
      dispatch( getAuthRequest() )
      dispatch( toggleLoader() )
      const { success, user } = await patchUserRequest( form )

      if ( success ) return dispatch( getUserSuccess( user ) )
      dispatch( getAuthFailed() )
   } catch ( err: any ) {
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