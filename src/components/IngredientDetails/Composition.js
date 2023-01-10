import s from './IngredientDetails.module.scss'
import PropTypes from "prop-types";


Composition.propTypes = {
   data: PropTypes.object.isRequired
}


function Composition( { data } ) {
   return (
      <li className={ s.composition_item + ' text text_color_inactive' }>
         <p className={ 'text_type_main-default mb-2' }>{ Object.keys( data )[0] }</p>
         <p className={ 'text_type_digits-default' }>{ Object.values( data )[0] }</p>
      </li>
   )
}


export default Composition