import s from './GroupIngredients.module.scss'
import CardIngredients from "../CardIngredients/CardIngredients";
import { dataPropTypes } from "../../../utils/propTypes";
import PropTypes from "prop-types";


GroupIngredients.propTypes = {
   data: PropTypes.arrayOf( dataPropTypes ),
   group: PropTypes.shape( {
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
   } ),
   itemRef: PropTypes.oneOfType( [
      PropTypes.func,
      PropTypes.shape( { current: PropTypes.instanceOf( Element ) } )
   ] )
}


function GroupIngredients( { group, data, itemRef } ) {
   return (
      <li ref={ itemRef }>
         <h2 className="text text_type_main-medium">{ group.name }</h2>

         <ul className={ s.list + " pt-6 pb-10 pl-4 pr-4" }>
            { data.map( card =>
               <CardIngredients key={ card._id } data={ card }/>
            ) }
         </ul>
      </li>
   )
}


export default GroupIngredients