import s from "./IngredientDetails.module.scss";
import Composition from "./Composition";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import { FC } from "react";
import { IIngredient } from "../../utils/types";


interface IIngredientDetailsProps {
   className?: string
}

const IngredientDetails: FC<IIngredientDetailsProps> = ( { className = '' } ) => {
   const { id } = useParams<string>()
   const item = useAppSelector( store =>
      store.burgerIngredients.ingredients.find( ( el: IIngredient ) => el._id === id ) )

   if ( !item ) return null
   const { image_large, name, calories, proteins, fat, carbohydrates } = item


   return (
      <div className={ className }>
         <div className={ s.container + ' pl-15 pr-15' }>
            <picture className={ s.image_container + ' mb-4' }>
               <img className={ s.image } src={ image_large } alt="ингредиент"/>
            </picture>

            <p className={ 'text text_type_main-medium mb-8' } data-cy="modal_ingredient_name">{ name }</p>

            <ul className={ s.composition }>
               <Composition name={ 'Калории, ккал' } value={ calories }/>
               <Composition name={ 'Белки, г' } value={ proteins }/>
               <Composition name={ 'Жиры, г' } value={ fat }/>
               <Composition name={ 'Углеводы, г' } value={ carbohydrates }/>
            </ul>

         </div>
      </div>
   )
}


export default IngredientDetails