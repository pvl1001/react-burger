import { useMemo } from 'react';
import { useAppSelector } from "../services/store";


function UseTotalPrice( orderIngredients?: string[] ) {
   const { ingredients } = useAppSelector( store => store.burgerIngredients )

   const totalPrice = useMemo( () => ingredients.reduce( ( total, el ) => {
      if ( orderIngredients?.includes( el._id ) ) {
         el.type === 'bun' ? total += el.price * 2 : total += el.price
      }
      return total
   }, 0 ), [ ingredients, orderIngredients ] )

   return { totalPrice } as { totalPrice: number }
}


export default UseTotalPrice;