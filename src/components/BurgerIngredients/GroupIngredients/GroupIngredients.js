import s from './GroupIngredients.module.scss'
import CardIngredients from "../CardIngredients/CardIngredients";
import { dataPropTypes } from "../../../utils/propTypes";
import PropTypes from "prop-types";
import withModal from "../../_hocs/withModal";


GroupIngredients.propTypes = {
   data: PropTypes.arrayOf( dataPropTypes ),
   group: PropTypes.shape( {
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
   } )
}


const WithModalCardIngredients = withModal( CardIngredients )

function GroupIngredients( { group, data } ) {
   return (
      <li id={ group.value }>
         <h2 className="text text_type_main-medium">{ group.name }</h2>

         <ul className={ s.list + " pt-6 pb-10 pl-4 pr-4" }>
            { data.map( card =>
               <WithModalCardIngredients key={ card._id } data={ card }/>
            ) }
         </ul>
      </li>
   )
}


export default GroupIngredients