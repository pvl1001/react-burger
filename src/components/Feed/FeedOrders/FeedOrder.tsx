import s from "./FeedOrders.module.scss";
import FeedIngredients from "./FeedIngredients";
import Price from "../../Price/Price";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";


type TProps = {
   status?: boolean
}


const FeedOrder: FC<TProps> = ( { status } ) => {
   const navigate = useNavigate()
   const location = useLocation()

   function onClick() {
      navigate( `1`, { state: { background: location } } )
   }


   return (
      <li className={ `${ s.item } p-6` } onClick={ onClick }>
         <div className={ s.item__row }>
            <span className="text text_type_digits-default">1234567890</span>
            <span className="text text_type_main-default text_color_inactive">date</span>
         </div>

         <div>
            <p className="text text_type_main-medium">
               Death Star Starship Main бургер
            </p>

            { status &&
               <p className="text text_type_main-default mt-2">
                  Создан
               </p>
            }
         </div>

         <div className={ s.item__row }>
            <FeedIngredients/>
            <Price>0</Price>
         </div>
      </li>
   )
}


export default FeedOrder;