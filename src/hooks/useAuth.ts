import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../services/store";
import { getUser } from "../services/slices/authSlice";
import { getCookie } from "../utils/setCookie";


function UseAuth() {
   const dispatch = useDispatch<AppDispatch>()
   const auth = useSelector( ( store: RootState ) => store.auth )
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