import { FC } from 'react';
import s from './FeedOrders.module.scss';
import FeedOrder from "./FeedOrder";
import { useAppSelector } from "../../../services/store";
import { TOrder } from "../../../utils/types";


const FeedOrders: FC = () => {
   const orders: TOrder[] | undefined = useAppSelector( store => store.webSocketFeed.data?.orders )

   if ( !orders ) return <p>Загрузка...</p>
   return (
      <ul className={ s._ + ' scrollbar pr-2' }>
         { orders.map( order =>
            <FeedOrder key={ order._id } order={ order }/>
         ) }
      </ul>
   )
}


export default FeedOrders;