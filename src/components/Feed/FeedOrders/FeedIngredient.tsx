import { FC } from "react";
import s from "./FeedOrders.module.scss";

const FeedIngredient: FC = (  ) => {
   return (
      <div className={ s.item__image }>
         <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt=""/>
      </div>
   )
}

export default FeedIngredient;