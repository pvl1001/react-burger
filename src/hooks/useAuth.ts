import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../services/store";
import { getUser } from "../services/slices/authSlice";
import { getCookie } from "../utils/setCookie";


function UseAuth() {
   const dispatch = useAppDispatch()
   const auth = useAppSelector( store => store.auth )
   const [ isUserLoaded, setUserLoaded ] = useState( false )

   async function init() {
      if ( getCookie( 'token' ) && !auth.user ) await dispatch( getUser() )
      setUserLoaded( true )
   }

   useEffect( () => {
      init()
   }, [] )


   return { auth, isUserLoaded }
}


export default UseAuth