import s from './BurgerIngredients.module.scss'
import GroupIngredients from "./GroupIngredients/GroupIngredients";
import { useContext, useEffect, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsContext } from "../../context/burgerContext";


const ingredientGroups = [
   {
      name: 'Булки',
      value: 'bun',
   },
   {
      name: 'Соусы',
      value: 'sauce',
   },
   {
      name: 'Начинки',
      value: 'main',
   }
]


function BurgerIngredients() {
   const ingredients = useContext( IngredientsContext )
   const [ current, setCurrent ] = useState( 'bun' )

   useEffect( () => {
      document.getElementById( current ).scrollIntoView()
   }, [ current ] )


   return (
      <section>

         <div className={ s.tabs + ' mb-10' }>
            { ingredientGroups.map( tab =>
               <Tab
                  key={ tab.name }
                  value={ tab.value }
                  active={ current === tab.value }
                  onClick={ setCurrent }
               >{ tab.name }
               </Tab>
            ) }
         </div>

         <ul className={ s.list + ' scrollbar' }>
            { ingredientGroups.map( group =>
               <GroupIngredients
                  key={ group.name }
                  data={ ingredients.filter( el => el.type === group.value ) }
                  group={ group }
               />
            ) }
         </ul>
      </section>
   )
}


export default BurgerIngredients