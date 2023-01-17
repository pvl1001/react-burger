import AppHeader from "./AppHeader/AppHeader";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./BurgerConstructor/BurgerConstructor";
import {useEffect, useState} from "react";
import {errorAPI} from "../utils/variables";
import {NORMA_API} from "../utils/burger-api";
import {IngredientsContext} from "../context/burgerContext";
import {request} from "../utils/request";


function App() {
   const [ingredients, setIngredients] = useState([])

   // получаем данные ингредиентов
   useEffect(() => {
      async function getIngredients() {
         try {
            const {data, success} = await request(`${NORMA_API}/ingredients`)
            if (success) setIngredients(data)
         } catch (err) {
            alert(errorAPI)
            console.error(err)
         }
      }

      getIngredients()
   }, [])


   if (!ingredients.length) return null
   return (
      <div>
         <AppHeader/>
         <main className="main wrapper pt-10 pb-10">
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

            <div className="main-row">
               <IngredientsContext.Provider value={ingredients}>
                  <BurgerIngredients/>
                  <BurgerConstructor/>
               </IngredientsContext.Provider>
            </div>

         </main>
      </div>
   )
}


export default App
