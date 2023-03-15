import s from './FeedIdPage.module.scss';
import FeedIngredient from "../../components/Feed/FeedOrders/FeedIngredient";
import Price from "../../components/Price/Price";
// import { useParams } from "react-router-dom";


function OrderIdPage() {
   // const { id } = useParams()

   return (
      <div className={ s._ }>
         <p className={ s.order_number + ' text text_type_digits-default mb-10' }>
            #034533
         </p>

         <p className={ 'text text_type_main-medium mb-3' }>
            Black Hole Singularity острый бургер
         </p>

         <p className={ s.order_status + ' text text_type_main-default mb-15' }>
            Выполнен
         </p>

         <p className={ 'text text_type_main-medium mb-6' }>
            Состав:
         </p>

         <ul className={ s.order_list + ' scrollbar pr-6 mb-10' }>
            { Array( 10 ).fill( {} ).map( ( el, i ) =>
               <li key={ i } className={ s.ingredient }>
                  <FeedIngredient/>
                  <p className={ s.ingredient__name + ' text text_type_main-default' }>Флюоресцентная булка R2-D3</p>
                  <Price>2 x 100</Price>
               </li>
            ) }
         </ul>

         <div className={ s.order_total }>
            <p className={ 'text text_type_main-default text_color_inactive' }>Date</p>
            <Price>510</Price>
         </div>

      </div>
   )
}


export default OrderIdPage;