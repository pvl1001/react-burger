import { FC } from "react";
import s from "./FeedOrders.module.scss";
import FeedIngredient from "./FeedIngredient";
import { useAppSelector } from "../../../services/store";
import { IIngredient } from "../../../utils/types";


const FeedIngredients: FC<{ ingredients: string[] }> = ( { ingredients } ) => {
   const burgerIngredients: IIngredient[] = useAppSelector( store => store.burgerIngredients.ingredients )
   const ingredientsFiltered: IIngredient[] = burgerIngredients.filter( el => ingredients.includes( el._id ) )
   const otherList = [ ...ingredientsFiltered ].reverse()
   let startList: IIngredient[] = []

   if ( otherList.length > 5 ) {
      startList = otherList.splice( 1, 5 )
   }

   return (
      <ul className={ s.item__images }>
         { !!startList.length &&
            <li key={ startList.length + 1 }>
               <FeedIngredient image={ otherList[0].image } count={ otherList.length }/>
            </li>
         }

         { (startList.length ? startList : otherList).map( ( ingredient, i ) =>
            <li key={ i }>
               <FeedIngredient image={ ingredient.image }/>
            </li>
         ) }
      </ul>
   )
}


export default FeedIngredients;