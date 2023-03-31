import { FC, useEffect } from "react";
import s from './FeedPage.module.scss'
import FeedOrders from "../../components/Feed/FeedOrders/FeedOrders";
import FeedDesk from "../../components/Feed/FeedDesk/FeedDesk";
import { useAppDispatch } from "../../services/store";
import { WS_NORMA_API } from "../../utils/api";
import { wsFeedConnection, wsFeedOffline } from "../../services/slices/ws/wsFeedSlice";


const FeedPage: FC = () => {
   const dispatch = useAppDispatch()

   useEffect( () => {
      dispatch( wsFeedConnection( `${ WS_NORMA_API }/orders/all` ) )
      return () => {
         dispatch( wsFeedOffline() )
      }
   }, [] )


   return (
      <div className={ s._ }>

         <h1 className="text text_type_main-large mb-5">
            Лента заказов
         </h1>

         <div className={ s.row }>
            <FeedOrders/>
            <FeedDesk/>
         </div>
      </div>
   )
}


export default FeedPage