import s from './BurgerIngredients.module.scss'
import GroupIngredients from "./GroupIngredients/GroupIngredients"
import { useRef, useState } from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { useSelector } from "react-redux"


let debounce = null

function BurgerIngredients() {
   const ingredients = useSelector( store => store.burgerIngredients.ingredients )
   const refBuns = useRef( null )
   const refSauce = useRef( null )
   const refMain = useRef( null )
   const [ current, setCurrent ] = useState( 'bun' )
   const ingredientGroups = [
      {
         name: 'Булки',
         value: 'bun',
         ref: refBuns,
      },
      {
         name: 'Соусы',
         value: 'sauce',
         ref: refSauce,
      },
      {
         name: 'Начинки',
         value: 'main',
         ref: refMain,
      }
   ]

   function onScrollHandler( e ) {
      clearTimeout( debounce )
      debounce = setTimeout( () => {
         ingredientGroups.forEach( el => {
            if ( el.ref.current.offsetTop - e.target.scrollTop <= 0 ) return setCurrent( el.value )
         } )
      }, 100 )
   }

   function clickTabHandler( item ) {
      item.ref.current.scrollIntoView( { behavior: "smooth" } )
   }


   return (
      <section>

         <div className={ s.tabs + ' mb-10' }>
            { ingredientGroups.map( ( tab, i ) =>
               <Tab
                  key={ i }
                  value={ tab.value }
                  active={ tab.value === current }
                  onClick={ () => clickTabHandler( tab ) }
               >{ tab.name }
               </Tab>
            ) }
         </div>


         <ul className={ s.list + ' scrollbar test' } onScroll={ onScrollHandler }>
            { ingredientGroups.map( ( group, i ) => {
                  return <GroupIngredients
                     key={ i }
                     itemRef={ group.ref }
                     data={ ingredients.filter( el => el.type === group.value ) }
                     group={ group }
                  />
               }
            ) }
         </ul>
      </section>
   )
}


export default BurgerIngredients