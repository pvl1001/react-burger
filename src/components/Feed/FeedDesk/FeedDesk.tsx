import { FC } from 'react';
import s from './FeedDesk.module.scss';
import { useAppSelector } from "../../../services/store";
import { TOrder } from "../../../utils/types";


const FeedDesk: FC = () => {
   const wsData = useAppSelector( store => store.webSocketFeed.data )
   const doneList: TOrder[] | undefined = wsData?.orders.filter( order => order.status === 'done' )
   const inWorkList: TOrder[] | undefined = wsData?.orders.filter( order => order.status === 'pending' )


   if ( !wsData ) return null
   return (
      <div className={ s._ }>
         <div className={ s.row }>
            <div className={ s.status }>
               <h5 className="text text_type_main-medium mb-6">Готовы:</h5>
               <ul className={ `${ s.status_list } ${ s.done }` }>
                  { doneList?.map( order =>
                     <li key={ order._id } className="text text_type_digits-default">{ order.number }</li>
                  ) }
               </ul>
            </div>
            <div className={ s.status }>
               <h5 className="text text_type_main-medium mb-6">В работе:</h5>
               <ul className={ s.status_list }>
                  { inWorkList?.map( order =>
                     <li key={ order._id } className="text text_type_digits-default">{ order.number }</li>
                  ) }
               </ul>
            </div>
         </div>

         <div>
            <h5 className="text text_type_main-medium">
               Выполнено за все время:
            </h5>
            <p className="text text_type_digits-large">{ wsData.total }</p>
         </div>

         <div>
            <h5 className="text text_type_main-medium">
               Выполнено за сегодня:
            </h5>
            <p className="text text_type_digits-large">{ wsData.totalToday }</p>
         </div>
      </div>
   )
}


export default FeedDesk;