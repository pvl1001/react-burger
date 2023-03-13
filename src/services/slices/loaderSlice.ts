import { createSlice } from '@reduxjs/toolkit';


const initialState: { visible: boolean } = {
   visible: false
}

const loaderSlice = createSlice( {
   name: 'loader',
   initialState,
   reducers: {
      toggleLoader( state ) {
         state.visible = !state.visible
      }
   },
} )


export const { toggleLoader } = loaderSlice.actions
export default loaderSlice.reducer