import store from "../../store";
import reduce, { clearIngredientModal, getIngredientModal } from './currentIngredientSlice'

const item = {
   _id: "60d3b41abdacab0026a733c7",
   name: "Флюоресцентная булка R2-D3",
   type: "sauce",
   proteins: 44,
   fat: 26,
   carbohydrates: 85,
   calories: 643,
   price: 988,
   image: "https://code.s3.yandex.net/react/code/bun-01.png",
   image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
   image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
   __v: 0,
   item_id: 1
}


describe( 'currentIngredientSlice', () => {
   it( 'return initial state', () => {
      expect( store.getState().currentIngredient ).toStrictEqual( null )
   } )

   it( 'handle clearIngredientModal', () => {
      expect( reduce( null, clearIngredientModal() ) ).toStrictEqual( null )
   } )

   it( 'handle getIngredientModal', () => {
      expect( reduce( null, getIngredientModal( item ) ) ).toStrictEqual( item )
   } )
} )