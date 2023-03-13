import { createSlice } from '@reduxjs/toolkit';
import { request } from "../../utils/request";
import { NORMA_API } from "../../utils/burger-api";
import { toggleLoader } from "./loaderSlice";
import { IIngredient } from "../../utils/types";
import { AppDispatch } from "../store";


type IInitialState = {
   ingredients: IIngredient[],
   ingredientsRequest: boolean,
   ingredientsFailed: boolean,
}

const initialState: IInitialState = {
   ingredients: [],
   ingredientsRequest: false,
   ingredientsFailed: false,
}


const burgerIngredientsSlice = createSlice( {
   name: 'burgerIngredients',
   initialState,
   reducers: {
      getIngredietnsSuccess( state, action ) {
         state.ingredients = action.payload
         state.ingredientsRequest = false
         state.ingredientsFailed = false
      },
      getIngredientsRequest( state ) {
         state.ingredientsRequest = true
      },
      getIngredientsFailed( state ) {
         state.ingredients = []
         state.ingredientsRequest = false
         state.ingredientsFailed = true
      },
   },
} )


export const getIngredients = () => async ( dispatch: AppDispatch ) => {
   try {
      dispatch( toggleLoader() )
      dispatch( getIngredientsRequest() )
      const { data, success } = await request( `${ NORMA_API }/ingredients` )
      if ( success ) return dispatch( getIngredietnsSuccess( data ) )
      dispatch( getIngredientsFailed() )
   } catch ( err ) {
      dispatch( getIngredientsFailed() )
   } finally {
      dispatch( toggleLoader() )
   }
}


export const {
   getIngredietnsSuccess,
   getIngredientsRequest,
   getIngredientsFailed,
} = burgerIngredientsSlice.actions
export default burgerIngredientsSlice.reducer