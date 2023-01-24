import { createSlice } from '@reduxjs/toolkit';


const initialState = {
   bun: null,
   ingredients: [],
}

const burgerConstructorSlice = createSlice( {
   name: 'burgerConstructor',
   initialState,
   reducers: {
      addItemConstructor( state, action ) {
         const payload = action.payload
         const item = { ...payload, item_id: new Date().getTime() }
         if ( item.type === 'bun' ) state.bun = item
         else state.ingredients = [ ...state.ingredients, item ]
      },
      removeItemConstructor( state, action ) {
         state.ingredients = state.ingredients.filter( el => el.item_id !== action.payload )
      },
      sortItemConstructor( state, action ) {
         const { dragIndex, hoverIndex } = action.payload
         const item = state.ingredients[dragIndex]
         state.ingredients.splice( dragIndex, 1 )
         state.ingredients.splice( hoverIndex, 0, item )
      },
      clearConstructor() {
         return initialState
      }
   },
} )


export const {
   addItemConstructor,
   removeItemConstructor,
   sortItemConstructor,
   clearConstructor,
} = burgerConstructorSlice.actions
export default burgerConstructorSlice.reducer