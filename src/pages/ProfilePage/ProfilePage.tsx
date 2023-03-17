import s from './ProfilePage.module.scss'
import ProfileNav from "../../components/Profile/ProfileNav/ProfileNav";
import { Outlet } from "react-router-dom";
import { FC, useEffect } from "react";
import { useAppDispatch } from "../../services/store";
import { getCookie } from "../../utils/setCookie";
import { wsConnection, wsOffline } from "../../services/slices/wsSlice";
import { WS_NORMA_API } from "../../utils/api";


const ProfilePage: FC = () => {
   const dispatch = useAppDispatch()

   useEffect( () => {
      const token = getCookie( 'token' )
      dispatch( wsConnection( `${ WS_NORMA_API }/orders?token=${ token }` ) )
      return () => {
         dispatch( wsOffline() )
      }
   }, [] )


   return (
      <div className={ s._ }>
         <ProfileNav/>
         <Outlet/>
      </div>
   )
}


export default ProfilePage