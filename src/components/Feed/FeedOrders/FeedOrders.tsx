import { FC } from 'react';
import s from './FeedOrders.module.scss';
import FeedOrder from "./FeedOrder";


const FeedOrders: FC = () => {
   return (
      <ul className={ s._ + ' scrollbar pr-2' }>
         { Array( 12 ).fill( {} ).map( ( el, i ) =>
            <FeedOrder key={ i }/>
         ) }
      </ul>
   )
}


export default FeedOrders;