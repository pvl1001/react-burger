import s from './BurgerIngredients.module.scss'
import GroupIngredients from "./GroupIngredients/GroupIngredients";
import { useEffect, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { dataPropTypes } from "../../utils/propTypes";



BurgerIngredients.propTypes = {
   data: PropTypes.arrayOf( dataPropTypes ).isRequired
}

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


function BurgerIngredients( { data } ) {
   const [ current, setCurrent ] = useState( 'bun' )

   useEffect( () => {
      document.getElementById( current ).scrollIntoView()
   }, [ current ] )


   return (
      <section>

         <div style={ { display: 'flex' } } className="mb-10">
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
                  data={ data.filter( el => el.type === group.value ) }
                  group={ group }
               />
            ) }
         </ul>
      </section>
   )
}


export default BurgerIngredients