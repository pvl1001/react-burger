import { FC } from 'react';
import s from './FeedOrders.module.scss';
import FeedIngredients from "./FeedIngredients";
import Price from "../../Price/Price";


const FeedOrders: FC = () => {
   return (
      <ul className={ s._ + ' scrollbar pr-2' }>
         { Array( 12 ).fill( {} ).map( ( el, i ) =>
            <li key={ i } className={ `${ s.item } p-6` }>
               <div className={ s.item__row }>
                  <span className="text text_type_digits-default">1234567890</span>
                  <span className="text text_type_main-default text_color_inactive">date</span>
               </div>

               <p className="text text_type_main-medium">
                  Death Star Starship Main бургер
               </p>

               <div className={ s.item__row }>
                  <FeedIngredients/>
                  <Price>0</Price>
               </div>
            </li>
         ) }
      </ul>
   )
}


export default FeedOrders;