import s from "./BurgerConstructor.module.scss"
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import PropTypes from "prop-types";
import useModal from "../../hooks/useModal";
import { getOrderId } from "../../services/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearConstructor } from "../../services/slices/burgerConstructorSlice";


ConstructorOrder.propTypes = {
   ingredientsId: PropTypes.arrayOf( PropTypes.string ),
   totalPrice: PropTypes.number.isRequired
}


function ConstructorOrder( { totalPrice, ingredientsId } ) {
   const dispatch = useDispatch()
   const idRequest = useSelector( store => store.order.idRequest )
   const { closeModal, showModal, visible } = useModal()


   async function showModalHandler( e ) {
      await dispatch( getOrderId( ingredientsId ) )
      dispatch( clearConstructor() )
      showModal( e )
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
            disabled={ !ingredientsId.length || idRequest }
            onClick={ showModalHandler }
         >
            Оформить заказ
         </Button>

         { visible &&
            <Modal onClose={ closeModal }>
               <OrderDetails/>
            </Modal>
         }
      </div>
   )
}


export default ConstructorOrder