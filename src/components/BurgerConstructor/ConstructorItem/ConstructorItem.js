import s from './ConstructorItem.module.scss'
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { dataPropTypes } from "utils/propTypes";
import PropTypes from "prop-types";


ConstructorItem.propTypes = {
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
   } = props
   const bunPosition = type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : ''


   return (
      <li className={ `${ s._ } ${ className }` }>
         <div className={ s.icon }>
            { !type && <DragIcon type="primary"/> }
         </div>

         <ConstructorElement
            type={ type }
            isLocked={ isLocked }
            text={ data.name + bunPosition }
            price={ data.price }
            thumbnail={ data.image }
         />

      </li>
   )
}


export default ConstructorItem