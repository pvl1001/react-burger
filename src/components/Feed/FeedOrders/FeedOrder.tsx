import s from "./FeedOrders.module.scss";
import FeedIngredients from "./FeedIngredients";
import Price from "../../Price/Price";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TOrder } from "../../../utils/types";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import Status from "../../Status/Status";
import useTotalPrice from "../../../hooks/useTotalPrice";


type TProps = {
   order: TOrder
   hasStatus?: boolean
}


const FeedOrder: FC<TProps> = ( { order, hasStatus } ) => {
   const navigate = useNavigate()
   const location = useLocation()
   const { totalPrice } = useTotalPrice( order.ingredients )

   function onClick() {
      navigate( order._id, { state: { background: location } } )
   }


   return (
      <li className={ `${ s.item } p-6` } onClick={ onClick }>
         <div className={ s.item__row }>
            <span className="text text_type_digits-default">#{ order.number }</span>
            <span className="text text_type_main-default text_color_inactive">
               <FormattedDate date={ new Date( order.updatedAt ) }/></span>
         </div>

         <div>
            <p className="text text_type_main-medium">
               { order.name }
            </p>

            { hasStatus &&
               <Status status={ order.status }/>
            }
         </div>

         <div className={ s.item__row }>
            <FeedIngredients ingredients={ order.ingredients }/>
            <Price>{ totalPrice }</Price>
         </div>
      </li>
   )
}


export default FeedOrder;