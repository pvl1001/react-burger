import { FC } from "react";
import s from './ProfileOrders.module.scss';
import FeedOrder from "../../Feed/FeedOrders/FeedOrder";
import { useAppSelector } from "../../../services/store";


const ProfileOrders: FC = () => {
   const orders = useAppSelector( store => store.webSocket.data?.orders )



   return (
      <ul className={ s._ + ' scrollbar' }>
         { orders?.map( ( order ) =>
            <FeedOrder key={ order._id } order={ order } hasStatus/>
         ) }
      </ul>
   )
}


export default ProfileOrders;