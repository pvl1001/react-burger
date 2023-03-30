import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toggleLoader } from "./loaderSlice";
import {
   authRequest,
   getRefreshTokenRequest,
   loginRequest,
   logoutRequest,
   patchUserRequest,
   registerRequest
} from "../../utils/api";
import { deleteCookie, setCookie } from "../../utils/setCookie";
import { ILoginForm, IResponseRegister, IUser, TStoreUser } from "../../utils/types";


// получить данные пользователя
export const getUser = createAsyncThunk<TStoreUser>(
   'auth/getUser',
   async ( _, { dispatch, rejectWithValue } ) => {
      try {
         dispatch( toggleLoader() )
         const res = await authRequest()
         if ( res?.success ) return res.user
         throw res
      } catch ( err: any ) {
         console.log( 'Ошибка getUser: ' + err.message )
         if ( err.message === 'jwt expired' ) {
            const resRefresh = await getRefreshTokenRequest()
            if ( !resRefresh.success ) {
               console.error( resRefresh )
            }
            const authToken = resRefresh.accessToken.split( 'Bearer ' )[1]
            setCookie( 'token', authToken )
            setCookie( 'refreshToken', resRefresh.refreshToken )
            console.log( 'Token refresh' )
            await authRequest( authToken )
         }
         return rejectWithValue( err.message )
      } finally {
         dispatch( toggleLoader() )
      }
   }
)

// обновить данные пользователя
export const patchUser = createAsyncThunk<TStoreUser, IUser>(
   'auth/patchUser',
   async ( userForm, { dispatch, rejectWithValue } ) => {
      try {
         dispatch( toggleLoader() )
         const res = await patchUserRequest( userForm )
         if ( res?.success ) return res.user
         throw res
      } catch ( err: any ) {
         console.log( 'Ошибка getUser: ' + err.message )
         return rejectWithValue( err.message )
      } finally {
         dispatch( toggleLoader() )
      }
   }
)

// выход пользователя
export const userLogout = createAsyncThunk<boolean>(
   'auth/userLogout',
   async ( _, { dispatch, rejectWithValue } ) => {
      try {
         dispatch( toggleLoader() )
         const res = await logoutRequest()
         if ( res?.success ) {
            console.log( res.message )
            deleteCookie( 'token' )
            deleteCookie( 'refreshToken' )
            return res.success
         }
         throw res
      } catch ( err: any ) {
         console.log( 'Ошибка userLogout: ' + err.message )
         return rejectWithValue( err.message )
      } finally {
         dispatch( toggleLoader() )
      }
   }
)

// вход пользователя
export const userLogin = createAsyncThunk<IResponseRegister, ILoginForm>(
   'auth/userLogin',
   async ( value, { dispatch, rejectWithValue } ) => {
      try {
         dispatch( toggleLoader() )
         const res = await loginRequest( value )
         if ( res?.success ) {
            const authToken = res.accessToken.split( 'Bearer ' )[1]
            setCookie( 'token', authToken )
            setCookie( 'refreshToken', res.refreshToken )
            return res
         }
         throw res
      } catch ( err: any ) {
         console.log( 'Ошибка userLogin: ' + err.message, value )

         if ( err.message === 'jwt expired' ) {
            const newToken = await getRefreshTokenRequest()
            await authRequest( newToken )
         }
         return rejectWithValue( err.message )
      } finally {
         dispatch( toggleLoader() )
      }
   }
)

// регистрация пользователя
export const userRegister = createAsyncThunk<IResponseRegister, IUser>(
   'auth/userRegister',
   async ( value, { dispatch, rejectWithValue } ) => {
      try {
         dispatch( toggleLoader() )
         const res = await registerRequest( value )
         if ( res?.success ) return res
         throw res
      } catch ( err: any ) {
         console.log( 'Ошибка userRegister: ' + err.message )
         return rejectWithValue( err.message )
      } finally {
         dispatch( toggleLoader() )
      }
   }
)


const authSlice = createSlice( {
   name: 'auth',
   initialState: {
      user: null as null | TStoreUser,
      accessToken: '' as string,
      refreshToken: '' as string,
      authRequest: false as boolean,
      authFailed: false as boolean,
   },
   reducers: {},
   extraReducers: ( builder ) => {
      builder
         .addCase( getUser.pending, ( state ) => {
            state.authRequest = true
         } )
         .addCase( getUser.fulfilled, ( state, action ) => {
            state.user = action.payload
            state.authFailed = false
            state.authRequest = false
         } )
         .addCase( getUser.rejected, ( state ) => {
            state.user = null
            state.authRequest = false
            state.authFailed = true
         } )

      builder
         .addCase( userLogout.pending, ( state ) => {
            state.authRequest = true
         } )
         .addCase( userLogout.fulfilled, ( state ) => {
            state.user = null
            state.authRequest = false
            state.authFailed = false
         } )
         .addCase( userLogout.rejected, ( state ) => {
            state.authRequest = false
            state.authFailed = true
         } )

      builder
         .addCase( userLogin.pending, ( state ) => {
            state.authRequest = true
         } )
         .addCase( userLogin.fulfilled, ( state, action ) => {
            const { user, accessToken, refreshToken } = action.payload
            state.user = user
            state.accessToken = accessToken
            state.refreshToken = refreshToken
            state.authRequest = false
            state.authFailed = false
         } )
         .addCase( userLogin.rejected, ( state ) => {
            state.authRequest = false
            state.authFailed = true
         } )

      builder
         .addCase( patchUser.pending, ( state ) => {
            state.authRequest = true
         } )
         .addCase( patchUser.fulfilled, ( state, action ) => {
            state.user = action.payload
            state.authFailed = false
            state.authRequest = false
         } )
         .addCase( patchUser.rejected, ( state ) => {
            state.authRequest = false
            state.authFailed = true
         } )

      builder
         .addCase( userRegister.pending, ( state ) => {
            state.authRequest = true
         } )
         .addCase( userRegister.fulfilled, ( state, action ) => {
            const { accessToken, refreshToken, user } = action.payload
            state.authFailed = false
            state.authRequest = false
            state.accessToken = accessToken
            state.refreshToken = refreshToken
            state.user = user
         } )
         .addCase( userRegister.rejected, ( state ) => {
            state.authRequest = false
            state.authFailed = true
            state.accessToken = ''
            state.refreshToken = ''
            state.user = null
         } )
   }
} )


export default authSlice.reducer