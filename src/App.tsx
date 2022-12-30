import React from 'react'
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import data from 'utils/data'


function App() {
   return (
      <div>
         <AppHeader/>
         <main className="main wrapper pt-10">
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

            <div className="main-row">
               <BurgerIngredients data={data}/>
               <BurgerConstructor data={data}/>
            </div>

         </main>
      </div>
   )
}


export default App
