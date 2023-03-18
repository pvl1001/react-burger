import s from './FeedIdPage.module.scss';
import Price from "../../components/Price/Price";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store";
import FeedIngredient from "../../components/Feed/FeedOrders/FeedIngredient";
import Status from "../../components/Status/Status";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import useTotalPrice from "../../hooks/useTotalPrice";
import { useEffect } from "react";
import { getCookie } from "../../utils/setCookie";
import { wsProfileConnection, wsProfileOffline } from "../../services/slices/wsProfileSlice";
import { WS_NORMA_API } from "../../utils/api";
import routes from "../../utils/routes";
import { RootState } from "../../services/types";
import { wsFeedConnection, wsFeedOffline } from "../../services/slices/wsFeedSlice";


function OrderIdPage( { path }: { path: string } ) {
   const { id } = useParams()
   const dispatch = useAppDispatch()

   // Получаем данные в зависимости от url страницы
   const getData = ( store?: RootState ) => path === routes.ordersId ? {
      orders: store?.webSocketProfile.data?.orders,
      connect: () => dispatch( wsProfileConnection( `${ WS_NORMA_API }/orders?token=${ getCookie( 'token' ) }` ) ),
      disconnect: () => dispatch( wsProfileOffline() )
   } : {
      orders: store?.webSocketFeed.data?.orders,
      connect: () => dispatch( wsFeedConnection( `${ WS_NORMA_API }/orders/all` ) ),
      disconnect: () => dispatch( wsFeedOffline() )
   }

   const { orders, burgerIngredients } = useAppSelector( store => ({
      orders: getData( store ).orders,
      burgerIngredients: store.burgerIngredients,
   }) )
   const order = orders?.find( order => order._id === id )
   const { totalPrice } = useTotalPrice( order?.ingredients )

   useEffect( () => {
      if ( !orders?.length ) {
         getData().connect()
         return () => {
            getData().disconnect()
         }
      }
   }, [] )


   if ( !order ) return null
   return (
      <div className={ s._ }>
         <p className={ s.order_number + ' text text_type_digits-default mb-10' }>
            #{ order.number }
         </p>

         <p className={ 'text text_type_main-medium mb-3' }>
            { order.name }
         </p>

         <p className={ s.order_status + ' text text_type_main-default mb-15' }>
            <Status status={ order.status }/>
         </p>

         <p className={ 'text text_type_main-medium mb-6' }>
            Состав:
         </p>

         <ul className={ s.order_list + ' scrollbar pr-6 mb-10' }>
            { [ ...new Set( order.ingredients ) ].map( ( ingredientId, i ) => {
                  const currentIngredient = burgerIngredients.ingredients.find( el => el._id === ingredientId )
                  const count = order.ingredients.filter( el => el === ingredientId ).length

                  return <li key={ i } className={ s.ingredient }>
                     { currentIngredient &&
                        <>
                           <FeedIngredient image={ currentIngredient.image }/>
                           <p className={ s.ingredient__name + ' text text_type_main-default' }>
                              { currentIngredient.name }</p>
                           <Price>{ count } x { currentIngredient.price }</Price>
                        </>
                     }
                  </li>
               }
            ) }
         </ul>

         <div className={ s.order_total }>
            <p className={ 'text text_type_main-default text_color_inactive' }>
               <FormattedDate date={ new Date( order.updatedAt ) }/>
            </p>
            <Price>{ totalPrice }</Price>
         </div>

      </div>
   )
}


export default OrderIdPage;