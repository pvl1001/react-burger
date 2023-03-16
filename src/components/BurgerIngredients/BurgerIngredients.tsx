import s from './BurgerIngredients.module.scss'
import GroupIngredients from "./GroupIngredients/GroupIngredients"
import { FC, SyntheticEvent, useRef, useState } from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { useAppSelector } from "../../services/store";
import { IIngredient } from "../../utils/types";


let debounce: string | number | ReturnType<typeof setTimeout>

interface IIngredientGroup {
   name: string
   value: string
   ref: { current: HTMLLIElement | null }
}

const BurgerIngredients: FC = () => {
   const ingredients: IIngredient[] = useAppSelector( store => store.burgerIngredients.ingredients )
   const refBuns = useRef<HTMLLIElement>( null )
   const refSauce = useRef<HTMLLIElement>( null )
   const refMain = useRef<HTMLLIElement>( null )
   const [ current, setCurrent ] = useState( 'bun' )
   const ingredientGroups: IIngredientGroup[] = [
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

   function onScrollHandler( e: SyntheticEvent ) {
      clearTimeout( debounce )
      debounce = setTimeout( () => {
         ingredientGroups.forEach( ( el: IIngredientGroup ) => {
            if ( el.ref.current && el.ref.current.offsetTop - (e.target as HTMLElement).scrollTop <= 0 ) {
               return setCurrent( el.value )
            }
         } )
      }, 50 )
   }

   function clickTabHandler( item: IIngredientGroup ) {
      item.ref.current?.scrollIntoView( { behavior: "smooth" } )
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


         <ul className={ s.list + ' scrollbar' } onScroll={ onScrollHandler }>
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