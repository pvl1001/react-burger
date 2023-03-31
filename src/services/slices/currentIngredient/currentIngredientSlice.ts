import { createSlice } from '@reduxjs/toolkit';
import { IIngredient } from "../../../utils/types";



const initialState: IIngredient | null = null

const currentIngredientSlice = createSlice( {
   name: 'currentIngredient',
   initialState,
   reducers: {
      clearIngredientModal() {
         return null
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