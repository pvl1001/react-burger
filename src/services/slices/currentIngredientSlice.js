import { createSlice } from '@reduxjs/toolkit';


const currentIngredientSlice = createSlice( {
   name: 'currentIngredient',
   initialState: {},
   reducers: {
      clearIngredientModal() {
         return {}
      },
      getIngredientModal( state, action ) {
         return action.payload
      }
   },
} )


export const {
   getIngredientModal,
   clearIngredientModal
} = currentIngredientSlice.actions
export default currentIngredientSlice.reducer