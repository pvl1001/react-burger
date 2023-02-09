import s from './IngredientDetails.module.scss'
import PropTypes from "prop-types";


Composition.propTypes = {
   name: PropTypes.string.isRequired,
   value: PropTypes.number.isRequired,
}


function Composition( { name, value } ) {
   return (
      <li className={ s.composition_item + ' text text_color_inactive' }>
         <p className={ 'text_type_main-default mb-2' }>{ name }</p>
         <p className={ 'text_type_digits-default' }>{ value }</p>
      </li>
   )
}


export default Composition