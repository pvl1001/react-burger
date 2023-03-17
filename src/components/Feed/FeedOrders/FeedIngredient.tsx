import { FC } from "react";
import s from "./FeedOrders.module.scss";

type TProps = {
   image: string,
   count?: number
}

const FeedIngredient: FC<TProps> = ( { image, count } ) => {
   return (
      <div className={ s.item__image }>
         <img src={ image } alt="ingredient"/>
         { count && <span className={ s.item__count + " text text_type_main-default" }>
            +{ count }
         </span> }
      </div>
   )
}

export default FeedIngredient;