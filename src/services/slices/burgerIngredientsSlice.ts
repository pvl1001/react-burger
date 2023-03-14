import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from "../../utils/request";
import { NORMA_API } from "../../utils/api";
import { toggleLoader } from "./loaderSlice";
import { IIngredient } from "../../utils/types";


export const getIngredients = createAsyncThunk<IIngredient[]>(
   'burgerIngredients/getIngredients',
   async ( _, { dispatch, rejectWithValue } ) => {
      try {
         dispatch( toggleLoader() )
         const res = await request( `${ NORMA_API }/ingredients` )
         if ( res?.success ) return res.data
         throw res
      } catch ( err: any ) {
         console.log( 'Ошибка getIngredients: ' + err.message )
         return rejectWithValue( err.message )
      } finally {
         dispatch( toggleLoader() )
      }
   }
)


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
   reducers: {},
   extraReducers: ( builder ) => {
      builder
         .addCase( getIngredients.pending, ( state ) => {
            state.ingredientsRequest = true
         } )
         .addCase( getIngredients.fulfilled, ( state, action ) => {
            state.ingredients = action.payload
            state.ingredientsRequest = false
            state.ingredientsFailed = false
         } )
         .addCase( getIngredients.rejected, ( state ) => {
            state.ingredients = []
            state.ingredientsRequest = false
            state.ingredientsFailed = true
         } )
   },
} )


export default burgerIngredientsSlice.reducer