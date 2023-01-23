import AppHeader from "./AppHeader/AppHeader";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./BurgerConstructor/BurgerConstructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from "react";
import { getIngredients } from "../services/slices/burgerIngredientsSlice";
import { useDispatch } from "react-redux";


function App() {
   const dispatch = useDispatch()

   // получаем данные ингредиентов
   useEffect( () => {
      dispatch( getIngredients() )
   }, [] )


   return (
      <div>
         <AppHeader/>
         <main className="main wrapper pt-10 pb-10">
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

            <div className="main-row">
               <DndProvider backend={ HTML5Backend }>
                  <BurgerIngredients/>
                  <BurgerConstructor/>
               </DndProvider>
            </div>

         </main>
      </div>
   )
}


export default App
