import s from "./IngredientsId.module.scss";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";


function IngredientsId() {
   return (
      <div className={ s._ }>
         <h1 className={ 'text text_type_main-large mb-3' }>Детали ингредиента</h1>
         <IngredientDetails/>
      </div>
   )
}


export default IngredientsId