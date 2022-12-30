import React from 'react'
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";


function App() {
   return (
      <div>
         <AppHeader/>
         <main className="wrapper pt-10">
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

            <BurgerIngredients />
         </main>
      </div>
   )
}


export default App
