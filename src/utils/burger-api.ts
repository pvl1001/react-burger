import { getCookie, setCookie } from "./setCookie";
import { checkResponse, request } from "./request";
import { IUserForm, IResponseUser, IResponseAuth, ILoginForm, TRequestLogin, IResetForm, IEmailForm } from "./types";

export const NORMA_API = 'https://norma.nomoreparties.space/api'

const token = getCookie( 'token' )
const refreshToken = getCookie( 'refreshToken' )


export const authRequest = async ( newToken?: string ): Promise<IResponseUser | void> => {
   try {
      if ( newToken || token ) {
         const res = await fetch( `${ NORMA_API }/auth/user`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${ newToken || token }`,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
         } )
         return await checkResponse( res )
      }
      throw { message: 'Отсутствует JWT - необходимо авторизоваться' }
   } catch ( error: any ) {
      console.log( `Ошибка запроса ${ error.status || '' }: ${ error.message }` )

      if ( error.status === 403 ) {
         const newToken = await getRefreshTokenRequest()
         await authRequest( newToken )
      }
   }
}


export const getRefreshTokenRequest = async (): Promise<string> => {
   if ( refreshToken ) {
      const res = await request( `${ NORMA_API }/auth/token`, {
         method: 'POST',
         mode: 'cors',
         cache: 'no-cache',
         credentials: 'same-origin',
         headers: { 'Content-Type': 'application/json', },
         redirect: 'follow',
         referrerPolicy: 'no-referrer',
         body: JSON.stringify( { token: refreshToken } )
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
   throw { message: 'Отсутствует JWT - необходимо авторизоваться' }
}


export const patchUserRequest = async ( data: IUserForm ): Promise<IResponseUser> => {
   return await request( `${ NORMA_API }/auth/user`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify( data )
   } )
}


export const logoutRequest = async (): Promise<IResponseAuth> => {
   if ( refreshToken ) {
      return await request( `${ NORMA_API }/auth/logout`, {
         method: 'POST',
         mode: 'cors',
         cache: 'no-cache',
         credentials: 'same-origin',
         headers: { 'Content-Type': 'application/json', },
         redirect: 'follow',
         referrerPolicy: 'no-referrer',
         body: JSON.stringify( { token: refreshToken } )
      } )
   }
   throw { message: `refreshToken: ${ refreshToken }` }
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


export const registerRequest = async ( data: IUserForm ): Promise<IResponseAuth> => {
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
         Authorization: 'Bearer ' + token
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
         Authorization: 'Bearer ' + token
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify( data )
   } )
}
