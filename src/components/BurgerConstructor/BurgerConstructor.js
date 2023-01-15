import s from './BurgerConstructor.module.scss'
import ConstructorItem from "./ConstructorItem/ConstructorItem";
import { useContext, useEffect, useReducer, useState } from "react";
import withModal from "../_hocs/withModal";
import ConstructorOrder from "./ConstructorOrder";
import { IngredientsContext } from "../../context/burgerContext";


const WithModalConstructorItem = withModal( ConstructorItem )
const WithModalConstructorOrder = withModal( ConstructorOrder )

function reducer( state, action ) {
   switch ( action.type ) {
      case 'sum':
         return action.payload.reduce( ( total, el ) => {
            if ( el.type === 'bun' ) return total + el.price * 2
            return total + el.price
         }, 0 )
      default:
         return state
   }
}

function BurgerConstructor() {
   const ingredients = useContext( IngredientsContext )
   const [ buns ] = useState( ingredients.filter( el => el.type === 'bun' ) )
   const [ fillings ] = useState( ingredients.filter( el => el.type !== 'bun' ) )
   const constructorData = [ buns[0], ...fillings ]
   const [ stateTotalPrice, dispatchTotalPrice ] = useReducer( reducer, 0 )

   // рассчитать стоимость заказа
   useEffect( () => {
      dispatchTotalPrice( { type: 'sum', payload: constructorData } )
   }, [ buns, fillings ] )


   return (
      <section className={ s._ }>
         <div className={ s.constructor }>
            <WithModalConstructorItem
               className={ 'pl-4 pr-4 pb-4' }
               data={ buns[0] }
               type={ 'top' }
               isLocked
            />

            <ul className={ s.list + ' scrollbar pl-4 pr-4' }>
               { fillings.map( el => <WithModalConstructorItem key={ el._id } data={ el }/> ) }
            </ul>

            <WithModalConstructorItem
               className={ 'pl-4 pr-4 pt-4' }
               data={ buns[0] }
               type={ 'bottom' }
               isLocked
            />
         </div>

         <WithModalConstructorOrder
            totalPrice={ stateTotalPrice }
            ingredientsId={ constructorData.map( el => el._id ) }
         />

      </section>
   )
}


export default BurgerConstructor