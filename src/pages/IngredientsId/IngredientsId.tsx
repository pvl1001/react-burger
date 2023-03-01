import s from "./IngredientsId.module.scss";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import { FC } from "react";


const IngredientsId: FC = () => {
   return (
      <div className={ s._ }>
         <h1 className={ 'text text_type_main-large mb-3' }>Детали ингредиента</h1>
         <IngredientDetails/>
      </div>
   )
}


export default IngredientsId