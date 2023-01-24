import { createSlice } from '@reduxjs/toolkit';


const loaderSlice = createSlice( {
   name: 'loader',
   initialState: {
      visible: false
   },
   reducers: {
      toggleLoader( state ) {
         state.visible = !state.visible
      }
   },
} )


export const { toggleLoader } = loaderSlice.actions
export default loaderSlice.reducer