import { FC } from "react";
import s from "./FeedOrders.module.scss";


const FeedIngredients: FC = () => {
   return (
      <ul className={ s.item__images }>
         <li className={ s.item__image }>
            <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt=""/>
         </li>
         <li className={ s.item__image }>
            <img src="https://code.s3.yandex.net/react/code/bun-01.png" alt=""/>
         </li>
      </ul>
   )
}


export default FeedIngredients;