import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../services/slices/authSlice";


function UseAuth() {
   const dispatch = useDispatch()
   const auth = useSelector( store => store.auth )
   const [ isUserLoaded, setUserLoaded ] = useState( false )

   async function init() {
      await dispatch( getUser() )
      setUserLoaded( true )
   }

   useEffect( () => {
      init()
   }, [] )


   return { auth, isUserLoaded }
}


export default UseAuth