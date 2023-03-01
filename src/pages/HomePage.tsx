import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import { DndProvider } from "react-dnd";
import { FC } from "react";


const HomePage: FC = () => {
   return (
      <>
         <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

         <div className="main-row">
            <DndProvider backend={ HTML5Backend }>
               <BurgerIngredients/>
               <BurgerConstructor/>
            </DndProvider>
         </div>
      </>
   )
}


export default HomePage