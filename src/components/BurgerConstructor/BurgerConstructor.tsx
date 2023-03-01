import s from './BurgerConstructor.module.scss'
import ConstructorItem from "./ConstructorItem/ConstructorItem";
import { FC, useEffect, useReducer } from "react";
import ConstructorOrder from "./ConstructorOrder";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { addItemConstructor } from "../../services/slices/burgerConstructorSlice";
import { IIngredient } from "../../utils/types";
import { RootState } from "../../services/store";


function reducer( state: number, action: { type: 'sum', payload: IIngredient[] } ) {
   switch ( action.type ) {
      case 'sum':
         return action.payload.reduce( ( total: number, el: IIngredient ) => total + el.price, 0 )
      default:
         return state
   }
}

const BurgerConstructor: FC = () => {
   const dispatch = useDispatch()
   const { ingredients, constructorIngredients, bun } = useSelector( ( store: RootState ) => ({
      ingredients: store.burgerIngredients.ingredients,
      bun: store.burgerConstructor.bun,
      constructorIngredients: store.burgerConstructor.ingredients,
   }) )

   const [ stateTotalPrice, dispatchTotalPrice ] = useReducer( reducer, 0 )

   const order = bun ? [ bun, ...constructorIngredients, bun ] : constructorIngredients
   //no-explicit-any
   const [ { isOver, canDrop }, dropTargetRef ] = useDrop( {
      accept: 'ingredient',
      // перетаскиваем ингредиент в конструктор
      drop( item: IIngredient ) {
         if ( item.index === undefined ) {
            const currentItem = ingredients.find( ( el: IIngredient ) => el._id === item._id )
            dispatch( addItemConstructor( currentItem ) )
         }
      },
      collect: ( monitor ) => ({
         isOver: monitor.isOver(),
         canDrop: monitor.canDrop(),
      })
   } )

   const borderColor = isOver ? 'lime' : canDrop ? '#9e8aff' : ''

   // рассчитать стоимость заказа
   useEffect( () => {
      dispatchTotalPrice( { type: 'sum', payload: order } )
   }, [ constructorIngredients, bun ] )


   return (
      <section className={ s._ }>
         <div
            ref={ dropTargetRef }
            style={ { borderColor } }
            className={ `${ s.constructor }` }
         >
            { order.length
               ? <>
                  { bun && <ConstructorItem
                     className={ 'pl-4 pr-4 pb-4' }
                     data={ bun }
                     type={ 'top' }
                     isLocked
                  /> }

                  <ul className={ `${ s.list } scrollbar pl-4 pr-4` }>
                     { constructorIngredients.map( ( el: IIngredient, i: number ) =>
                        <ConstructorItem
                           key={ el.item_id }
                           index={ i }
                           data={ el }
                        />
                     ) }
                  </ul>

                  { bun && <ConstructorItem
                     className={ 'pl-4 pr-4 pt-4' }
                     data={ bun }
                     type={ 'bottom' }
                     isLocked
                  /> }
               </>
               : <p className={ `${ s.item_empty } text text_type_main-default text_color_inactive` }>
                  Добавьте ингредиенты
               </p>
            }
         </div>

         <ConstructorOrder
            totalPrice={ stateTotalPrice }
            ingredientsId={ order.map( ( el: IIngredient ) => el._id ) }
         />

      </section>
   )
}


export default BurgerConstructor