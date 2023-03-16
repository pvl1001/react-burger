import { FC, useEffect } from "react";
import s from './ProfileOrders.module.scss';
import FeedOrder from "../../Feed/FeedOrders/FeedOrder";
import { useAppDispatch } from "../../../services/store";
import { getCookie } from "../../../utils/setCookie";
import { wsConnection, wsOffline } from "../../../services/slices/wsSlice";
import { WS_NORMA_API } from "../../../utils/api";


const ProfileOrders: FC = () => {
   const dispatch = useAppDispatch()

   useEffect( () => {
      const token = getCookie( 'token' )
      dispatch( wsConnection( `${ WS_NORMA_API }/orders?token=${ token }` ) )
      return () => {
         dispatch( wsOffline() )
      }
   }, [] )


   return (
      <ul className={ s._ + ' scrollbar' }>
         { Array( 10 ).fill( {} ).map( ( el, i ) =>
            <FeedOrder key={ i } status/>
         ) }
      </ul>
   )
}


export default ProfileOrders;