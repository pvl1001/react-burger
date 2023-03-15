import { FC } from "react";
import s from './ProfileOrders.module.scss';
import FeedOrder from "../../Feed/FeedOrders/FeedOrder";


const ProfileOrders: FC = () => {
   return (
      <ul className={ s._ + ' scrollbar' }>
         { Array( 10 ).fill( {} ).map( ( el, i ) =>
            <FeedOrder key={ i } status/>
         ) }
      </ul>
   )
}


export default ProfileOrders;