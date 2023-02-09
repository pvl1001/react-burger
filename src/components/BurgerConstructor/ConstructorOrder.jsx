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
   const { idRequest, user } = useSelector( store => ({
      idRequest: store.order.idRequest,
      user: store.auth.user,
   }) )
   const { closeModal, showModal, visible } = useModal()


   async function showModalHandler( e ) {
      await dispatch( getOrderId( ingredientsId ) )
      showModal( e )
   }

   function closeModalHandler( e ) {
      dispatch( clearConstructor() )
      closeModal( e )
   }


   return (
      <>
         { !user && <p className={ `${ s.description } text text_type_main-default text_color_inactive` }>
            Для оформления заказа необходимо авторизоваться</p> }

         <div className={ s.order + ' mt-10 pr-4' }>
            <p className={ `${ s.price } ${ !user ? 'text_color_inactive' : '' } text text_type_digits-medium mr-10` }>
               { totalPrice } <CurrencyIcon type={ !user ? 'secondary' : 'primary' }/>
            </p>

            <Button
               htmlType="button"
               type="primary"
               size="large"
               disabled={ !ingredientsId.length || idRequest || !user }
               onClick={ showModalHandler }
            >
               Оформить заказ
            </Button>
         </div>


         { visible &&
            <Modal onClose={ closeModalHandler }>
               <OrderDetails/>
            </Modal>
         }
      </>
   )
}


export default ConstructorOrder