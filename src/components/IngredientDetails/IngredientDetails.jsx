import s from "./IngredientDetails.module.scss";
import Composition from "./Composition";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


IngredientDetails.propTypes = {
   className: PropTypes.string,
}


function IngredientDetails( { className = '' } ) {
   const { id } = useParams()
   const item = useSelector( store => store.burgerIngredients.ingredients.find( el => el._id === id ) )
   if ( !item ) return null

   const compositions = [
      { 'Калории, ккал': item.calories },
      { 'Белки, г': item.proteins },
      { 'Жиры, г': item.fat },
      { 'Углеводы, г': item.carbohydrates },
   ]


   return (
      <div className={ className }>
         <div className={ s.container + ' pl-15 pr-15' }>
            <picture className={ s.image_container + ' mb-4' }>
               <img className={ s.image } src={ item.image_large } alt="ингредиент"/>
            </picture>

            <p className={ 'text text_type_main-medium mb-8' }>{ item.name }</p>

            <ul className={ s.composition }>
               { compositions.map( ( el, i ) =>
                  <Composition
                     key={ i }
                     name={ Object.keys( el )[0] }
                     value={ Object.values( el )[0] }
                  /> ) }
            </ul>

         </div>
      </div>
   )
}


export default IngredientDetails