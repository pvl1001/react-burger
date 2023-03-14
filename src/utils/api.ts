import { getCookie, setCookie } from "./setCookie";
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

const headerWithAuthorization = {
   'Content-Type': 'application/json',
   Authorization: 'Bearer ' + getCookie( 'token' )
}

export const authRequest = async ( newToken?: string ): Promise<IResponseUser> => {
   if ( newToken || getCookie( 'token' ) ) {
      const res = await fetch( `${ NORMA_API }/auth/user`, {
         method: 'GET',
         mode: 'cors',
         cache: 'no-cache',
         credentials: 'same-origin',
         headers: headerWithAuthorization,
         redirect: 'follow',
         referrerPolicy: 'no-referrer',
      } )
      return await checkResponse( res )
   }
   throw { message: 'Отсутствует JWT - необходимо авторизоваться' }
}


export const getRefreshTokenRequest = async (): Promise<string> => {
   if ( getCookie( 'refreshToken' ) ) {
      const res = await request( `${ NORMA_API }/auth/token`, {
         method: 'POST',
         mode: 'cors',
         cache: 'no-cache',
         credentials: 'same-origin',
         headers: { 'Content-Type': 'application/json', },
         redirect: 'follow',
         referrerPolicy: 'no-referrer',
         body: JSON.stringify( { token: getCookie( 'refreshToken' ) } )
      } )
      if ( res.success ) {
         const authToken = res.accessToken.split( 'Bearer ' )[1]
         setCookie( 'token', authToken )
         setCookie( 'refreshToken', res.refreshToken )
         console.log( 'Token refresh' )
         return authToken
      }
      throw res
   }
   throw { message: 'Отсутствует refreshToken - необходимо авторизоваться' }
}


export const patchUserRequest = async ( data: IUser ): Promise<IResponseUser> => {
   return await request( `${ NORMA_API }/auth/user`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: headerWithAuthorization,
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
      headers: headerWithAuthorization,
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
      headers: headerWithAuthorization,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify( data )
   } )
}

export const orderIdRequest = async ( data: { ingredients: string[] } ): Promise<TOrderIdRequest> => {
   return await request( `${ NORMA_API }/orders`, {
      method: 'POST',
      headers: headerWithAuthorization,
      body: JSON.stringify( data )
   } )
}
