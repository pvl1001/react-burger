import s from './CardIngredients.module.scss'
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../Modal/Modal";
import { dataPropTypes } from "../../../utils/propTypes";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";
import useModal from "../../../hooks/useModal";


CardIngredients.propTypes = {
   data: dataPropTypes.isRequired,
}


function CardIngredients( { data, } ) {
   const { closeModal, showModal, visible } = useModal()

   return (
      <li className={ s._ } onClick={ showModal }>
         <Counter count={ 1 } size="default" extraClass="m-1"/>

         <picture className={ s.image_container }>
            <img className={ s.image } src={ data.image_large } alt="ингредиент"/>
         </picture>

         <p className={ s.price + ' text text_type_digits-default pt-1 pb-1' }>
            { data.price }<CurrencyIcon type="primary"/></p>

         <p className={ s.name + ' text text_type_main-small' }>{ data.name }</p>

         { visible &&
            <Modal
               header={ 'Детали ингредиента' }
               onClose={ closeModal }
            >
               <IngredientDetails data={ data }/>
            </Modal>
         }
      </li>
   )
}


export default CardIngredients