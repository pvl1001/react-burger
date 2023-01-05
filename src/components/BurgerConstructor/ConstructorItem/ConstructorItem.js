import s from './ConstructorItem.module.scss'
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { dataPropTypes } from "utils/propTypes";
import PropTypes from "prop-types";


ConstructorItem.propTypes = {
   data: dataPropTypes.isRequired,
   type: PropTypes.string,
   className: PropTypes.string,
}


function ConstructorItem( { data, type, isLocked = false, className = '' } ) {

   return (
      <li className={ `${ s._ } ${ className }` }>
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
      </li>
   )
}


export default ConstructorItem