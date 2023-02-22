export async function checkResponse( res: Response ) {
   if ( res.ok ) return await res.json()
   const resError = await res.json()
   throw { ...resError, status: res.status }
}

export async function request( url: string, options: any ) {
   try {
      const res = await fetch( url, options )
      return await checkResponse( res )
   } catch ( err: any ) {
      console.log( `Ошибка ${ err.status }: ${ err.message }` )
   }
}