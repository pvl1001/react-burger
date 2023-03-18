import { FC, useEffect } from "react";
import s from './ProfileOrders.module.scss';
import FeedOrder from "../../Feed/FeedOrders/FeedOrder";
import { useAppDispatch, useAppSelector } from "../../../services/store";
import { getCookie } from "../../../utils/setCookie";
import { wsProfileConnection, wsProfileOffline } from "../../../services/slices/wsProfileSlice";
import { WS_NORMA_API } from "../../../utils/api";


const ProfileOrders: FC = () => {
   const dispatch = useAppDispatch()
   const orders = useAppSelector( store => store.webSocketProfile.data?.orders )

   useEffect( () => {
      const token = getCookie( 'token' )
      dispatch( wsProfileConnection( `${ WS_NORMA_API }/orders?token=${ token }` ) )

      return () => {
         dispatch( wsProfileOffline() )
      }
   }, [] )


   return (
      <ul className={ s._ + ' scrollbar' }>
         { orders?.map( ( order ) =>
            <FeedOrder key={ order._id } order={ order } hasStatus/>
         ) }
      </ul>
   )
}


export default ProfileOrders;