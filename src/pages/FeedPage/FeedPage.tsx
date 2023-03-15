import { FC } from "react";
import s from './FeedPage.module.scss'
import FeedOrders from "../../components/Feed/FeedOrders/FeedOrders";
import FeedDesk from "../../components/Feed/FeedDesk/FeedDesk";


const FeedPage: FC = () => {
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