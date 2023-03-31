import store from "../../store";

describe( 'burgerIngredients', () => {
   it( 'return initial state', () => {
      expect( store.getState().burgerIngredients ).toStrictEqual( {
         ingredients: [],
         ingredientsRequest: false,
         ingredientsFailed: false,
      } )
   } )
} )