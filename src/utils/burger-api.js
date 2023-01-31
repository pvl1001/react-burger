import { getCookie, setCookie } from "./setCookie";
import { request } from "./request";

export const NORMA_API = 'https://norma.nomoreparties.space/api'


export async function authRequest( refreshToken ) {
   try {
      const res = await fetch( `${ NORMA_API }/auth/user`, {
         method: 'GET',
         mode: 'cors',
         cache: 'no-cache',
         credentials: 'same-origin',
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ refreshToken || getCookie( 'token' ) }`,
         },
         redirect: 'follow',
         referrerPolicy: 'no-referrer',
      } )
      if ( res.ok ) return await res.json()
      throw res
   } catch ( err ) {
      console.log( 'Ошибка авторизации: ' + err.status )
      if ( err?.status === 403 ) {
         const authToken = await getRefreshTokenRequest()
         return authRequest( authToken )
      }
   }
}


export async function getRefreshTokenRequest() {
   const res = await request( `${ NORMA_API }/auth/token`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify( {
         token: localStorage.getItem( 'refreshToken' )
      } )
   } )

   const authToken = res.accessToken.split( 'Bearer ' )[1]
   setCookie( 'token', authToken )
   localStorage.setItem( 'refreshToken', res.refreshToken )
   console.log( 'Token refresh' )
   return authToken
}


export async function patchUserRequest( data ) {
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


export async function logoutRequest() {
   return await request( `${ NORMA_API }/auth/logout`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify( {
         token: localStorage.getItem( 'refreshToken' )
      } )
   } )
}


export async function loginRequest( data ) {
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


export async function registerRequest( data ) {
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


export async function resetPasswordRequest( data ) {
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


export async function forgotPasswordRequest( data ) {
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
