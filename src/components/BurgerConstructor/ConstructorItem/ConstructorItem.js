import s from './ConstructorItem.module.scss'
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { dataPropTypes, modalPropTypes } from "utils/propTypes";
import PropTypes from "prop-types";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";
import Modal from "../../Modal/Modal";


ConstructorItem.propTypes = {
   ...modalPropTypes,
   data: dataPropTypes,
   type: PropTypes.string,
   className: PropTypes.string,
   isLocked: PropTypes.bool,
}


function ConstructorItem( props ) {
   const {
      data,
      isLocked = false,
      className = '',
      type,
      visible,
      closeModal,
      showModal,
   } = props


   return (
      <li className={ `${ s._ } ${ className }` } onClick={ showModal }>
         <div className={ s.icon }>
            { !type && <DragIcon type="primary"/> }
         </div>

         <ConstructorElement
            type={ type }
            isLocked={ isLocked }
            text={ data.name }
            price={ data.price }
            thumbnail={ data.image }
         />

         { visible &&
            <Modal onClose={ closeModal } header={'Детали ингредиента'}>
               <IngredientDetails data={ data }/>
            </Modal> }
      </li>
   )
}


export default ConstructorItem