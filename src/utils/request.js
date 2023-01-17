function checkResponse( res ) {
   if ( res.ok ) return res.json()
   return Promise.reject( `Ошибка ${ res.status }` )
}

export async function request( url, options ) {
   return await fetch( url, options ).then( checkResponse )
}