import { FC } from "react";
import s from "./FeedOrders.module.scss";
import FeedIngredient from "./FeedIngredient";


const FeedIngredients: FC = () => {
   return (
      <ul className={ s.item__images }>
         <li><FeedIngredient/></li>
         <li><FeedIngredient/></li>
         <li><FeedIngredient/></li>
      </ul>
   )
}


export default FeedIngredients;