import s from "./BurgerConstructor.module.scss"
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import PropTypes from "prop-types";
import { NORMA_API } from "../../utils/burger-api";
import { useState } from "react";
import { request } from "../../utils/request";
import useModal from "../../hooks/useModal";


ConstructorOrder.propTypes = {
   ingredientsId: PropTypes.arrayOf( PropTypes.string ),
   totalPrice: PropTypes.number.isRequired
}


function ConstructorOrder( { totalPrice, ingredientsId } ) {
   const [ orderId, setOrderId ] = useState( 0 )
   const { closeModal, showModal, visible } = useModal()


   async function showModalHandler( e ) {
      await getOrderId()
      showModal( e )
   }

   async function getOrderId() {
      try {
         const { order, success } = await request( `${ NORMA_API }/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { ingredients: ingredientsId } )
         } )
         if ( success ) setOrderId( order.number )
      } catch ( err ) {
         alert( 'Ошибка запроса заявки' )
         console.log( err )
      }
   }


   return (
      <div className={ s.order + ' mt-10 pr-4' }>
         <p className={ s.price + ' text text_type_digits-medium mr-10' }>
            { totalPrice } <CurrencyIcon type="primary"/>
         </p>

         <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={ showModalHandler }
         >
            Оформить заказ
         </Button>

         { visible &&
            <Modal onClose={ closeModal }>
               <OrderDetails orderId={ orderId }/>
            </Modal>
         }
      </div>
   )
}


export default ConstructorOrder