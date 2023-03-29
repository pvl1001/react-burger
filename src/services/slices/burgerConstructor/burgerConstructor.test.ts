// @ts-nocheck
import reducer, {
   addItemConstructor,
   clearConstructor,
   removeItemConstructor,
   sortItemConstructor
} from "./burgerConstructorSlice";
import store from "../../store";


const initialState = {
   bun: null,
   ingredients: [],
}

const itemWithBun = {
   _id: "60d3b41abdacab0026a733c7",
   name: "Флюоресцентная булка R2-D3",
   type: "bun",
   proteins: 44,
   fat: 26,
   carbohydrates: 85,
   calories: 643,
   price: 988,
   image: "https://code.s3.yandex.net/react/code/bun-01.png",
   image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
   image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
   __v: 0,
   item_id: 3
}

const item1 = {
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

const item2 = {
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
   item_id: 2
}


describe( 'burgerConstructor', () => {

   it( 'return initial state', () => {
      expect( store.getState().burgerConstructor ).toStrictEqual( initialState )
   } )

   it( 'handle addItemConstructor with bun', () => {
      expect( reducer( initialState, addItemConstructor( itemWithBun ) ) ).toStrictEqual( {
         bun: itemWithBun,
         ingredients: []
      } )
   } )

   it( 'handle addItemConstructor', () => {
      expect( reducer( initialState, addItemConstructor( item1 ) ) ).toStrictEqual( {
         bun: null,
         ingredients: [ item1 ]
      } )
   } )

   it( 'handle removeItemConstructor', () => {
      expect( reducer( {
         bun: null,
         ingredients: [ item1 ]
      }, removeItemConstructor( 1 ) ) ).toStrictEqual( initialState )
   } )

   it( 'handle sortItemConstructor', () => {
      expect( reducer( {
         bun: null,
         ingredients: [ item1, item2 ]
      }, sortItemConstructor( { dragIndex: 0, hoverIndex: 1 } ) ) ).toStrictEqual( {
         bun: null,
         ingredients: [ item2, item1 ]
      } )
   } )

   it( 'handle clearConstructor', () => {
      expect( reducer( {
         bun: null,
         ingredients: [ item1 ]
      }, clearConstructor() ) ).toStrictEqual( initialState )
   } )

} )