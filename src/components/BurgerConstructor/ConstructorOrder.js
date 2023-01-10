import s from "./BurgerConstructor.module.scss"
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import Modal from "../Modal/Modal";
import { modalPropTypes } from "../../utils/propTypes";
import OrderDetails from "../OrderDetails/OrderDetails";


ConstructorOrder.propTypes = modalPropTypes


function ConstructorOrder( { showModal, closeModal, visible } ) {
   return (
      <div className={ s.order + ' mt-10 pr-4' }>
         <p className={ s.price + ' text text_type_digits-medium mr-10' }>
            610 <CurrencyIcon type="primary"/>
         </p>

         <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={ showModal }
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