import s from './GroupIngredients.module.scss'
import CardIngredients from "../CardIngredients/CardIngredients";


function GroupIngredients( { group, data } ) {
   return (
      <li id={ group.value }>
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