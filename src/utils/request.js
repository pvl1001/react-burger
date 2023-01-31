export async function request( url, options ) {
   try {
      const res = await fetch( url, options )
      if ( res.ok ) return await res.json()
      throw res
   } catch ( err ) {
      console.log( 'Ошибка запроса: ' + err.status )
   }
}