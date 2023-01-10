import s from "./IngredientDetails.module.scss";
import { dataPropTypes } from "../../utils/propTypes";
import Composition from "./Composition";


IngredientDetails.propTypes = {
   data: dataPropTypes,
}


function IngredientDetails( { data } ) {
   const composition = [
      { 'Калории, ккал': data.calories },
      { 'Белки, г': data.proteins },
      { 'Жиры, г': data.fat },
      { 'Углеводы, г': data.carbohydrates },
   ]


   return (
      <div>
         <div className={ s.container + ' pl-15 pr-15' }>
            <picture className={ s.image_container + ' mb-4' }>
               <img className={ s.image } src={ data.image_large } alt="ингредиент"/>
            </picture>

            <p className={'text text_type_main-medium mb-8' }>{ data.name }</p>

            <ul className={ s.composition }>
               { composition.map( ( el, i ) => <Composition key={ i } data={ el }/> ) }
            </ul>

         </div>
      </div>
   )
}


export default IngredientDetails