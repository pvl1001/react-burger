import s from './ConstructorItem.module.scss'
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { dataPropTypes } from "utils/propTypes";


ConstructorItem.propTypes = {
   data: dataPropTypes.isRequired,
   index: PropTypes.number.isRequired,
   listLength: PropTypes.number.isRequired,
}


function ConstructorItem( { data, index, listLength } ) {
   const type = index === 0 ? 'top' : index === listLength - 1 ? 'bottom' : undefined

   return (
      <li className={ s._ }>
         <div className={ s.icon }>
            { !type && <DragIcon type="primary"/> }
         </div>

         <ConstructorElement
            type={ type }
            isLocked={ true }
            text={ data.name }
            price={ data.price }
            thumbnail={ data.image }
         />
      </li>
   )
}


export default ConstructorItem