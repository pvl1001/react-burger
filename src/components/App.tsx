import AppHeader from "./AppHeader/AppHeader";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./BurgerConstructor/BurgerConstructor";
import {useEffect, useState} from "react";
import {API, errorAPI} from "../utils/variables";


function App() {
   const [ingredients, setIngredients] = useState([])

   // получаем данные ингредиентов
   useEffect(() => {
      async function getIngredients() {
         try {
            const response = await fetch(API)
            const {data, success} = await response.json()
            success
               ? setIngredients(data)
               : alert(errorAPI)
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
               <BurgerIngredients data={ingredients}/>
               <BurgerConstructor data={ingredients}/>
            </div>

         </main>
      </div>
   )
}


export default App
