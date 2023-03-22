import { getCookie } from "./setCookie";
import { checkResponse, request } from "./request";
import {
   IResponseUser,
   IResponseAuth,
   ILoginForm,
   TRequestLogin,
   IResetForm,
   IEmailForm, IUser, IResponseRegister, TOrderIdRequest,
} from "./types";

export const NORMA_API = 'https://norma.nomoreparties.space/api'
export const WS_NORMA_API = 'wss://norma.nomoreparties.space'


export const authRequest = async ( newToken?: string ): Promise<IResponseUser> => {
   const token = newToken || getCookie( 'token' )

   if ( token ) {
      const res = await fetch( `${ NORMA_API }/auth/user`, {
         method: 'GET',
         mode: 'cors',
         cache: 'no-cache',
         credentials: 'same-origin',
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
         },
         redirect: 'follow',
         referrerPolicy: 'no-referrer',
      } )
      return await checkResponse( res )
   }
   throw { message: 'Отсутствует JWT - необходимо авторизоваться' }
}


export const getRefreshTokenRequest = async (): Promise<any> => {
   if ( getCookie( 'refreshToken' ) ) {
      try {
         return await request( `${ NORMA_API }/auth/token`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json', },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify( { token: getCookie( 'refreshToken' ) } )
         } )
      } catch ( err ) {
         return err
      }
   }
   throw { message: 'Отсутствует refreshToken - необходимо авторизоваться' }
}


export const patchUserRequest = async ( data: IUser ): Promise<IResponseUser> => {
   return await request( `${ NORMA_API }/auth/user`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + getCookie( 'token' )
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify( data )
   } )
}


export const logoutRequest = async (): Promise<IResponseAuth> => {
   if ( getCookie( 'refreshToken' ) ) {
      return await request( `${ NORMA_API }/auth/logout`, {
         method: 'POST',
         mode: 'cors',
         cache: 'no-cache',
         credentials: 'same-origin',
         headers: { 'Content-Type': 'application/json', },
         redirect: 'follow',
         referrerPolicy: 'no-referrer',
         body: JSON.stringify( { token: getCookie( 'refreshToken' ) } )
      } )
   }
   throw { message: `refreshToken: ${ getCookie( 'refreshToken' ) }` }
}


export const loginRequest = async ( data: ILoginForm ): Promise<TRequestLogin> => {
   return await request( `${ NORMA_API }/auth/login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify( data )
   } )
}


export const registerRequest = async ( data: IUser ): Promise<IResponseRegister> => {
   return await request( `${ NORMA_API }/auth/register`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify( data )
   } )
}


export const resetPasswordRequest = async ( data: IResetForm ): Promise<IResponseAuth> => {
   return await request( `${ NORMA_API }/password-reset/reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + getCookie( 'token' )
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify( data )
   } )
}


export const forgotPasswordRequest = async ( data: IEmailForm ): Promise<IResponseAuth> => {
   return await request( `${ NORMA_API }/password-reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + getCookie( 'token' )
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify( data )
   } )
}

export const orderIdRequest = async ( data: { ingredients: string[] } ): Promise<TOrderIdRequest> => {
   return await request( `${ NORMA_API }/orders`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + getCookie( 'token' )
      },
      body: JSON.stringify( data )
   } )
}
